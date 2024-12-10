using Microsoft.JSInterop.Infrastructure;
using System;
using System.Collections.Generic;

namespace GameOnV2.Server.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Email { get; set; } = null!; // Required
        public string Username { get; set; } = null!; // Required
        public string Password { get; set; } = null!; // Required

        public string? FirstName { get; set; } // Optional
        public string? LastName { get; set; } // Optional

        // Navigation properties
        public virtual ICollection<Address>? Addresses { get; set; } // Optional
        public virtual ICollection<Contact>? Contacts { get; set; } // Optional
        public virtual ICollection<Subscription>? Subscriptions { get; set; } // Optional
        public virtual ICollection<Event>? Events { get; set; } // Optional
        public virtual ICollection<CreditCard>? CreditCards { get; set; } // Optional
        public virtual ICollection<Post>? Posts { get; set; } // Optional
    }
}
