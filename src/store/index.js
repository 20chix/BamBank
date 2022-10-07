import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import router from "../router/";
const firebase = require("./firebaseConfig.js");


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loading: false,
    errorMsg: "",
    user: null
  },

  actions: {
    async signUp(context, payload) {
      this.commit("setLoading", true);
      await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          // Signed in 
          this.commit("setUser", userCredential.user);
          router.push("/");
        })
        .catch((error) => {
          this.commit("setErrorMessage", error.message);
        });
      this.commit("setLoading", false);
    },

    async login(context, payload) {
      this.commit("setLoading", true);
      await firebase.auth().signInWithEmailAndPassword(
          payload.email,
          payload.password
        ).then((user) => {
          this.commit("setUser", user.user);
          router.push("/");
        })
        .catch((err) => {
          this.commit("setErrorMessage", err.message);
        });
        this.commit("setLoading", false);

    },
  },

  mutations: {
    setLoading(state, val) {
      if (val) {
        state.loading = val;
      } else {
        state.loading = false;
      }
    },
    setUser(state, val) {
      if (val) {
        state.user = val;
      } else {
        state.user = [];
      }
    },
    setErrorMessage(state, val) {
      if (val) {
        state.errorMsg = val;
      } else {
        state.errorMsg = null;
      }
    },
  },
  plugins: [createPersistedState()],
  modules: {
  }
})

export default store
