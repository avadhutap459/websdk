using CustomerApi.Models;
using CustomerApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CustomerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PremiumController : ControllerBase
    {
        private readonly PremiumApiService _premiumApiService;
        private readonly ILogger<PremiumController> _logger;

        public PremiumController(
            PremiumApiService premiumApiService,
            ILogger<PremiumController> logger)
        {
            _premiumApiService = premiumApiService;
            _logger = logger;
        }

        [HttpPost("calculate")]
        public IActionResult Calculate(
            [FromBody] JsonElement request)
        {
            try
            {
                var result = new PremiumResponse
                {
                    modalPremium = (decimal)500.31,
                    tax = (decimal)50.03,
                    sumAssured = (decimal)10000.00,
                    modalPremiumwithTax = (decimal)550.34,
                    annualPremium = (decimal)6000.00,
                    totalAnnualPremium = (decimal)6000.00,
                    totalPremium = (decimal)6000.00,
                    totalTAX = (decimal)50.03,
                    totalPremiumwithTax = (decimal)6050.03,
                    message = "",
                    status = "",
                    transactionId = 1234567890
                };
                  //  await _premiumApiService.CalculatePremiumAsync(
                  //     request,
                  //    cancellationToken);

                return Ok(result);
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(
                    ex, "External Premium API request failed.");

                return StatusCode(
                    StatusCodes.Status502BadGateway,
                    new { message = "The Premium API request failed." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Premium calculation failed.");

                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    new { message = "Premium calculation failed." });
            }
        }
    }
}
