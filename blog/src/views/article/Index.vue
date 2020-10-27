<template>
    <div>
        <v-container>
            <v-row>
                <v-col :md="8" :sm="12" :cols="12">
                    <v-card>
                        <v-chip label>{{articleData.articleSort.sortName}}</v-chip>
                        <div v-if="articleData.artInfoCoverUrl">
                            <v-lazy>
                                <v-img
                                        :aspect-ratio="16/9"
                                        :src="articleData.artInfoCoverUrl"
                                        :lazy-src="articleData.artInfoCoverUrl">
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
                            <div class="article-body mt-4" ref="content">
                                <div class="markdown-body" v-html="articleData.articleContent.artContent">
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-col>
                <v-col :md="4" :sm="12" :cols="12 ">
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'

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
                content:'',
                navList:[]
            }
        },
        async created() {
            let that = this;
            that.id = that.$route.params.id;
            await that.getArticleData();

        },
        mounted() {
            let that=this;
           that.getAllTitle();
        },

        methods: {
            getArticleData() {
                let that = this;
                axios.get("/blog/article/" + that.id)
                    .then(function (res) {
                        if (res.data.code == 0) {
                            that.articleData = res.data.data;
                            that.content=that.articleData.articleContent.artContent
                        }

                    })
            },
            getAllTitle() {
                let that=this;
                var content=that.$refs['content'];

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
    }
</style>
