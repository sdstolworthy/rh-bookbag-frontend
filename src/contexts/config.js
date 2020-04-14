import React, { createContext, useState, useCallback, useEffect } from "react";

export const ConfigContext = createContext({
  configuration: {},
  getConfiguration: () => {},
});

export const ConfigContextProvider = ({ children, configRepository }) => {
  const [config, setConfig] = useState(null);
  const getConfiguration = useCallback(async () => {
    const config = await configRepository.getConfiguration();
    setConfig(config);
  }, [setConfig, configRepository]);

  useEffect(() => {
    const configuration = configRepository.getConfiguration();
    getConfiguration(configuration);
  }, [getConfiguration, configRepository]);

  return (
    <ConfigContext.Provider
      value={{
        config,
        getConfiguration,
      }}
    >
      {config !== null ? children : null}
    </ConfigContext.Provider>
  );
};
