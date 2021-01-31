<template>
    <div class="comment-send">
        <div class="user-face">
            <vs-avatar circle size="48">
                <img :src="user.uIcon" alt="" style="width: 100%;height: 100%">
            </vs-avatar>
        </div>
        <div class="textarea-container">
            <textarea ref="comment" type="text" cols="80" rows="4"></textarea>
            <vs-button
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
    </div>
</template>

<script>
    import {saveArticleComment} from "../api/articleComment";
    export default {
        name: "ArticleCommentSend",
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
            }
        },
        methods:{
            sendComment() {
                const data = {
                    artId: this.articleId,
                    userId: this.user.uId,
                    artCmtContent: this.$refs['comment'].value,
                    artCmtLevel: 1
                }
                this.loading.sendCmt = true;
                saveArticleComment(data).then(res => {
                    this.loading.sendCmt = false;
                    this.$refs['comment'].value = '';
                    this.$vs.notification({
                        progress: "auto",
                        color: 'success',
                        position: "bottom-center",
                        title: "成功",
                        text: "评论发送成功"
                    });
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

        .textarea-container {
            margin-left: 85px;
            margin-right: 85px;
            position: relative;

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

            textarea:focus {
                background-color: var(--card-background-color);
                border: 1px solid rgba(25, 91, 255, 0.6);
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
