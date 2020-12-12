<template>
    <div class="comment-edit">
        <mavon-editor
                v-model="content"
                ref="mdeditor"
                :toolbars="markdownOption"
                :boxShadow="false"
                :subfield="false"
                editorBackground="inherit"
                toolbarsBackground="inherit"
                previewBackground="inherit"
                :ishljs="true"
                :tabSize="2"
                :placeholder="editorPlaceholder"
                :autofocus="false"
                :codeStyle="$vuetify.theme.dark?'atom-one-dark' : 'atom-one-light'"
                @change='getContentHtml'
        >
            <template slot="right-toolbar-after" v-if="reply">
                <v-btn small text elevation="1" @click="handlerUnReply">
                    取消回复
                </v-btn>
            </template>
        </mavon-editor>
        <div class="d-flex justify-end ">
            <v-btn text color="#fa1" :disabled="!content" @click="handlerSend" :loading="loading">{{token?'评论':'请登录'}}
            </v-btn>

        </div>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "CommentEditor",
        props: {
            reply: {
                type: Object,
            },
            loading: {
                type: Boolean
            }
        },
        data() {
            return {
                markdownOption: {
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    code: true, // code
                    preview: true, // 预览
                    trash: true, // 清空
                    help: true // 帮助
                },
                content: '',
                contentHtml:''
            }
        },
        computed: {
            ...mapState(["token"]),
            editorPlaceholder() {
                let that = this;
                return that.reply ? (that.reply.user ? '回复 @' + that.reply.user.uUsername+':':'回复 @' + that.reply.fromUser.uUsername+':' ): '请输入..';
            }
        },
        methods: {
            ...mapMutations(["SET_LOGIN_OR_REGISTER_DIALOG"]),
            handlerSend() {
                let that = this;
                if (!that.token) {
                    that.SET_LOGIN_OR_REGISTER_DIALOG();
                } else {
                    that.$emit("send", that.contentHtml)
                }
            },
            handlerUnReply(){
                let that=this;
                that.$emit("handlerUnReply")
            },
            getContentHtml(value,render){
                let that=this;
                that.contentHtml=render;
            }
        }
    }
</script>
<style lang="scss">
    .comment-edit {
        .v-note-wrapper .v-note-op .v-left-item,
        .v-note-wrapper .v-note-op .v-right-item {
            flex: none;
        }
    }
</style>
<style lang="scss" scoped>
    .comment-edit {
        .v-note-wrapper.markdown-body {
            width: 100%;
            min-height: 200px;
            max-height: 320px;
            z-index: 1;
        }

    }

</style>
