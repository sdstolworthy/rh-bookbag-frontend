import { Configuration } from "../../schemas/configuration";

export class StaticConfigurationRepository {
  async getConfiguration() {
    return new Configuration({ backendBaseUrl: "http://localhost:5000" });
  }
}
