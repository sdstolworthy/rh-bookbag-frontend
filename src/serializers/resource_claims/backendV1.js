import { ResourceClaim } from "../../models/resource_claim";
import { BackendV1ResourceSerializer } from "../resource/backendV1";

export class BackendV1ResourceClaimSerializer {
  static serialize(map) {
    return new ResourceClaim({
      name: map["name"],
      id: map["id"],
      namespace: map["namespace"],
      resources: (map["resources"] ?? []).map((resource) => {
        return BackendV1ResourceSerializer.serialize(resource);
      }),
    });
  }
}
