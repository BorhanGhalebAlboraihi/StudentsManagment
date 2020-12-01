import { Component, Injector, OnInit } from '@angular/core';
import { MatDialogRef, MatCheckboxChange } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import { CourseServiceProxy, CreateCourseDto, DepartmentDto, DepartmentServiceProxy, PagedResultDtoOfDepartmentDto, TenantDto, TenantServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './create-course-dialog.component.html',
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
export class CreateCourseDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  course: CreateCourseDto = new CreateCourseDto();
  choices: TenantDto;
  depts: DepartmentDto[] = [];
  constructor(
    injector: Injector,
    private courseService: CourseServiceProxy,
    private tService: TenantServiceProxy,
    private deptService: DepartmentServiceProxy,
    private _dialogRef: MatDialogRef<CreateCourseDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
this.deptService
      .getAll('')
      .subscribe((result: PagedResultDtoOfDepartmentDto) => {
          this.depts = result.items;
      });
  }





  save(): void {
    this.saving = true;

    this.courseService
      .create(this.course)
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
