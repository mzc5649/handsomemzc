<template>
    <div class="MemberSidebarIndex">
        <h3 style="padding-left: 20px;">概览</h3>
        <div class="user-info-item">
            <span class="user-info-item-title">昵称：</span>
            <span>{{userData.uUsername}}</span>
        </div>
        <div class="user-info-item">
            <span class="user-info-item-title">性别：</span>
            <span>
                <span class="info">{{userData.uSex | getSex}}</span>
            </span>
        </div>
        <div class="user-info-item">
            <span class="user-info-item-title">签名：</span>
            <span>{{userData.uSign}}</span>

        </div>
        <div class="user-info-item">
            <span class="user-info-item-title">描述：</span>
            <span>本站第
                <span class="bold">{{userData.uId}}</span>
                号会员 入驻本站
                  <span class="bold">{{userData.uRegTime | getDays}}</span>
                天</span>

        </div>
    </div>
</template>

<script>
    export default {
        name: "MemberSidebarIndex",
        props: ['userData'],
        filters: {
            getDays(time) {
                var date = new Date(time);
                var now = new Date();
                var diff = Math.abs(date.getTime() - now.getTime())
                var result = parseInt(diff / (1000 * 60 * 60 * 24));
                return result
            },
            getSex(data) {
                if (data == 1) {
                    return '男'
                } else if (data == 2) {
                    return '女'
                } else {
                    return '保密'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .bold {
        font-weight: 700;
    }

    .MemberSidebarIndex {
        width: 100%;
        font-weight: 400;

        .user-info-item {
            padding: 20px;
            border-bottom: 1px solid var(--border-color);

            .user-info-item-title {
                color: #999;

            }
        }
    }

</style>
