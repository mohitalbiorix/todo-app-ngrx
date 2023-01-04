import { createAction, props } from "@ngrx/store";

/* for add user */
export const AddTodo = createAction('[Todo Component] Add', props<{ text: string }>());

/* for remove user */
export const RemoveTodo = createAction('[Todo Component] Remove', props<{ id: string }>());

/* for toggle user */
export const ToggleTodo = createAction('[Todo Component] Toggle', props<{ id: string }>());

/* for edit user */
export const EditTodo = createAction('[Todo Component] Edit', props<{ id: string , text:string }>());