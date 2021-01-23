<template>
    <div class="Index">
        <div class="navbar">

            <vs-button shadow to="/blog">博客</vs-button>
        </div>
        <div id='background' class="background">
        </div>
    </div>
</template>

<script>

    export default {
        name: "Index",
        components: {},
        data() {
            return {
                bgInterval: null,
                currentIndex: 0,
            }
        },
        created() {
            let that = this;
        },
        mounted() {
            let that = this;
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
                    }, onUpdate: function () {
                    }
                });
                baseTimeline.to(displacementFilter.scale, 1, {x: 200, y: 70})
                    .to(slideImages[pre], 0.5, {alpha: 0})
                    .to(slideImages[next], 0.5, {alpha: 1})
                    .to(displacementFilter.scale, 1, {x: 20, y: 20});
            };
            this.bgInterval = setInterval(() => {
                if (this.currentIndex >= 0 && this.currentIndex < 2) {
                    this.currentIndex++;
                    changeBG(this.currentIndex - 1, this.currentIndex);
                } else {
                    this.currentIndex = 0;
                    changeBG(2, this.currentIndex);
                }
            }, 10000);
        },
        updated() {
        },
        methods: {},
        beforeDestroy() {
            clearInterval(this.bgInterval)
        }
    }


</script>
<style scoped lang="scss">
    .navbar {
        background-color: transparent;
        position: relative;
        display: flex;
        justify-content: flex-end;
        z-index: 9999;
    }
</style>
<style>
</style>
