using Microsoft.AspNetCore.Mvc;
using GameOnV2.Server.Models;
using BCrypt.Net;

namespace GameOn.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly GameOnContext _context;

        public UserController(GameOnContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public IActionResult CreateAccount([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the email or username already exists
            var existingUser = _context.Users.FirstOrDefault(u => u.Email == user.Email || u.Username == user.Username);
            if (existingUser != null)
            {
                return Conflict(new { message = "Email or Username already exists" });
            }

            // Hash password before saving
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetUserById), new { id = user.UserID }, user);
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] EmailLoginRequest request)
        {
            // Find the user by email
            var user = _context.Users.FirstOrDefault(u => u.Email == request.email);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            // Verify the password
            if (!BCrypt.Net.BCrypt.Verify(request.password, user.Password))
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            return Ok(new { message = "Login successful", user });
        }
    }

    // DTO for login request with email
    public class EmailLoginRequest
    {
        public string email { get; set; }
        public string password { get; set; }
    }
}
