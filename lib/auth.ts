import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server"; // Para getSessionFromRequest

// --- Configuração Inicial ---
const JWT_SECRET_STRING = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME!; // O '!' assume que COOKIE_NAME está definido

if (!JWT_SECRET_STRING) {
  throw new Error(
    "A variável de ambiente JWT_SECRET não está definida. Verifique seu arquivo .env ou .env.local"
  );
}
if (!COOKIE_NAME) {
  throw new Error(
    "A variável de ambiente COOKIE_NAME não está definida. Verifique seu arquivo .env ou .env.local"
  );
}

// O segredo precisa ser codificado para Uint8Array para uso com 'jose'
const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET_STRING);

// --- Tipos e Interfaces ---
/**
 * Define o payload que será incluído no JWT.
 * Estende JWTPayload da biblioteca 'jose' para incluir campos padrão como iat, exp, etc.
 */
export interface UserSessionPayload extends JWTPayload {
  userId: string;
  email: string;
  // Adicione outros campos que você queira armazenar no token (ex: roles, name)
}

/**
 * Dados que você passará para criar a sessão (sem os campos que 'jose' adiciona automaticamente).
 */
type SessionCreationPayload = Omit<UserSessionPayload, keyof JWTPayload>;

// --- Funções de Autenticação ---

/**
 * Cria uma sessão para o usuário, gerando um JWT e armazenando-o em um cookie HTTP-only.
 * Esta função é chamada tipicamente por uma Server Action (ambiente Node.js).
 * @param payload - Os dados do usuário a serem incluídos no token.
 */
export async function createSession(
  payload: SessionCreationPayload
): Promise<void> {
  const expirationTime = "7d"; // Token expira em 7 dias (formato aceito por 'jose')

  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Define o algoritmo e tipo
      .setIssuedAt() // Define o timestamp de emissão (iat) para agora
      .setExpirationTime(expirationTime) // Define o tempo de expiração (exp)
      // .setNotBefore('0s') // Opcional: define quando o token se torna válido (nbf)
      .sign(JWT_SECRET_KEY); // Assina o token com a chave secreta

    cookies().set(COOKIE_NAME, token, {
      httpOnly: true, // Impede acesso via JavaScript no cliente (mais seguro)
      secure: process.env.NODE_ENV === "production", // Usar HTTPS em produção
      path: "/", // Cookie disponível em todo o site
      sameSite: "lax", // Ajuda a proteger contra ataques CSRF
      maxAge: 60 * 60 * 24 * 7, // Tempo de vida do cookie em segundos (7 dias)
    });

    console.log(
      `Sessão criada para userId   token definido no cookie: ${COOKIE_NAME}`
    );
  } catch (error) {
    console.error("Erro ao criar sessão e definir cookie:", error);
    // Considere lançar um erro customizado aqui se necessário para a Server Action tratar
    throw new Error("Não foi possível criar a sessão.");
  }
}

/**
 * Verifica a sessão do usuário a partir do cookie.
 * Pode ser usada em Server Components ou Server Actions (ambiente Node.js).
 * @returns O payload do usuário se o token for válido e não expirado, caso contrário null.
 */
export async function verifySessionOnServer(): Promise<UserSessionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;

  if (!token) {
    console.log(
      "Nenhum token de sessão encontrado nos cookies (verifySessionOnServer)."
    );
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY, {
      algorithms: ["HS256"], // Importante: especifique os algoritmos que você usa/espera
    });
    // console.log('Sessão verificada com sucesso (verifySessionOnServer):', payload);
    return payload as UserSessionPayload;
  } catch (error) {
    console.warn(
      "Falha ao verificar token de sessão (verifySessionOnServer):",
      (error as Error).message
    );
    // Se o token for inválido (expirado, assinatura incorreta, etc.),
    // é uma boa prática remover o cookie inválido.
    await clearInvalidSessionCookie();
    return null;
  }
}

/**
 * Obtém e verifica a sessão do usuário a partir do cookie em um objeto NextRequest.
 * Projetada para ser usada no Middleware (Edge Runtime).
 * @param request - O objeto NextRequest.
 * @returns O payload do usuário se o token for válido e não expirado, caso contrário null.
 */
export async function getSessionFromRequest(
  request: NextRequest
): Promise<UserSessionPayload | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    // console.log('Nenhum token de sessão encontrado nos cookies (getSessionFromRequest).');
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY, {
      algorithms: ["HS256"],
    });
    // console.log('Sessão verificada com sucesso (getSessionFromRequest):', payload);
    return payload as UserSessionPayload;
  } catch (error) {
    console.warn(
      "Falha ao verificar token de sessão (getSessionFromRequest):",
      (error as Error).message
    );
    // No middleware, não podemos modificar cookies da mesma forma que em Server Actions.
    // A limpeza do cookie inválido aconteceria na próxima interação via Server Action/Component
    // ou se 'verifySessionOnServer' for chamada e detectar o token inválido.
    return null;
  }
}

export async function clearSession(): Promise<void> {
  try {
    cookies().set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      expires: new Date(0), // Define a data de expiração para o passado, removendo o cookie
    });
    console.log(`Sessão limpa, cookie ${COOKIE_NAME} removido.`);
  } catch (error) {
    console.error("Erro ao limpar sessão e remover cookie:", error);
    throw new Error("Não foi possível limpar a sessão.");
  }
}

async function clearInvalidSessionCookie(): Promise<void> {
  try {
    cookies().set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      expires: new Date(0),
    });
    console.log(`Cookie de sessão inválido (${COOKIE_NAME}) removido.`);
  } catch (error) {
    console.error("Erro ao tentar limpar cookie de sessão inválido:", error);
  }
}
