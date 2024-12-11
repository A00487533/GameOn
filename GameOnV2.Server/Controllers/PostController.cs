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


    // POST: api/Post/create/post
    [HttpPost("create/post")]
    public async Task<ActionResult<Post>> CreatePost([FromBody] Post newPost)
    {
        // Check if the user exists
        var userExists = await _context.Users.AnyAsync(u => u.UserID == newPost.UserID);
        if (!userExists)
        {
            return NotFound(new { message = "User not found." });
        }


        // Add the new post to the database
        _context.Posts.Add(newPost);
        await _context.SaveChangesAsync();

        // Return the created post with a 201 status code
        return CreatedAtAction(nameof(CreatePost), new { id = newPost.Id }, newPost);
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
