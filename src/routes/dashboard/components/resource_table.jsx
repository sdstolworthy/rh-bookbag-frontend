import React from "react";
import { Table, TableHeader, TableBody } from "@patternfly/react-table";

export const ResourceTable = ({ resources }) => {
  // return <pre>{JSON.stringify(resources, null, 2)}</pre>;
  function serializeResourcesToTableObject(resources) {
    const columns = [
      {
        title: "ID",
        accessor: "id",
      },
      {
        title: "Current State",
        accessor: "current_state",
      },
      {
        title: "Provision Data",
        accessor: "provision_data",
        render: (content) => {
          return <pre>{JSON.stringify(content, null, 2)}</pre>;
        },
      },
    ];

    const rows = resources.map((resource, index) => {
      console.log(index, resource.provision_data);
      return {
        key: resource.id,
        original: resource,
        cells: columns.map((column) => {
          if (column.render) {
            return {
              title: column.render(resource[column.accessor]),
            };
          }
          return resource[column.accessor];
        }),
      };
    });
    return [columns, rows];
  }

  const [columns, rows] = serializeResourcesToTableObject(resources);
  return (
    <Table cells={columns} rows={rows} caption="Resource Claims">
      <TableHeader />
      <TableBody
        rowKey={({ rowData }) => {
          return rowData.key;
        }}
      />
    </Table>
  );
};
