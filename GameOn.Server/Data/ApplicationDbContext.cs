using Microsoft.EntityFrameworkCore;

namespace GameOn.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // 定义数据表
        // 数据表定义
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Listing> Listings { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Favorite> Favorites { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // 配置外键和约束
            modelBuilder.Entity<Event>()
                .HasOne(e => e.CreatedByUser)
                .WithMany(u => u.Events)
                .HasForeignKey(e => e.CreatedBy);

            modelBuilder.Entity<Listing>()
                .HasOne(l => l.Event)
                .WithMany(e => e.Listings)
                .HasForeignKey(l => l.EventId);

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.User)
                .WithMany(u => u.Favorites)
                .HasForeignKey(f => f.UserId);

            modelBuilder.Entity<Favorite>()
                .HasOne(f => f.Event)
                .WithMany()
                .HasForeignKey(f => f.EventId);

            base.OnModelCreating(modelBuilder);
        }
    }
}

// 实体类定义
public class User
{
    public int UserId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Address { get; set; }
    public string PhoneNumber { get; set; }
    public ICollection<Event> Events { get; set; }
    public ICollection<Favorite> Favorites { get; set; }
}

public class Event
{
    public int EventId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan Time { get; set; }
    public string Location { get; set; }
    public int CreatedBy { get; set; }
    public User CreatedByUser { get; set; }
    public ICollection<Listing> Listings { get; set; }
}

public class Listing
{
    public int ListingId { get; set; }
    public int EventId { get; set; }
    public Event Event { get; set; }
    public string ImageUrl { get; set; }
    public string Description { get; set; }
}

public class Payment
{
    public int PaymentId { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public string CardNumber { get; set; }
    public DateTime ExpirationDate { get; set; }
    public string CVV { get; set; }
}

public class Favorite
{
    public int FavoriteId { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public int EventId { get; set; }
    public Event Event { get; set; }
}