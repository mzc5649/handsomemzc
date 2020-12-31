<template>
    <v-card  elevation="0" :shaped="article.artInfoIsTop==0" class="article-item mb-6">
        <v-chip :class="{sort:article.coverUrl}"
                label
                @click="toArticleSort(article.articleSort.sortId)">{{article.articleSort.sortName}}
        </v-chip>
        <v-lazy>
            <v-img
                    :aspect-ratio="18/9"
                    v-if="article.coverUrl"
                    :src="article.coverUrl+'/thumbnail800'"
                    :lazy-src="article.coverUrl+'/thumbnail100'"
                    style="border-top-left-radius: 4px;border-top-right-radius: 4px"
            />
        </v-lazy>

        <v-card-title>
            <div @click="toArticle(article.artInfoId)" class="title_a" style="cursor: pointer">
                <span v-if="article.artInfoIsTop == 0" class="body-2">[置顶]</span>
                {{article.artInfoTitle}}
            </div>
        </v-card-title>
        <v-card-subtitle>{{article.artInfoCreatedTime}}</v-card-subtitle>
        <v-card-text class="text--primary article-summary" v-html="article.artInfoSummary"></v-card-text>
        <v-card-actions class="justify-space-between">
            <v-btn text color="error" @click="toArticle(article.artInfoId)">开始阅读</v-btn>
        </v-card-actions>
    </v-card>
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
                            sortName:''
                        }
                    }
                }
            }
        },
        methods:{
            toArticle(id){
            this.$router.push({
                name:"Article",
                params:{
                    id:id
                }
            })
            },
            toArticleSort(id){
               if(this.$route.params.id == id) return;
                this.$router.push({
                    name:"ArticleSort",
                    params:{
                        id:id
                    }
                })

            }
        }
    }
</script>

<style lang="scss" scoped>
    .article-item {
        position: relative;
    }
    .sort {
        position: absolute;
        top: 0  ;
        left: 0;
        z-index: 10;
    }

    .article-item .title_a {
        color: inherit;
        text-decoration: none;
        border-radius: 10px;
    }
    .article-summary{
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
