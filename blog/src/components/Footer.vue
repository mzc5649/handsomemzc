<template>
    <div class="footer">
        <div style="display: flex;justify-content: center" >
            {{new Date().getFullYear() }}-帅气马哥-
            <a href="http://beian.miit.gov.cn">晋ICP备2020011444号</a>
        </div>
        <div style="height: 66px">

        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="scss">
    .footer {
        color: var(--primary-color);
        a{
            color: var(--primary-color);
        }
    }
</style>
