import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { App } from './app';
import { AppModule } from './app-module';

@NgModule({
  imports: [AppModule],
  providers: [],
  bootstrap: [App],
})
export class AppServerModule {}
