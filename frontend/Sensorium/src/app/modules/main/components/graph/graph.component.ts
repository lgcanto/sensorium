import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { timer, Subscription } from 'rxjs';
import { SensorData } from '../../models/sensor-data';
import { SensorDataService } from '../../services/sensor-data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: false,
    animation: { duration: 0 }
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
  public dataStream: Subscription;

  public requestIntervalInMs = 1000;

  constructor(private sensorService: SensorDataService) { }

  ngOnInit() {
    this.dataStream = timer(0, this.requestIntervalInMs).subscribe(() => {
      this.sensorService.getAllNumeric().subscribe(
        (sensors: SensorData[]) => {
          this.updateChart(sensors);
        }
      );
    })
  }

  ngOnDestroy() {
    this.dataStream.unsubscribe();
  }

  updateChart(sensors: SensorData[]) {
    let uniqueTimestamps = sensors.map(s => s.timestamp)
                                  .filter((timestamp, index, timestamps) => timestamps.indexOf(timestamp) === index)
                                  .sort();
    let uniqueTags = sensors.map(s => s.tag)
                            .filter((tag, index, tags) => tags.indexOf(tag) === index)
                            .sort();

    let stringUniqueTimestamps = uniqueTimestamps.map(t => (new Date(t * 1000)).toUTCString());
    this.lineChartLabels = stringUniqueTimestamps;

    // Maybe there's an optmization for this
    this.lineChartData = [];
    for (let tagIndex = 0; tagIndex < uniqueTags.length; tagIndex++) {
      const tag = uniqueTags[tagIndex];
      const tagSensorData = sensors.filter(s => s.tag === tag);
      this.lineChartData.push({ data: [], label: tag, fill: false });

      for (let tsIndex = 0; tsIndex < uniqueTimestamps.length; tsIndex++) {
        const ts = uniqueTimestamps[tsIndex];
        const sensorDataList = tagSensorData.filter(s => s.timestamp === ts);
        if (sensorDataList.length > 0) {
          let sensorData = sensorDataList[0];
          this.lineChartData[tagIndex].data.push(parseFloat(sensorData.valor));
        }
        else {
          this.lineChartData[tagIndex].data.push(parseFloat(null));
        }
      }
    }
  }
}
