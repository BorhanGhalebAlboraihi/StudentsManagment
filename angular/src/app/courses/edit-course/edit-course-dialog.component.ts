import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MatCheckboxChange, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
   CourseServiceProxy, CreateCourseDto, CourseEditDto, DepartmentServiceProxy, DepartmentDto, PagedResultDtoOfDepartmentDto, CourseDto
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './edit-course-dialog.component.html',
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
export class EditCourseDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  course: CourseDto = new CourseDto();

  depts: DepartmentDto[] = [];
  constructor(
    injector: Injector,
    private courseService: CourseServiceProxy,

    private deptService: DepartmentServiceProxy,
    private _dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.courseService.get(this._id).subscribe(result => {
      this.course = result;

    });
    this.deptService
      .getAll('')
      .subscribe((result: PagedResultDtoOfDepartmentDto) => {
          this.depts = result.items;
      });
  }
  save(): void {
    this.saving = true;


    this.courseService
      .update(this.course)
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
