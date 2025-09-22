import { Component, inject, signal } from '@angular/core';
import { LoadingService } from './shared/service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('task-management');
  private readonly loading: LoadingService = inject(LoadingService);
  protected readonly loading$ = this.loading.loading$;
}
