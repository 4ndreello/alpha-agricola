import { Table } from "@chakra-ui/react";

/**
 * Props for StyledTable.
 *
 * @property {Record<string, string>[]} rowData - Row data for the table.
 * @property {{ header: string; field: string }[]} columns - Table columns.
 */
type Props = {
  rowData: Record<string, string | number>[];
  columns: { header: string; field: string }[];
};

export function StyledTable({ rowData, columns }: Props) {
  return (
    <Table.Root size="sm" striped>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeader key={column.field}>
              {column.header}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rowData.map((item, index) => (
          <Table.Row key={index}>
            {columns.map((column) => (
              <Table.Cell key={column.field as string}>
                {item[column.field as string]}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
