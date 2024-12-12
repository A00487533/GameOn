namespace GameOnV2.Server.Models
{
    public class Address
    {
        public int AddressID { get; set; }
        public int UserID { get; set; }
        public string StreetNumber { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }

        // Navigation property
        public virtual User User { get; set; }
    }
}
