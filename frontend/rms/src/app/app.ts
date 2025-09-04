import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rms');

  url = "http://localhost:3000";

 http = inject(HttpClient);

  data() {
    return this.http.get<{name: string, description: string}>(this.url+"/equipment").subscribe(data => data.name);
 }
}
