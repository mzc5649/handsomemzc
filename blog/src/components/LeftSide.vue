<template>
    <div class="left-side">
        <vs-card type="5">
            <template #title>
                <h3 style="overflow: hidden;
    text-overflow: ellipsis;">{{master.uname}}</h3>
                <div>

                </div>
            </template>
            <template #text>
                <div>
                    <span class="info">No.{{master.uid}}</span>
                    <i class="fa fa-male info"></i>
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

    .user-info {
        display: flex;
    }

    .user-info-left {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .user-info-right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .user-info-name {
        color: var(--theme-text);
    }
</style>
