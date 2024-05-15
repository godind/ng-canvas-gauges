import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VechicleSimService } from '../vechiclesim.service';

/**
 * A fuel gauge with range F-E.
 * The gauge's element attribute "value" is bound to the component
 * value$ property.
 */
@Component({
  selector: 'app-fuelgauge',
  templateUrl: './fuelgauge.component.html'
})
export class FuelgaugeComponent implements OnInit, AfterViewInit {

  public value$: Observable<number>;

  constructor(private simService: VechicleSimService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.value$ = this.simService.fuel$;
  }
}
