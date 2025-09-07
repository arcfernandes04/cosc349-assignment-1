import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, signal } from '@angular/core';
import {environment} from '../environment';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('rms');

 http = inject(HttpClient);

  data() {
    return this.http.get<{name: string, description: string}>(environment.apiUrl + "/inventory").subscribe(data => data.name);
 }
}
