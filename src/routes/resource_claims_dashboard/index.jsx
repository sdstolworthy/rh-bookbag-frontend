import React from "react";
import { PageSection, Text, TextVariants } from "@patternfly/react-core";
import propTypes from "prop-types";
import { useContext } from "react";
import { ResourceClaimsContext } from "../../contexts/resource_claims";
import { useEffect } from "react";
import { ResourceClaimTable } from "../../components/resource_claim_table";

export const ResourceClaimsDashboard = () => {
  const resourceClaimContext = useContext(ResourceClaimsContext);

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

  return (
    <>
      <PageSection>
        <div className="pf-c-content">
          <Text component={TextVariants.h1}>Lab Instances</Text>
        </div>
      </PageSection>
      <PageSection>
        <ResourceClaimTable
          resourceClaims={resourceClaimContext.resourceClaims}
        />
      </PageSection>
    </>
  );
};

ResourceClaimsDashboard.propTypes = {
  children: propTypes.node,
};
