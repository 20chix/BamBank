<template>
  <v-container>
    <h1>Email: {{ this.user.email}}</h1>
  </v-container>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: 'HomeComponent',
  computed: {
    ...mapState(["user"]),
  }
};
</script>