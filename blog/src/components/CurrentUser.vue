<template>
    <v-menu :nudge-left="46" :nudge-bottom="10" offset-y >
        <template v-slot:activator="{on}" >
            <v-avatar size="36" v-on="on" style="cursor: pointer;">
                <img :src="user.uIcon"/>
            </v-avatar>
        </template>
        <v-list v-for="item in userNavs" :key="item.key">
            <v-btn block text elevation="0" class="justify-start" @click="handlerUserNavs(item.key)">
                <v-icon>{{item.icon}}</v-icon>
                {{item.title}}
            </v-btn>
        </v-list>

    </v-menu>
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
                    that.serverExit(that);
                }
            }
        }
    }
</script>

<style scoped>

</style>
