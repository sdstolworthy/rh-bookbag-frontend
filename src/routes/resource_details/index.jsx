import React, { useContext, useEffect, useState } from "react";
import { useParams, Redirect } from "react-router";
import { PageSection, TextVariants, Text } from "@patternfly/react-core";
import { ResourceContext } from "../../contexts/resource";

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

  return (
    <>
      <PageSection>
        <div className="pf-c-content">
          <Text component={TextVariants.h1}>Resources</Text>
        </div>
      </PageSection>
      <PageSection>
        <pre>{JSON.stringify(selectedResource, null, 2)}</pre>
      </PageSection>
    </>
  );
};
