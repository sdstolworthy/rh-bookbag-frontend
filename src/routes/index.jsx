import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { MainTemplate } from "../templates/main";
import { Dashboard } from "./dashboard";
export const Routes = ({ children }) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <Route path={["/dashboard"]}>
            <MainTemplate>
              <Switch>
                <Route path="/dashboard" component={Dashboard} />
              </Switch>
            </MainTemplate>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
