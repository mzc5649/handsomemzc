<template>
    <div class="comment">
        <div class="user-face">
            <vs-avatar circle size="48">
                <img :src="data.user.uIcon" alt="" style="width: 100%;height: 100%">
            </vs-avatar>
        </div>
        <div class="con" ref="con">
            <div class="user">{{data.user.uUsername}}</div>
            <p class="text">{{data.artCmtContent}}</p>
            <div class="info">
                <span class="time"><timeago :datetime="data.artCmtCreatedTime" locale="zh-CN"
                                            :auto-update="60"></timeago></span>
                <vs-button size="small" @click="openReply($event,data,1)" class="reply-btn" shadow> 回复</vs-button>
            </div>
            <div class="reply-box">
                <template v-for="(item,index) in data.replies">
                    <ArticleCommentReplyItem :key="index" :data="item"
                                             @openReply2="openReply"></ArticleCommentReplyItem>
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
                if(!isShow){
                    let $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                    $body.animate({scrollTop: $('#comment-send').offset().top-window.innerHeight+100}, 1000);
                }

            },

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
