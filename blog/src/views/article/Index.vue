<template>
    <div class="article">
        <vs-row justify="space-between">
            <vs-col :lg="9" :md="9" :sm="12" :xs="12">
                <content-placeholders v-if="articleLoading">
                    <content-placeholders-text :lines="1"></content-placeholders-text>
                    <content-placeholders-img></content-placeholders-img>
                    <content-placeholders-heading></content-placeholders-heading>
                    <content-placeholders-heading img></content-placeholders-heading>
                    <content-placeholders-text :lines="20"></content-placeholders-text>
                </content-placeholders>
                <div class="article-left" v-if="!articleLoading">
                    <div class="article-top-nav">
                        <router-link to="/blog">首页</router-link>
                        /
                        <router-link :to="'/blog/category/'+articleData.articleSort.sortId">
                            {{articleData.articleSort.sortName}}
                        </router-link>
                        /
                        <span style="opacity: 0.7">{{articleData.artInfoTitle}}</span>
                    </div>
                    <div v-if="articleData.coverUrl">
                        <img style="width: 100%" :src="articleData.coverUrl">
                    </div>
                    <div class="article-content">
                        <h1 class=" article_title">{{articleData.artInfoTitle}}</h1>
                        <div class="article-user">
                            <div @click="jumpToMember(articleData.user.uId)" style="cursor:pointer">
                                <vs-avatar circle size="54" style="border: 2px white solid">
                                    <img
                                            :src="articleData.user.uIcon"
                                    />
                                </vs-avatar>
                            </div>
                            <div style="margin-left: 15px">
                                <div class="article-user-name" @click="jumpToMember(articleData.user.uId)">
                                    {{articleData.user.uUsername}}
                                </div>
                                <div class="article-user-info">发表于：{{articleData.artInfoCreatedTime}}</div>
                            </div>
                        </div>
                        <div class="article-body">
                            <div class="markdown-body" ref="content" v-html="articleData.articleContent.artContent">
                            </div>
                        </div>
                        <div style="opacity: 0.7;font-size: 13px">最后修改于：{{articleData.artInfoModifiedTime}}</div>
                    </div>
                </div>
            </vs-col>
            <vs-col :lg="3" :md="3" :sm="0" :xs="0" v-if="device!='mobile'">
                <div class="article-right">
                    <ArticleSortList></ArticleSortList>
                    <div class="menus-box">
                        <ContentPlaceholders v-if="navLoading">
                            <content-placeholders-heading></content-placeholders-heading>
                            <content-placeholders-text :lines="10"></content-placeholders-text>
                        </ContentPlaceholders>
                        <div v-if="!navLoading">
                            <div style="margin-bottom: 10px">文章导航</div>
                            <div style="display: flex;justify-content: center;padding: 10px 0">
                                {{articleData.artInfoTitle}}
                            </div>
                            <ul>
                                <div class="menus" ref="navList">
                                    <template v-for="item in articleNav">
                                        <li @click="jumpToTitle(item.id)" class="artMenuIndex animate__animated"
                                            :class="['menu-lev'+item.lev,'menu-'+item.id]">
                                            {{item.name}}
                                        </li>
                                    </template>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </vs-col>
        </vs-row>
        <vs-row justify="space-between">
            <vs-col :lg="9" :md="9" :sm="12" :xs="12">
                <ArticleComment :article-id="id"></ArticleComment>
            </vs-col>
            <vs-col :lg="3" :md="3" :sm="0" :xs="0" v-if="device!='mobile'">
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    import {getArticleDataById} from '@/api/article'
    import ArticleSortList from "../../components/ArticleSortList";
    import ArticleComment from "../../components/ArticleComment";

    export default {

        name: "Index",
        components: {ArticleComment, ArticleSortList},
        data() {
            return {
                markdownOption: {},
                id: null,
                articleData: {
                    user: {},
                    articleContent: {},
                    articleSort: {}
                },
                articleNav: [],
                content: '',
                navList: [],
                navData: [],
                navFlag: true,
                articleLoading: true,
                navLoading: true,
            }
        },
        async created() {
            let that = this;
            that.id = parseInt(that.$route.params.id);
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
        },
        computed: {
            device() {
                return this.$store.state.app.device;
            },
        },
        methods: {
            /*监控导航*/
            $scrollListenCallback() {
                if (this.device != 'mobile') {
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
                                    item.classList.remove("animate__headShake");
                                });
                                document.getElementsByClassName("menu-" + id)[0].classList.add("active")
                                document.getElementsByClassName("menu-" + id)[0].classList.add("animate__headShake")
                            }
                            break;
                        }
                    }
                }


            },
            //设置 文章右侧宽度与左侧等高
            onScroll() {
                if (this.device != 'mobile') {
                    var height;
                    if (height = document.getElementsByClassName("article-left")[0].clientHeight) {
                        document.getElementsByClassName("article-right")[0].style.height = height + 'px'
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
                    that.getMdNav();
                })
            },
            initMenuScrollListen() {
                window.addEventListener('scroll', this.$scrollListenCallback);
                window.addEventListener('scroll', this.onScroll)
            },
            //获取Md导航
            getMdNav() {
                const data = this.articleData.articleContent.artContent;
                var myRegex = /<h\d>.*<\/h\d>/g;
                var array = data.match(myRegex)
                let artNav = [];
                array.forEach(item => {
                    let lev = item.charAt(2)
                    let id = item.substring(item.indexOf('<a id="') + 7, item.indexOf('"></a>'))
                    let name = item.substring(item.indexOf('</a>') + 4, item.lastIndexOf('</'))
                    let obj = {};
                    obj.lev = lev;
                    obj.id = id;
                    obj.name = name;
                    artNav.push(obj)
                })
                this.articleNav = artNav;
                this.navLoading = false;
            },
            jumpToTitle(id) {
                let $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                $body.animate({scrollTop: $('#' + id).offset().top - 50}, 1000);
            },
            jumpToMember(id) {
                this.$router.push({
                    path: '/blog/member/' + id
                })
            }
        }
    }

</script>

<style lang="scss" scoped>
    .article {
        padding: 12px;
    }

    .article-top-nav {
        padding: 12px;
        color: var(--theme-text);
        font-size: 15px;
        font-weight: 700;

        a {
            text-decoration-line: none;
            color: var(--primary-color);

            &:hover {
                text-decoration-line: underline;
            }
        }
    }

    .article-left {
        background-color: var(--card-background-color);
        border-radius: 20px;
        padding: 12px;
        border: 1px solid var(--border-color);
    }

    .article-right {
        padding: 0 12px;
    }

    .article-content {
        padding: 30px;
        color: var(--primary-color) !important;

        .article_title {
            margin-bottom: 30px;
        }

        .article-user {
            display: flex;
            align-items: center;
            margin-bottom: 30px;

            .article-user-name {
                font-weight: 700;
                cursor: pointer;
            }

            .article-user-info {
                font-size: 13px;
            }
        }

        .article-body {
        }
    }

    .menus-box {
        background-color: var(--card-background-color);
        border-radius: 20px;
        padding: 12px;
        position: sticky;
        top: 54px;
        color: var(--primary-color);
        box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 20px 0px;

        ul {
            padding: 0;
        }
    }

    @media screen and (max-width: 900px) {
        .active {
            padding: 6px;
        }

    }
</style>
<style lang="scss">
    .markdown-body {
        background-color: var(--theme-card-bg);
        color: var(--theme-text)
    }

    .markdown-body pre {
        background-color: var(--md-background-color);

    }

    .markdown-body .hljs {
        background-color: var(--md-background-color);
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
