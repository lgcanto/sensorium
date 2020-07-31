namespace Sensorium.Model.DTO
{
    public class SensorDataDTO
    {
        public string Tag { get; set; }
        public int Timestamp { get; set; }
        public string Valor { get; set; }

        public SensorDataDTO() {}

        public SensorDataDTO(string tag, int timestamp, string valor) {
            Tag = tag;
            Timestamp = timestamp;
            Valor = valor;
        }
    }
}