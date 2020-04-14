export class BackendV1ResourceClaimsRepository {
  constructor({ backendBaseUrl }) {
    this.backendBaseUrl = backendBaseUrl;
  }
  backendBaseUrl;
  async getResourceClaims(resourceClaimsFilter) {
    const { results } = await fetch(
      `${this.backendBaseUrl}/api/resource_claims`
    ).then((response) => {
      return response.json();
    });
    return results;
  }
}
