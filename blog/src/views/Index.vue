<template>
    <div class="Index">
        <v-app-bar app dense :height="56" flat fixed style="background-color: transparent;">
            <div class="toolbar-content container">
                <div class="toolbar-title">handsomemzc</div>
                <div class="toolbar-nav">
                    <v-btn elevation="0" tile text to="/">welcome</v-btn>
                    <v-btn elevation="0" tile text to="/blog/index">博客</v-btn>
                </div>
            </div>
        </v-app-bar>
        <div id='background' class="background">
        </div>
        <button class="btn-nav pre-button" direction='pre'>
            <i class="el-icon-arrow-left"></i>
        </button>
        <button class="btn-nav next-button" direction='next'>
            <i class="el-icon-arrow-right" direction='next'></i>
        </button>

    </div>
</template>

<script>
    // @ is an alias to /src

    import axios from 'axios'

    export default {
        name: "Index",
        components: {},
        data() {
            return {
                audios: []
            }
        },
        created() {
            let that = this;
        },
        mounted() {
            let that = this;
            var currentIndex = 0;
            var flag = true;
            const option = {
                width: 1920,
                height: 1080,
                transparent: false,
            }
            let app = new PIXI.Application(option);
            // 把 Pixi 应用中创建出来的 canvas 添加到页面上
            //document.body.appendChild(app.view);
            // 获取渲染器
            var renderer = app.renderer;
            renderer.view.style.objectFit = 'cover';
            renderer.view.style.position = 'absolute';
            renderer.view.style.width = '100%';
            renderer.view.style.height = '100%';
            renderer.view.style.top = '50%';
            renderer.view.style.left = '50%';
            renderer.view.style.webkitTransform = 'translate(-50%,-50%) scale(1)';
            renderer.view.style.transform = 'translate(-50%,-50%) scale(1)';
            // 图片精灵
            var preview1;
            var preview2;
            var preview3;
            // 置换图精灵
            var displacementSprite;
            // 滤镜
            var displacementFilter;
            var playground = document.getElementById('background');
            var stage = new PIXI.Container();

            function setScene() {
                // renderer.view 是 Pixi 创建的一个canvas
                // 创建舞台（一个容器），这里面包括了图片精灵、置换图精灵

                // 根据图片的 url，创建图片精灵
                preview1 = PIXI.Sprite.from("https://cdn.jsdelivr.net/gh/mzc5649/CDN/images/background1.jpg");
                preview2 = PIXI.Sprite.from("https://cdn.jsdelivr.net/gh/mzc5649/CDN/images/background2.jpg");
                preview3 = PIXI.Sprite.from("https://cdn.jsdelivr.net/gh/mzc5649/CDN/images/background3.jpg");
                // 创建置换图精灵，在创建置换滤镜时会用到这个精灵
                displacementSprite = PIXI.Sprite.from('https://cdn.jsdelivr.net/gh/mzc5649/CDN/images/sprite-displace2.jpg');
                // 设置置换图精灵为平铺模式
                displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
                // 创建一个置换滤镜
                displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
                displacementSprite.scale.x = 2;
                displacementSprite.scale.y = 2;
                // 添加 图片精灵 到舞台
                stage.addChild(preview1);
                preview2.alpha = 0;
                stage.addChild(preview2);
                preview3.alpha = 0;
                stage.addChild(preview3);
                // 添加 置换图精灵 到舞台
                stage.addChild(displacementSprite);
                // 设置舞台的滤镜
                stage.filters = [displacementFilter];
                // 把 stage 添加到根容器上
                app.stage.addChild(stage);
                // 把 Pixi 创建的 canvas 添加到页面上
                playground.appendChild(renderer.view);

            }

            setScene();
            var velocityX = 10;
            var velocityY = 3;
            //监听器
            // var ticker = new PIXI.ticker.Ticker();
            var ticker = app.ticker;
            ticker.autoStart = true;
            ticker.add(function () {
                displacementSprite.x += velocityX
                displacementSprite.y += velocityY
            });
            var slideImages = stage.children;

            //更改背景
            function changeBG(pre, next) {
                var baseTimeline = new TimelineMax({
                    onComplete: function () {
                        //完成过渡 设置flag为可过渡
                        flag = true;
                    }, onUpdate: function () {
                    }
                });
                baseTimeline.to(displacementFilter.scale, 1, {x: 200, y: 70})
                    .to(slideImages[pre], 0.5, {alpha: 0})
                    .to(slideImages[next], 0.5, {alpha: 1})
                    .to(displacementFilter.scale, 1, {x: 20, y: 20});
            }

            var navs = document.querySelectorAll('.btn-nav');
            for (var i = 0; i < navs.length; i++) {
                var nav = navs[i];
                nav.onclick = function () {
                    //过渡时不可更改
                    if (flag) {
                        //设置不可过渡
                        flag = false;
                        if (this.getAttribute('direction') === 'next') {
                            if (currentIndex >= 0 && currentIndex < 2) {
                                currentIndex++;
                                changeBG(currentIndex - 1, currentIndex);
                            } else {
                                currentIndex = 0;
                                changeBG(2, currentIndex);
                            }
                        } else {
                            if (currentIndex <= 2 && currentIndex > 0) {
                                currentIndex--;
                                changeBG(currentIndex + 1, currentIndex);
                            } else {
                                currentIndex = 2;
                                changeBG(0, currentIndex);
                            }
                        }
                    }

                }
            }


        },
        updated() {
            let that = this;

        },
        methods: {}
    }


</script>
<style scoped lang="scss">
    .pre-button {
        position: fixed;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 50px;
        z-index: 1;
        outline: none
    }

    .next-button {
        position: fixed;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 50px;
        z-index: 1;
        outline: none
    }
    .toolbar-content {
        height: 100%;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        display: flex;
        padding: 0;
        font-size: 22px;
        color: white;
        .toolbar-nav {
            height: 100%;

            .v-btn {
                font-size: 20px;
                color: white;
                min-width: 80px;
                margin: 0 6px;
                height: 100%;
                border: none;
            }
        }

        .toolbar-title {
            font-weight: 700;
        }
    }

</style>
<style>
    .aplayer-lrc {

    }
</style>
