<template>
    <v-dialog persistent width="400" v-model="LoginOrRegisterDialog">
        <v-card>

        </v-card>
    </v-dialog>
</template>

<script>
    import { mapMutations, mapState } from 'vuex';
    export default {
        name: "LoginOrRegister",
        data(){
            return{

            }
        },
        created() {
        },
        computed:{
            ...mapState(["LoginOrRegisterDialog"])
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>
