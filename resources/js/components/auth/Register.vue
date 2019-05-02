<template>
    <div class = "card">
        <div class = "card-header">Register</div>
        <div class = "card-body">
            <form @submit.prevent='login()' class = "form">
                <label>Name:</label>
                <input class = "form-control" v-model = "name" type = "text" name = "name"> <!-- Name field -->
                <label>Email:</label>
                <input class = "form-control" v-model = "email" type = "text" name = "email"> <!-- Email field -->
                <label>Password:</label>
                <input class = "form-control" v-model = "password" type = "password" name = "password"> <!-- Password field -->
                <br>
                <button class = "btn btn-danger" @click="$router.go(-1)">Back</button> <!-- Programmatic Navigation - Go back 1 page -->
                <button type = "submit" class = "btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Register Component Loaded')
        },
        data()
        {
            return{
                name: "",
                email: "",  //Return object with values input by user
                password: ""
            }
        },
        methods:{
            login()
            {
                let app = this;
                axios.post('api/register', {
                    name: app.name,
                    email: app.email,   //Post to database with values from return statement
                    password: app.password
                })
                .then(function (response) {
                    alert("You have created a new account under: " + app.email); //Confirm account creation
                    app.$router.push({name: 'viewEnrolments'}); //Load viewEnrolments component when account created successfully
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error); //If failed log error
                });
            }
        }
    }
</script>
