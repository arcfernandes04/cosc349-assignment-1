import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, OnInit, signal } from '@angular/core';
import {environment} from '../environment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';

interface Item {
  item_id: number;
  item_name: string;
  item_description: string;
  item_rental_price: number;
  item_quantity: number;
  warehouse_id: string;
  warehouse_name: string;
  warehouse_location: string;
}

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-root',
  imports: [MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('rms');

  displayedColumns: string[] = ["id", "name", "rentalPrice", "quantity", "warehouseName", "location"];
  dataSource = new MatTableDataSource<Item>();

  http = inject(HttpClient);

  getData(): Observable<Item[]>{
    return this.http.get<Item[]>(environment.apiUrl + "/inventory");
 }

 ngOnInit(): void {
  this.getData().subscribe((items) => { 
    this.dataSource.data = items; 
    console.log(items);
  });
 }
}
