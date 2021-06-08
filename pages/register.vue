<template>
    <v-main>
        <LikeBar />
        <div v-if="error" class="error">{{error.message}}</div>
        <div id="registerForm">
            <form @submit.prevent="pressed">
                Register
                <div class="email">
                    <input type="email" v-model="email" placeholder="Email">
                </div>
                <div class="password">
                    <input type="password" v-model="password" placeholder="Password">
                </div>
                <button tpe="Submit">Register</button>
            </form>
        </div>
    </v-main>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
    methods: {
        pressed(){
            alert('submitted')
        }
    },
    data(){
        return{
            email:'',
            password:'',
            error:'',
        }
    }
}
</script>

<style>

</style>