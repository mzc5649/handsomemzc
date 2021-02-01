<template>
    <div class="article-comment">
        <div class="head">
            {{recordCount}}评论
        </div>
        <ArticleCommentSend :articleId="articleId" :list="recordList"></ArticleCommentSend>
        <div class="comment-list">
            <template v-for="(item,index) in recordList">
                <ArticleCommentItem :key="index" :data="item"></ArticleCommentItem>
            </template>
        </div>
        <vs-pagination :dotted-number="10" v-model="page.currentPage" :length="pageTotal"/>
    </div>
</template>

<script>
    import {getArticleComment} from '../api/articleComment'
    import ArticleCommentItem from "./ArticleCommentItem";
    import ArticleCommentSend from "./ArticleCommentSend";

    export default {
        name: "ArticleComment",
        components: {ArticleCommentSend, ArticleCommentItem},
        props: ['articleId'],
        data() {
            return {
                recordList: [],
                recordCount: 0,
                pageTotal: 0,
                page: {
                    currentPage: 1,
                    pageSize: 20,
                }
            }
        },
        created() {
            this.fetchData()

        },
        mounted() {

        },

        watch: {
                pageIndex:  function(val) {
                     this.fetchData()
                    console.log(val);
                    console.log(this.page.currentPage);
                },
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            pageIndex(){
                return this.page.currentPage
            }
        },
        methods: {
            fetchData() {
                const data = {
                    aid: this.articleId,
                    currentPage: this.page.currentPage,
                    pageSize: this.page.pageSize
                }
                console.log(data);
                getArticleComment(data).then(res => {
                    this.recordList = res.data.recordList;
                    this.pageTotal = res.data.pageTotal;
                    this.recordCount = res.data.recordCount;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .article-comment {
        padding: 12px;
        background-color: var(--card-background-color);
        border-radius: 20px;
        border: 1px solid var(--border-color);
    }

    .head {
        margin-bottom: 20px;
        color: var(--primary-color);
    }


    .comment-list {
        padding-top: 20px;
    }


</style>
