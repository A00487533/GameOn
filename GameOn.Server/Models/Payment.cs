namespace GameOn.Server.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public int UserId { get; set; } // 外键关联到 User
        public string CardNumber { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string CVV { get; set; }
    }
}