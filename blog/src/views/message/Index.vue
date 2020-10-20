<template>
    <div class="index">
        <v-container>
            <CommentBox></CommentBox>
        </v-container>
    </div>
</template>

<script>
    import CommentBox from "../../components/CommentBox";
    export default {
        name: "Index",
        components: {CommentBox}
    }
</script>

<style scoped>

</style>
