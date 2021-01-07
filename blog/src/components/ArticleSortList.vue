<template>
    <div class="sort-list">
        <div>
            分类标签
        </div>
        <content-placeholders v-if="loading">
            <content-placeholders-heading></content-placeholders-heading>
            <content-placeholders-heading></content-placeholders-heading>
        </content-placeholders>
        <div style="display:flex;" v-if="!loading">
            <template v-for="item in articleSortData">
                <vs-button :key="item.sortId"
                           dark
                           border
                           shadow
                           @click="toArticleSort(item.sortId)"
                           :disabled="sortId == item.sortId"
                >
                    {{item.sortName}}
                </vs-button>
            </template>
        </div>
    </div>
</template>

<script>
    import {getArticleSortTag} from "@/api/sort"

    export default {
        name: "ArticleSortList",
        props: {},
        data() {
            return {
                articleSortData: '',
                loading: true,
                sortId: 0

            }
        },
        created() {
            this.sortId = this.$route.params.id;
            getArticleSortTag().then(res => {
                this.loading = false
                this.articleSortData = res.data
            })
        },
        methods: {
            toArticleSort(id) {
                this.sortId = id
                this.$emit("toArticleSort", id)
            }
        }
    }
</script>

<style scoped>
    .sort-list {
        color: var(--theme-text);
        background-color: var(--theme-card-bg);
        border-radius: 20px;
        padding: 12px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 20px 0px;
        margin-bottom: 10px;
    }
</style>
