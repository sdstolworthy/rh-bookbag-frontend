import React, { useContext } from "react";
import { useCallback, useState } from "react";
import { RepositoryContext } from "./repository";

export const ResourceContext = React.createContext({
  getResources: (resourceClaimFilter) => {},
  resources: null,
});

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState(null);
  const repositoryContext = useContext(RepositoryContext);
  const getResources = useCallback(async () => {
    const claims = await repositoryContext?.resourceRepository?.getResources();
    setResources(claims);
  }, [repositoryContext]);
  return (
    <ResourceContext.Provider
      value={{
        getResources,
        resources,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};
