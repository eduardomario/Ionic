import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  id: number;
  data: User;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public user: UserService,
  ) {
    this.data = new User();
  }

  ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.params.id, 10);

    this.user.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    });
  }

  update() {
    this.user.updateItem(this.id, this.data).subscribe(response => {
      this.router.navigate(['menu/tab/tab1']);
    });
  }

}
