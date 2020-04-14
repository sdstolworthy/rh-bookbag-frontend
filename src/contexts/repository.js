import React, { createContext, useState, useContext, useEffect } from "react";
import { ConfigContext } from "./config";
import { BackendV1ResourceClaimsRepository } from "../repositories/resource_claims_repository/backendv1_resource_claims_repository";

export const RepositoryContext = createContext({
  resourceClaimRepository: null,
});

export const RepositoryContextProvider = ({ children }) => {
  const [repositories, setRepositories] = useState({
    resourceClaimRepository: null,
  });
  const [loading, setLoading] = useState(false);
  const configContext = useContext(ConfigContext);
  useEffect(() => {
    setLoading(true);
    if (configContext.config) {
      setRepositories({
        resourceClaimRepository: new BackendV1ResourceClaimsRepository({
          backendBaseUrl: configContext.config.backendBaseUrl,
        }),
      });
    }
    setLoading(false);
  }, [configContext]);
  return (
    <RepositoryContext.Provider value={repositories}>
      {loading ? null : children}
    </RepositoryContext.Provider>
  );
};
