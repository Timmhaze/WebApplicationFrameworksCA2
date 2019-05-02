<template>
    <div class="card card-default">
        <div class="card-header">Create an Enrolment</div>
        <div class="card-body">
            <form v-on:submit="saveForm()">
                <label>Date</label>
                <input class = "form-control" v-model="enrolment.date" type = "date">
                <p class="text-danger" v-if="errors.date">{{ errors.date[0] }}</p>
                <label>Time</label>
                <input class = "form-control" v-model="enrolment.time" type = "time">
                <p class="text-danger" v-if="errors.time">{{ errors.time[0] }}</p>

                <label>Status</label>
                <select class = "form-control" v-model="enrolment.status" name = "status">
                    <option value = "attending">attending</option>
                    <option value = "registered">registered</option>
                    <option value = "deferred">deferred</option>
                    <option value = "withdrawn">withdrawn</option>
                </select>
                <p class="text-danger" v-if="errors.status">{{ errors.status[0] }}</p>

                <label>Course ID</label>
                <select class = "form-control" v-model="enrolment.course_id" name = "course_id">
                    <option v-for ="course in courses" :value="course.id" v-bind:key ="course.id">{{ course.title }}</option>
                </select>
                <p class="text-danger" v-if="errors.course">{{ errors.courses[0] }}</p>
                
                <label>Student ID</label>
                <select class = "form-control" v-model="enrolment.student_id" name = "student_id">
                    <option v-for ="student in students" :value="student.id" v-bind:key ="student.id">{{ student.name }}</option>
                </select>
                <p class="text-danger" v-if="errors.students">{{ errors.students[0] }}</p>
                <br>
                <button class = "btn btn-danger" @click="$router.go(-1)">Back</button>
                <button type = "submit" class = "btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                enrolment: {
                    date: "",
                    time: "",
                    status: "", //Enrolment object stores values for a new enrolment
                    course_id: "",
                    student_id: ""
                },
                errors: {}, //Array to store errors
                courses: [],
                students: []
            }
        },

        mounted() {
            let app = this;
            let token = localStorage.getItem('accessToken');
            axios.get('api/students', {
            headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.students = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load students');
            });

            axios.get('api/courses', {
                headers: { Authorization: "Bearer " + token }
            })
            .then(function (resp) {
                console.log(resp.data);
                app.courses = resp.data;
            })
            .catch(function (resp) {
                console.log(resp);
                alert('Could not load courses');
            });
        },

        methods: {
            saveForm(){
                event.preventDefault();
                let app = this;
                let newEnrolment = app.enrolment;

                var token = localStorage.getItem('accessToken');

                axios.post('api/enrolments', newEnrolment, {
                    headers: {
                         Authorization: "Bearer " + token 
                    }
                })
                .then(function (resp){
                    console.log(resp);
                    app.enrolment = resp.data;
                    app.$router.push({path: 'viewEnrolments'}) //Load view Enrolments component once form saves successfully
                })
                .catch(function (resp){
                    console.log(resp);
                    app.errors = resp.response.data;
                });
            }
        }
    }
</script>