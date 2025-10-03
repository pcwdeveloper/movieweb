import { AfterViewInit, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { UserService } from '../user-service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AddUserDialog } from '../add-user-dialog/add-user-dialog';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatListModule, MatIconModule, MatDividerModule,MatTableModule, MatPaginatorModule,MatProgressSpinnerModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList implements AfterViewInit {
  userService: UserService = inject(UserService);

  displayedColumns: string[] = ['userName', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalElements = 0;
  pageSize = 5;
  pageIndex = 0;

  isLoading = false;
  constructor(private dialog: MatDialog) {
    this.loadUsers();
  }


 
  loadUsers(){
    this.isLoading = true;

    this.userService.getUsers(this.pageIndex,this.pageSize).subscribe(res => {
      this.isLoading = false;
      this.dataSource.data = res.content;
      //debugger;
      this.totalElements = res.totalElements;
    },
     (err) => {
      this.isLoading = false;
      console.error('Error get user:', err);
    });
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }


  addUser() {
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
         this.loadUsers();
      }
    });
  }


  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize  = event.pageSize;
    this.loadUsers();
  }
}
