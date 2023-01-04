import { createReducer, on } from '@ngrx/store';
import { UserModel } from '../model/userInterface';
import * as uuid from 'uuid'
import { AddTodo, EditTodo, RemoveTodo, ToggleTodo } from './user.action';

const initialState: Array<UserModel> = [];

export const todoReducer = createReducer(initialState,
  on(AddTodo, (state, action) => ([...state, { id: uuid.v4(), text: action.text, todo: true }])),
  on(RemoveTodo, (state, action) => state.filter(i => i.id !== action.id)),
  on(ToggleTodo, (state, action) => state.map(i => i.id === action.id ? { ...i, todo: !i.todo } : i)),
  on(EditTodo, (s, { id, text }) => {
    console.log('edit')
    return s.map(data => {
      if (data.id === id) {
        return { ...data, text: text };
      }
      return data;
    });
  })
);
