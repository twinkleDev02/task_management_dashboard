import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectAllTasks, selectTaskById } from "../store/app.selector";
import { Task } from "../../task-management/modals/task.model";
import { TaskApiActions } from "../store/app.actions";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    store = inject(Store);

    get task$() {
        console.log('Dispatching Load Tasks action');
        this.store.dispatch(TaskApiActions.loadTasks());   
        return this.store.select(selectAllTasks);
    }

    taskById(id: string) {
        return this.store.select(selectTaskById(id));
    }

    addTask(task: Task) {
        this.store.dispatch(TaskApiActions.addTask({ task }));
    }
    updateTask(task: Task) {
        this.store.dispatch(TaskApiActions.updateTask({ task }));
    }
    deleteTask(id: number) {
        this.store.dispatch(TaskApiActions.deleteTask({ id }));
    }
}