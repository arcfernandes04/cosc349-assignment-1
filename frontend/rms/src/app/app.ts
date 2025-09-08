import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, OnInit, signal } from '@angular/core';
import {environment} from '../environment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AddProductDialogComponent } from './add-product-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';



interface Item {
  item_id: number;
  item_name: string;
  item_description: string;
  item_rental_price: number;
  item_quantity: number;
}

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-root',
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('rms');

  displayedColumns: string[] = ["id", "name", "rentalPrice", "quantity"];
  dataSource = new MatTableDataSource<Item>();

  http = inject(HttpClient);

    constructor(private dialog: MatDialog) {}


  getData(): Observable<Item[]>{
    return this.http.get<Item[]>(environment.apiUrl + "/inventory");
 }

 addItem(item: Item){
    this.http.post(environment.apiUrl + "/item", item).subscribe({error: (err) => { console.error('failed to add item', err)}});
 }

 openAddProductDialog(): void {
  const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: Item) => {
      if (result) {
        this.addItem(result)
      }
    });
 }

 ngOnInit(): void {
  this.getData().subscribe((items) => { 
    this.dataSource.data = items; 
  });
 }
}
