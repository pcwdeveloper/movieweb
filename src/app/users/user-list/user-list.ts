import { AfterViewInit, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { UserService } from '../user-service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AddUserDialog } from '../add-user-dialog/add-user-dialog';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../model/user';


@Component({
  selector: 'app-user-list',
  imports: [MatListModule, MatIconModule, MatDividerModule,MatTableModule, MatPaginatorModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements AfterViewInit {
  userService: UserService = inject(UserService);

  displayedColumns: string[] = ['userName', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private dialog: MatDialog) {
    this.getUserList();
  }


 
  getUserList(){
    this.userService.getUsers().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  addUser() {
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
         this.getUserList();
      }
    });
  }
}
