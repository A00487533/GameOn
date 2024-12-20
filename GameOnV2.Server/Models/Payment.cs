﻿using System;
using System.Text.Json.Serialization;

namespace GameOnV2.Server.Models
{
    public class Payment
    {
        public int PaymentID { get; set; }

        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string CountryCode { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string CreditCardType { get; set; }
        public string CreditCardNumber { get; set; }
        public string ExpirationDate { get; set; }
        public string CardHolderName { get; set; }

        // Foreign key reference to the User
        public int UserID { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
