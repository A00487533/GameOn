﻿using GameOnV2.Server.Models;

public class Post
{
    public int Id { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public DateTime FromTime { get; set; }
    public DateTime TillTime { get; set; }
    public DateTime Date1 { get; set; }
    public string SportName { get; set; }
    public int UserID { get; set; }  // Assuming each post is associated with a user
    public User? User { get; set; }  // Assuming there's a User model
}
