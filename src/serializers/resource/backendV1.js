import { Resource } from "../../models/resource";

export class BackendV1ResourceSerializer {
  static serialize(map) {
    return new Resource({
      current_state: map["current_state"],
      id: map["id"],
      resources: map["provision_data"],
    });
  }
}
