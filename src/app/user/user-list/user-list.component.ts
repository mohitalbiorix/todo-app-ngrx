import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserModel } from 'src/app/model/userInterface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RemoveTodo, ToggleTodo } from 'src/app/store/user.action';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  todo$!: Observable<UserModel[]>

  constructor(
    private store: Store<{ todoState: Array<UserModel> }>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.todo$ = this.store.select('todoState');
  }

  removeTodo(todoData: any) {
    if (todoData.todo) {
      this.store.dispatch(RemoveTodo({ id: todoData.id }))
    }
  }

  toggleTodo(todoId: string) {
    this.store.dispatch(ToggleTodo({ id: todoId }))
  }

  addTodo() {
    this.router.navigate(['/user/add-user'], {
      queryParams: {
        action: 'ADD'
      }
    })
  }

  editTodo(todo: any) {
    if (todo.todo) {
      this.router.navigate(['/user/add-user'], {
        queryParams: {
          todoId: todo.id,
          todoText: todo.text,
          action: 'EDIT'
        }
      })
    }
  }

}
