import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        /* new MenuItem(this.l('HomePage'), '', 'home', '/app/home'), */

        new MenuItem(this.l('الكليات'), 'Pages.Tenants', 'business', '/app/tenants'),
        new MenuItem(this.l('المستخدمين'), 'Pages.Users', 'people', '/app/users'),
        new MenuItem(this.l('الصلاحيات'), 'Pages.Roles', 'local_offer', '/app/roles'),
        new MenuItem(this.l('الأقسام'), '', 'business', '/app/departments'),
        new MenuItem(this.l('الكورسات'), '', 'local_offer', '/app/cources'),
        new MenuItem(this.l('الطلاب'), 'Pages.Students', 'people', '/app/students'),
        new MenuItem(this.l('دردشة'), '', 'chat', '/app/chat-hub'),


    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}
