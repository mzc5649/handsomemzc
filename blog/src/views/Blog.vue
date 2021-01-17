<template>
    <div>
        <vs-navbar padding-scroll fixed shadow center-collapsed v-model="active">
            <template #left>handsomemzc</template>
            <vs-navbar-item :active="active == 'welcome'" to="/" id="welcome">
                Welcome
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'blog'" to="/blog/index" id="blog">
                博客
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'message'" to="/blog/msg" id="message">
                留言
            </vs-navbar-item>
            <template #right>
                <vs-tooltip v-show="dark" bottom>
                    <vs-button icon shadow @click="handleChangeTheme">
                        <i class="fas fa-sun fa-lg"></i>
                    </vs-button>
                    <template #tooltip>
                        日间模式
                    </template>
                </vs-tooltip>
                <vs-tooltip v-show="!dark" bottom>
                    <vs-button icon shadow @click="handleChangeTheme">
                        <i class="fas fa-moon fa-lg"></i>
                    </vs-button>
                    <template #tooltip>
                        夜间模式
                    </template>
                </vs-tooltip>
                <vs-tooltip bottom v-if="!user">
                    <vs-button icon shadow v-if="!user" @click="SET_LOGIN_OR_REGISTER_DIALOG">
                        <i class="fas fa-user fa-lg"/>
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
                        <router-view/>
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
        <!--        <Navigation v-if="device === 'mobile'"></Navigation>-->
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
                active: "blog",
                isSideNavShow: false,
                audios: "",
            };
        },
        mixins: [ResizeHandler],
        created() {
            const that = this;
            that.serverInit();
        },
        mounted() {
            const that = this;
            this.$nextTick(() => {
                const audioLoading = this.$vs.loading({
                    target: this.$refs["audioLoading"],
                    type: "square",
                    // color: "#d5397b",
                    text: "Loading..."
                });
                const h = new Date().getHours();
                const flag = (h >= 19 && h <= 24) || (h >= 0 && h <= 7);
                if (flag) {
                    this.$store.dispatch("app/toggleDark", flag);
                    if (!document.body.hasAttribute("vs-theme")) {
                        document.body.setAttribute("vs-theme", "dark");
                    }
                    //通知
                    that.$vs.notification({
                        progress: "auto",
                        position: "bottom-right",
                        title: "夜间模式",
                        text: "夜晚到了，已自动为您开启夜间模式，右上角可切换。"
                    });
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
            }
        },
        methods: {
            ...mapMutations(["SET_LOGIN_OR_REGISTER_DIALOG"]),
            ...mapActions(["serverInit"]),
            //改变主题
            handleChangeTheme() {
                if (!document.body.hasAttribute("vs-theme")) {
                    document.body.setAttribute("vs-theme", "dark");
                    this.$store.dispatch("app/toggleDark", true);
                } else {
                    document.body.removeAttribute("vs-theme");
                    this.$store.dispatch("app/toggleDark", false);
                }
                const aplayer = this.$refs.aplayer;
                if (this.$store.state.app.dark) {
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
            }
        },
        destroyed() {
        }
    };
</script>
<style lang="scss">
    :root {
        --theme-background: #f4f4f4;
        --theme-text: #2c3e50;
        --theme-card-bg: white;
        --theme-md-bg: #f6f8fa;
    }

    #aplayer {
    }

    html {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    body {
        background-color: var(--theme-background, rgb(244, 244, 244));
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
<style lang="scss" scoped></style>
