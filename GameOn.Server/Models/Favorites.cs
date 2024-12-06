namespace GameOn.Server.Models
{
    public class Favorites
    {
        public int FavoritesId { get; set; } // 主键
        public int UserId { get; set; } // 外键，关联到 User
        public int ListingId { get; set; } // 外键，关联到 Listing

        // 导航属性
        public User User { get; set; }
        public Listing Listing { get; set; }
    }
}