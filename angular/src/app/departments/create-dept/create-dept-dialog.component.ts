import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import { DepartmentServiceProxy, CreateDepartmentDto, TenantDto, TenantServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './create-dept-dialog.component.html',
  styles: [
    `
      mat-form-field {
        width: 100%;
      }
      mat-checkbox {
        padding-bottom: 5px;
      }
    `
  ]
})
export class CreateDeptDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  dept: CreateDepartmentDto = new CreateDepartmentDto();
  choices: TenantDto;
  constructor(
    injector: Injector,
    private deptService: DepartmentServiceProxy,
    private _dialogRef: MatDialogRef<CreateDeptDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
/* this.tService.get(abp.session.tenantId).subscribe(r => {
  this.dept.collage = r.name;
}); */
this.dept.collage = this.appSession.tenant.name;
  }





  save(): void {
    this.saving = true;


    this.deptService
      .create(this.dept)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.close(true);
      });
  }

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
