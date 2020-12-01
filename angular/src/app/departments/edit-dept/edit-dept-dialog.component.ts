import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MatCheckboxChange, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
   DepartmentServiceProxy, CreateDepartmentDto, DepartmentEditDto
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './edit-dept-dialog.component.html',
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
export class EditDeptDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  dept: DepartmentEditDto = new DepartmentEditDto();

  constructor(
    injector: Injector,
    private deptService: DepartmentServiceProxy,
    private _dialogRef: MatDialogRef<EditDeptDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.deptService.get(this._id).subscribe(result => {
      this.dept = result;

    });
  }
  save(): void {
    this.saving = true;


    this.deptService
      .update(this.dept)
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
