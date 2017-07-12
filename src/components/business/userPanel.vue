<template>
    <section class="manage-panel">
        <div class="title vux-1px-b">
            <span class="iconfont" :class="data.title.icon" :style="{'color': data.title.color}"></span>
            {{ data.title.name }}
        </div>
        <div class="info vux-1px-b">
            <div class="cell vux-1px-r" v-for="(val,key) in data.info" :key="key">
                <p class="count">{{ val.count }}</p>
                <p>{{ val.name }}</p>
            </div>
        </div>
        <div class="links">
            <div class="cell" v-for="(item,index) in data.links" :key="index">
                <span class="iconfont" :class="item.icon" :style="{'color': item.color}"></span>
                <p>{{ item.title }}</p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        props:{
            data:{
                type:Object
            }
        }
    }
</script>

<style lang="less" scoped>
    .manage-panel{
        width: 100%;
        margin-top: .1rem;
        padding: .1rem 0;
        background-color: #fff;
        .title{
            position: relative;
            width: 100%;
            height: .4rem;
            line-height: .4rem;
            text-indent: .6rem;
            font-size: .16rem;
            .iconfont{
                position: absolute;
                font-size: .3rem;
                left: -.4rem;
            }
        }

        .info{
            display: flex;
            width: 100%;
            height: .6rem;
            .cell{
                width: 100%/3;
                height: 100%;
                text-align: center;
                line-height: .2rem;
                padding: .1rem 0;
            }
        }

        .links{
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            .cell{
                width: 100%/4;
                height: .7rem;
                text-align: center;
                padding: .1rem 0;
            }
            .iconfont{
                font-size: .2rem;
            }
        }
    }
</style>
