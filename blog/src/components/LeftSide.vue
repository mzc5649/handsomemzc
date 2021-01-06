<template>
    <div class="left-side">
        <vs-card type="5">
            <template #title>
                <h3 style="overflow: hidden;text-overflow: ellipsis;">{{master.uname}}</h3>
            </template>
            <template #text>
                <div>
                    <span class="info">No.{{master.uid}}</span>
                    <i class="fas fa-male info" v-if="master.usex == 1"></i>
                    <i class="fas fa-female info" v-if="master.usex == 2"></i>
                </div>
                <p>
                    {{master.usign}}
                </p>
            </template>
            <template #img>
                <img src="https://cdn.jsdelivr.net/gh/mzc5649/CDN/images/tengyuan.gif" alt="">
            </template>
            <template #interactions>
                <!--头像-->
                <vs-avatar circle size="60" style="border: 2px white solid">
                    <img
                            :src="master.uicon"
                    />
                </vs-avatar>
            </template>
        </vs-card>
        <div>

        </div>
    </div>
</template>

<script>
    import {getWebInfo} from '../api/app'

    export default {
        name: "LeftSide",
        data() {
            return {
                master: {
                    uid: '',
                    uname: '',
                    uicon: '',
                    usex: '',
                    usign: ''
                }
            }
        },
        created() {
            getWebInfo().then(res => {
                this.master = res.data
            })
        }
    };
</script>

<style scoped>
    .left-side {
        padding: 12px;
    }

    .info {
        margin-right: 10px;
        font-size: 13px;
        color: #A0A0A0;
    }
</style>
