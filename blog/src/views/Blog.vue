<template>
    <v-app id="blog">
        <v-app-bar app dense :height="56" flat fixed>
            <div class="toolbar-content container">
                <v-btn icon v-if="device === 'mobile'" @click="openSideNav()">
                    <v-icon>fa-bars</v-icon>
                </v-btn>
                <div class="toolbar-title">handsomemzc</div>
                <div class="toolbar-nav" v-if="device === 'desktop'">
                    <v-btn elevation="0" tile text to="/">Welcome</v-btn>
                    <v-btn elevation="0" tile text to="/blog/index">博客</v-btn>
                    <v-btn elevation="0" tile text to="/blog/msg">留言</v-btn>
                </div>
                <div class="toolbar-action">
                    <v-btn icon @click="handleChangeTheme()">
                        <v-tooltip bottom v-if="$vuetify.theme.dark">
                            <template v-slot:activator="{on}">
                                <v-icon v-on="on">fa-sun-o</v-icon>
                            </template>
                            <span>白天模式</span>
                        </v-tooltip>
                        <v-tooltip bottom v-else>
                            <template v-slot:activator="{on}">
                                <v-icon v-on="on">fa-moon-o</v-icon>
                            </template>
                            <span>夜间模式</span>
                        </v-tooltip>
                    </v-btn>
                    <!--                    <v-btn text small v-if="user">-->
                    <!--                        <v-icon>fa-bell</v-icon>-->
                    <!--                    </v-btn>-->
                    <v-btn icon v-if="!user" elevation="0" @click="SET_LOGIN_OR_REGISTER_DIALOG">
                        <v-tooltip bottom>
                            <template v-slot:activator="{on}">
                                <v-icon v-on="on">fa-user-o</v-icon>
                            </template>
                            <span>登录</span>
                        </v-tooltip>
                    </v-btn>
                    <div class="pl-2" v-else>
                        <CurrentUser></CurrentUser>
                    </div>
                </div>
            </div>
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <transition
                        :duration="1000"
                        name="custom-classes-transition"
                        enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                        mode="out-in"
                >
                    <router-view class="animate__animated animate__fadeIn"/>
                </transition>
            </v-container>
        </v-main>
        <v-footer app absolute padless>
            <Footer></Footer>
        </v-footer>
        <div id="aplayer" ref="aplayer" class="aplayer">
        </div>
        <div v-loading="!audios"
             v-if="!audios"
             style="position: fixed;z-index: 100;bottom: 0;left: 0;width: 84px;height: 66px;background-color: white">
        </div>


        <LoginOrRegister></LoginOrRegister>
        <Snackbar/>
        <Navigation v-if="device === 'mobile'"></Navigation>
    </v-app>

</template>

<script>
    import axios from "axios";
    import 'aplayer/dist/APlayer.min.css';
    import APlayer from 'aplayer';
    import {mapMutations, mapState, mapActions} from 'vuex';
    import LoginOrRegister from "../components/LoginOrRegister";
    import CurrentUser from "../components/CurrentUser";
    import Snackbar from '@/components/Snackbar.vue'
    import ResizeHandler from '../utils/mixins/ResizeHandler';
    import Navigation from "../components/Navigation";
    import Footer from "../components/Footer";
    import Music from '../api/music'

    export default {
        name: "Blog",
        components: {Footer, Navigation, CurrentUser, LoginOrRegister, Snackbar},
        data() {
            return {
                isSideNavShow: false,
                audios: ''
            }
        },
        mixins: [ResizeHandler],
        created() {
            const that = this;
            that.serverInit(that);


        },
        mounted() {
            const that = this;
            const h = new Date().getHours();
            this.$vuetify.theme.dark = (h >= 19 && h <= 24) || (h >= 0 && h <= 7);
            const music = new Music();
            music.getAplayerDataById({id: '5197713080'}).then(res => {
                this.audios = res;
                const options = {
                    container: document.getElementById('aplayer'),
                    lrcType: 2,
                    fixed: true,
                    autoplay: false,
                    listFolded: false,
                    order: 'list',
                    preload: 'auto',
                    audio: this.audios
                };
                const ap = new APlayer(options);
            })


        },
        computed: {
            ...mapState(["user"]),
            device() {
                return this.$store.state.app.device
            }

        },
        methods: {
            ...mapMutations(['SET_LOGIN_OR_REGISTER_DIALOG']),
            ...mapActions(["serverInit"]),
            //改变主题
            handleChangeTheme() {
                let that = this;
                that.$vuetify.theme.dark = !that.$vuetify.theme.dark;
                var aplayer = that.$refs.aplayer;
                if (that.$vuetify.theme.dark) {
                    aplayer.style.background = '#151515'
                    aplayer.getElementsByClassName('aplayer-body')[0].style.background = '#151515';
                } else {
                    aplayer.style.background = '#fff'
                    aplayer.getElementsByClassName('aplayer-body')[0].style.background = '#fff';
                }
            },
            openSideNav() {
                this.$store.dispatch('app/toggleSideNav', true)
            }
        }
    }

</script>
<style lang="scss">
    #aplayer {

    }

    .theme--dark {
        .index {
            .v-note-wrapper.markdown-body {
                background-color: inherit;
                color: white;
            }

            .v-note-op {
                border-bottom: 1px solid black;
            }

            .auto-textarea-wrapper {
                .auto-textarea-input {
                    color: white;
                }
            }

        }
    }

    html {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    ::-webkit-scrollbar {
        width: 8px;
        height: 6px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: #cbcbcb;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: rgb(187, 187, 187);
    }

    ::-webkit-scrollbar-track-piece {
        background: #eee;
    }
</style>
<style lang="scss" scoped>
    .theme--light.v-application {
        background-color: #f4f4f4;
    }

    .theme--light.v-app-bar.v-toolbar.v-sheet {
        background-color: #fff;
    }

    .theme--dark.v-app-bar.v-toolbar.v-sheet {
        background-color: #151515;
    }

    .toolbar-content {
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        display: flex;
        padding: 0;

        .toolbar-nav {
            height: 100%;

            .v-btn {
                min-width: 80px;
                margin: 0 6px;
                height: 100%;
                border: none;
            }
        }

        .toolbar-title {
            font-weight: 700;
        }

        .toolbar-action {
            display: flex;
            align-items: center;
        }


    }


</style>
