<template>
    <div class="comment">
        <div class="user-face">
            <vs-avatar circle size="48">
                <img :src="data.user.uIcon" alt="" style="width: 100%;height: 100%">
            </vs-avatar>
        </div>
        <div class="con" ref="con" >
            <div class="user">{{data.user.uUsername}}</div>
            <p class="text" v-html="comment"></p>
            <div class="info">
                <span class="time"><timeago :datetime="data.artCmtCreatedTime" locale="zh-CN"
                                            :auto-update="60"></timeago></span>
                <vs-button size="small" @click="openReply($event,data,1)" class="reply-btn" shadow> 回复</vs-button>
            </div>
            <div ref="reply-box" class="reply-box">
                <template v-for="(item,index) in data.replies">
                    <ArticleCommentReplyItem :key="item.artCmtId" :data="item"
                                             @openReply2="openReply"></ArticleCommentReplyItem>
                </template>
                <div v-if="data.replyCount > 3 && !isShowMore" class="view-more">
                    共<b>{{data.replyCount}}</b>条回复,
                    <vs-button @click="showMoreReply" shadow size="small" class="more-btn">点击查看</vs-button>
                </div>
            </div>
            <div v-if="isShowMore && pageTotal>1" class="paging-box">
                <vs-pagination only-arrows v-model="replyPage.currentPage" :length="pageTotal" />
            </div>
        </div>

    </div>
</template>

<script>
    import ArticleCommentReplyItem from "./ArticleCommentReplyItem";
    import ArticleCommentSend from "./ArticleCommentSend";
    import Vue from 'vue'
    import {getArticleCommentReplies} from "../api/articleComment";
    import sanitizeHtml  from 'sanitize-html'
    export default {
        name: "ArticleCommentItem",
        components: {ArticleCommentSend, ArticleCommentReplyItem},
        props: {
            data: {
                type: Object,
                default: function () {
                    return {
                        artCmtContent: '',
                        artCmtCreatedTime: '',
                        artCmtId: '',
                        artCmtLike: '',
                        artCmtModifiedTime: '',
                        artCmtParent: '',
                        artCmtRoot: '',
                        artCmtStatus: '',
                        artId: '',
                        replyCount: 0,
                        replies: [],
                        user: {
                            uCover: '',
                            uIcon: '',
                            uId: '',
                            uRegTime: '',
                            uSex: '',
                            uSign: '',
                            uState: '',
                            uUsername: '',
                        },
                        userId: 0,
                    }
                }
            }
        },
        data() {
            return {
                recordCount: 0,
                pageTotal: 0,
                replyPage: {
                    currentPage: 1,
                    pageSize: 10,
                },
                isShowMore: false
            }
        },
        computed:{
            pageIndex() {
                return this.replyPage.currentPage
            },
            comment(){
                return sanitizeHtml(this.data.artCmtContent)
            },
            device(){
                return this.$store.state.app.device
            }
        },
        watch: {
            pageIndex: function (val) {
                this.fetchMoreData()
            },
        },
        created() {

        },
        methods: {
            //打开回复控件
            openReply(e, data, type) {
                const elements = document.getElementsByClassName('open-reply')
                Array.prototype.forEach.call(elements, function (element) {
                    element.classList.remove('open-reply')
                });
                this.$refs['con'].classList.add('open-reply')
                //获取父节点
                const parent = document.getElementsByClassName('open-reply')[0]
                const temp = document.getElementById('comment-send')
                if (temp) {
                    document.getElementById("comment-send").remove()
                }
                const test = Vue.extend(ArticleCommentSend)
                const cmt = new test()
                cmt.$props.ph = '回复 @' + data.user.uUsername + ' :'
                cmt.$props.articleId = data.artId
                if (type == 1) {
                    cmt.$props.root = data.artCmtId
                    cmt.$props.parent = 0
                }
                if (type == 2) {
                    cmt.$props.toUser = data.user
                    cmt.$props.root = data.artCmtRoot
                    cmt.$props.parent = data.artCmtId
                }
                cmt.$props.list = this.data.replies
                cmt.$store = this.$store
                //创建挂载点
                const div = document.createElement('div')
                div.setAttribute("id", "comment-send")
                const div1 = document.createElement('div')
                div.appendChild(div1)
                parent.appendChild(div)
                cmt.$mount(div1)
                //跳转到评论组件
                const rect = document.getElementById('comment-send').getBoundingClientRect()
                const isShow = rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= window.innerHeight &&
                    rect.right <= window.innerWidth
                if (!isShow) {
                    let $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                    $body.animate({scrollTop: $('#comment-send').offset().top - window.innerHeight/2}, 1000);
                }

            },
            //展示更多回复
            fetchMoreData(){
                var commentLoading = this.$vs.loading({
                    target: this.$refs["reply-box"],
                    type: "points",
                    text: "加载中",
                    color:'#1E1E1E'
                });
                const data = {
                    rId: this.data.artCmtId,
                    currentPage: this.replyPage.currentPage,
                    pageSize: this.replyPage.pageSize
                }
                getArticleCommentReplies(data).then(res => {
                    commentLoading.close()
                    this.isShowMore = true
                    this.data.replies = res.data.recordList
                    this.pageTotal = res.data.pageTotal
                    this.recordCount = res.data.recordCount
                })
            },
            //展示更多回复 按钮
            showMoreReply() {
                this.fetchMoreData()
            }
        }
    }
</script>

<style scoped lang="scss">

    .comment {

        &:last-child {
            .con {
                border-bottom: 1px solid var(--border-color);
            }

        }

        .user-face {
            float: left;
            margin: 24px 0 0 5px;
            position: relative;
        }

        .con {

            margin-left: 85px;
            padding: 22px 0 14px 0;
            border-top: 1px solid var(--border-color);
            color: var(--primary-color);

            .user {
                font-size: 12px;
                font-weight: bold;
                line-height: 18px;
                padding-bottom: 4px;
                display: block;
                word-wrap: break-word;
                position: relative;
            }

            .text {
                margin: 0;
                line-height: 20px;
                padding: 2px 0;
                font-size: 14px;
                text-shadow: none;
                overflow: hidden;
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            .info {
                color: #99a2aa;
                line-height: 26px;
                font-size: 12px;

                .reply-btn {
                    color: #99a2aa;
                    cursor: pointer;
                    display: inline-block;
                }
            }

            .reply-box {
                .view-more {
                    font-size: 12px;
                    color: #6d757a;

                    .more-btn {
                        display: inline-block;
                    }
                }
            }
            .paging-box{
                display: flex;
                justify-content: flex-start;
            }
        }

    }
</style>
