using Blogger_Server.Data;
using Blogger_Server.Modal;
using Blogger_Server.ViewModal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Blogger_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context)
        {

            _context = context;
        }


        [HttpGet("bloglist")]
        public async Task<ActionResult<IEnumerable<AllRecords>>> Getstores()
        {
            var join = await (from a in _context.users
                              join b in _context.blogs
                              on a.user_id equals b.user_id
                              select new
                              {
                                  a.user_id,
                                  a.first_name,
                                  a.last_name,
                                  b.blog_id,
                                  b.blog_title,
                                  b.blog_details
                              }).ToListAsync();
            return Ok(join);
        }


        [HttpGet("blog/{blog_id}")]
        public async Task<ActionResult<Blog>> GetUser(int blog_id)
        {
            var user = await _context.blogs.FindAsync(blog_id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("getblogbyid/{user_id}")]
        public async Task<ActionResult<IEnumerable<AllRecords>>> GetBlogById(int user_id)
        {
            var final = await _context.blogs.Where(x => x.user_id == user_id).ToListAsync();
            return Ok(final);
        }


        [HttpGet("user/{user_id}")]
        public async Task<ActionResult<Blog>> GetUserDetais(int user_id)
        {
            var user = await _context.blogs.Where(x=>x.user_id == user_id).ToListAsync();

            //var join = await (from a in _context.users
            //                  join b in _context.blogs
            //                  on a.user_id equals b.user_id
            //                  select new
            //                  {
            //                      a.user_id,
            //                      a.first_name,
            //                      a.last_name,
            //                      b.blog_id,
            //                      b.blog_title,
            //                      b.blog_details
            //                  }).ToListAsync();


            if (user.Count == 0)
            {
                return NotFound();
            }

            return Ok(user);
        }
        
        [HttpPost]
        public async Task<ActionResult<Users>> newUser(Users newUser)
        {
            _context.users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok("Success! User Created Successfully");
        }


        [HttpPost("createbolgpost")]
        public async Task<ActionResult<Blog>> newUser(Blog newblog)
        {
            _context.blogs.Add(newblog);
            await _context.SaveChangesAsync();

            return Ok("Success! Blog Created Successfully");
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<loginVM>> loginuser(loginVM login)
        {
           if(login.email == ""  || login.password == "")
            {
                return BadRequest();
            }
            var result = await _context.users.Where(x => x.email == login.email && x.password == login.password).ToListAsync();
            if (result.Count == 0)
            {
                return BadRequest("Invalid Login Attempt");
            }
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest("Invalid Login Attempt");
        }

        [HttpPut("blog/{blog_id}")]
        public async Task<IActionResult> PutUser(int blog_id, Blog userPut)
        {
            if (blog_id != userPut.blog_id)
            {
                return BadRequest();
            }

            _context.Entry(userPut).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(blog_id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("blog/{blog_id}")]
        public async Task<ActionResult<Blog>> DeleteUser(int blog_id)
        {
            var blogdelete = await _context.blogs.FindAsync(blog_id);
            if (blogdelete == null)
            {
                return NotFound();
            }

            _context.blogs.Remove(blogdelete);
            await _context.SaveChangesAsync();

            return blogdelete;
        }

        private bool UserExists(int blog_id)
        {
            return _context.blogs.Any(e => e.blog_id == blog_id);
        }

    }
}
