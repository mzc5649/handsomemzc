<template>
    <div class="index">
        <v-container>
            <v-row>
                <v-col :md="8" :sm="12" :cols="12" >
                    <v-container fluid class="py-0">
                        <v-row align="center" justify="space-between">
                            <div class="title">
                                全部文章
                            </div>
<!--                            <v-switch color="red" :value="false" inset label="热门"></v-switch>-->
                        </v-row>
                    </v-container>
                    <div v-if="articleLoading">
                        <v-skeleton-loader
                                type="card"
                                class="mb-6"
                        />
                        <v-skeleton-loader
                                type="card"
                                class="mb-6"
                        />
                    </div>
                        <ArticleList v-else :articleStore="articleStore" @loadData="loadData" ></ArticleList>

                </v-col>
                <v-col :md="4" :sm="12" :cols="12 ">
                    <ArticleSortList :sortId="id" @toArticleSort="toArticleSort"></ArticleSortList>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import ArticleList from "@/components/article/ArticleList";
    import {getArticleDataBySort} from "@/api/sort"
    import ArticleSortList from "@/components/ArticleSortList";
    export default {
        name: "Index",
        components: {ArticleSortList, ArticleList},
        data() {
            return {
                articleStore: {
                    list: [],
                    total: 0,
                    currentPage: 1,
                    pageSize: 5
                },
                id: '',
                articleLoading:true
            }
        },
        created() {
            let that = this;
            that.id = that.$route.params.id.toString();
        },
        mounted() {
            this.getArticleData();
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
                const params = {
                    currentPage: that.articleStore.currentPage,
                    pageSize: that.articleStore.pageSize
                }
                getArticleDataBySort(that.id, params).then(function (res) {
                    that.articleLoading=false
                    that.articleStore.list = that.articleStore.list.concat(res.data.recordList);
                    that.articleStore.total = res.data.recordCount;
                })
            },
            initData() {
                this.articleStore = {
                    list: [],
                    total: 0,
                    currentPage: 1,
                    pageSize: 5
                }
                this.articleLoading=true
                this.getArticleData()
            },
            toArticleSort(id) {
                this.id = id.toString()
                this.$router.push({
                    name: "ArticleSort",
                    params: {
                        id: id
                    }
                })
                this.initData()

            }
        }
    }
</script>

<style scoped>

</style>
