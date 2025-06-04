import { Box, Icon, Table } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

type Props = {
  rowData: Record<string, string | number>[];
  columns: { header: string; field: string }[];
  hasOperations?: boolean;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
};

export function StyledTable({
  rowData,
  columns,
  hasOperations,
  handleEdit,
  handleDelete,
}: Props) {
  return (
    <Table.Root size="sm" striped>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeader key={column.field}>
              {column.header}
            </Table.ColumnHeader>
          ))}
          {hasOperations && <Table.ColumnHeader>Operações</Table.ColumnHeader>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rowData.map((item, index) => (
          <Table.Row key={index}>
            {columns.map((column) => (
              <Table.Cell key={column.field}>{item[column.field]}</Table.Cell>
            ))}

            {hasOperations && (
              <Table.Cell>
                <Box display="flex" gap={2}>
                  <Icon
                    as={FaEdit}
                    transition="all 0.2s ease-in-out"
                    cursor="pointer"
                    onClick={() => handleEdit?.(item.id.toString())}
                  />
                  <Icon
                    as={FaTrash}
                    color="red"
                    transition="all 0.2s ease-in-out"
                    cursor="pointer"
                    onClick={() => handleDelete?.(item.id.toString())}
                  />
                </Box>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
