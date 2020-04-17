import { Resource } from "../../models/resource";

export class BackendV1ResourceSerializer {
  static serialize(map) {
    return new Resource({
      current_state: map["current_state"],
      id: map["id"],
      governor: map["governor"],
      provision_data: map["provision_data"],
      provision_messages: map["provision_messages"],
      resource_handle_name: map["resource_handle_name"],
    });
  }
}
