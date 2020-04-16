import React from "react";
import { PageSection, Text, TextVariants } from "@patternfly/react-core";
import propTypes from "prop-types";
import { useContext } from "react";
import { useEffect } from "react";
import { ResourceContext } from "../../contexts/resource";
import { ResourceTable } from "../../components/resource_table";

export const ResourceDashboard = () => {
  const resourceContext = useContext(ResourceContext);
  useEffect(() => {
    if (resourceContext.resources === null) {
      resourceContext.getResources();
    }
  }, [resourceContext]);
  if (
    !(resourceContext?.resources && Array.isArray(resourceContext?.resources))
  ) {
    return null;
  }

  return (
    <>
      <PageSection>
        <div className="pf-c-content">
          <Text component={TextVariants.h1}>Lab Instances</Text>
        </div>
      </PageSection>
      <PageSection>
        <ResourceTable resources={resourceContext.resources} />
      </PageSection>
    </>
  );
};

ResourceDashboard.propTypes = {
  children: propTypes.node,
};
