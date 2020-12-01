import { Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { DepartmentDto, DepartmentServiceProxy, PagedResultDtoOfDepartmentDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { CreateDeptDialogComponent } from './create-dept/create-dept-dialog.component';
import { EditDeptDialogComponent } from './edit-dept/edit-dept-dialog.component';


class PagedDepartmentRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent extends PagedListingComponentBase<DepartmentDto> {
  depts: DepartmentDto[] = [];
  keyword = '';
  isActive: boolean | null;

  constructor(
      injector: Injector,
      private deptService: DepartmentServiceProxy,
      private _dialog: MatDialog
  ) {
      super(injector);
  }

  createDept(): void {
      this.showCreateOrEditDeptDialog();
  }

  editDept(user: DepartmentDto): void {
      this.showCreateOrEditDeptDialog(user.id);
  }



  protected list(
      request: PagedDepartmentRequestDto,
      pageNumber: number,
      finishedCallback: Function
  ): void {

      request.keyword = this.keyword;
      request.isActive = this.isActive;

      this.deptService
          .getAll(request.keyword)
          .pipe(
              finalize(() => {
                  finishedCallback();
              })
          )
          .subscribe((result: PagedResultDtoOfDepartmentDto) => {
              this.depts = result.items;
              this.showPaging(result, pageNumber);
          });
  }

  protected delete(dept: DepartmentDto): void {
      abp.message.confirm(
          this.l('DeptDeleteWarningMessage', dept.departmentName ),
          (result: boolean) => {
              if (result) {
                  this.deptService.delete(dept.id).subscribe(() => {
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
          createOrEditDeptDialog = this._dialog.open(CreateDeptDialogComponent);
      } else {
          createOrEditDeptDialog = this._dialog.open(EditDeptDialogComponent, {
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

