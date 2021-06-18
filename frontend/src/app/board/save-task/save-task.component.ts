import { Component, OnInit } from '@angular/core';
import { BoardService } from "../../services/board.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-task',
  templateUrl: './save-task.component.html',
  styleUrls: ['./save-task.component.css']
})

export class SaveTaskComponent implements OnInit {
  public taskData: any;
  public errorMessage: String;

  constructor(private boardService: BoardService, private router: Router) {
    this.taskData = {};
    this.errorMessage = '';
  }

  ngOnInit(): void {
  }
  newTask(){
    if (!this.taskData.name || !this.taskData.description) {
      console.log('Please fill all the fields');
      this.errorMessage = 'Please fill all the fields';
      this.closeAlert();
    } else {
      this.boardService.newTask(this.taskData).subscribe(
        (res: any) => {
          console.log(res);
          this.taskData = {};
          this.router.navigate(['/listTasks']);
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.error;
          this.closeAlert();
        }
      )
    }
  }

  closeAlert() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  closeX() {
      this.errorMessage = '';
  }
}
