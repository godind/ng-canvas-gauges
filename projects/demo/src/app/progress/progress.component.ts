import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { RadialGauge } from 'ng-canvas-gauges';

/**
 * Progress indicator based on customize radial gauge.
 * Dyamically updates the progress text.
 */
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html'
})
export class ProgressComponent implements OnInit, AfterViewInit {

  @ViewChild('progress_gauge', { static: true })
  private radialGauge: RadialGauge;

  public value$: Observable<number>;

  constructor() {
  }

  public ngOnInit() {
  }

  public ngAfterViewInit() {
    this.radialGauge.update({ colorBarProgress: 'rgba(0,200,200,.75)' });

    // update both the gauge value and valueText every 200 ms.
    this.value$ = interval(100).pipe(
      map(i => i % 101), // Limit the numbers to a range from 0 to 100
      tap(i => this.radialGauge.update( { valueText: i } ))
    );
  }

}
