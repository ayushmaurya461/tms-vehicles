import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from '../libraray/user.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public token: string = '';
  public companyCode: string = '';
  public baseURL: string = environment.apiURL;
  public headers: any;

  constructor(private http: HttpClient, public userService: UserService) {}

  ngOnInit() {}

  getHeaders() {
    let headers = {
      Authorization: 'Bearer ' + this.userService.token,
      'Company-Code': this.userService.companyCode,
      // 'Sub-Company-Code': this.userService.subCompanyCode,
    };
    return headers;
  }

  authenticate(body: any) {
    return this.http.post<any>(this.baseURL + 'login', body);
  }

  getRequestWithHeaders(url: string) {
    return this.http.get<any>(this.baseURL + url, {
      headers: this.getHeaders(),
    });
  }

  postRequest(url: string, body: any = {}) {
    return this.http.post<any>(this.baseURL + url, body);
  }

  postRequestWithHeaders(url: string, body: any = {}) {
    return this.http.post<any>(this.baseURL + url, body, {
      headers: this.getHeaders(),
    });
  }

  getCompanyTypeList() {
    return this.http.get<any>(this.baseURL + 'company-type-list', {
      headers: this.getHeaders(),
    });
  }

  getCountriesList() {
    return this.http.get<any>(this.baseURL + 'country-list', {
      headers: this.getHeaders(),
    });
  }
  getStateList(country: string) {
    let body = {
      country_id: country,
    };
    return this.http.post<any>(this.baseURL + 'state-list-by-country', body, {
      headers: this.getHeaders(),
    });
  }
  getDistrictList(by: string, id: string) {
    let body = {
      search_type: by,
      search_id: id,
    };
    return this.http.post<any>(this.baseURL + 'district-list', body, {
      headers: this.getHeaders(),
    });
  }
  getSubDistrictList(by: string, id: string) {
    let body = {
      search_type: by,
      search_id: id,
    };
    return this.http.post<any>(this.baseURL + 'subdistrict-list', body, {
      headers: this.getHeaders(),
    });
  }
  getCityList(by: string, id: string) {
    let body = {
      search_type: by,
      search_id: id,
    };
    return this.http.post<any>(this.baseURL + 'city-list', body, {
      headers: this.getHeaders(),
    });
  }

  getDepartmentList() {
    return this.http.get<any>(this.baseURL + 'common/department-list', {
      headers: this.getHeaders(),
    });
  }
  getDesignationList() {
    return this.http.get<any>(this.baseURL + 'common/designation-list', {
      headers: this.getHeaders(),
    });
  }
  getBranchList() {
    return this.http.get<any>(this.baseURL + 'branch-list', {
      headers: this.getHeaders(),
    });
  }

  getResourceCategoryList() {
    return this.http.get<any>(this.baseURL + 'resource/category-list', {
      headers: this.getHeaders(),
    });
  }
  getAccountingGroupList() {
    return this.http.get<any>(this.baseURL + 'accounting/group-list', {
      headers: this.getHeaders(),
    });
  }

  getCompleteList(url: string, body: any) {
    return this.http.post<any>(this.baseURL + url, body, {
      headers: this.getHeaders(),
    });
  }
}
