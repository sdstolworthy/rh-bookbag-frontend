import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { MainTemplate } from "../templates/main";
import { ResourceClaimsDashboard } from "./resource_claims_dashboard";
import { ResourceClaimsProvider } from "../contexts/resource_claims";
import { ResourceDashboard } from "./resource_dashboard";
import { ResourceProvider } from "../contexts/resource";
export const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/resource_claims" />
          <Route path={["/resource_claims", "/resources"]}>
            <MainTemplate>
              <Switch>
                <Route path="/resource_claims">
                  {(props) => {
                    return (
                      <ResourceClaimsProvider>
                        <ResourceClaimsDashboard {...props} />
                      </ResourceClaimsProvider>
                    );
                  }}
                </Route>
                <Route path="/resources">
                  {(props) => {
                    return (
                      <ResourceProvider>
                        <ResourceDashboard {...props} />;
                      </ResourceProvider>
                    );
                  }}
                </Route>
              </Switch>
            </MainTemplate>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
