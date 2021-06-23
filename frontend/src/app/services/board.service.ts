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
    return this.http.get<any>(this.env + "board/taskList");
  }

  updateTask(board: any){
    this.http.put<any>(this.env + 'board/updateTask', board);
  }

  deleteTask(board: any){
    this.http.delete<any>(this.env + 'board/deleteTask' + board._id);
  }
}
