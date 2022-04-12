using System;
using System.Collections.Generic;
using System.Text;

namespace CommonLibrary.Extensions
{
    public class StringHelper
    {
        public static string GenerateRandomString(int length)
        {
            const string src = "abcdefghijklmnopqrstuvwxyz0123456789";
            var sb = new StringBuilder();
            Random RNG = new Random();
            for (var i = 0; i < length; i++)
            {
                var c = src[RNG.Next(0, src.Length)];
                sb.Append(c);
            }
            return sb.ToString();
        }
    }
}
