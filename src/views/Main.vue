<template>
  <v-main>
    <Navbar :users="users" @calll="call" />
    <v-container>
        <v-row align="center" justify="center">
            <v-col>
                <video ref="local"></video>
            </v-col>
            <v-col>
                <video  ref="remote"></video>
            </v-col>
        </v-row>
    </v-container>
  </v-main>
</template>
<script>
import Navbar from "../components/Nabvar";
import io from 'socket.io-client'
import Peer from "peerjs";


export default {
    data: () => {
        return {
            users: [],
            incall: false,
            self_id: '',
            peer: {},
        }
    },
    created(){
        this.socket = io('/')
        this.socket.on('users_list', (users) => this.users = users)
        this.openStream()
        .then(stream => {
            //this.stream = stream
            const video = this.$refs.local
            console.log(video);
            video.srcObject = stream;
            video.play();
        })

        this.peer = new Peer(undefined,{ 
            key: 'peerjs',
            host: 'mpeer.herokuapp.com',
            secure: true,
            port: 443,
        });

        this.peer.on('open', (id) => {
            this.socket.emit('update', {id, name: JSON.parse(localStorage.getItem('user')).name})
        })

        this.peer.on('call', call => {
            this.openStream()
            .then(stream => {
                call.answer(stream);
                call.on('stream', remoteStream => {
                    this.incall = true
                    const video = this.$refs.remote
                    console.log(video);
                    video.srcObject = remoteStream;
                    video.play();
                });
            });
        });

        this.socket.emit('login', JSON.parse(localStorage.getItem('user')).name)
        
    },
    methods: {
        call(peer_id){
            this.openStream()
        .then(stream => {
            //this.stream = stream
            const video = this.$refs.local
            video.srcObject = stream;
            video.play();
            const call = this.peer.call(peer_id, stream);
        call.on('stream', remoteStream => {
            this.incall = true
                    const video = this.$refs.remote
                    video.srcObject = remoteStream;
                    video.play();
        });
        })
        
        },
        openStream(){
            const config = { audio: false, video: true };
            return navigator.mediaDevices.getUserMedia(config)
        }
    },
    components:{
        Navbar
    }
}
</script>

<style>

</style>