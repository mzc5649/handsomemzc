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
                :ishljs="false"
                :tabSize="2"
                placeholder="请输入.."
                :autofocus="false"
                :codeStyle="$vuetify.theme.dark?'atom-one-dark' : 'atom-one-light'"
        >
        </mavon-editor>
        <div class="d-flex justify-end ">
            <v-btn text color="#fa1" :disabled="!content">请登录</v-btn>
        </div>
    </div>
</template>

<script>
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
                content: ''

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
