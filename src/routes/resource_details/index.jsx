import React, { useContext, useEffect, useState } from "react";
import { useParams, Redirect } from "react-router";
import {
  PageSection,
  TextVariants,
  Text,
  PageSectionVariants,
} from "@patternfly/react-core";
import { ResourceContext } from "../../contexts/resource";
import { Table, TableBody } from "@patternfly/react-table";

export const ResourceDetailsRoute = () => {
  const params = useParams();
  const resourceName = params["name"];
  const resourceContext = useContext(ResourceContext);
  const [selectedResource, setSelectedResource] = useState();

  useEffect(() => {
    if (!resourceContext.resources) {
      resourceContext.getResources();
    }
  }, [resourceContext]);

  useEffect(() => {
    const resource = resourceContext?.resources?.find(
      (resource) => resource["name"] === resourceName
    );
    if (resource) {
      setSelectedResource(resource);
    }
  }, [resourceName, resourceContext]);

  if (!resourceName) {
    return <Redirect to="/resources" />;
  }
  const columns = [
    {
      title: "key",
    },
    {
      title: "value",
    },
  ];
  const rows = selectedResource
    ? Object.keys(selectedResource).map((key) => {
        return [
          key,
          {
            title: <pre>{JSON.stringify(selectedResource[key], null, 2)}</pre>,
          },
        ];
      })
    : [];

  return (
    <>
      <PageSection>
        <div className="pf-c-content">
          <Text component={TextVariants.h1}>Resources</Text>
        </div>
      </PageSection>
      <PageSection variant={PageSectionVariants.light}>
        <Table caption="Resource Details" cells={columns} rows={rows}>
          <TableBody />
        </Table>
      </PageSection>
    </>
  );
};
