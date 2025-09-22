import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { reducer, TaskState } from './app.reducer';

export interface State {
  tasks: TaskState;
}

export const reducers: ActionReducerMap<State> = {
  tasks: reducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
