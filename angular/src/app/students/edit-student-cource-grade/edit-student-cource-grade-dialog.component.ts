import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MatCheckboxChange, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
   StudentServiceProxy, CreateStudentDto, StudentEditDto, DepartmentServiceProxy, DepartmentDto, PagedResultDtoOfDepartmentDto, StudentDto, StudentInfoDto, StudentCoursesDto
} from '@shared/service-proxies/service-proxies';

@Component({
  templateUrl: './edit-student-cource-grade-dialog.component.html',
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
export class EditStudentCourceGradeDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  studentInfo: StudentInfoDto = new StudentInfoDto();
  studentCourse: StudentCoursesDto = new StudentCoursesDto();

  depts: DepartmentDto[] = [];
  constructor(
    injector: Injector,
    private studentService: StudentServiceProxy,

    private deptService: DepartmentServiceProxy,
    private _dialogRef: MatDialogRef<EditStudentCourceGradeDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.studentService.getSpecificStudentCourseForEdit(this._id).subscribe(result => {
      this.studentCourse = result;

    });
    this.deptService
      .getAll('')
      .subscribe((result: PagedResultDtoOfDepartmentDto) => {
          this.depts = result.items;
      });
  }
  save(): void {
    this.saving = true;


    this.studentService
      .editSpecificStudentCourses(this.studentCourse)
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
