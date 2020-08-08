<template>
  <v-container fill-height>
      <v-row align="center" justify="center">
         <v-col
            cols="12"
            sm="8"
            md="4"
         >
            <v-form ref="form">
                <v-text-field
                label="Enter your Name"
                append-icon="account-box"
                class="my-3"
                v-model="name"
                :rules="[v => !!v || 'Name must filled']"
            ></v-text-field>
            <v-btn
                color="primary"
                block
                @click="submit"
            >Join</v-btn>
            </v-form>
         </v-col>
      </v-row>

      <v-snackbar
        v-model="error"
        color="red"
      >
        This name is duplicate!
        <v-btn
            text
            color="white"
        >
            close
        </v-btn>
      </v-snackbar>
  </v-container>
</template>

<script>
import io from 'socket.io-client'
export default {
    data: () =>{
        return {
            socket: {},
            name: '',
            error: false
        }
    },
    created(){
        this.socket = io('/')
        this.socket.on('duplicate', () => this.error = true)
        this.socket.on('success_join', () => {
            localStorage.setItem('user', JSON.stringify({name: this.name}))
            this.$router.push({name: 'Main'})
        })
    },
    methods: {
        submit(){
            if (this.$refs.form.validate()) {
                this.socket.emit('join', this.name)
            }
        }
    }
}
</script>

<style>

</style>