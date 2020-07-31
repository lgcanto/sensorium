using System;
using System.Collections.Generic;
using System.Linq;
using Sensorium.Data;
using Sensorium.Model.Entity;

namespace Sensorium.Repository
{
    public class SensorDataRepository
    {
        private PostgreDbContext context;

        public SensorDataRepository(PostgreDbContext _context)
        {
            context = _context;
        }

        public IEnumerable<SensorData> GetAll()
        {
            return context.SensorsData;
        }

        public IEnumerable<SensorData> GetAllNumeric()
        {
            decimal dummy;
            return context.SensorsData.ToList().Where(s => decimal.TryParse(s.Valor, out dummy));
        }

        public int GetCountByFilter(string filter)
        {
            return context.SensorsData.Where(s => s.Tag.Contains(filter)).Count();
        }

        public void Add(SensorData sensorData)
        {
            context.SensorsData.Add(sensorData);
            context.SaveChanges();
        }
    }
}