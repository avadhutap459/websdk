namespace CustomerApi.Models
{
    public sealed class PremiumResponse
    {
        public decimal modalPremium { get; set; }
        public decimal tax { get; set; }
        public decimal sumAssured { get; set; }
        public decimal modalPremiumwithTax { get; set; }
        public decimal annualPremium { get; set; }
        public decimal totalAnnualPremium { get; set; }
        public decimal totalPremium { get; set; }
        public decimal totalTAX { get; set; }
        public decimal totalPremiumwithTax { get; set; }
        public string message { get; set; } = "";
        public string status { get; set; } = "";
        public long transactionId { get; set; }
    }
}
