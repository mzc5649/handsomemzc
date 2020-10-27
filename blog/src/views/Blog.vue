<template>
    <v-app id="blog">
        <v-app-bar app dense :height="56" flat fixed>
            <div class="toolbar-content container">
                <div class="toolbar-title">handsomemzc</div>
                <div class="toolbar-nav">
                    <v-btn elevation="0" tile text to="/">首页</v-btn>
                    <v-btn elevation="0" tile text to="/blog/index">博客</v-btn>
                    <v-btn elevation="0" tile text to="/blog/msg">留言</v-btn>
                    <v-btn elevation="0" tile text>其他</v-btn>
                </div>
                <div class="toolbar-action">
                    <v-btn text small @click="handleChangeTheme()">
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
                    <v-btn text small v-if="user">
                        <v-icon>fa-bell</v-icon>
                    </v-btn>
                    <v-btn v-if="!user" elevation="0" color="primary" @click="SET_LOGIN_OR_REGISTER_DIALOG">
                        登录
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
        <v-footer app absolute>
            <v-footer absolute class="d-flex justify-center">
                    {{ new Date().getFullYear() }} — <strong>handsomemzc</strong>
            </v-footer>
        </v-footer>
        <div id="aplayer" ref="aplayer" class="aplayer"></div>
        <LoginOrRegister></LoginOrRegister>
    </v-app>

</template>

<script>
    import axios from "axios";
    import 'APlayer/dist/APlayer.min.css';
    import APlayer from 'APlayer';
    import {mapMutations, mapState, mapActions} from 'vuex';
    import LoginOrRegister from "../components/LoginOrRegister";
    import CurrentUser from "../components/CurrentUser";

    export default {
        name: "Blog",
        components: {CurrentUser, LoginOrRegister},
        data() {
            return {}
        },
        created() {
            let that = this;
            that.serverInit(that)
        },
        mounted() {
            const h = new Date().getHours();
            this.$vuetify.theme.dark = (h >= 19 && h <= 24) || (h >= 0 && h <= 7);
        },
        computed: {
            ...mapState(["user"])
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

            }
        }
    }
    //音乐
    axios.get("/music/playlist/detail", {
        params: {
            id: '5197713080'
        }
    }).then(function (res) {
        //获取歌曲id
        var trackIds = res.data.playlist.trackIds;
        var ids = '';
        for (let i = 0; i < trackIds.length; i++) {
            let id = trackIds[i].id;
            ids = ids + id + ','
        }
        ids = ids.substring(0, ids.length - 1)
        //获取音乐详情
        axios.get("/music/song/detail", {
            params: {
                ids: ids
            }
        }).then(function (res) {
            var audios = [];
            //音乐详情
            var songs = res.data.songs;
            //获取音乐url
            axios.get("/music/song/url", {
                params: {
                    id: ids
                }
            }).then(function (res1) {
                var urls = res1.data.data;
                let urlMap = new Map();
                for (let k of urls) {
                    urlMap.set(k.id, k.url);
                }
                for (let i = 0; i < songs.length; i++) {
                    var song = {};
                    //歌曲名
                    song.name = songs[i].name;
                    //作者名称
                    let ars = songs[i].ar;
                    let artist = ''
                    for (let j = 0; j < ars.length; j++) {
                        artist += ars[j].name + '/'
                    }
                    song.artist = artist.substring(0, artist.length - 1)
                    //url
                    song.url = urlMap.get(songs[i].id);
                    //封面
                    song.cover = songs[i].al.picUrl;
                    //歌词
                    $.ajax({
                            url: "/music/lyric",//请求路径
                            data: {id: songs[i].id},
                            async: false,
                            type: "GET",//GET
                            success: function (res) {
                                if (res.tlyric != undefined && res.tlyric.lyric) {
                                    song.lrc = res.tlyric.lyric;
                                } else if (res.lrc != undefined && res.lrc.lyric) {
                                    song.lrc = res.lrc.lyric;
                                } else {
                                    song.lrc = "暂无歌词"
                                }

                            },
                            error: function (a, b, c) {
                                //a,b,c三个参数,具体请参考JQuery API
                            }
                        }
                    );
                    //添加数据
                    audios.push(song);
                }
                var options = {
                    container: document.getElementById('aplayer'),
                    lrcType: 1,
                    fixed: true,
                    autoplay: false,
                    listFolded: false,
                    order: 'list',
                    preload: 'auto',
                    audio: audios
                };
                const ap = new APlayer(options);
            })
        })
    });
</script>
<style lang="scss">
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
