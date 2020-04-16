import React, { createContext, useState, useContext, useEffect } from "react";
import { ConfigContext } from "./config";
import { BackendV1ResourceClaimsRepository } from "../repositories/resource_claims_repository/backendv1_resource_claims_repository";
import { BackendV1ResourcesRepository } from "../repositories/resources_repository/backendv1_resource_repository";

export const RepositoryContext = createContext({
  resourceClaimRepository: null,
  resourceRepository: null,
});

export const RepositoryContextProvider = ({ children }) => {
  const [repositories, setRepositories] = useState({
    resourceClaimRepository: null,
    resourceRepository: null,
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
        resourceRepository: new BackendV1ResourcesRepository({
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
