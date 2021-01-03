<template>
    <vs-card type="1" style="margin-bottom: 30px;">
        <template #title>
            <div class="title">
        <span v-if="article.artInfoIsTop == 1" class="span">[置顶]</span
        >{{ article.artInfoTitle }}
            </div>

        </template>
        <template #img v-if="article.coverUrl">
            <img
                    :src="article.coverUrl + '/thumbnail800'"
                    style="height: 100%;width: 100%"
            />
        </template>
        <template #text>
            <p class="article-summary">
                {{ article.artInfoSummary }}
            </p>
        </template>
        <template #interactions>
            <vs-button shadow size="small" circle animation-type="rotate"
                       @click="toArticleSort(article.articleSort.sortId)">
                {{ article.articleSort.sortName }}
                <template #animate>
                    {{ article.articleSort.sortName }}
                </template>
            </vs-button>
            <vs-button danger icon animation-type="scale">
                <i class="fa fa-heart-o"></i>
                <template #animate>
                    <i class="fa fa-heart"></i>
                </template>
            </vs-button>
            <vs-button class="btn-chat" icon shadow animation-type="scale">
                <i class="fa fa-comment-o"></i>
                <template #animate>
                    <i class="fa fa-comment"></i>
                </template>
            </vs-button>
        </template>
        <template #buttons>
            <div style="display: flex;justify-content: space-between;padding: 0 15px">
                <div style="display: flex;align-items: center">
                    <i class="fa fa-user-o info"></i>
                    <span class="info">{{article.user.uUsername}}</span>
                    <i class="fa fa-clock-o info"></i>
                    <span class="info">{{article.artInfoCreatedTime }}</span>
                </div>
                <vs-button class="btn-chat" shadow border dark animation-type="vertical" @click="toArticle(article.artInfoId)">
                    开始阅读
                    <template #animate>
                        Go
                    </template>
                </vs-button>
            </div>
        </template>
        <!--        <v-chip :class="{sort:article.coverUrl}"-->
        <!--                label-->
        <!--                @click="toArticleSort(article.articleSort.sortId)">{{article.articleSort.sortName}}-->
        <!--        </v-chip>-->
        <!--        <v-lazy>-->
        <!--            <v-img-->
        <!--                    :aspect-ratio="18/9"-->
        <!--                    v-if="article.coverUrl"-->
        <!--                    :src="article.coverUrl+'/thumbnail800'"-->
        <!--                    :lazy-src="article.coverUrl+'/thumbnail100'"-->
        <!--                    style="border-top-left-radius: 4px;border-top-right-radius: 4px"-->
        <!--            />-->
        <!--        </v-lazy>-->

        <!--        <v-card-title>-->
        <!--            <div @click="toArticle(article.artInfoId)" class="title_a" style="cursor: pointer">-->
        <!--                <span v-if="article.artInfoIsTop == 1" class="body-2">[置顶]</span>-->
        <!--                {{article.artInfoTitle}}-->
        <!--            </div>-->
        <!--        </v-card-title>-->
        <!--        <v-card-subtitle>{{article.artInfoCreatedTime}}</v-card-subtitle>-->
        <!--        <v-card-text class="text&#45;&#45;primary article-summary" v-html="article.artInfoSummary"></v-card-text>-->
        <!--        <v-card-actions class="justify-space-between">-->
        <!--            <v-btn text color="error" @click="toArticle(article.artInfoId)">开始阅读</v-btn>-->
        <!--        </v-card-actions>-->
    </vs-card>
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
                if (this.$route.params.id == id) return;
                this.$router.push({
                    name: "ArticleSort",
                    params: {
                        id: id
                    }
                });
            }
        }
    };
</script>
<style>
    .vs-card {
        max-width: 100%;
    }
    .info {
        margin-right: 10px;
        font-size: 13px;
        color: #A0A0A0;
    }
    .span{
        font-weight: 700;
    }
</style>
<style lang="scss" scoped>
    .article-item {
        /*position: relative;*/
    }

    .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .article-item .title_a {
        color: inherit;
        text-decoration: none;
        border-radius: 10px;
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
