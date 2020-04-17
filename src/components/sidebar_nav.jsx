import React from "react";
import { Nav, NavItem, NavList } from "@patternfly/react-core";
import { Link, useLocation } from "react-router-dom";
export const NavDefaultList = () => {
  const { pathname } = useLocation();

  return (
    <Nav theme="dark">
      <NavList>
        <NavItem itemId={0} isActive={pathname === "/resource_claims"}>
          <Link to="/resource_claims">Resource Claims</Link>
        </NavItem>
        <NavItem itemId={1} isActive={pathname === "/resources"}>
          <Link to="/resources">Resources</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
};
