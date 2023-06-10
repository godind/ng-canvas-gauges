import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { VechicleSimService } from '../vechiclesim.service';
import { RadialGauge } from 'projects/ng-canvas-gauges/src/lib/radial-gauge';

/**
 * Tachometer gauge
 * Demonstrates directly updating the gaugle's value.
 */
@Component({
  selector: 'app-tachometer',
  templateUrl: './tachometer.component.html'
})
export class TachometerComponent implements OnInit, AfterViewInit {

  @ViewChild('tachometer', { static: true })
  private tachometer: RadialGauge;


  constructor(private simService: VechicleSimService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // directly update the gauge's value property
    this.simService.rpm$.subscribe(
      rpm => this.tachometer.value = rpm);
  }

}
