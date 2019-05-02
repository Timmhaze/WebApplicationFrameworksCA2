<template>
    <div class = "card">
        <div class = "card-header">View Enrolments</div>
        <div class = "card-body">
        <router-link :to="{ name: 'viewCourses' }" class="btn btn-secondary">View Courses</router-link>
        <router-link :to="{ name: 'viewStudents' }" class="btn btn-secondary">View Students</router-link>   <!-- Links to load different components -->
        <router-link :to="{ name: 'createEnrolment'}" class="btn btn-secondary">Create</router-link>
            <table class = "table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Course ID</th>
                        <th>Student ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="enrolment in enrolments" v-bind:key ="enrolment.id">
                        <td>{{ enrolment.id }}</td>
                        <td>{{ enrolment.date }}</td>
                        <td>{{ enrolment.time }}</td>
                        <td>{{ enrolment.status }}</td>
                        <td>{{ enrolment.course_id }}</td>
                        <td>{{ enrolment.student_id }}</td>
                        <button class="btn btn-danger" v-on:click="deleteEnrolment(enrolment.id)">Delete</button>
                        &nbsp;
                        <router-link :to="{ name: 'editEnrolment', params: { id: enrolment.id } }" class="btn btn-warning">Edit</router-link>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default 
{
    mounted() { //Load function on component load
        console.log("View Enrolments Component Loaded");
        let app = this;
        let token = localStorage.getItem('accessToken');
        axios.get('api/enrolments', {
            headers: { Authorization: "Bearer " + token }  //Pass session token
        })
        .then(function (resp) {
            console.log(resp.data);
            app.enrolments = resp.data; //Set enrolments array to contain response data
        })
        .catch(function (resp) {
            console.log(resp);
            alert('Could not load Enrolments'); //Unable to retrieve the enrolments data from API
        });
    },
    data() { //Data to be returned 
        return{
            enrolments: []
        }
    },
    methods: { //Custom methods here
        deleteEnrolment(i) {
            var app = this;
            if (confirm("Are you sure you want to delete this enrolment (id =" + i + " )?")) {
                var token = localStorage.getItem('accessToken');
                axios.delete('/api/enrolments/' +  i, {
                    headers: { Authorization: "Bearer " + token }   //Set token to access token value, make delete request, passing access token
                })
                .then(function (resp) {
                    var index = app.enrolments.findIndex(function (thisEnrolment) {
                        return thisEnrolment.id == i;   //Find matching ID and splice out of array
                    });
                    app.enrolments.splice(index, 1);
                })
                .catch(function (resp) {
                    alert("Could not delete enrolment!!");
                });
            }
        }
    }
}
</script>