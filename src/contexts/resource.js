import React, { useContext } from "react";
import { useCallback, useState } from "react";
import { RepositoryContext } from "./repository";

export const ResourceContext = React.createContext({
  getResources: async (resourceClaimFilter) => {},
  modifyResourceState: async (resourceName, newState) => {},
  resources: null,
  attemptRedelete: () => {},
});

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState(null);

  const repositoryContext = useContext(RepositoryContext);

  const getResources = useCallback(async () => {
    const fetchedResources = await repositoryContext?.resourceRepository?.getResources();
    setResources(fetchedResources);
  }, [repositoryContext]);

  const modifyResourceState = useCallback(
    async (resourceName, newState) => {
      await repositoryContext?.resourceRepository?.modifyResourceState(
        resourceName,
        newState
      );
      return;
    },
    [repositoryContext]
  );

  const attemptRedelete = useCallback(
    async (namespace, name) => {
      await repositoryContext?.resourceRepository?.dispatchAction(
        "destroy",
        namespace,
        name
      );
    },
    [repositoryContext]
  );

  return (
    <ResourceContext.Provider
      value={{
        getResources,
        resources,
        modifyResourceState,
        attemptRedelete,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};
