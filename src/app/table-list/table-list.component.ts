import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { Element } from './interfaces/table-list.model';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DialogContentExampleDialog } from '../dialog/dialog-content-example-dialog';
import { DetailElement } from './interfaces/table-list-detail.model';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})

export class TableListComponent {
  elements: Element[] = [];
  detailElement: DetailElement;
  dataSource: MatTableDataSource<Element>;

  displayedColumns: string[] = ['parkID','parkName', 'capacity', 'parkType', 'emptyCapacity','detail'];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  totalRecords = 0;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient,public dialog: MatDialog) {
    this.fetchData();
  }
   
  fetchData() {
    this.http.get('https://api.ibb.gov.tr/ispark/Park')
      .subscribe((response: Element[]) => {
        this.elements = response;    
        this.dataSource = new MatTableDataSource(this.elements);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalRecords = this.elements.length;
      });
  }

  openDialog(id:number): void {
    this.http.get('https://api.ibb.gov.tr/ispark/ParkDetay?id=' + id.toString())
      .subscribe((response: DetailElement) => {
        this.detailElement = response;    
        const dialogRef = this.dialog.open(DialogContentExampleDialog, {
          data: this.detailElement[0]
        });
      }); 
  }
}
