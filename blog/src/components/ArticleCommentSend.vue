<template>
    <div class="comment-send">
        <div class="user-face">
            <vs-avatar circle size="48">
                <img :src="user.uIcon" alt="" style="width: 100%;height: 100%">
            </vs-avatar>
        </div>
        <div class="textarea-container" ref="comment-container">
            <textarea  @focus="mFocus" @focusout="mFocusOut" @input="mInput" :placeholder="ph" ref="comment" type="text" cols="80" rows="4"></textarea>
            <vs-button
                    dark
                    :loading="loading.sendCmt"
                    @click="sendComment"
                    class="comment-submit"
                    animation-type="vertical">
                评论
                <template #animate>
                    <i class="fas fa-comment"></i>发送
                </template>
            </vs-button>
        </div>
        <div class="comment-emoji" >
            <vs-button  icon dark>
                <i class="fas fa-smile"></i>表情
            </vs-button>

        </div>
    </div>
</template>

<script>
    import {saveArticleComment} from "../api/articleComment";

    export default {
        name: "ArticleCommentSend",
        props: {
            list: {
                default: ''
            },
            ph: {
                type: String,
                default: '期待您的评论'
            },
            articleId: {
                type: Number,
                default: 0
            },
            toUser: {
                type: Object,
                default: null
            },
            root: {
                type: Number,
                default: 0
            },
            parent: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                loading: {
                    sendCmt: false
                }
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            token() {
                return this.$store.state.token
            }
        },
        methods: {
            mFocus(){
              this.$refs['comment-container'].classList.add('focus')
            },
            mFocusOut(){
                this.$refs['comment-container'].classList.remove('focus')
            },
            mInput(){
                this.$refs['comment-container'].classList.remove('error')
            },
            sendComment() {
                var content = this.$refs['comment'].value
                content = content.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "")
                if (content.length == 0 || content.length > 1000) {
                    this.$refs['comment-container'].classList.add('error')
                    this.$vs.notification({
                        progress: "auto",
                        color: 'danger',
                        position: "bottom-center",
                        text: content.length == 0? "你还没有评论！":"字数限制1000！"
                    });
                    return
                }

                const data = {
                    artId: this.articleId,
                    userId: this.user.uId,
                    artCmtContent: content,
                    artCmtRoot: this.root,
                    artCmtParent: this.parent
                }
                if (this.toUser) {
                    if (this.toUser.uId == this.user.uId) {
                        data.artCmtContent = '回复 @' + this.toUser.uUsername + ' :' + content
                    } else {
                        const href = "//handsomemzc.cn/blog/member/" + this.toUser.uId
                        data.artCmtContent = '回复 ' + '<a href="' + href + '" target="_blank">@' + this.toUser.uUsername + '</a> :' + content
                    }
                }
                this.loading.sendCmt = true;
                saveArticleComment(data, this.token).then(res => {
                    this.loading.sendCmt = false;
                    this.$refs['comment'].value = '';
                    this.$vs.notification({
                        progress: "auto",
                        color: 'success',
                        position: "bottom-center",
                        title: "成功",
                        text: "评论发送成功"
                    });
                    this.list.unshift(res.data)

                }).catch(err => {
                    this.loading.sendCmt = false;
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .comment-send {
        margin: 10px 0;

        .user-face {
            float: left;
            margin: 7px 0 0 5px;
        }

        .comment-emoji{

            margin-left:  86px;
        }

        .textarea-container {
            margin-left: 85px;
            margin-right: 85px;
            position: relative;

            &.error textarea {
                background-color: var(--card-background-color) !important;
                border-color: #e40c0c !important;
            }
            &.focus textarea {
                background-color: var(--card-background-color) !important;
                border: 1px solid rgba(25, 91, 255, 0.6);
            }

            textarea {
                box-sizing: border-box;
                background-color: var(--background-color);
                font-family: "Microsoft YaHei", Avenir, Helvetica, Arial, sans-serif;
                border: 1px solid var(--border-color);
                color: var(--primary-color);
                border-radius: 4px;
                font-size: 12px;
                padding: 5px 10px;
                width: 100%;
                height: 65px;
                resize: none;
                outline: none;
            }

            textarea:hover {
                background-color: var(---card-background-color);
                border: 1px solid rgba(25, 91, 255, 0.6);
            }

            .comment-submit {
                position: absolute;
                top: 0;
                right: -85px;
                width: 70px;
                height: 65px;
                margin: 0;
            }
        }

    }
</style>
