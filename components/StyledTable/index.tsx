import { Box, Button, Table } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

/**
 * Props for StyledTable.
 *
 * @property {Record<string, string>[]} rowData - Row data for the table.
 * @property {{ header: string; field: string }[]} columns - Table columns.
 */
type Props = {
  rowData: Record<string, string | number>[];
  columns: { header: string; field: string }[];
  hasOperations?: boolean;
};

export function StyledTable({ rowData, columns, hasOperations }: Props) {
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
                  <FaEdit />
                  <FaTrash color="red" />
                </Box>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
