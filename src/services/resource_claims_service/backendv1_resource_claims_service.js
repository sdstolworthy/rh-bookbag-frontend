import { BackendV1ResourceClaimSerializer } from "../../serializers/resource_claims/serializer_resource_claim_backend_v1";

export class BackendV1ResourceClaimsRepository {
  constructor({ backendBaseUrl }) {
    this.backendBaseUrl = backendBaseUrl;
  }
  backendBaseUrl;
  async getResourceClaims(resourceClaimsFilter) {
    const resourceClaims = await fetch(
      `${this.backendBaseUrl}/api/resource_claims`
    )
      .then((response) => {
        return response.json();
      })
      .then(({ results }) => {
        return results.map((result) =>
          BackendV1ResourceClaimSerializer.serialize(result)
        );
      });
    return resourceClaims;
  }

  async deleteResourceClaim(claimNamespace, claimName) {
    await fetch(
      `${this.backendBaseUrl}/api/resource_claims/${claimNamespace}/${claimName}`,
      {
        method: "DELETE",
      }
    );
  }
}
