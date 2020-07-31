using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Sensorium.Model.Entity;

namespace Sensorium.Data
{
    public class PostgreDbContext : DbContext
    {
        public PostgreDbContext(DbContextOptions options) :
            base(options) { }

        public DbSet<SensorData> SensorsData { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=sedb;Database=postgres;Username=postgres;Password=1234");
    }    
}