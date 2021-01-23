<template>
    <div>
        <vs-sidebar  v-model="activeBar" :open="sideNav">
            <template v-for="item in links">
                <vs-sidebar-item  :to="item.link" :id="item.id">
                    <template #icon>
                        <i class='fas'  :class="item.icon"></i>
                    </template>
                    {{item.name}}
                </vs-sidebar-item>
            </template>
            <template #footer>
                <div v-if="user">
                        <vs-avatar @click="jumpToMemberCenter">
                            <img :src="user.uIcon" alt="">
                        </vs-avatar>
                </div>
            </template>
        </vs-sidebar>
    </div>
</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
                activeBar:'',
                links: [
                    {
                        name: 'Welcome',
                        id:'Index',
                        icon: 'fa-home',
                        link: '/'
                    },
                    {
                        name: '博客',
                        id:'BlogIndex',
                        icon: 'fa-blog',
                        link: '/blog'
                    },
                    {
                        name: '留言',
                        id:'BlogMessage',
                        icon: 'fa-comment',
                        link: '/blog/msg'
                    }
                ]
            }
        },
        created() {
            this.activeBar=this.$route.name
        },
        computed: {
            sideNav: {
                get() {
                    return this.$store.state.app.sideNav;
                },
                set(val) {
                    this.$store.commit('app/TOGGLE_SIDENAV', val);
                }
            },
            user(){
                return this.$store.state.user
            }
        },
        methods:{
            jumpToMemberCenter(){
                this.$router.push({
                    path:'/blog/member/'+this.user.uId
                })
            }
        }
    }
</script>

<style scoped>

</style>
