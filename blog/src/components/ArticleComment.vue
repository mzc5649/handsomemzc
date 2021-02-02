<template>
    <div id="article-comment" ref="articleComment" class="article-comment">
        <div class="head">
            <span class="result">{{recordCount}}</span>评论
        </div>
        <ArticleCommentSend :articleId="articleId" :list="recordList"></ArticleCommentSend>
        <div id="comment-list" class="comment-list">
            <template v-for="(item,index) in recordList">
                <ArticleCommentItem :key="item.artCmtId" :data="item"></ArticleCommentItem>
            </template>
            <div v-if="recordList.length == 0" class="no-more-comment">
                空空如也~
            </div>
        </div>
        <div class="page" v-if="recordCount > 1">
            <vs-pagination dark not-margin :dotted-number="10" v-model="page.currentPage" :length="pageTotal"/>
        </div>
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
                    pageSize: 10,
                },
            }
        },
        created() {

        },
        mounted() {
            this.fetchData()
        },
        watch: {
            pageIndex: function (val) {
                $("html, body").animate({
                    scrollTop: $("#article-comment").offset().top-44 }, {duration: 500,easing: "swing"});
                this.fetchData()
            },
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            pageIndex() {
                return this.page.currentPage
            }
        },
        methods: {
            fetchData() {
                var commentLoading = this.$vs.loading({
                    target: this.$refs.articleComment,
                    type: "points",
                    text: "加载中",
                    color:'#1E1E1E'
                });
                const data = {
                    aid: this.articleId,
                    currentPage: this.page.currentPage,
                    pageSize: this.page.pageSize
                }
                getArticleComment(data).then(res => {
                    this.recordList = res.data.recordList;
                    this.pageTotal = res.data.pageTotal;
                    this.recordCount = res.data.recordCount;
                    commentLoading.close()
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
        font-size: 18px;
        margin-bottom: 20px;
        color: var(--primary-color);

        .result{
            margin-right: 10px;
        }
    }


    .comment-list {
        padding-top: 20px;

        .no-more-comment{
            color: #99a2aa;
            text-align: center;
            padding: 30px 0;
            font-size: 12px;
        }
    }


    .page {
        margin: 20px 0;
    }


</style>
