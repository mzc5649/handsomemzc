<template>
    <v-navigation-drawer
            v-model="sideNav"
            fixed
            app
            style="z-index: 100"
    >
        <v-list >
        <v-list-item
                v-for="(item, index) in links"
                :key="index"
                link
                :to="item.link"
        >
            <v-list-item-icon>
                <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title> {{item.name}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Navigation",
        data(){
            return{
                links:[
                    {
                        name: 'Welcome',
                        icon: 'fa-home',
                        link: '/'
                    },
                    {
                        name: '博客',
                        icon: 'fa-edit',
                        link: '/blog/index'
                    },
                    {
                        name: '留言',
                        icon: 'fa-comment-o',
                        link: '/blog/msg'
                    }
                ]
            }
        },
        computed: {
            sideNav: {
                get() {
                    return this.$store.state.app.sideNav;
                },
                set(val) {
                    this.$store.commit('app/TOGGLE_SIDENAV', val);
                }
            }
        }
    }
</script>

<style scoped>

</style>
