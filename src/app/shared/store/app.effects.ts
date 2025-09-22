import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { TaskService } from '../../task-management/service/task-service';
import { TaskApiActions } from './app.actions';
import { Task } from '../../task-management/modals/task.model';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskApiActions.loadTasks),
      switchMap(() =>
        this.taskService.fetchTasks().pipe(
          map((tasks: Task[]) => TaskApiActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskApiActions.loadTasksFailure({ error })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskApiActions.addTask),
      switchMap(({ task }) =>
        this.taskService.addTask(task).pipe(
          switchMap(() => this.taskService.fetchTasks()),
          map((tasks: Task[]) => TaskApiActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskApiActions.addTaskFailure({ error })))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskApiActions.updateTask),
      switchMap(({ task }) =>
        this.taskService.updateTask(task.id.toString(), task).pipe(
          switchMap(() => this.taskService.fetchTasks()),
          map((tasks: Task[]) => TaskApiActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskApiActions.updateTaskFailure({ error })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskApiActions.deleteTask),
      switchMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          switchMap(() => this.taskService.fetchTasks()),
          map((tasks: Task[]) => TaskApiActions.loadTasksSuccess({ tasks })),
          catchError(error => of(TaskApiActions.deleteTaskFailure({ error })))
        )
      )
    )
  );
}
