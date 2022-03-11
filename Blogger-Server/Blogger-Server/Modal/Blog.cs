using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Blogger_Server.Modal
{
    public class Blog
    {
        [Key]

        public int blog_id { get; set; }

        public string blog_title { get; set; }

        public string blog_details { get; set; }

        public int user_id { get; set; }
    }
}
