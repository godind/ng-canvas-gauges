/// <reference path="../node_modules/@types/canvas-gauges/index.d.ts" />

import {Component, ViewChild, Input, NgZone, ElementRef, OnInit} from '@angular/core';
import * as CanvasGauges from 'canvas-gauges';

/**
 * Base gauge component for the Gauges rendering
 * T - Type of the Gauge you want to be rendered (Currently RadialGauge, LinearGauge from the original library)
 * T2 - Type of the options used within the particular gauge (RadialGaugeOptions, LinearGaugeOptions)
 */
export abstract class BaseGauge<T extends CanvasGauges.BaseGauge, T2 extends CanvasGauges.GenericOptions> implements OnInit {
    /**
     * Canvas element on the template used by the library to draw gauge element
     */
    @ViewChild('gauge') canvas: ElementRef; 
    /**
     * Gauge options for rendering
     */
    @Input() options: T2;
    /**
     * Stores gauge object which performs initial rendering and draws updates on the canvas. 
     * Shoulbe initialized in the child classes inside the ngOnInit implementation
     */
    gauge: T;
    
    /**
     * 
     * @param el - reference to the element of the whole component, used to scrape options declared on the component itself
     * @param zone - required to redraw gauge outside of Angular, due to animation lags caused by the ovewritten function of the ngZone
     */
    constructor(private el: ElementRef, public zone: NgZone) {
    }

    /**
     * Should contain instantiation of the Gauge object in the child component
     */
    abstract ngOnInit()

    /**
     * Returns options provided to the Gauge in a single object 
     */
    getOptions() {
        this.options = Object.assign(this.options || {} as T2, {
            renderTo: this.canvas.nativeElement
        });

        for(let attr of this.el.nativeElement.attributes){
            this.options[
                attr.name
                    .split(/-/)
                    .map((part: string, i: number) => 
                        i > 0 ? 
                            part.charAt(0).toUpperCase() + part.substr(1) :
                            part
                    )
                    .join('')
            ] = attr.value;
        }

        return this.options;
    }

    /**
     * Performs animation redraw if the options were changed by the parent component
     */
    ngAfterViewChecked() {
        let props = this.getOptions();
        if (typeof props.value !== 'undefined') { 
            this.zone.runOutsideAngular(() => {
                this.gauge.value = props.value;
            });

            delete props.value;
        }

        this.gauge.update(props);
    }
}