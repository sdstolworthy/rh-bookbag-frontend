import React from "react";
import "@patternfly/react-core/dist/styles/base.css";
import {
  Page,
  PageHeader,
  PageSidebar,
  Brand,
  Toolbar,
  ToolbarItem,
  ToolbarGroup,
  Avatar,
} from "@patternfly/react-core";

import propTypes from "prop-types";

export const MainTemplate = React.memo(({ children }) => {
  return (
    <Page
      header={
        <PageHeader
          showNavToggle
          logo={
            <div>
              <Toolbar>
                <Brand
                  alt="Open Innovation Labs"
                  src={`${process.env.PUBLIC_URL}/oil_logo.png`}
                ></Brand>
                <div style={{ width: 50 }} />
                <ToolbarItem></ToolbarItem>
              </Toolbar>
            </div>
          }
          toolbar={
            <Toolbar>
              <ToolbarGroup>
                <ToolbarItem></ToolbarItem>
              </ToolbarGroup>
            </Toolbar>
          }
          avatar={
            <Avatar
              src={"https://via.placeholder.com/150"}
              alt={"User Avatar"}
            />
          }
        ></PageHeader>
      }
      isManagedSidebar={true}
      sidebar={<PageSidebar isManagedSidebar theme="dark" nav={<div />} />}
      style={{ height: "100vh" }}
    >
      {children}
    </Page>
  );
});

MainTemplate.propTypes = {
  children: propTypes.node,
};
