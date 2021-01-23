<template>
    <div v-if="user" class="card-user" @click="toMember">
        <vs-card>
            <template #img>
                <img :src="user.uCover" alt="">
            </template>
            <template #title>
                <div style="display: flex;align-items: center">
                    <!--头像-->
                    <vs-avatar circle size="60"  style="border: 2px white solid">
                        <img
                                :src="user.uIcon"
                                style="width: 100%;height: 100%"
                        />
                    </vs-avatar>
                    <div style="margin-left: 15px">
                        <h3 style="overflow: hidden;text-overflow: ellipsis;">{{user.uUsername}}</h3>
                        <span class="info">No.{{user.uId}}</span>
                        <span class="info" v-if="user.uSex == 1">男</span>
                        <span class="info" v-else>女</span>
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
        methods:{
            toMember(){
                this.$router.push({
                    name:'MemberSidebarIndex',
                    params:{
                        id:this.user.uId
                    }

                })
            }
        }
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
