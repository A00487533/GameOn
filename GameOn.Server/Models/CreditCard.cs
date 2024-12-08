namespace GameOn.Server.Models
{
    public class CreditCard
    {
        public int CreditCardID { get; set; }
        public int UserID { get; set; }
        public string CreditCardNumber { get; set; }
        public string NameOnCreditCard { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string CVV { get; set; }

        // Navigation property
        public virtual User User { get; set; }
    }
}
