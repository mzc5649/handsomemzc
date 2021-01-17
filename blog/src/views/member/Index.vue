<template>
    <div v-if="user">
        123
    </div>

</template>

<script>
    import store from "../../store";

    export default {
        name: "Index",
        data() {
            return {

            }

        },
        created() {
            if(!!!store.state.user){
                store.dispatch('snackbar/openSnackbar',{
                    msg: '请先登录',
                });
                store.commit('SET_LOGIN_OR_REGISTER_DIALOG')
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        }
    }
</script>

<style scoped>

</style>
