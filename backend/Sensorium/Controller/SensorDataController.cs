using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sensorium.Service;
using Sensorium.Model.DTO;

namespace Sensorium.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("SensoriumPolicy")]
    public class SensorDataController : ControllerBase
    {
        private SensorDataService service;
        private readonly ILogger<SensorDataController> logger;

        public SensorDataController(ILogger<SensorDataController> _logger, SensorDataService _service)
        {
            service = _service;
            logger = _logger;
        }

        [HttpGet]
        [Route("GetAll")]
        public IEnumerable<SensorDataDTO> GetAll()
        {
            return service.GetAll();
        }

        [HttpGet]
        [Route("GetAllNumeric")]
        public IEnumerable<SensorDataDTO> GetAllNumeric()
        {
            return service.GetAllNumeric();
        }

        [HttpGet]
        [Route("GetCountByFilter")]
        public int GetCountByFilter([FromQuery(Name = "filter")] string filter)
        {
            return service.GetCountByFilter(filter);
        }

        [HttpPost]
        [Route("Add")]
        public void Add([FromBody] SensorDataDTO sensorDataDTO)
        {
            service.Add(sensorDataDTO);
        }
    }
}
