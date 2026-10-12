using CustomerApi.Models;
using System.Text.Json;

namespace CustomerApi.Services
{
    public sealed class PremiumApiService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public PremiumApiService(
            HttpClient httpClient,
            IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<PremiumResponse> CalculatePremiumAsync(
            JsonElement request,
            CancellationToken cancellationToken = default)
        {
            var baseUrl = _configuration["PremiumApi:BaseUrl"];
            var path = _configuration["PremiumApi:CalculatePath"];

            if (string.IsNullOrWhiteSpace(baseUrl) ||
                string.IsNullOrWhiteSpace(path))
            {
                throw new InvalidOperationException(
                    "Premium API URL configuration is missing.");
            }

            var url = new Uri(
                new Uri(baseUrl),
                path.TrimStart('/'));

            using var response = await _httpClient.PostAsJsonAsync(
                url,
                request,
                cancellationToken);

            response.EnsureSuccessStatusCode();

            var result = await response.Content
                .ReadFromJsonAsync<PremiumResponse>(
                    cancellationToken: cancellationToken);

            return result ?? throw new InvalidOperationException(
                "The Premium API returned an empty response.");
        }
    }
}
