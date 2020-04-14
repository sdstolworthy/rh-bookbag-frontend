import React from "react";
import { Routes } from "./routes";
import { RepositoryContextProvider } from "./contexts/repository";
import { ConfigContextProvider } from "./contexts/config";
import { StaticConfigurationRepository } from "./repositories/configuration/backendV1ConfigurationRepository";

function App() {
  return (
    <div>
      <ConfigContextProvider
        configRepository={new StaticConfigurationRepository()}
      >
        <RepositoryContextProvider>
          <Routes />
        </RepositoryContextProvider>
      </ConfigContextProvider>
    </div>
  );
}

export default App;
