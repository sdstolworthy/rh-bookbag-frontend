import React, { useContext } from "react";
import { useCallback, useState } from "react";
import { RepositoryContext } from "./repository";

export const ResourceContext = React.createContext({
  getResources: async (resourceClaimFilter) => {},
  getResourceById: async (id) => {},
  resources: null,
});

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState(null);
  
  const repositoryContext = useContext(RepositoryContext);

  const getResources = useCallback(async () => {
    const claims = await repositoryContext?.resourceRepository?.getResources();
    setResources(claims);
  }, [repositoryContext]);

  const getResourceById = useCallback(
    async (id) => {
      const resource = await repositoryContext?.resourceRepository?.getResourceById(
        id
      );
      return resource;
    },
    [repositoryContext]
  );

  return (
    <ResourceContext.Provider
      value={{
        getResources,
        getResourceById,
        resources,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};
