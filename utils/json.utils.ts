export async function safeParseJSon(request: Request) {
  try {
    return await request.json();
  } catch (error) {
    return null;
  }
}
