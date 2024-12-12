using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace GameOnV2.Server.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

        // Navigation properties
        public virtual ICollection<Address> Addresses { get; set; }
        public virtual ICollection<Contact> Contacts { get; set; }  // Correct definition for Contacts
        public virtual ICollection<Subscription> Subscriptions { get; set; }
        public virtual ICollection<CreditCard> CreditCards { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }

        // Constructor
        public User()
        {
            Addresses = new List<Address>();
            Contacts = new List<Contact>();
            Subscriptions = new List<Subscription>();
            CreditCards = new List<CreditCard>();
            Posts = new List<Post>();
        }
    }
}
