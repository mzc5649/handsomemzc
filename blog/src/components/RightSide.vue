<template>
    <div class="right-side">
        <UserCard></UserCard>
        <ArticleSortList  @toArticleSort="toArticleSort"></ArticleSortList>

    </div>
</template>

<script>
    import ArticleSortList from "./ArticleSortList";
    import UserCard from "./UserCard";

    export default {
        name: "RightSide",
        components: {UserCard, ArticleSortList},
        mounted() {

        },
        methods:{
            toArticleSort(id) {
                this.$emit("toArticleSort", id)
            }
        }
    }
</script>

<style scoped>
.right-side{
    padding: 12px;
}
</style>
