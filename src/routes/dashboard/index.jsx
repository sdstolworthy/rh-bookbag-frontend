import React from "react";
import { PageSection, Text, TextVariants } from "@patternfly/react-core";
import propTypes from "prop-types";
export const Dashboard = ({ children }) => {
  return (
    <>
      <PageSection>
        <div className="pf-c-content">
          <Text component={TextVariants.h1}>Lab Instances</Text>
        </div>
      </PageSection>
      <PageSection>
        <span>This is another section</span>
      </PageSection>
    </>
  );
};

Dashboard.propTypes = {
  children: propTypes.node,
};
