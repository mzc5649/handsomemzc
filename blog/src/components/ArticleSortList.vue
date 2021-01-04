<template>
    <div class="sort-list">
        <div>
            分类标签
        </div>
        <div style="display:flex;">
            <template v-for="item in articleSortData" >
                <vs-button :key="item.sortId"
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
        props: {
            sortId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                articleSortData: '',
                loading: true
            }
        },
        created() {
            getArticleSortTag().then(res => {
                this.loading = false
                this.articleSortData = res.data
            })
        },
        methods: {
            toArticleSort(id) {
                this.$emit("toArticleSort", id)
            }
        }
    }
</script>

<style scoped>
    .sort-list {
        color: var(--theme-text);
        padding: 12px;
    }
</style>
