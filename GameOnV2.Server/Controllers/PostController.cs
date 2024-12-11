using GameOnV2.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class PostsController : ControllerBase
{
    private readonly GameOnContext _context;

    public PostsController(GameOnContext context)
    {
        _context = context;
    }

    // GET: api/posts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetPosts()
    {
        var postsWithUsernames = await _context.Posts
            .Include(p => p.User)
            .Select(p => new
            {
                p.Id,
                p.Description,
                p.Location,
                p.FromTime,
                p.TillTime,
                p.Date,
                p.SportName,
                p.UserID,
                Username = p.User.Username
            })
            .ToListAsync();

        return Ok(postsWithUsernames);
    }

    // POST: api/Post/User
    [HttpPost("retrieve")]
    public async Task<ActionResult<IEnumerable<Post>>> GetPostsByUserId([FromBody] UserRequest request)
    {
        // Check if the user exists
        var userExists = await _context.Users.AnyAsync(u => u.UserID == request.UserId);
        if (!userExists)
        {
            return NotFound(new { message = "User not found." });
        }

        // Retrieve posts for the specified user
        var posts = await _context.Posts
            .Where(p => p.UserID == request.UserId)
            .ToListAsync();

        if (posts == null || !posts.Any())
        {
            return NotFound(new { message = "No posts found for the specified user." });
        }

        return Ok(posts);
    }


}

public class UserRequest
{
    public int UserId { get; set; }
}

public class UpdatePostRequest
{
    public int PostID { get; set; }
    public string Description { get; set; }
    public string Location { get; set; }
    public DateTime FromTime { get; set; }
    public DateTime TillTime { get; set; }
    public string SportName { get; set; }
}
