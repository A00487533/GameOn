using Microsoft.AspNetCore.Mvc;
using GameOn.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace GameOn.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly GameOnContext _context;

        public PostController(GameOnContext context)
        {
            _context = context;
        }

        // get all post
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetPostsByUser(int userId)
        {
            var posts = await _context.Posts
                .Where(p => p.UserID == userId)
                .ToListAsync();

            if (posts == null || !posts.Any())
            {
                return NotFound("No posts found for this user.");
            }

            return Ok(posts);
        }

        // create a post
        [HttpPost("create")]
        public async Task<IActionResult> CreateNewPost([FromBody] Post newPost)
        {
            if (newPost == null ||
                string.IsNullOrEmpty(newPost.SportName) ||
                newPost.Date == DateTime.MinValue ||
                newPost.FromTime == TimeSpan.Zero ||
                newPost.TillTime == TimeSpan.Zero ||
                string.IsNullOrEmpty(newPost.Location) ||
                string.IsNullOrEmpty(newPost.Description))
            {
                return BadRequest("Invalid post data. Please check all required fields.");
            }

            try
            {
                _context.Posts.Add(newPost);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Post created successfully!", PostID = newPost.PostID });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}