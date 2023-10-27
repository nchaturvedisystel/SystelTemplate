using Microsoft.AspNetCore.Mvc;

namespace CommonAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DocumentController(IWebHostEnvironment environment, IHttpContextAccessor httpContextAccessor)
        {
            _environment = environment;
            _httpContextAccessor = httpContextAccessor;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadDocument([FromForm] IFormFile file)
        {
            if (file == null || file.Length <= 0)
            {
                return BadRequest("Invalid file");
            }

            string YearStr = DateTime.Now.Year.ToString();
            string MonthStr = DateTime.Now.Month.ToString();
            string DayStr = DateTime.Now.Day.ToString();

            var baseUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host.Value}";
            string RootPath = (_environment.WebRootPath != null) ? _environment.WebRootPath : _environment.ContentRootPath;

            var uploadsFolder = Path.Combine(RootPath, $"CommonUploads\\{YearStr}\\{MonthStr}\\{DayStr}");
            var uploadPathUrl = (baseUrl+ $"/CommonUploads/{YearStr}/{MonthStr}/{DayStr}");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName.Replace(" ", "");
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);
            var filePathUrl = (uploadPathUrl+"/"+ uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Ok(new { filePathUrl });
        }
    }
}
