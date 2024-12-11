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
