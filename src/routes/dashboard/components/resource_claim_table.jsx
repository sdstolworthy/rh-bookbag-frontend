import React, { useState } from "react";
import { Table, TableHeader, TableBody } from "@patternfly/react-table";
import { ResourceTable } from "./resource_table";

export const ResourceClaimTable = ({ resourceClaims }) => {
  const [expandedRows, setExpandedRows] = useState({});

  function serializeResourceClaimsToTableObject(resourceClaims) {
    const columns = [
      {
        title: "Resource Name",
        accessor: "name",
      },
      {
        title: "ID",
        accessor: "id",
      },
    ];
    const rows = [
      ...resourceClaims.reduce((previousCells, claim, index) => {
        return [
          ...previousCells,
          {
            isOpen: !!expandedRows[claim.id],
            key: claim.id,
            original: claim,
            cells: columns.map((column) => claim[column.accessor]),
          },
          {
            parent: previousCells.length,
            fullWidth: true,
            cells: [{ title: <ResourceTable resources={claim.resources} /> }],
          },
        ];
      }, []),
    ];

    return [columns, rows];
  }
  const [columns, rows] = serializeResourceClaimsToTableObject(resourceClaims);
  const rowToggler = (_, __, isOpen, row) => {
    setExpandedRows({
      ...expandedRows,
      [row.key]: isOpen,
    });
  };
  return (
    <Table
      cells={columns}
      rows={rows}
      caption="Resource Claims"
      onCollapse={rowToggler}
    >
      <TableHeader />
      <TableBody
        // onRowClick={rowClickHandler}
        rowKey={({ rowData }) => {
          return rowData.key;
        }}
      />
    </Table>
  );
};
