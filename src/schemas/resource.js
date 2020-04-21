export class Resource {
  constructor({
    current_state,
    id,
    name = "",
    provision_data,
    provision_messages = [],
    resource_handle_name = "",
    governor = "",
  }) {
    this.current_state = current_state;
    this.provision_data = provision_data;
    this.id = id;
    this.name = name;
    this.resource_handle_name = resource_handle_name;
    this.provision_messages = provision_messages;
    this.governor = governor;
  }
  name = "";
  provision_messages = [];
  governor = "";
  current_state = "";
  provision_data = {};
  id = "";
  resource_handle_name = "";
}
