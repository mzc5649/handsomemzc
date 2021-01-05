<template>
    <div class="article">
        <vs-row justify="space-between">
            <vs-col :lg="9" :md="9" :sm="12" :xs="12">
                <div class="article-top-nav">
                    首页/{{articleData.articleSort.sortName}}/{{articleData.artInfoTitle}}/正文
                </div>
                <div class="article-left">
                    <div v-if="articleData.coverUrl">
                        <img style="width: 100%" :src="articleData.coverUrl">
                    </div>
                    <span class="article-sort">{{articleData.articleSort.sortName}}</span>
                    <div class="article-content">
                        <h1 class=" article_title">{{articleData.artInfoTitle}}</h1>
                        <div class="article-info">
                            <div>
                                <vs-avatar circle size="48" style="border: 2px white solid">
                                    <img
                                            :src="articleData.user.uIcon"
                                    />
                                </vs-avatar>
                            </div>
                            <div style="margin-left: 15px">
                                <div>{{articleData.user.uUsername}}</div>
                                <div>{{articleData.artInfoCreatedTime}}</div>
                            </div>
                        </div>
                        <div class="article-body">
                            <div class="markdown-body" ref="content" v-html="articleData.articleContent.artContent">
                            </div>
                        </div>
                        <div>最后修改于：{{articleData.artInfoModifiedTime}}</div>
                    </div>
                </div>
            </vs-col>
            <vs-col :lg="3" :md="3" :sm="0" :xs="0" v-if="device!='mobile'">
                <div class="article-right">
                    <div class="menus-box" :class="auto_fixed">
                        <div style="margin-bottom: 10px">文章导航</div>
                        <div style="display: flex;justify-content: center;padding: 10px 0">
                            {{articleData.artInfoTitle}}
                        </div>
                        <ul v-show="!navLoading">
                            <div class="menus" ref="navList">
                            </div>
                        </ul>
                    </div>
                </div>
            </vs-col>
        </vs-row>

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
                navLoading: true,
                auto_fixed: {
                    menu_fixed: false
                }
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
            this.$nextTick(function () {
                that.initMenuScrollListen();
            })
        },
        updated() {
            let that = this;
            that.getAllTitle();
        },
        computed: {
            device() {
                return this.$store.state.app.device;
            },
        },
        methods: {
            $scrollListenCallback() {
                if (this.$store.state["app/device"] != 'mobile') {

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
                }


            },
            //监听文章导航
            onScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let header_height = 44
                this.auto_fixed = {
                    menu_fixed: scrollTop >= header_height
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
                window.addEventListener('scroll', this.onScroll)
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
    .article {
        padding: 12px;
        position: relative;
    }

    .article-top-nav {
        background-color: var(--theme-card-bg);
        border-radius: 20px;
        padding: 12px;
        margin-bottom: 6px;
    }

    .article-left {
        background-color: var(--theme-card-bg);
        border-radius: 20px;
        padding: 12px;
    }

    .article-right {
        padding: 0 12px;
    }

    .article-content {
        padding: 40px;
        color: var(--theme-text) !important;

        .article_title {
            margin-bottom: 30px;
        }

        .article-info {
            display: flex;
            align-items: center;
        }

        .article-body {
        }
    }

    .article-sort {
        color: var(--theme-text);
    }

    .menus-box {
        background-color: var(--theme-card-bg);
        border-radius: 20px;
        width: 200px;
        padding: 12px;
        color: var(--theme-text);
        box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 20px 0px;
    }

    .menu_fixed {
        position: fixed;
        top: 56px;
    }
</style>
<style lang="scss">
    .markdown-body {
        background-color: var(--theme-card-bg);
        color: var(--theme-text)
    }

    .markdown-body pre {
        background-color: var(--theme-md-bg);
    }

    .markdown-body .hljs {
        background-color: var(--theme-md-bg);
    }

    .artMenuIndex {
        position: relative;
        z-index: 1;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        $color: var(--theme-text);
        color: $color;

        &:hover, &.active {
            background-color: rgba($color: #f0f0f0, $alpha: 0.6);
        }

        @for $i from 1 to 10 {
            &.menu-lev#{$i} {
                padding-left: $i *14px
            }

        }
    }
</style>
