namespace GameOnV2.Server.Models
{
    public class Contact
    {
        public int ContactID { get; set; }
        public int UserID { get; set; }
        public string PhoneNumber { get; set; }

        // Navigation property
        public virtual User User { get; set; }
    }
}
