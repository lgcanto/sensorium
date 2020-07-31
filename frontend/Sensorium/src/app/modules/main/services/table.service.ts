import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject, timer, Subscription} from 'rxjs';

import {SensorData} from '../models/sensor-data';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortColumn, SortDirection} from '../directives/sortable.directive';
import { SensorDataService } from './sensor-data.service';

interface SearchResult {
  sensors: SensorData[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(sensors: SensorData[], column: SortColumn, direction: string): SensorData[] {
  if (direction === '' || column === '') {
    return sensors;
  } else {
    return [...sensors].sort((a, b) => {
      const res = compare(a[column].toString(), b[column].toString());
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(sensor: SensorData, term: string) {
  return sensor.timestamp.toString().includes(term.toLowerCase())
    || sensor.tag.includes(term)
    || sensor.valor.includes(term);
}

@Injectable({providedIn: 'root'})
export class TableService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _sensors$ = new BehaviorSubject<SensorData[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private requestIntervalInMs = 1000;
  private sensors: SensorData[] = [];
  private dataStream: Subscription;

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private sensorService: SensorDataService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._sensors$.next(result.sensors);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  startStream() {
    this.dataStream = timer(0, this.requestIntervalInMs).subscribe(() => {
      this.sensorService.getAll().subscribe(
        (result: SensorData[]) => {
          this.sensors = result;
        }
      );
    });
  }

  stopStream() {
    this.dataStream.unsubscribe();
  }

  get sensors$() { return this._sensors$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let sensors = sort(this.sensors, sortColumn, sortDirection);

    // 2. filter
    sensors = sensors.filter(sensor => matches(sensor, searchTerm));
    const total = sensors.length;

    // 3. paginate
    sensors = sensors.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({sensors, total});
  }
}