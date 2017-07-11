import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { App } from './app.component';
import { AppBar, NoteCard, NoteCreator, ColorPicker } from './ui';
import { NoteCardContainer, About, Auth, ChatClient } from './containers';
import { ApiService, NoteService, StoreService, AuthService } from './services';
import { routes } from './router';
import { Store } from './store';

@NgModule({
  declarations: [
    App,
    AppBar,
    NoteCard,
    NoteCardContainer,
    NoteCreator,
    ColorPicker,
    About,
    Auth,
    ChatClient
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [
    ApiService,
    NoteService,
    Store,
    StoreService,
    AuthService
  ],
  bootstrap: [App]
})
export class AppModule { }
