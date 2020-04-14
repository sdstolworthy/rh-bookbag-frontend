import React, { useContext } from "react";
import { useCallback, useState } from "react";
import { RepositoryContext } from "./repository";

export const ResourceClaims = React.createContext({
  getResourceClaims: (resourceClaimFilter) => {},
  resourceClaims: null,
});

export const ResourceClaimsProvider = ({ children }) => {
  const [resourceClaims, setResourceClaims] = useState(null);
  const repositoryContext = useContext(RepositoryContext);
  const getResourceClaims = useCallback(async () => {
    const claims = await repositoryContext?.resourceClaimRepository?.getResourceClaims();
    setResourceClaims(claims);
  }, [repositoryContext]);

  return (
    <ResourceClaims.Provider
      value={{
        getResourceClaims,
        resourceClaims,
      }}
    >
      {children}
    </ResourceClaims.Provider>
  );
};
