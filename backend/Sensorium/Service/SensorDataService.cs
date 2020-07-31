using System;
using System.Collections.Generic;
using System.Linq;
using Sensorium.Model.Entity;
using Sensorium.Model.DTO;
using Sensorium.Repository;

namespace Sensorium.Service
{
    public class SensorDataService
    {
        private SensorDataRepository repository;

        public SensorDataService(SensorDataRepository _repository)
        {
            repository = _repository;
        }

        public IEnumerable<SensorDataDTO> GetAll()
        {
            return buildDTOListFromEntityList(repository.GetAll());
        }

        public IEnumerable<SensorDataDTO> GetAllNumeric()
        {
            return buildDTOListFromEntityList(repository.GetAllNumeric());
        }

        public int GetCountByFilter(string filter)
        {
            return repository.GetCountByFilter(filter);
        }

        public void Add(SensorDataDTO sensorDataDTO)
        {
            SensorData sensorData = buildEntityFromDTO(sensorDataDTO);
            repository.Add(sensorData);
        }

        private SensorData buildEntityFromDTO(SensorDataDTO sensorDataDTO) {
            SensorData sensorData = new SensorData(
                sensorDataDTO.Tag,
                sensorDataDTO.Timestamp,
                sensorDataDTO.Valor
            );
            return sensorData;
        }

        private IEnumerable<SensorDataDTO> buildDTOListFromEntityList(IEnumerable<SensorData> sensorDataList) {
            IEnumerable<SensorDataDTO> sensorDataDTOList = sensorDataList.Select(
                s => new SensorDataDTO(s.Tag, s.Timestamp, s.Valor)
            );
            return sensorDataDTOList;
        }
    }
}