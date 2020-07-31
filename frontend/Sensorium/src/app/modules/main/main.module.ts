import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './main.component';
import { TableComponent } from './components/table/table.component';
import { GraphComponent } from './components/graph/graph.component';
import { SensorDataService } from './services/sensor-data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbdSortableHeader } from './directives/sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from './services/table.service';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    TableComponent,
    GraphComponent,
    NgbdSortableHeader
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    HttpClientModule,
    NgbModule,
    ChartsModule
  ],
  providers: [
    SensorDataService,
    TableService
  ]
})
export class MainModule { }
