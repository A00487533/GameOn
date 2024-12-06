using Microsoft.AspNetCore.Mvc;
using GameOn.Server.Data;
using GameOn.Server.Models;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace GameOn.Server.Controllers
{
    [ApiController]
    [Route("api/payments")]
    [Authorize]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> AddPayment([FromBody] Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return Ok(payment);
        }
    }
}