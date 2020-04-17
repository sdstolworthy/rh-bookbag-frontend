export class ResourceClaim {
  constructor({ id, name, resources, namespace }) {
    this.id = id;
    this.name = name;
    this.resources = resources;
    this.namespace = namespace;
  }
  namespace = "";
  id = "";
  name = "";
  resources = [];
}
