import { Configuration } from "../../models/configuration";

export class StaticConfigurationRepository {
  async getConfiguration() {
    return new Configuration({ backendBaseUrl: "http://localhost:5000" });
  }
}
