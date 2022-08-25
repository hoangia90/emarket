import { Component, OnInit } from '@angular/core';
import { AuthUsrService } from 'src/app/authUsr/authUsr.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { use } from 'echarts';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isDeleting = false;

  constructor(
    private authUsrService: AuthUsrService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.authUsrService.getAll()
      .pipe(first())
      .subscribe(users => this.users = users);


    // Test offline
    // this.users = this.authUsrService.getAll();
  }

  deleteUser(id: number) {
    const user = this.users.find((x: { id: number; }) => x.id === id);
    // user.isDeleting = true;
    this.isDeleting = true;
    console.log('deletinggggg', this.users);
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.users = this.users.filter((x: { id: number; }) => x.id !== id));
    this.isDeleting = false;
  }

  editUser(id: number) {
    // this.router.navigate([id, '/edit'], { relativeTo: this.route });
    this.router.navigate([id, 'edit'], { relativeTo: this.route });

  }

}