export class BackendV1ResourceClaimsRepository {
  async getResourceClaims(resourceClaimsFilter) {
    return Array.apply(null, new Array(10));
  }
  async deleteResourceClaim(claimNamespace, claimName) {
    console.log("DELETE");
    return;
  }
}
