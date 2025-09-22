import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../task-management/modals/task.model';

// Actions for API interactions and side effects
export const TaskApiActions = createActionGroup({
    source: 'Tasks API',
    events: {
        'Load Tasks': emptyProps(),
        'Load Tasks Success': props<{ tasks: Task[] }>(),
        'Load Tasks Failure': props<{ error: any }>(),
        'Add Task': props<{ task: Task }>(),
        'Add Task Success': props<{ task: Task }>(),
        'Add Task Failure': props<{ error: any }>(),
        'Update Task': props<{ task: Task }>(),
        'Update Task Success': props<{ task: Task }>(),
        'Update Task Failure': props<{ error: any }>(),
        'Delete Task': props<{ id: number }>(),
        'Delete Task Success': props<{ id: number }>(),
        'Delete Task Failure': props<{ error: any }>(),
    },
});