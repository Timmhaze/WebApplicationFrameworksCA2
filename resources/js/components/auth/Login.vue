<template>
        <div class = "card">
            <div class = "card-header">Login</div>

            <div class = "card-body">
                <form @submit.prevent='login()' class = "form">
                    <label>Email:</label>
                    <input class = "form-control" v-model = "email" type = "text" name = "Email"> <!-- Email field -->
                    <label>Password:</label>
                    <input class = "form-control" v-model = "password" type = "password" name = "password"> <!-- Password field -->
                    <br>
                    <button type = "submit" class = "btn btn-primary">Submit</button>
                    <router-link :to="{ name: 'register'}" class="btn btn-secondary">Register</router-link>
                    <p class="text-danger" v-if="errorMessage != ''">{{ errorMessage }}</p>
                </form>
            </div>
        </div>
</template>

<script>
    export default 
    {
        mounted() 
        {
            console.log('Login Component Loaded')
        },
        data()
        {
            return{
               email: "",
               password: ""
            }
        },
        methods:{
            login()
            {
                let app = this;
                console.log("Login Component Loaded");

                axios.post('api/login', {
                    email: app.email,
                    password: app.password
                })
                .then(function (response) {
                    localStorage.setItem('accessToken', response.data.token);
                    alert("You are now logged in under: " + app.email); //Alert user about successful login
                    app.$router.push({name: 'viewEnrolments'}); //Load view Enrolments component on success
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>
