<template>
    <div>
        <!--头像-->
        <vs-avatar  circle size="36" style="border: 2px white solid">
            <img
                    v-if="user.uIcon"
                    :src="user.uIcon"
            />
            <span v-else style="">头像</span>

        </vs-avatar>
    </div>
</template>

<script>
    import {mapMutations, mapState,mapActions} from 'vuex';
    export default {
        name: "CurrentUser",
        data() {
            return {
                userNavs: [
                    {
                        icon: 'fa-pencil',
                        title: '写文章',
                        key: 'publish'
                    },
                    {
                        icon: 'fa-sign-out',
                        title: '退出',
                        key: 'exit'
                    }
                ]
            }
        },
        computed: {
            ...mapState(["user"])
        },
        methods:{
            ...mapActions(["serverExit"]),
            handlerUserNavs(type){
                let that=this;
                if(type=='exit'){
                    that.serverExit();
                }
            }
        }
    }
</script>

<style scoped>

</style>
