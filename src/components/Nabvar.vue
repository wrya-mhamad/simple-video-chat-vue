<template>
  <v-container fluid>
    <v-app-bar
      dark
      color="grey darken-3"
      dense
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Simpel video Chat</v-toolbar-title>

      <v-spacer></v-spacer>

     <v-btn
      color="red"
      @click="logout"
     >
       Log out
     </v-btn>
    </v-app-bar>

    <v-navigation-drawer dark  v-model="drawer"  app  color="light-blue darken-3">
      <v-list flat>
        <v-subheader>Online user</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="user in users" :key="user.name">
             <v-list-item-icon>
            <v-icon>account_circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon @click="call(user.peer_id)">call</v-icon>
          </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <div  class="mx-3 my-3">
        
      </div>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  props: ['users'],
  data() {
    return{
      drawer: false,
    }
  },
  computed: {
    
  },
  methods: {
    call(peer_id){
      this.$emit('calll', peer_id)
    },
    logout(){
      this.$store.dispatch('logout')
      .then(() => this.$router.push({name: 'Login'}))
    }
  }
}
</script>