export class ResourceClaim {
  constructor({ id, name, resources }) {
    this.id = id;
    this.name = name;
    this.resources = resources;
  }
  id = "";
  name = "";
  resources = [];
}
