export class Resource {
  constructor({
    current_state,
    id,
    name = "",
    provision_data,
    provision_messages = [],
    resource_handle_name = "",
    governor = "",
    jobVars = {},
    tower_jobs = [],
  }) {
    this.current_state = current_state;
    this.provision_data = provision_data;
    this.id = id;
    this.name = name;
    this.resource_handle_name = resource_handle_name;
    this.provision_messages = provision_messages;
    this.governor = governor;
    this.job_vars = jobVars;
    this.tower_jobs = tower_jobs;
  }
  name = "";
  job_vars = {};
  tower_jobs = [];
  provision_messages = [];
  governor = "";
  current_state = "";
  provision_data = {};
  id = "";
  resource_handle_name = "";
}
