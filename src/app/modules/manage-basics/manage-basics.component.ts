import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-basics',
  templateUrl: './manage-basics.component.html',
  styleUrls: ['./manage-basics.component.scss']
})
export class ManageBasicsComponent implements OnInit {
  isCollapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

}
