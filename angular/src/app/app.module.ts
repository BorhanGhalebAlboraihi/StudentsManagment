import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AbpModule } from '@abp/abp.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';

import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { TopBarComponent } from '@app/layout/topbar.component';
import { TopBarLanguageSwitchComponent } from '@app/layout/topbar-languageswitch.component';
import { SideBarUserAreaComponent } from '@app/layout/sidebar-user-area.component';
import { SideBarNavComponent } from '@app/layout/sidebar-nav.component';
import { SideBarFooterComponent } from '@app/layout/sidebar-footer.component';
import { RightSideBarComponent } from '@app/layout/right-sidebar.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
import { ChatHubComponent } from './chat/chat-hub.component';
import { PublishNotificationComponent } from './notification/publish-notification/publish-notification.component';
import { UserNotificationComponent } from './notification/user-notification/user-notification.component';

import { CoursesComponent } from './courses/courses.component';
import { EditDeptDialogComponent } from './departments/edit-dept/edit-dept-dialog.component';
import { CreateDeptDialogComponent } from './departments/create-dept/create-dept-dialog.component';
import { DepartmentsComponent } from './departments/departments.component';
import { StudentsComponent } from './students/students.component';
import { DepartmentDto } from '@shared/service-proxies/service-proxies';
import { EditCourseDialogComponent } from './courses/edit-course/edit-course-dialog.component';
import { CreateCourseDialogComponent } from './courses/create-course/create-course-dialog.component';
import { CreateStudentDialogComponent } from './students/create-student/create-student-dialog.component';
import { EditStudentDialogComponent } from './students/edit-student/edit-student-dialog.component';
import { ShowStudentCourcesDialogComponent } from './students/show-student-cources/show-student-cources-dialog.component';
import { EditStudentCourceGradeDialogComponent } from './students/edit-student-cource-grade/edit-student-cource-grade-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TopBarComponent,
    TopBarLanguageSwitchComponent,
    SideBarUserAreaComponent,
    SideBarNavComponent,
    SideBarFooterComponent,
    RightSideBarComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,

    // Dept
    StudentsComponent,
  CreateStudentDialogComponent,
  EditStudentDialogComponent,

    DepartmentsComponent,
    CreateDeptDialogComponent,
    EditDeptDialogComponent,
    // ChatHub
    ChatHubComponent,
    PublishNotificationComponent,
    UserNotificationComponent,
      CoursesComponent,
      EditCourseDialogComponent,
      CreateCourseDialogComponent,
      ShowStudentCourcesDialogComponent,
      EditStudentCourceGradeDialogComponent
   ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forRoot(),
    AbpModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [DatePipe],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    // DEPT
    CreateDeptDialogComponent,
    EditDeptDialogComponent,
    // notification
    PublishNotificationComponent,

    //

    EditCourseDialogComponent,
    CreateCourseDialogComponent,

    //
  CreateStudentDialogComponent,
  EditStudentDialogComponent,
  ShowStudentCourcesDialogComponent,
  EditStudentCourceGradeDialogComponent
  ]
})
export class AppModule {}
