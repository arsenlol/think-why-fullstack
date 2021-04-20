import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ContactModel } from '../../models/contacts.model';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../../app.component';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSource = new MatTableDataSource<ContactModel>([]);
  displayedColumns: string[] = [
    'record-ID',
    'email',
    'first-name',
    'last-name',
    'actions',
  ];

  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    if (this.paginator) { this.dataSource.paginator = this.paginator; }
    if (this.sort) { this.dataSource.sort = this.sort; }
  }

  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(): void {
    this.api
      .getContacts()
      .then((contacts) => (this.dataSource.data = contacts))
      .catch((err) => console.error(err));
  }

  removeContact(id: string): void {
    this.api
      .removeContactById(id)
      .then(() => {
        this.getAllContacts();
        this.snackBar.open('Deleted!', 'Ok', {
          duration: 5000,
        });
      })
      .catch((err) => console.error(err));
  }
}
