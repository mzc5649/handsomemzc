<template>
    <div  class="right-side">
        <UserCard></UserCard>
        <ArticleSortList data-scroll="in" @toArticleSort="toArticleSort"></ArticleSortList>
    </div>
</template>

<script>
    import ArticleSortList from "./ArticleSortList";
    import UserCard from "./UserCard";
    import ScrollOut from "scroll-out";

    export default {
        name: "RightSide",
        components: {UserCard, ArticleSortList},
        data() {
            return {
                so: ''
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.so = ScrollOut({
                    onShown: function (el) {
                        el.classList.remove("animate__animated", "animate__zoomInDown")
                        void el.offsetWidth;
                        el.classList.add("animate__animated", "animate__zoomInDown")
                    },
                    onHidden: function (el) {
                        // hide the element initially
                    }
                });
            })
        },
        methods: {
            toArticleSort(id) {
                this.$emit("toArticleSort", id)
            }
        },
        destroyed() {
            this.so.teardown()
        }
    }
</script>

<style scoped>
    .right-side {
        padding: 12px;
    }
</style>
