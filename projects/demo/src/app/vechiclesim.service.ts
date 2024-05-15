import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VechicleSimService {

  // tslint:disable-next-line: variable-name
  private _speed$: Observable<number>;
  // tslint:disable-next-line: variable-name
  private _rpm$: Observable<number>;
  // tslint:disable-next-line: variable-name
  private _fuel$: Observable<number>;
  // tslint:disable-next-line: variable-name
  private _compass$: Observable<number>;

  constructor() {
  }

  public get speed$() {
    if (!this._speed$) {
      this._speed$ = interval(250).pipe(
        map(() => Math.random() * 220)
      );
      console.log('speed init');
    }
    return this._speed$;
  }

  public get rpm$() {
    if (!this._rpm$) {
      this._rpm$ = interval(250).pipe(
        map(() => Math.random() * 12000)
      );
    }
    return this._rpm$;
  }

  public get fuel$() {
    if (!this._fuel$) {
      this._fuel$ = interval(100).pipe(
      map( (i) => 100 - i % 101)
    );
    }
    return this._fuel$;
  }

  public get compass$() {
    if (!this._compass$) {
      this._compass$ = interval(250).pipe(
      map( (i) => Math.random() * 360)
    );
    }
    return this._compass$;
  }


}
