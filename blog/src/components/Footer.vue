<template>
        <v-card
                flat
                tile
                width="100%"
                color=""
        >
            <v-card-text  class="d-flex justify-center" >
                {{new Date().getFullYear() }}—帅气马哥
                <a href="http://beian.miit.gov.cn">晋ICP备2020011444号</a>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text  style="height: 66px">
            </v-card-text>
        </v-card>


</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .footer {

    }
</style>
