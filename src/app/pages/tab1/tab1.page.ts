import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  userData: any;
  constructor(
    private user: UserService,
  ) {
    this.userData = [];
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.user.getList().subscribe(response => {
      console.log(response);
      this.userData = response;
    });
  }

  delete(item) {
    this.user.deleteItem(item.id).subscribe(response => {
      this.getList();
    });
  }

}
