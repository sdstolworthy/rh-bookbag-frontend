import { Resource } from "../../schemas/resource";

export class BackendV1ResourceSerializer {
  static serialize(map) {
    return new Resource({
      current_state: map["current_state"],
      id: map["id"],
      name: map["name"],
      governor: map["governor"],
      job_vars: map["job_vars"],
      tower_jobs: map["tower_jobs"],
      provision_data: map["provision_data"],
      provision_messages: map["provision_messages"],
      resource_handle_name: map["resource_handle_name"],
    });
  }
}
