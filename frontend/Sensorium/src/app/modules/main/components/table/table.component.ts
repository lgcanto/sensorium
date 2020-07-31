import { Component, ViewChildren, QueryList, OnInit, OnDestroy } from '@angular/core';
import { SensorData } from '../../models/sensor-data';
import { Observable } from 'rxjs';
import { SortEvent, NgbdSortableHeader } from '../../directives/sortable.directive';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  sensors$: Observable<SensorData[]>;
  total$: Observable<number>;

  constructor(private tableService: TableService) {
    this.sensors$ = tableService.sensors$;
    this.total$ = tableService.total$;
  }

  ngOnInit() {
    this.tableService.startStream();
  }

  ngOnDestroy() {
    this.tableService.stopStream();
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.tableService.sortColumn = column;
    this.tableService.sortDirection = direction;
  }
}
