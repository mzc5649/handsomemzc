<template>
    <div class="index">
        <v-container>
            <CommentBox :comments="comments"></CommentBox>
            <v-pagination
                    :length="page.pageTotal"
                    :value="page.currentPage"
                    @input="pageChange"
            >
            </v-pagination>
        </v-container>
    </div>
</template>

<script>
    import CommentBox from "../../components/CommentBox";
    import axios from 'axios'

    export default {
        name: "Index",
        components: {CommentBox},
        data() {
            return {
                comments: null,
                page: {
                    currentPage: 1,
                    pageSize: 10,
                    pageTotal: 0,
                    total:0
                }
            }
        },
        created() {
            let that = this;
            that.getMessageData();
        },
        methods: {
            pageChange(index) {
                let that = this;
                that.page.currentPage=index;
                that.getMessageData();
            },
            getMessageData() {
                let that = this;
                axios.get("/blog/msg", {
                    params: {
                        currentPage: that.page.currentPage,
                        pageSize: that.page.pageSize
                    }
                }).then(function (res) {
                    if(res.data.code==0){
                        that.comments = res.data.data.recordList
                        that.page.pageTotal=res.data.data.pageTotal;
                        that.page.total=res.data.data.recordCount;
                    }
                })
            }

        }
    }
</script>

<style scoped>

</style>
