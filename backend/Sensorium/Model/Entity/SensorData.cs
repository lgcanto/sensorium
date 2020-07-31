namespace Sensorium.Model.Entity
{
    public class SensorData
    {
        public int SensorDataId { get; set; }
        public string Tag { get; set; }
        public int Timestamp { get; set; }
        public string Valor { get; set; }

        public SensorData(string tag, int timestamp, string valor) {
            Tag = tag;
            Timestamp = timestamp;
            Valor = valor;
        }
    }
}