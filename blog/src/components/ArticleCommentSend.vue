<template>
    <div ref="comment-send" class="comment-send">
        <div class="user-face" v-if="device == 'desktop'">
            <vs-avatar circle size="48">
                <img v-if="user.uIcon" :src="user.uIcon" alt="" style="width: 100%;height: 100%">
            </vs-avatar>
        </div>
        <div class="textarea-container" ref="comment-container">
            <textarea @focus="mFocus" @focusout="mFocusOut" @input="mInput" :placeholder="ph" ref="comment" type="text"
                      cols="80" rows="4"></textarea>
            <vs-button
                    :disabled="!user"
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
            <div v-if="!user" class="login">
                <div>您必须登录或注册以后才能发表评论</div>
                <vs-button size="small" border @click="SET_LOGIN_OR_REGISTER_DIALOG">登录</vs-button>
            </div>
        </div>
        <div class="comment-emoji" v-if="user">
            <vs-button dark icon @click="openEmoji($event)">
                <i class="fas fa-smile" style="margin-right: 5px"></i>表情
            </vs-button>
        </div>

    </div>
</template>

<script>
    import {saveArticleComment} from "../api/articleComment";
    import {mapMutations} from "vuex";

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
                },
            }
        },
        mounted() {

        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            token() {
                return this.$store.state.token
            },
            device() {
                return this.$store.state.app.device
            }
        },
        methods: {
            ...mapMutations(["SET_LOGIN_OR_REGISTER_DIALOG"]),
            /*监听聚焦*/
            mFocus() {
                this.$refs['comment-container'].classList.add('focus')
            },
            /*监听聚焦*/
            mFocusOut() {
                this.$refs['comment-container'].classList.remove('focus')
            },
            /*监听输入*/
            mInput() {
                this.$refs['comment-container'].classList.remove('error')
            },
            /*打开表情*/
            openEmoji(e) {
                e.stopPropagation()
                const data = {
                    top: e.currentTarget.offsetTop + 40 + 'px',
                    left: e.currentTarget.offsetLeft + 'px'
                }
                this.$store.commit('app/TOGGLE_EMOJIPOS', data)
                this.$store.commit('app/TOGGLE_EMOJIBOXSHOW', true)
                this.$refs['comment'].focus()
                //输入框引用
                this.$store.state.app.commentContent = this.$refs['comment']
            },
            //评论
            sendComment() {
                var content = this.$refs['comment'].value
                content = content.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "")
                if (content.length == 0 || content.length > 1000) {
                    this.$refs['comment-container'].classList.add('error')
                    this.$vs.notification({
                        progress: "auto",
                        color: 'danger',
                        position: "bottom-center",
                        text: content.length == 0 ? "你还没有评论！" : "字数限制1000！"
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

        .comment-emoji {
            margin-left: 86px;

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

            .comment-submit:hover &.textarea {
                background-color: var(---card-background-color);
                border: 1px solid rgba(25, 91, 255, 0.6);
            }
        }

        .login {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            left: 0px;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            font-weight: 700;
            font-size: 12px;
            overflow: hidden;
            color: var(--primary-color);
            background-color: rgba(var(--card-background-color), 0.5);
            backdrop-filter: blur(1px);
        }


    }

    @media screen and (max-width: 900px) {
        .comment-send {
            .textarea-container {
                margin-left: 0px;
            }

            .comment-emoji {
                margin-left: 0;
            }
        }

    }
</style>
<style>
    .vs-button__content {
        position: relative;
    }
</style>
