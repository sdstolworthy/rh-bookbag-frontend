import React, { useState, useContext } from "react";
import { Table, TableHeader, TableBody } from "@patternfly/react-table";
import { ResourceTable } from "./resource_table";
import { Dropdown, DropdownToggle, DropdownItem } from "@patternfly/react-core";
import { CaretDownIcon, TrashIcon } from "@patternfly/react-icons";

import { ResourceClaimsContext } from "../contexts/resource_claims";

const ActionDropdown = ({ claim }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const resourceClaimContext = useContext(ResourceClaimsContext);

  const handleDelete = () => {
    console.log("delete", claim["name"]);
    resourceClaimContext.deleteResourceClaim(claim["namespace"], claim["name"]);
  };

  const dropdownItems = [
    <DropdownItem
      value="delete"
      key="delete"
      onClick={() => {
        handleDelete();
      }}
    >
      <TrashIcon color="red" />
      &nbsp; Delete
    </DropdownItem>,
  ];

  const onSelect = (e) => {
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <Dropdown
        isOpen={isDropdownOpen}
        onSelect={onSelect}
        toggle={
          <DropdownToggle
            id="toggle-id"
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            iconComponent={CaretDownIcon}
          >
            Actions
          </DropdownToggle>
        }
        dropdownItems={dropdownItems}
      ></Dropdown>
    </div>
  );
};

export const ResourceClaimTable = ({ resourceClaims }) => {
  const [expandedRows, setExpandedRows] = useState({});

  function serializeResourceClaimsToTableObject(resourceClaims) {
    const columns = [
      {
        title: "Resource Name",
        accessor: "name",
      },
      {
        title: "Namespace",
        accessor: "namespace",
      },
      {
        title: "Actions",
        render: (claim) => {
          return (
            <div>
              <ActionDropdown claim={claim} />
            </div>
          );
        },
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
            cells: columns.map((column) =>
              column.render ? column.render(claim) : claim[column.accessor]
            ),
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
