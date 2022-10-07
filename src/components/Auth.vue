<template>
    <v-container fluid>
        <v-layout row justify-center>
            <v-flex xs10 order-lg2>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <div :class="{'signup-form': !showLoginForm}">
                                <br />
                                <form v-if="showLoginForm" @submit.prevent>
                                    <v-layout row>
                                        <h1 ref="LoginTitle">Log in</h1>
                                        <br />
                                        <br />
                                        <v-flex xs12>
                                            <v-text-field ref="LoginEmailTextField" data-cy="LoginEmailTextField" name="email" label="Mail" id="email"
                                                v-model.trim="loginForm.email" @keydown.space.prevent type="email"
                                                required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field ref="LoginPasswordTextField" data-cy="LoginPasswordTextField" name="password" label="Password" id="password"
                                                v-model.trim="loginForm.password" type="password" required>
                                            </v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-btn ref="LoginButton" data-cy="LoginButton" type="submit" color="primary" block large @click="login()">Log in
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </form>

                                <form v-if="!showLoginForm" @submit.prevent>
                                    <v-layout row>
                                        <h1 ref="SignUpTitle">Sign up</h1>
                                        <br />
                                        <br />
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field ref="SignUpEmailTextField" data-cy="login-email" name="email" label="Mail" id="email"
                                                v-model.trim="signupForm.email" @keydown.space.prevent type="email"
                                                required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-text-field ref="SignUpPasswordTextField" data-cy="login-password" name="password" label="Password"
                                                id="password" v-model.trim="signupForm.password" type="password"
                                                required></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-btn ref="SignUpButton" type="submit" color="primary" block large @click="signup()">Sign up
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </form>
                                
                                <br />
                                <transition name="fade">
                                    <div v-if="this.errorMsg !== ''" class="error-msg">
                                        <p>{{ this.errorMsg }}</p>
                                    </div>
                                </transition>
                            </div>

                            <div v-if="!showLoginForm">
                                <br />
                                <p>Already have an account?<a ref="LoginToggleForm" data-cy="LoginToggleForm" @click="toggleForm">Login</a></p>
                            </div>
                            <div v-else>
                                <br />
                                <p ref="NewToBambankText">New to Bambank<a @click="toggleForm">Sign up</a></p>
                            </div>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-overlay :value="this.loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-container>
</template>
  
<script>
import store from "../store/index";
import { mapState } from "vuex";

export default {
    name: 'AuthComponent',
    data() {
        return {
            loginForm: {
                email: "",
                password: "",
            },
            signupForm: {
                email: "",
                password: "",
            },
            showLoginForm: false,
        };
    },
    computed: {
        ...mapState(["loading", "errorMsg"]),
    },
    created() {
        store.commit("setErrorMessage", "");
    },
    methods: {
        toggleForm() {
            this.showLoginForm = !this.showLoginForm;
        },
        login() {
            store.dispatch("login", {
                email: this.loginForm.email,
                password: this.loginForm.password,
            });
        },
        signup() {
            store.dispatch("signUp", {
                email: this.signupForm.email,
                password: this.signupForm.password,
            });
        }
    },

};
</script>