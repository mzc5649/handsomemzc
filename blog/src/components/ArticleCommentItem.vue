<template>
    <div class="comment">
        <div class="user-face">
            <vs-avatar circle size="48">
                <img :src="data.user.uIcon" alt="" style="width: 100%;height: 100%">
            </vs-avatar>
        </div>
        <div class="con">
            <div class="user">{{data.user.uUsername}}</div>
            <p class="text">{{data.artCmtContent}}</p>
            <div class="info">
                <span class="time"><timeago :datetime="data.artCmtCreatedTime" locale="zh-CN"
                                            :auto-update="60"></timeago></span>
                <vs-button size="small" @click="openReply($event)" class="reply-btn" shadow> 回复</vs-button>
            </div>
            <div class="reply-box">
                <template v-for="(item,index) in data.replies">
                    <ArticleCommentReplyItem :key="index" :data="item" @openReply2="openReply2"></ArticleCommentReplyItem>
                </template>
                <div v-if="data.replyCount > 3" class="view-more">
                    共{{data.replyCount}}条回复，点击查看
                </div>
            </div>
            <div class="paging-box"></div>
        </div>

    </div>
</template>

<script>
    import ArticleCommentReplyItem from "./ArticleCommentReplyItem";
    import ArticleCommentSend from "./ArticleCommentSend";
    import Vue from 'vue'

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
        created() {

        },
        methods: {
            openReply(e) {
                var parent = e.target.parentNode.parentNode.parentNode
                var temp = document.getElementById('comment-send')
                if (temp) {
                    parent.removeChild(temp)
                    return
                }
                var test = Vue.extend(ArticleCommentSend)
                var cmt = new test()
                cmt.$store = this.$store
                //创建挂载点
                var div = document.createElement('div')
                div.setAttribute("id", "comment-send")
                var div1 = document.createElement('div')
                div.appendChild(div1)
                parent.appendChild(div)
                cmt.$mount(div1)

            },
            openReply2(e,id){
                var parent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                var temp = document.getElementById('comment-send')
                if (temp) {
                    parent.removeChild(temp)
                    return
                }
                var test = Vue.extend(ArticleCommentSend)
                var cmt = new test()
                cmt.$store = this.$store
                //创建挂载点
                var div = document.createElement('div')
                div.setAttribute("m-id",id);
                div.setAttribute("id", "comment-send")
                var div1 = document.createElement('div')
                div.appendChild(div1)
                parent.appendChild(div)
                cmt.$mount(div1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .comment {
        .user-face {
            float: left;
            margin: 24px 0 0 5px;
            position: relative;
        }

        .con {
            position: relative;
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
                }
            }
        }

    }
</style>
