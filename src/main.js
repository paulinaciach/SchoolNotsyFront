import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import UsersList from './components/about/UsersList.vue';
import NotatkiData from './components/notes/NotatkiData.vue';
import Home from './components/home/Home.vue';
import NewNote from './components/notes/NewNote.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/about', component: UsersList }, 
    { path: '/notatki', component: NotatkiData },
    { path: '/', component: Home},
    { path: '/utworz', component: NewNote},
  ],
  linkActiveClass: 'active'
});

const app = createApp(App);

app.use(router);

app.mount('#app');
