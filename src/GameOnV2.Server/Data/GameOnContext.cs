using GameOnV2.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace GameOnV2.Server.Models
{
    public class GameOnContext : DbContext
    {
        public GameOnContext(DbContextOptions<GameOnContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<CreditCard> CreditCards { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Payment> Payment { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           

            // Configure User and Contact relationship with a unique constraint name
            modelBuilder.Entity<Contact>()
                .HasOne(c => c.User)
                .WithMany(u => u.Contacts)
                .HasForeignKey(c => c.UserID)
                .HasConstraintName("FK_Contacts_Users_UserID_Unique")
                .OnDelete(DeleteBehavior.Cascade);

            // Configure User and CreditCard relationship with a unique constraint name
            modelBuilder.Entity<CreditCard>()
                .HasOne(cc => cc.User)
                .WithMany(u => u.CreditCards)
                .HasForeignKey(cc => cc.UserID)
                .HasConstraintName("FK_CreditCards_Users_UserID_Unique")
                .OnDelete(DeleteBehavior.Cascade);


            // Configure User and Payment relationship with a unique constraint name
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany(u => u.Payments)
                .HasForeignKey(p => p.UserID)
                .HasConstraintName("FK_Payments_Users_UserID_Unique")
                .OnDelete(DeleteBehavior.Cascade);

            // Configure User and Post relationship with a unique constraint name
            modelBuilder.Entity<Post>()
                .HasOne(p => p.User)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.UserID)
                .HasConstraintName("FK_Posts_Users_UserID_Unique")
                .OnDelete(DeleteBehavior.Cascade);

            // Add other configurations as needed
        }

    }
}

