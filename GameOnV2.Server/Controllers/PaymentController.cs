using Microsoft.AspNetCore.Mvc;
using GameOnV2.Server.Models;
using System.Linq;

namespace GameOn.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly GameOnContext _context;

        public PaymentController(GameOnContext context)
        {
            _context = context;
        }

        [HttpPost("submit")]
        public IActionResult SubmitPayment([FromBody] PaymentRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find the user by email
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Create a new payment record
            var payment = new Payment
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Address = request.Address,
                City = request.City,
                Province = request.Province,
                Country = request.Country,
                PostalCode = request.PostalCode,
                CountryCode = request.CountryCode,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                CreditCardType = request.CreditCardType,
                CreditCardNumber = request.CreditCardNumber,
                ExpirationDate = request.ExpirationDate,
                CardHolderName = request.CardHolderName,
                UserID = user.UserID
            };

            // Save payment details to the database
            _context.Payments.Add(payment);
            _context.SaveChanges();

            return Ok(new { message = "Payment details submitted successfully", payment });
        }
    }

    // DTO for payment request
    public class PaymentRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string CountryCode { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string CreditCardType { get; set; }
        public string CreditCardNumber { get; set; }
        public string ExpirationDate { get; set; }
        public string CardHolderName { get; set; }
    }
}
