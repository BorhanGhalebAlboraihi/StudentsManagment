import { Component, Inject, Injector, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MatCheckboxChange, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { AppComponentBase } from '@shared/app-component-base';
import {
  UserServiceProxy,
   StudentServiceProxy, CreateStudentDto, StudentEditDto, DepartmentServiceProxy, DepartmentDto, PagedResultDtoOfDepartmentDto, StudentDto, StudentInfoDto, StudentCoursesDto
} from '@shared/service-proxies/service-proxies';
import { EditStudentCourceGradeDialogComponent } from '../edit-student-cource-grade/edit-student-cource-grade-dialog.component';
import { ExcelService } from '@shared/reports/excel.service';

@Component({
  templateUrl: './show-student-cources-dialog.component.html',
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
export class ShowStudentCourcesDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  studentInfo: StudentInfoDto = new StudentInfoDto();
  studentCourse: StudentCoursesDto = new StudentCoursesDto();

  depts: DepartmentDto[] = [];
  constructor(
    injector: Injector,
    private studentService: StudentServiceProxy,
    private _dialog: MatDialog,
    private deptService: DepartmentServiceProxy,
    public excelService: ExcelService,
    private _dialogRef: MatDialogRef<ShowStudentCourcesDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.studentService.getStudentCourses(this._id).subscribe(result => {
      this.studentInfo = result;

    });
    this.deptService
      .getAll('')
      .subscribe((result: PagedResultDtoOfDepartmentDto) => {
          this.depts = result.items;
      });
  }
editGrade(user: StudentCoursesDto): void {
  let createOrEditDeptDialog;
  createOrEditDeptDialog = this._dialog.open(EditStudentCourceGradeDialogComponent , {
      data : user.id
  });
  createOrEditDeptDialog.afterClosed().subscribe(result => {
    if (result) {
      this.studentService.getStudentCourses(this._id).subscribe(result => {
        this.studentInfo = result;

      });
    }
});
}

  close(result: any): void {
    this._dialogRef.close(result);
  }
}
