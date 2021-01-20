<template>
    <div v-if="user"  class="card-user ">
        <vs-card >
            <template #img>
                <img :src="user.uCover" alt="">
            </template>
            <template #title>
                <div style="display: flex;align-items: center">
                    <!--头像-->
                    <vs-avatar circle size="60" style="border: 2px white solid">
                        <img
                                :src="user.uIcon"
                                style="width: 100%;height: 100%"
                        />
                    </vs-avatar>
                    <div style="margin-left: 15px">
                        <h3 style="overflow: hidden;text-overflow: ellipsis;">{{user.uUsername}}</h3>
                        <span class="info">No.{{user.uId}}</span>
                        <i class="fas fa-male info" v-if="user.uSex == 1"></i>
                        <i class="fas fa-female info" v-if="user.uSex == 2"></i>
                    </div>
                </div>
            </template>
            <template #text>
                <p>
                    {{user.uSign}}
                </p>
            </template>
        </vs-card>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "UserCard",
        mounted() {

        },
        computed: {
            ...mapState(["user"])
        },
    }
</script>

<style scoped>
    .card-user {
        margin-bottom: 10px;
    }
    .info {
        margin-right: 10px;
        font-size: 13px;
        color: #A0A0A0;
    }
</style>
