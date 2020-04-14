import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { MainTemplate } from "../templates/main";
import { Dashboard } from "./dashboard";
import { ResourceClaimsProvider } from "../contexts/resource_claims";
export const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path={["/dashboard"]}>
            <MainTemplate>
              <Switch>
                <Route path="/dashboard">
                  {(props) => {
                    return (
                      <ResourceClaimsProvider>
                        <Dashboard {...props} />
                      </ResourceClaimsProvider>
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
