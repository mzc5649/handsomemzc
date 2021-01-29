<template>
    <div>
        <vs-navbar padding-scroll fixed shadow v-model="activeBar">
            <template #left>
                <span v-show="device == 'desktop'" class="magictime vanishIn">
                  Handsomemzc
                </span>
                <span class="magictime twisterInUp" @click="openSideNav" v-show="device == 'mobile'" style="font-size: 20px">
                  <i class="fas fa-bars"></i>
                </span>
            </template>
            <span v-if="device == 'desktop'">
                <vs-navbar-item   to="/" id="Index">
                    Welcome
                </vs-navbar-item>
                <vs-navbar-item :active="activeBar=='BlogIndex'"   to="/blog" id="BlogIndex">
                    博客
                </vs-navbar-item>
                <vs-navbar-item :active="activeBar=='BlogMessage'"  to="/blog/msg" id="BlogMessage">
                    留言
                </vs-navbar-item>
            </span>
            <span v-show="device == 'mobile'" class="magictime vanishIn">
                Handsomemzc
            </span>
            <template #right>
                <vs-tooltip v-show="dark=='dark'" bottom>
                    <vs-button icon shadow @click="handleChangeTheme">
                        <i class="fas fa-sun fa-lg magictime slideUpReturn "></i>
                    </vs-button>
                    <template #tooltip>
                        日间模式
                    </template>
                </vs-tooltip>
                <vs-tooltip v-show="dark=='light'" bottom>
                    <vs-button icon shadow @click="handleChangeTheme">
                        <i class="fas fa-moon fa-lg magictime slideUpReturn"></i>
                    </vs-button>
                    <template #tooltip>
                        夜间模式
                    </template>
                </vs-tooltip>
                <vs-tooltip bottom v-if="!user">
                    <vs-button icon shadow v-if="!user" @click="SET_LOGIN_OR_REGISTER_DIALOG">
                        <i class="fas fa-user fa-lg animate__animated animate__rubberBand"/>
                    </vs-button>
                    <template slot="tooltip">
                        登录
                    </template>
                </vs-tooltip>
                <template v-else>
                    <CurrentUser></CurrentUser>
                </template>
            </template>
        </vs-navbar>

        <div style="margin-top: 84px">
            <vs-row justify="center">
                <vs-col :lg="10" :md="10" :sm="12" :xs="12">
                    <transition
                            :duration="500"
                            name="custom-classes-transition"
                            enter-active-class="animate__animated animate__fadeIn"
                            leave-active-class="animate__animated animate__fadeOut"
                            mode="out-in"
                    >
                        <router-view :key="$route.fullPath"/>
                    </transition>
                </vs-col>
            </vs-row>
        </div>
        <Footer></Footer>
        <div id="aplayer" ref="aplayer" class="aplayer"></div>
        <div
                ref="audioLoading"
                v-if="!audios"
                style="position: fixed;z-index: 100;bottom: 0;left: 0;width: 84px;height: 66px;background-color: white"
        ></div>
        <LoginOrRegister></LoginOrRegister>
        <Snackbar/>
        <Navigation v-if="device === 'mobile'"></Navigation>
        <div v-if="device === 'mobile'&&sideNav" class="drawer-bg" @click="handleClickOutside"></div>

    </div>
</template>

<script>
    import "aplayer/dist/APlayer.min.css";
    import APlayer from "aplayer";
    import {mapMutations, mapState, mapActions} from "vuex";
    import LoginOrRegister from "../components/LoginOrRegister";
    import CurrentUser from "../components/CurrentUser";
    import Snackbar from "@/components/Snackbar.vue";
    import ResizeHandler from "../utils/mixins/ResizeHandler";
    import Navigation from "../components/Navigation";
    import Footer from "../components/Footer";
    import Music from "../api/music";
    import LeftSide from "../components/LeftSide";

    export default {
        name: "Blog",
        components: {
            LeftSide,
            Footer,
            Navigation,
            CurrentUser,
            LoginOrRegister,
            Snackbar,
        },
        data() {
            return {
                activeBar:'',
                isSideNavShow: false,
                audios: "",
            };
        },
        mixins: [ResizeHandler],
        created() {
            const that = this;
            this.activeBar=this.$route.name
            that.serverInit();
        },
        mounted() {
            const that = this;
            this.$nextTick(() => {
                const audioLoading = this.$vs.loading({
                    target: this.$refs["audioLoading"],
                    type: "square",
                    text: "音乐加载中"
                });

                if (this.dark == 'dark') {
                    if (!document.body.hasAttribute("vs-theme")) {
                        document.body.setAttribute("vs-theme", "dark");
                    }
                }
                const music = new Music();
                music.getAplayerDataById({id: "5197713080"}).then(res => {
                    this.audios = res;
                    const options = {
                        container: document.getElementById("aplayer"),
                        lrcType: 2,
                        fixed: true,
                        autoplay: false,
                        listFolded: false,
                        order: "list",
                        preload: "auto",
                        audio: this.audios
                    };
                    const ap = new APlayer(options);
                });


            })
        },
        computed: {
            ...mapState(["user"]),
            device() {
                return this.$store.state.app.device;
            },
            dark() {
                return this.$store.state.app.dark;
            },
            sideNav(){
                return this.$store.state.app.sideNav;
            },
        },
        methods: {
            ...mapMutations(["SET_LOGIN_OR_REGISTER_DIALOG"]),
            ...mapActions(["serverInit"]),
            //改变主题
            handleChangeTheme() {
                if (!document.body.hasAttribute("vs-theme")) {
                    document.body.setAttribute("vs-theme", "dark");
                    this.$store.dispatch("app/toggleDark", 'dark');
                } else {
                    document.body.removeAttribute("vs-theme");
                    this.$store.dispatch("app/toggleDark", 'light');
                }
                const aplayer = this.$refs.aplayer;
                if (this.$store.state.app.dark == 'dark') {
                    if (this.audios) {
                        aplayer.style.background = "#151515";
                        aplayer.getElementsByClassName("aplayer-body")[0].style.background =
                            "#151515";
                    }
                } else {
                    if (this.audios) {
                        aplayer.style.background = "#fff";
                        aplayer.getElementsByClassName("aplayer-body")[0].style.background =
                            "#fff";
                    }
                }
            },
            //打开侧边栏
            openSideNav() {
                this.$store.dispatch("app/toggleSideNav", true);
            },
            handleClickOutside(){
                this.$store.dispatch("app/toggleSideNav", false);
            }
        },
        destroyed() {
        }
    };
</script>
<style lang="scss">


    #aplayer {
    }


    body {
        background-color: var(--background-color);

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

    #nprogress {
        .bar {
            z-index: 15031;
        }

        .spinner {
            z-index: 15031;
        }
    }


</style>
<style lang="scss" scoped>
    .drawer-bg{
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        width: 100%;
        position: fixed;
        z-index: 9999;

    }
</style>
