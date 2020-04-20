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
              <ResourceClaimsProvider>
                <ResourceProvider>
                  <Switch>
                    <Route path="/resource_claims">
                      <ResourceClaimsDashboard />
                    </Route>
                    <Route path="/resources/:id">
                      <div></div>
                    </Route>
                    <Route exact path="/resources">
                      <ResourceDashboard />
                    </Route>
                    <Redirect exact from="/resources/" to="/resources" />
                  </Switch>
                </ResourceProvider>
              </ResourceClaimsProvider>
            </MainTemplate>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
