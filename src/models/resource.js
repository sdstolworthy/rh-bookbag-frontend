export class Resource {
  constructor({ current_state, provision_data, id }) {
    this.current_state = current_state;
    this.provision_data = provision_data;
    this.id = id;
  }
  current_state = "";
  provision_data = {};
  id = "";
}
