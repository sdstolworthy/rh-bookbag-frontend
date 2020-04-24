import React, { useContext } from "react";
import { useCallback, useState } from "react";
import { RepositoryContext } from "./repository";

export const ResourceClaimsContext = React.createContext({
  getResourceClaims: (resourceClaimFilter) => {},
  resourceClaims: null,
  deleteResourceClaim: () => {},
});

export const ResourceClaimsProvider = ({ children }) => {
  const [resourceClaims, setResourceClaims] = useState(null);
  const repositoryContext = useContext(RepositoryContext);
  const getResourceClaims = useCallback(async () => {
    const claims = await repositoryContext?.resourceClaimRepository?.getResourceClaims();
    setResourceClaims(claims);
  }, [repositoryContext]);

  const deleteResourceClaim = useCallback(
    async (claimNamespace, claimName) => {
      repositoryContext.resourceClaimRepository.deleteResourceClaim(
        claimNamespace,
        claimName
      );
    },
    [repositoryContext]
  );

  return (
    <ResourceClaimsContext.Provider
      value={{
        getResourceClaims,
        resourceClaims,
        deleteResourceClaim,
      }}
    >
      {children}
    </ResourceClaimsContext.Provider>
  );
};
