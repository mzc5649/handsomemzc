<template>
    <div class="ArticleList">
        <ArticleItem
                v-for="item in articleStore.list"
                :article="item"
                :key="item.artInfoId"
        ></ArticleItem>
        <vs-button
                shadow border dark
                v-if="hasMore"
                :loading="articleLoading"
                @click="loadData"
                block
                animation-type="vertical"
        >
            加载更多
            <template #animate>
                加载更多
            </template>
        </vs-button>
        <vs-button v-else disabled shadow border dark block>没有更多了</vs-button>
    </div>
</template>

<script>
    import ArticleItem from "@/components/ArticleItem";

    export default {
        name: "ArticleList",
        components: {ArticleItem},
        props: {
            articleStore: {
                required: true,
                type: Object,
                default() {
                    return {
                        list: [],
                        total: 0,
                        currentPage: 1,
                        pageSize: 5
                    };
                }
            }
        },
        data() {
            return {
                articleLoading: false
            };
        },
        methods: {
            loadData() {
                const that = this;
                this.$emit("loadData", that.$data);
            }
        },
        computed: {
            //加载更多按钮的显示计算
            hasMore() {
                const that = this;
                return (
                    that.articleStore.currentPage * that.articleStore.pageSize <
                    that.articleStore.total
                );
            }
        }
    };
</script>

<style scoped>
    .ArticleList {
        padding: 12px;
    }
</style>
