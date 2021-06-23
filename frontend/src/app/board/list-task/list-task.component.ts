import { Component, OnInit } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  public taskData: any;
  public successMessage: String;
  public errorMessage: String;

  constructor(private board: BoardService, private router: Router) {
    this.taskData = {};
    this.successMessage = '';
    this.errorMessage = '';
  }

  ngOnInit(): void {
    this.board.listTasks().subscribe(
      (res) => {
        console.log(res);
        this.taskData = res.board;
      },
      (err) => {
        console.log(err.error);
        this.errorMessage = err.error;
        this.closeAlert();
      }
    );
  }

  updateTask(task: any, status: String) {}

  deleteTask(task: any) {}

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000);
  }

  closeX() {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
