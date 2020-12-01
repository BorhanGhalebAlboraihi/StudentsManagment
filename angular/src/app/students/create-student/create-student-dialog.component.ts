import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import { StudentServiceProxy, CreateStudentDto, DepartmentDto, DepartmentServiceProxy, PagedResultDtoOfDepartmentDto, TenantDto, TenantServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './create-student-dialog.component.html',
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
export class CreateStudentDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  student: CreateStudentDto = new CreateStudentDto();
  choices: TenantDto;
  depts: DepartmentDto[] = [];
  constructor(
    injector: Injector,
    private studentService: StudentServiceProxy,
    private tService: TenantServiceProxy,
    private deptService: DepartmentServiceProxy,
    private _dialogRef: MatDialogRef<CreateStudentDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
this.deptService
      .getAll('')
      .subscribe((result: PagedResultDtoOfDepartmentDto) => {
          this.depts = result.items;
      });
      this.student.studentCollage = this.appSession.tenant.name;
  }





  save(): void {
    this.saving = true;
    this.studentService
      .create(this.student)
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
