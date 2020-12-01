import { Component, OnInit } from '@angular/core';
import { accountModuleAnimation } from '@shared/animations/routerTransition';

@Component({
  selector: 'app-student-search',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.scss'],
  animations: [accountModuleAnimation()]
})
export class StudentSearchComponent implements OnInit {
  stdNO;
  constructor() { }

  ngOnInit() {
  }
  search(){

  }
}
