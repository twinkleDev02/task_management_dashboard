import { createFeatureSelector, createSelector } from '@ngrx/store';
import { taskAdapter, TaskState } from './app.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// NgRx Entity selectors
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = taskAdapter.getSelectors(selectTaskState);

// Custom selectors
export const selectAllTasks = selectAll;
export const selectTaskById = (id: string) => createSelector(
    selectTaskState,
    (state) => state.entities[id]
);
export const selectTasksLoading = createSelector(selectTaskState, (state: TaskState) => state.loading);
export const selectTasksError = createSelector(selectTaskState, (state: TaskState) => state.error);