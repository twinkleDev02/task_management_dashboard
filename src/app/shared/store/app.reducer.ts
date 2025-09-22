import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { TaskApiActions } from './app.actions';
// import { TaskApiActions, TaskPageActions } from './task.actions';
import { Task } from '../../task-management/modals/task.model';

// State interface for a collection of tasks
export interface TaskState extends EntityState<Task> {
    loading: boolean;
    error: any;
}

// Create an entity adapter for the Task interface
export const taskAdapter = createEntityAdapter<Task>();

// Define the initial state with loading and error flags
export const initialState: TaskState = taskAdapter.getInitialState({
    loading: false,
    error: null,
});

// Create the reducer with on functions for each action
const taskReducer = createReducer(
    initialState,

    // --- READ (Load) Actions ---
    on(TaskApiActions.loadTasks, state => ({ ...state, loading: true, error: null })),
    on(TaskApiActions.loadTasksSuccess, (state, { tasks }) =>
        taskAdapter.setAll(tasks, { ...state, loading: false, error: null })
    ),
    on(TaskApiActions.loadTasksFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // --- CREATE (Add) Actions ---
    on(TaskApiActions.addTask, state => ({ ...state, loading: true, error: null })),
    on(TaskApiActions.addTaskSuccess, (state, { task }) =>
        taskAdapter.addOne(task, { ...state, loading: false, error: null })
    ),
    on(TaskApiActions.addTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // --- UPDATE Actions ---
    on(TaskApiActions.updateTask, state => ({ ...state, loading: true, error: null })),
    on(TaskApiActions.updateTaskSuccess, (state, { task }) =>
        taskAdapter.updateOne({ id: task.id, changes: task }, { ...state, loading: false, error: null })
    ),
    on(TaskApiActions.updateTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // --- DELETE Actions ---
    on(TaskApiActions.deleteTask, state => ({ ...state, loading: true, error: null })),
    on(TaskApiActions.deleteTaskSuccess, (state, { id }) =>
        taskAdapter.removeOne(id, { ...state, loading: false, error: null })
    ),
    on(TaskApiActions.deleteTaskFailure, (state, { error }) => ({ ...state, loading: false, error })),
);

export function reducer(state: TaskState | undefined, action: any) {
    return taskReducer(state, action);
}