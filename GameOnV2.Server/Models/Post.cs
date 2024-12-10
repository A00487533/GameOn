namespace GameOnV2.Server.Models
{
    public class Post
    {
        public int PostID { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public TimeSpan FromTime { get; set; }
        public TimeSpan TillTime { get; set; }
        public DateTime Date { get; set; }
        public string SportName { get; set; }
        public int UserID { get; set; }

        // Navigation property
        public virtual User User { get; set; }
    }
}
