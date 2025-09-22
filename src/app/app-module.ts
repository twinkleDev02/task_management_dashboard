import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { SharedModule } from './shared/shared/shared-module';
import { AddOrEdit } from './task-management/components/add-or-edit/add-or-edit';
import { ReactiveFormsModule } from '@angular/forms';
import { provideStore, StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { reducers, metaReducers } from './shared/store';
import { TaskEffects } from './shared/store/app.effects';

@NgModule({
  declarations: [
    App,
    AddOrEdit,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideStore(reducers, { metaReducers }),
    provideEffects([TaskEffects]),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([loadingInterceptor, errorInterceptor])),
  ],
  bootstrap: [App]
})
export class AppModule { }
