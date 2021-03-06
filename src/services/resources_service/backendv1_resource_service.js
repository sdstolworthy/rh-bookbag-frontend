import { BackendV1ResourceSerializer } from "../../serializers/resource/serializer_resource_backendv1";

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

  async dispatchAction(action, namespace, name) {
    const resource = await fetch(
      `${this.backendBaseUrl}/api/resources/dispatch/${namespace}/${name}/${action}`,
      { method: "GET" }
    );
    return resource;
  }

  async modifyResourceState(resourceName, newState) {
    const resource = await fetch(
      `${this.backendBaseUrl}/api/resources/modify/${resourceName}`,
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
