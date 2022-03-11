using Blogger_Server.Modal;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Blogger_Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
                  : base(options)
        {
        }

        public DbSet<Users> users { get; set; }

        public DbSet<Blog> blogs { get; set; }
    }
}
