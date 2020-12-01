import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { CourseDto, CourseServiceProxy, DepartmentDto, DepartmentServiceProxy, PagedResultDtoOfCourseDto, PagedResultDtoOfDepartmentDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { CreateCourseDialogComponent } from './create-course/create-course-dialog.component';
import { EditCourseDialogComponent } from './edit-course/edit-course-dialog.component';


class PagedCourseRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
  }
@Component({
  templateUrl: './courses.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent extends PagedListingComponentBase<CourseDto> {
  courses: CourseDto[] = [];
  keyword = '';
  isActive: boolean | null;

  constructor(
      injector: Injector,
      private courseService: CourseServiceProxy,
      private _dialog: MatDialog
  ) {
      super(injector);

  }

  createC(): void {
      this.showCreateOrEditDeptDialog();
  }

  editC(user: CourseDto): void {
      this.showCreateOrEditDeptDialog(user.id);
  }



  protected list(
      request: PagedCourseRequestDto,
      pageNumber: number,
      finishedCallback: Function
  ): void {

      request.keyword = this.keyword;
      request.isActive = this.isActive;

      this.courseService
          .getAll(request.keyword)
          .pipe(
              finalize(() => {
                  finishedCallback();
              })
          )
          .subscribe((result: PagedResultDtoOfCourseDto) => {
              this.courses = result.items;
              this.showPaging(result, pageNumber);
          });
  }

  protected delete(course: CourseDto): void {
      abp.message.confirm(
          this.l('DeptDeleteWarningMessage', course.courseName ),
          (result: boolean) => {
              if (result) {
                  this.courseService.delete(course.id).subscribe(() => {
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
          createOrEditDeptDialog = this._dialog.open(CreateCourseDialogComponent);
      } else {
          createOrEditDeptDialog = this._dialog.open(EditCourseDialogComponent, {
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
