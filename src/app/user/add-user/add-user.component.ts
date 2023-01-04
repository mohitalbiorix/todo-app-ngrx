import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/model/userInterface';
import { AddTodo, EditTodo} from 'src/app/store/user.action';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(
    private store: Store<{ todoState: Array<UserModel> }>,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  newTodoText: string = '';
  action = 'ADD';
  editData: any;

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(
      todoData => {
        this.action = todoData['action'];
        this.editData = todoData;
        if (this.action === 'EDIT') {
          this.newTodoText = todoData['todoText']
        }
      }
    )
  }

  addTodo() {
    if (this.action === 'EDIT') {
      this.store.dispatch(EditTodo({ id: this.editData['todoId'], text: this.newTodoText }))
    }
    else {
      this.store.dispatch(AddTodo({ text: this.newTodoText || 'Untitled task' }))
      this.newTodoText = '';
    }
    this.router.navigate(['/user/list-user'])
  }

}
