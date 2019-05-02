
require('./bootstrap');

import Vue from 'vue';
import VueRouter from 'vue-router'; //Import Vue and Vue router

Vue.use(VueRouter);

import LoginComponent from './components/auth/Login.vue';
import RegisterComponent from './components/auth/Register.vue';
import ViewCourses from './components/courses/ViewCourses.vue';
import ViewStudents from './components/students/ViewStudents.vue';
import CreateEnrolment from './components/enrolments/CreateEnrolment.vue';  //Import components
import ViewEnrolments from './components/enrolments/ViewEnrolments.vue';
import EditEnrolment from './components/enrolments/EditEnrolment.vue'


let routerArray = [
    {
        path: '/',
        name: 'login',
        component: LoginComponent   //Deafult load page
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterComponent
    },
    {
        path: '/viewCourses',
        name: 'viewCourses',
        component: ViewCourses
    },
    {
        path: '/viewStudents',
        name: 'viewStudents',   //Set Vue routes, defining URL path, reference name of components and components themselves
        component: ViewStudents
    },
    {
        path: '/createEnrolment',
        name: 'createEnrolment',
        component: CreateEnrolment
    },
    {
        path: '/viewEnrolments',
        name: 'viewEnrolments',
        component: ViewEnrolments
    },
    {
        path: '/editEnrolment/:id',
        name: 'editEnrolment',
        component: EditEnrolment,
        props: true
    }
]

const router = new VueRouter({ //Vue Router Array object
    routes: routerArray 
});

const app = new Vue({
    el: '#app',
    router: router
});
