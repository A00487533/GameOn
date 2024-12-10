namespace GameOnV2.Server.Models
{
    public class Subscription
    {
        public int SubscriptionID { get; set; }
        public int UserID { get; set; }
        public string SubscriptionType { get; set; } = "No Subscription";
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        // Navigation property
        public virtual User User { get; set; }
    }
}
