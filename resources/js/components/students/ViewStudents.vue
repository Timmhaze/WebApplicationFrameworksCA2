<template>
    <div class = "card">
        <div class = "card-header">View Students</div>

        <div class = "card-body">
            Students
            <table class = "table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <!-- :key="course.id" -->
                <tbody>
                    <tr v-for="student in students" v-bind:key ="student.id">
                        <td>{{ student.id }}</td>
                        <td>{{ student.name }}</td>
                        <td>{{ student.address }}</td>
                        <td>{{ student.email }}</td>
                        <td>{{ student.phone }}</td>
                    </tr>
                </tbody>
            </table>
            <button class = "btn btn-danger" @click="$router.go(-1)">Back</button>
        </div>
    </div>
</template>

<script>
export default 
{
    mounted() {
        console.log("View Students Component Loaded");  //Get students axios request
        let app = this;
        let token = localStorage.getItem('accessToken');    //set variable token = to the session accessToken
        axios.get('api/students', {
            headers: { Authorization: "Bearer " + token }
        })
        .then(function (resp) {
            console.log(resp.data); //Log response object containing student data
            app.students = resp.data; //set students array = to returned object in response
        })
        .catch(function (resp) {
            console.log(resp);
            alert('Could not load students'); //If error alert user
        });
    },
    data() {
        return{
            students: [] //Array to hold student objects
        }
    }
}
</script>
