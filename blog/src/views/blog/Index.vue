<template>
    <div class="index">
        <v-container>
            <v-row>
                <v-col :md="8" :sm="12" :cols="12">
                    <v-container fluid class="py-0">
                        <v-row align="center" justify="space-between">
                            <div  class="title">
                                全部文章
                            </div>
                            <v-switch color="red" :value="false" inset label="热门"></v-switch>
                        </v-row>
                    </v-container>
                    <ArticleList  :articleStore="articleStore" @loadData="loadData"></ArticleList>
                </v-col>
                <v-col :md="4" :sm="12" :cols="12 ">
                    2
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
    import axios from 'axios'
    import ArticleList from "@/components/article/ArticleList";

    export default {
        name: "Index",
        components: {ArticleList},
        data() {
            return {
                articleStore: {
                    list: [],
                    total: 0,
                    currentPage: 1,
                    pageSize: 5
                },
            }
        },
        async created() {
            let that = this;
            await that.getArticleData();
        },
        methods: {
            async loadData(data) {
                let that = this;
                if ((that.articleStore.currentPage - 1) * that.articleStore.pageSize < that.articleStore.total) {
                    data.articleLoading = true;
                    that.articleStore.currentPage += 1;
                    await that.getArticleData();
                    data.articleLoading = false;


                }


            },
            async getArticleData() {
                let that = this;
                axios.get("/blog/article/all", {
                    params: {
                        currentPage: that.articleStore.currentPage,
                        pageSize: that.articleStore.pageSize
                    }
                }).then(function (res) {
                    if (res.data.code == 0) {
                        that.articleStore.list = that.articleStore.list.concat(res.data.data.recordList);
                        that.articleStore.total = res.data.data.recordCount;
                    }
                    return true;
                }).catch(function () {
                    return false;
                })
            }

        }
    }
</script>

<style scoped>

</style>
