import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { ExcelService } from '@shared/reports/excel.service';
import { StudentDto, StudentServiceProxy, DepartmentDto, DepartmentServiceProxy, PagedResultDtoOfStudentDto, PagedResultDtoOfDepartmentDto, CourseServiceProxy, CourseDto, StudentInfoDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { CreateStudentDialogComponent } from './create-student/create-student-dialog.component';
import { EditStudentDialogComponent } from './edit-student/edit-student-dialog.component';
import { ShowStudentCourcesDialogComponent } from './show-student-cources/show-student-cources-dialog.component';
import * as Excel from 'exceljs';
import { DatePipe } from '@angular/common';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from './carlogo.js';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
class PagedStudentRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
  }
@Component({
  templateUrl: './students.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./students.component.css']
})

export class StudentsComponent extends PagedListingComponentBase<StudentDto> {
  students: StudentDto[] = [];
  keyword = '';
  isActive: boolean | null;
  level: number;
  dept: number;
  term: number;
  allStudents:StudentInfoDto[] = [];
  depts: DepartmentDto[] = [];
  cDto: CourseDto[] = [];

  constructor(
      injector: Injector,
      public excelService: ExcelService,
      private deptService: DepartmentServiceProxy,
      private cService: CourseServiceProxy,
      private datePipe: DatePipe,
      private studentService: StudentServiceProxy,
      private _dialog: MatDialog
  ) {
      super(injector);

  }

  createC(): void {
      this.showCreateOrEditDeptDialog();
  }

  editC(user: StudentDto): void {
      this.showCreateOrEditDeptDialog(user.id);
  }

  getStudentCourses(user: StudentDto): void {
    this._dialog.open(ShowStudentCourcesDialogComponent , {
        data : user.id
    });
}

  generateExcel() {
    this.cService
    .getAllInDept('',this.dept , this.level , this.term).pipe(
      finalize(() => {
        this.studentService
        .getAllStudentCourses(this.level  ,this.term , this.dept).pipe(finalize(() => {
//Excel Title, Header, Data
const title = 'تقرير كشف الطلاب';
const header = ["Name","Cources"];
const sub_header = this.cDto.map(c=>c.courseName);
const data = this.allStudents;

//Create workbook and worksheet
let workbook = new Workbook();
let worksheet = workbook.addWorksheet('بيانات الطلاب');


//Add Row and formatting
let titleRow = worksheet.addRow([title]);
titleRow.font = { name: 'Comic Sans MS', family: 4, size: 11, underline: 'double', bold: true }
worksheet.addRow([]);
titleRow.eachCell((cell, number) => {
  cell.alignment = { vertical: 'middle', horizontal: 'center' };
 });

let subTitleRow = worksheet.addRow(['التاريخ : ' + this.datePipe.transform(new Date(), 'medium')])
let subTitleRow1 = worksheet.addRow(['جامعة الحديدة'])

subTitleRow.eachCell((cell, number) => {
  cell.alignment = { vertical: 'middle', horizontal: 'center' };
 });
 subTitleRow1.eachCell((cell, number) => {
  cell.alignment = { vertical: 'middle', horizontal: 'center' };
 });

//Add Image
let logo = workbook.addImage({
  base64: logoFile.logoBase64,
  extension: 'png',
});
worksheet.addImage(logo, 'B1:C4');




//Blank Row

//Add Header Row
//let headerRow = worksheet.addRow(header);
sub_header.reverse();
sub_header.push('-');
worksheet.getCell('A7').value = "الإسم";
worksheet.getCell('B7').value = "المقرر";
worksheet.getCell('A7').alignment = { vertical: 'middle', horizontal: 'center' };
worksheet.getCell('B7').alignment = { vertical: 'middle', horizontal: 'center' };
let headerSubRow = worksheet.addRow(sub_header.reverse());
headerSubRow.eachCell((cell, number) => {
  cell.alignment = { vertical: 'middle', horizontal: 'center' };
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFCCFFE5' },
    bgColor: { argb: 'FF0000FF' }
  }
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
});
worksheet.mergeCells('A7:A8');
worksheet.mergeCells(7,2,7, sub_header.length - 1 + 1 );
const row = worksheet.getRow(7);
const row8 = worksheet.getRow(8);
row.eachCell((cell, number) => {
  cell.alignment = { vertical: 'middle', horizontal: 'center' };
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' },
    bgColor: { argb: 'FF0000FF' }
  }
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
});
row8.eachCell((cell, number) => {
  cell.alignment = { vertical: 'middle', horizontal: 'center' };
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFCCFFE5' },
    bgColor: { argb: 'FF0000FF' }
  }
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
});
row8.getCell(1).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFFFFF00' },
  bgColor: { argb: 'FF0000FF' }
}
// Repeat specific rows on every printed page
worksheet.pageSetup.printTitlesRow = '1:6';

// Add Data and Conditional Formatting
data.forEach(d => {
   const da = [d.studentDto.studentName];

   d.studentCoursesDtos.forEach(element => {
     da.push(element.grade.toString());
   });
   console.log(da);
  let row = worksheet.addRow(da);
  row.eachCell((cell, number) => {
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
  })
 /*  let qty = row.getCell(5);
  let color = 'FF99FF99';
  if (+qty.value < 500) {
    color = 'FF9999'
  }

  qty.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: color }
  } */
}

);

worksheet.getColumn(1).width = 30;
//worksheet.getColumn(4).width = 30;
worksheet.addRow([]);


//Footer Row
let info =`كلية :  ${this.appSession.tenant.name}`;
info +=`   -  القسم :  ${this.cDto[0].depratmentName}`;
info +=`   -   المستوى :  ${this.cDto[0].courseLevel}`;
info +=`   -  الترم :  ${this.cDto[0].courseTerm}`;
let footerRow = worksheet.addRow([info]);
footerRow.getCell(1).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFCCFFE5' }
};
footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }

footerRow.font = { name: 'Comic Sans MS', family: 4, size: 11, underline: 'double', bold: true }
footerRow.eachCell((cell, number) => {
  cell.alignment = { vertical: 'middle', horizontal: 'center' };});
//Merge Cells
//worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
worksheet.mergeCells(footerRow.number,1,footerRow.number, sub_header.length - 1 + 1 );
//Generate Excel File with given name
workbook.xlsx.writeBuffer().then((data) => {
  let blob = new Blob([data as BlobPart], { type: EXCEL_TYPE });
  fs.saveAs(blob, title + ' - ' + info + '-' + new Date().getDate() + EXCEL_EXTENSION);
})

        }))

        .subscribe((result) => {
            this.allStudents = result;
        });
      })
  )
    .subscribe((result) => {
        this.cDto = result.items;
    });


  }



  protected list(
      request: PagedStudentRequestDto,
      pageNumber: number,
      finishedCallback: Function
  ): void {
    this.deptService
    .getAll('')
    .subscribe((result: PagedResultDtoOfDepartmentDto) => {
        this.depts = result.items;
    });
      request.keyword = this.keyword;
      request.isActive = this.isActive;
      this.studentService
          .getAll(request.keyword, request.skipCount, request.maxResultCount)
          .pipe(
              finalize(() => {
                  finishedCallback();
              })
          )
          .subscribe((result: PagedResultDtoOfStudentDto) => {
              this.students = result.items;
              this.showPaging(result, pageNumber);
          });
    }

  protected delete(student: StudentDto): void {
      abp.message.confirm(
          this.l('DeptDeleteWarningMessage', student.studentName ),
          (result: boolean) => {
              if (result) {
                  this.studentService.delete(student.id).subscribe(() => {
                      abp.notify.success(this.l('SuccessfullyDeleted'));
                      this.refresh();
                  });
              }
          }
      );
  }
  private showCreateOrEditDeptDialog(id?: number): void {
      let createOrEditDeptDialog;
      if (id === undefined || id <= 0) {
          createOrEditDeptDialog = this._dialog.open(CreateStudentDialogComponent);
      } else {
          createOrEditDeptDialog = this._dialog.open(EditStudentDialogComponent, {
              data: id
          });
      }

      createOrEditDeptDialog.afterClosed().subscribe(result => {
          if (result) {
              this.refresh();
          }
      });
  }



}
