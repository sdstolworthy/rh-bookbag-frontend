import { BackendV1ResourceSerializer } from "../../serializers/resource/backendV1";

export class BackendV1ResourcesRepository {
  constructor({ backendBaseUrl }) {
    this.backendBaseUrl = backendBaseUrl;
  }
  backendBaseUrl;
  async getResources(resourcesFilter) {
    const resources = await fetch(`${this.backendBaseUrl}/api/resources`)
      .then((response) => {
        return response.json();
      })
      .then(({ results }) => {
        return results.map((result) =>
          BackendV1ResourceSerializer.serialize(result)
        );
      });
    return resources;
  }

  async modifyResourceState(resourceName, newState) {
    const resource = await fetch(
      `${this.backendBaseUrl}/api/resources/${resourceName}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: newState,
        }),
      }
    );
    return resource;
  }
}
