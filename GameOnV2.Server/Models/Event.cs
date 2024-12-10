namespace GameOnV2.Server.Models
{
    public class Event
    {
        public int EventID { get; set; }
        public string Description { get; set; }
        public int UserID { get; set; }

        // Navigation property
        public virtual User User { get; set; }
    }
}
