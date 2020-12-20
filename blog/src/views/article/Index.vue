<template>
    <div>
        <v-container>
            <v-row>
                <v-col :md="8" :sm="12" :cols="12">
                    <div v-if="articleLoading">
                        <v-card>
                            <v-skeleton-loader type="chip"/>
                            <div class="ma-5">
                                <v-skeleton-loader type="card-heading"/>
                                <v-skeleton-loader type="list-item-avatar-two-line"/>
                                <v-skeleton-loader type="sentences"/>
                                <v-skeleton-loader type="sentences"/>
                                <v-skeleton-loader type="sentences"/>
                                <v-skeleton-loader type="sentences"/>
                            </div>
                        </v-card>
                    </div>
                    <v-card v-else>
                        <v-chip label>{{articleData.articleSort.sortName}}</v-chip>
                        <div v-if="articleData.coverUrl">
                            <v-lazy>
                                <v-img
                                        :aspect-ratio="18/9"
                                        :src="articleData.coverUrl+'/thumbnail800'"
                                        :lazy-src="articleData.coverUrl+'/thumbnail100'">
                                </v-img>
                            </v-lazy>
                        </div>
                        <div class="article-content">
                            <h1 class="display-1 article_title">{{articleData.artInfoTitle}}</h1>
                            <div class="d-flex align-center article-info">
                                <div class="mr-2">
                                    <v-avatar size="48">
                                        <v-img :src="articleData.user.uIcon"></v-img>
                                    </v-avatar>
                                </div>
                                <div>
                                    <div class="body-2">{{articleData.user.uUsername}}</div>
                                    <div class="caption">{{articleData.artInfoCreatedTime}}</div>
                                </div>
                            </div>
                            <div class="article-body mt-4">
                                <div class="markdown-body" ref="content" v-html="articleData.articleContent.artContent">
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-col>
                <v-col :md="4" :sm="12" :cols="12 ">
                    <v-card class="menus-box">
                        <v-card-title>导航</v-card-title>
                        <div v-if="navLoading">
                            <v-skeleton-loader type="list-item"/>
                            <v-skeleton-loader type="list-item"/>
                            <v-skeleton-loader type="list-item"/>
                            <v-skeleton-loader type="list-item"/>
                            <v-skeleton-loader type="list-item"/>
                        </div>
                        <div v-show="!navLoading" class="d-flex justify-center caption pa-2">
                            {{articleData.artInfoTitle}}
                        </div>
                        <ul v-show="!navLoading">
                            <div class="menus" ref="navList">
                            </div>
                        </ul>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import {getArticleDataById} from '@/api/article'

    export default {

        name: "Index",
        data() {
            return {
                markdownOption: {},
                id: null,
                articleData: {
                    user: {},
                    articleContent: {},
                    articleSort: {}
                },
                content: '',
                navList: [],
                navData: [],
                navFlag: true,
                articleLoading: true,
                navLoading: true
            }
        },
        async created() {
            let that = this;
            that.id = that.$route.params.id;
            await that.getArticleData();
        },
        mounted() {
            let that = this;

            that.initMenuScrollListen();
        },
        updated() {
            let that = this;
            that.getAllTitle();
        },
        methods: {
            $scrollListenCallback() {
                let that = this;
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                scrollTop += 60;
                const titleList = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
                const scrollTopList = titleList.map(el => {
                    const elEmentOffsetTop = this.getElementToPageTop(el);
                    return {
                        scrollTop: elEmentOffsetTop,
                        el
                    }
                });
                scrollTopList.reverse();
                for (const item of scrollTopList) {
                    const _scrollTop = scrollTop - item.scrollTop;
                    if (_scrollTop >= 0) {
                        let a = item.el.getElementsByTagName("a")[0]
                        if (a != undefined) {
                            let id = a.getAttribute("id");
                            document.querySelectorAll(".artMenuIndex").forEach(item => {
                                item.classList.remove("active");
                            });
                            document.getElementsByClassName("menu-" + id)[0].classList.add("active")
                        }
                        break;
                    }
                }

            },
            getElementToPageTop(el) {
                const box = el.getBoundingClientRect();
                const winElem = el.ownerDocument.defaultView;
                const top = box.top + winElem.pageYOffset;
                return top;
            },
            getArticleData() {
                let that = this;
                getArticleDataById(that.id).then(function (res) {
                    that.articleLoading = false
                    that.articleData = res.data;
                    that.content = that.articleData.articleContent.artContent

                })
            },
            initMenuScrollListen() {
                window.addEventListener('scroll', this.$scrollListenCallback);
            },
            getAllTitle() {
                let that = this;
                if (that.navFlag) {
                    var content = that.$refs['content'];
                    if (content) {
                        that.navFlag = false
                        var navList = that.$refs['navList'];
                        that.navList = Array.from(content.querySelectorAll("h1,h2,h3,h4,h5,h6"))
                        that.navList.forEach(item => {
                            let index = item.localName.indexOf("h");
                            let lev = item.localName.substr(index + 1);
                            let id = item.querySelector("a").getAttribute('id');
                            let name = item.innerHTML.substr(item.innerHTML.indexOf("</a>") + 4);
                            let obj = {};
                            obj.lev = lev;
                            obj.id = id;
                            obj.name = name;
                            let li = document.createElement("li");
                            li.innerHTML = name;
                            li.classList.add("artMenuIndex")
                            li.classList.add("menu-lev" + lev)
                            li.classList.add('menu-' + id);
                            li.onclick = function () {
                                let $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                                $body.animate({scrollTop: $('#' + id).offset().top - 50}, 1000);
                                return false;
                            }
                            navList.appendChild(li)
                        })
                        that.navLoading = false
                    }
                }
            }
        }
    }

</script>

<style lang="scss" scoped>
    .article-content {
        padding: 40px;

        .article_title {
            margin-bottom: 30px;
        }

        .article-body {

        }
    }

    .menus-box {
        position: sticky;
        top: 80px;

        ul {
            position: relative;
            padding: 0 12px 12px;
        }


    }

</style>
<style lang="scss">
    .v-application code {
        color: black;
        font-weight: normal;
    }

    .theme--dark.v-application {
        .markdown-body {
            color: white;
        }

        .artMenuIndex {
            color: white;

        }
    }

    .artMenuIndex {
        position: relative;
        z-index: 1;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        $color: #444;
        color: $color;

        &:hover, &.active {
            $color1: rgb(66, 154, 255);
            color: $color1;
            background-color: rgba($color: #f0f0f0, $alpha: 0.6);
        }

        @for $i from 1 to 10 {
            &.menu-lev#{$i} {
                padding-left: $i *14px
            }

        }
    }
</style>
