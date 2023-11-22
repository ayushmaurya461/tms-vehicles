import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public typeName: string = 'user';

  public id: string = '';

  public userType: string = '';

  public userName: string = '';

  public userBranch: string = '';

  public fromYear: any = '';

  public fiscalYear: string = '';

  public fullName: string = '';

  public token: string = '';

  public companyId: string = '';

  public companyCode: string = '';

  public subCompanyCode: string = '';

  public branchList: any = [];

  public accessList: any = [];

  constructor(private storage: StorageService) {
    this.sync();

    this.autoSync();
  }

  public save() {
    const instance = {
      id: this.id,
      userType: this.userType,
      userName: this.userName,
      userBranch: this.userBranch,
      fromYear: this.fromYear,
      fiscalYear: this.fiscalYear,
      fullName: this.fullName,
      token: this.token,
      companyId: this.companyId,
      companyCode: this.companyCode,
      subCompanyCode: this.subCompanyCode,
      accessList: this.accessList,
      branchList: this.branchList,
    };

    this.storage.set(this.typeName, JSON.stringify(instance));

    return this.storage.get(this.typeName);
  }

  async sync() {
    const storageInstance = this.storage.get(this.typeName);

    if (!storageInstance) {
      this.id = '';
      this.userType = '';
      this.userName = '';
      this.userBranch = '';
      this.fromYear = '';
      this.fiscalYear = '';
      this.fullName = '';
      this.token = '';
      this.companyId = '';
      this.companyCode = '';
      this.subCompanyCode = '';
      this.accessList = [];
      this.branchList = [];
      return false;
    }

    const _parsed = JSON.parse(storageInstance);

    this.id = _parsed.id;
    this.userType = _parsed.userType;
    this.userName = _parsed.userName;
    this.userBranch = _parsed.userBranch;
    this.fromYear = _parsed.fromYear;
    this.fiscalYear = _parsed.fiscalYear;
    this.fullName = _parsed.fullName;
    this.token = _parsed.token;
    this.companyId = _parsed.companyId;
    this.companyCode = _parsed.companyCode;
    this.subCompanyCode = _parsed.subCompanyCode;
    this.accessList = _parsed.accessList;
    this.branchList = _parsed.branchList;

    return true;
  }

  public clean() {
    this.id = '';
    this.userType = '';
    this.userName = '';
    this.userBranch = '';
    this.fromYear = '';
    this.fiscalYear = '';
    this.fullName = '';
    this.token = '';
    this.companyId = '';
    this.companyCode = '';
    this.subCompanyCode = '';
    this.accessList = [];
    this.branchList = [];

    return this.storage.remove(this.typeName);
  }

  private autoSync() {
    window.addEventListener('storage', (event: any) => {
      this.sync();
      window.location.reload();
    });
  }
}
