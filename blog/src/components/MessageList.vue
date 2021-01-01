<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "MessageList",
        props: {
            comments: {
                type: Array
            },
            messageLoading: {
                type: Boolean,
                default: true
            }
        },
    }
</script>

<style scoped>

</style>
