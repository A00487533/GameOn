namespace GameOn.Server.Models
{
    public class Listing
    {
        public int ListingId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int UserId { get; set; } // 外键关联到 User
    }
}