using GameOnV2.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Nodes;

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
                p.Date1,
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


    // POST: api/Post/create/post
    [HttpPost("create/post")]
    public async Task<ActionResult<Post>> CreatePost([FromBody] Post newPost)
    {
        if (newPost == null)
        {
            return BadRequest(new { message = "Post data is missing or invalid." });
        }

        // Validate required fields in the post
        if (string.IsNullOrWhiteSpace(newPost.SportName) || string.IsNullOrWhiteSpace(newPost.Location) || newPost.Date1 == null)
        {
            return BadRequest(new { message = "Required fields are missing: SportName, Location, or Date." });
        }

        // Check if the user exists
        var user = await _context.Users.FirstOrDefaultAsync(u => u.UserID == newPost.UserID);
        if (user == null)
        {
            return NotFound(new { message = "User not found." });
        }

        try
        {
            // Optional: Attach the user explicitly if it's part of the Post model
            newPost.User = user;

            // Add the new post to the database
            _context.Posts.Add(newPost);
            await _context.SaveChangesAsync();

            // Return the created post with a 201 status code
            return CreatedAtAction(nameof(CreatePost), new { id = newPost.Id }, newPost);
        }
        catch (Exception ex)
        {
            // Log the error for debugging purposes
            Console.WriteLine($"Error while creating a post: {ex.Message}");
            return StatusCode(500, new { message = "An error occurred while creating the post." });
        }
    }



    // GET: api/posts/filter?location={location}&sportName={sportName}&fromDate={fromDate}
    [HttpGet("filter")]
    public async Task<ActionResult<IEnumerable<Post>>> GetFilteredPosts(
        string location, string sportName, DateTime fromDate)
    {
        var query = _context.Posts.AsQueryable();

        // Filter by location
        if (!string.IsNullOrEmpty(location))
        {
            query = query.Where(p => p.Location.ToLower() == location.ToLower());
        }

        // Filter by sport name
        if (!string.IsNullOrEmpty(sportName))
        {
            query = query.Where(p => p.SportName.ToLower() == sportName.ToLower());
        }

        // Filter by from date (assuming Date1 property represents the start date)
        if (fromDate != default)
        {
            query = query.Where(p => p.Date1 >= fromDate);
        }

        var filteredPosts = await query.ToListAsync();

        if (!filteredPosts.Any())
        {
            return NotFound(new { message = "No posts found matching the filter criteria." });
        }

        return Ok(filteredPosts);
    }

    [HttpPut("Post/edit")]
    public async Task<ActionResult<Post>> EditPost([FromBody] UpdatePostRequest request)
    {
        // Check if the post exists
        var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == request.PostID);
        if (post == null)
        {
            return NotFound(new { message = "Post not found." });
        }

        // Update post properties
        post.Description = request.Description ?? post.Description;
        post.Location = request.Location ?? post.Location;
        post.FromTime = request.FromTime != default ? request.FromTime : post.FromTime;
        post.TillTime = request.TillTime != default ? request.TillTime : post.TillTime;
        post.SportName = request.SportName ?? post.SportName;

        // Save changes
        await _context.SaveChangesAsync();

        return Ok(post);
    }



    // DELETE: api/posts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post == null)
        {
            return NotFound();
        }

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PostExists(int id)
    {
        return _context.Posts.Any(e => e.Id == id);
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
