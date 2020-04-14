import React from "react";
import { PageSection, Text, TextVariants } from "@patternfly/react-core";
import { Table, TableHeader, TableBody } from "@patternfly/react-table";
import propTypes from "prop-types";
import { useContext } from "react";
import { ResourceClaims } from "../../contexts/resource_claims";
import { useEffect } from "react";

export const Dashboard = () => {
  const resourceClaimContext = useContext(ResourceClaims);
  useEffect(() => {
    if (resourceClaimContext.resourceClaims === null) {
      resourceClaimContext.getResourceClaims();
    }
  }, [resourceClaimContext]);
  if (
    !(
      resourceClaimContext?.resourceClaims &&
      Array.isArray(resourceClaimContext?.resourceClaims)
    )
  ) {
    return null;
  }
  const [columns, rows] = serializeResourceClaimsToTableObject(
    resourceClaimContext?.resourceClaims
  );
  console.log(columns);
  console.log(rows);

  return (
    <>
      <PageSection>
        <div className="pf-c-content">
          <Text component={TextVariants.h1}>Lab Instances</Text>
        </div>
      </PageSection>
      <PageSection>
        <Table cells={columns} rows={rows}>
          <TableHeader />
          <TableBody />
        </Table>
      </PageSection>
    </>
  );
};

function serializeResourceClaimsToTableObject(resourceClaims) {
  const columns = [
    {
      title: "Resource Name",
      accessor: "name",
    },
    {
      title: "Current State",
      accessor: "current_state",
    },
    {
      title: "ID",
      accessor: "id",
    },
  ];
  const rows = resourceClaims.map((claim) => {
    return {
      cells: columns.map((column) => claim[column.accessor]),
    };
  });
  return [columns, rows];
}

Dashboard.propTypes = {
  children: propTypes.node,
};
