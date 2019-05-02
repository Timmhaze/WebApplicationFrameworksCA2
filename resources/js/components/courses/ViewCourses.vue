<template>
    <div class = "card">
        <div class = "card-header">View Courses</div>
        <div class = "card-body">
            Courses Available
            <table class = "table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Points</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in courses" v-bind:key ="course.id">
                        <td>{{ course.id }}</td>
                        <td>{{ course.title }}</td>
                        <td>{{ course.code }}</td>
                        <td>{{ course.description }}</td>
                        <td>{{ course.points }}</td>
                        <td>{{ course.level }}</td>
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
        console.log("View Courses Component Loaded");
        let app = this;
        let token = localStorage.getItem('accessToken');
        axios.get('api/courses', {
            headers: { Authorization: "Bearer " + token }
        })
        .then(function (resp) {
            console.log(resp.data); //Get courses and load into courses array
            app.courses = resp.data;
        })
        .catch(function (resp) {
            console.log(resp);
            alert('Could not load courses');
        });
    },
    data() {
        return{
            courses: []
        }
    }
}
</script>
