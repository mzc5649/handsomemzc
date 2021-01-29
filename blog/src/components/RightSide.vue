<template>
    <div class="right-side" >
        <UserCard data-scroll="in" class="magictime"></UserCard>
        <ArticleSortList></ArticleSortList>
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
            return {}
        },
        computed: {
            device() {
                return this.$store.state.app.device;
            },
        },
        mounted() {
            ScrollOut({
                onShown: function (el) {
                    el.classList.add("boingInUp");
                },
                onHidden: function (el) {
                    // hide the element initially
                    el.classList.remove("boingInUp");
                },

            });

        },
        methods: {

        },
        destroyed() {

        }
    }
</script>

<style scoped>
    .right-side {
        padding: 12px;
    }
</style>
