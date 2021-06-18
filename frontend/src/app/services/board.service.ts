import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private env: String;

  constructor(private http: HttpClient) { 
    this.env = environment.APP_URL;
  }

  newTask(board: any){
    return this.http.post<any>(this.env + "board/newTask", board);
  }

  listTasks(){
    return this.http.get(this.env + "board/taskList");
  }
}
