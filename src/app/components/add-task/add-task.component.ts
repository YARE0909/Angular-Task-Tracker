import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription!: Subscription;
  errorText: boolean = false;
  errorDate: boolean = false;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
  }

  onSubmit() {
    console.log(this.text);
    if(!this.text || this.text === ""){
      if(this.day){
        this.errorDate = false;
      }
      this.errorText = true;
    }else {
      if(!this.day || this.day === ""){
        if(this.text){
        this.errorText = false;
      }
        this.errorDate = true;
      } else {
        this.errorDate = false;
        this.errorText = false;
        const newTask = {
          text: this.text,
          day: this.day,
          reminder: this.reminder,
        };

        this.onAddTask.emit(newTask);

        this.text = '';
        this.day = '';
        this.reminder = false;
      }
    }
  }
}
