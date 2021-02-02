<template>
    <div class="article-item">
        <vs-card type="1" style="margin-bottom: 30px;">
            <template #title>
                <div class="title">
                    <span v-if="article.artInfoIsTop == 1" class="span">[置顶]</span>
                    <span style="font-weight: 700">{{ article.artInfoTitle }}</span>
                </div>
            </template>
            <template #img>
                <img
                        :src="article.coverUrl + '/thumbnail800'"
                        v-if="article.coverUrl"
                />
            </template>
            <template #text>
                <p class="article-summary">
                    {{ article.artInfoSummary }}
                </p>
            </template>
            <template #interactions>
                <vs-button danger icon animation-type="scale">
                    <i class="fas fa-heart"></i>
                    <template #animate>
                        <i class="fas fa-heart"></i>
                    </template>
                </vs-button>
                <vs-button class="btn-chat" icon shadow animation-type="scale">
                    <i class="fas fa-comment"></i>
                    <span class="span">{{article.commentCount}}</span>
                </vs-button>
            </template>
            <template #buttons>
                <div style="display: flex;justify-content: space-between;padding: 0 15px">
                    <div style="display: flex;align-items: center">
                        <vs-button shadow size="small" circle animation-type="rotate"
                                   style="font-weight: 700"
                                   @click="toArticleSort(article.articleSort.sortId)">
                            {{ article.articleSort.sortName }}
                            <template #animate>
                                {{ article.articleSort.sortName }}
                            </template>
                        </vs-button>
                        <div>
                            <span class="info-time" @click="jumpToMember(article.user.uId)">
                                <i class="fas fa-user info"></i>
                                <span class="info">{{article.user.uUsername}}</span>
                            </span>
                            <i class="fas fa-comment info"></i>
                            <span class="info">{{article.commentCount}}</span>
                            <i class="fas fa-clock info"></i>
                            <span v-show="device == 'desktop'">
                                <span class="info">发表于:</span>
                                <span class="info"><timeago :datetime="article.artInfoCreatedTime" locale="zh-CN"
                                                            :auto-update="60"></timeago></span>
                                <span class="info">更新于:</span>
                            </span>
                            <span class="info">
                                <timeago :datetime="article.artInfoModifiedTime" locale="zh-CN"
                                         :auto-update="60"></timeago>
                            </span>
                        </div>
                    </div>
                    <vs-button size="small" shadow border dark animation-type="vertical"
                               @click="toArticle(article.artInfoId)">
                        阅读
                        <template #animate>
                            Go
                        </template>
                    </vs-button>
                </div>
            </template>
        </vs-card>

    </div>

</template>

<script>


    export default {
        name: "ArticleItem",
        props: {
            article: {
                require: true,
                type: Object,
                default() {
                    return {
                        artInfoId: null,
                        artInfoTitle: null,
                        artInfoSummary: null,
                        artInfoCreatedTime: null,
                        artInfoIsTop: null,
                        articleSort: {
                            sortName: ""
                        }
                    };
                }
            }
        },
        computed: {
            device() {
                return this.$store.state.app.device;
            }
        },
        mounted() {
        },
        methods: {
            toArticle(id) {
                this.$router.push({
                    name: "Article",
                    params: {
                        id: id
                    }
                });
            },
            toArticleSort(id) {
                if (this.$route.name == 'ArticleCategory' && this.$route.params.id == id) {
                    return
                }
                this.$router.push({
                    name: "ArticleCategory",
                    params: {
                        id: id
                    }
                });

            },
            jumpToMember(id) {
                this.$router.push({
                    path: '/blog/member/' + id
                })
            }
        }
    };
</script>
<style>
    .vs-card {
        max-width: 100%;
    }

    .span {
        font-weight: 700;
    }
</style>
<style lang="scss" scoped>
    .article-item {

    }

    .info {
        margin-right: 10px;
        font-size: 13px;
        color: #A0A0A0;
    }

    .info-time:hover {
        .info {
            color: #2c3e50;
        }

    }

    .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .article-summary {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        max-height: 60px;
        min-height: 0;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>
