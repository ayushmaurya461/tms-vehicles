import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlParamsService {

  constructor( private _activatedRoute: ActivatedRoute, private _router:Router ) { }

  getParam(name:string){
    // this._activatedRoute.queryParamMap.subscribe(
    //   (params: ParamMap) => {
    //     console.log(params);
    //   }
    // );
    // this._activatedRoute.queryParams.subscribe(
    //   params => {return params[name];}
    // );
    // this._activatedRoute.queryParams.subscribe(
    //   params => {console.log(params);}
    // );
    // return this._activatedRoute.snapshot.paramMap.get(name);
  }
  getAllParams(){
    this._activatedRoute.queryParams.subscribe(
      params => {return params;}
    );
    // return this._activatedRoute.snapshot.params

  }
}
