<template>
    <section class="article-container">
        <div class="header">
            <span class="iconfont" :class="icon"></span> 
            <span class="label">{{ title }}</span> 
            <a @click="jumpTo(moreLink)" v-show="moreLink">更多</a>
        </div>
        <div class="content">
            <div class="item" v-for="(item,index) in list" :key="item.id">
                <p :class="{'left-side':showTime}">{{ item.title }}</p>
                <span class="date" v-if="showTime">{{ formateDate(item.time) }}</span>
            </div>
        </div>
    </section>
</template>

<script>
    import { dateFormat } from 'vux'
    export default {
        props:{
            list:{
                type:Array,
                default:function(){
                    return []
                }
            },
            showTime:{
                type:Boolean,
                default:false
            },
            icon:{
                type:String
            },
            title:{
                type:String
            },
            moreLink:{
                type:Object
            }
        },
        methods: {
            formateDate(time){
                return dateFormat(new Date(time*1), 'YYYY-MM-DD')
            },
            jumpTo(link){
                if(link)
                    this.$router.push(link)
            }
        }
    }
</script>


<style lang="less">
    .article-container{
        width: 100%;
        margin-bottom: .1rem;
        background-color: #fff;
        .header{
            width: 100%;
            padding: .05rem 0;
            height: .4rem;
            line-height: .3rem;
            border-bottom: 1px solid #ccc;
            span{
                float: left;
            }
            .iconfont {
                font-size: .24rem;
                display: inline-block;
                margin: 0 .1rem;
            }
            .label{
                display: inline-block;
                margin-left: .05rem;
                font-size: 16px;
            }
            a{
                float: right;
                font-size: 12px;
                margin-right: .1rem;
                color: #a4a4a4;
            }
        }
        .content{
            width: 100%;
            padding: .1rem 0;
            .item{
                width: 3.4rem;
                height: .28rem;
                margin: 0 auto;
                border-bottom: 1px dashed #ccc;
                padding: .02rem 0;
                overflow: hidden;
                font-size: .14rem;
                color: #666;
                p{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .left-side{
                    float: left;
                    width: 2.5rem;
                }
                .date{
                    float: left;
                    width: .8rem;
                    text-align: right;
                    margin-left: .1rem;
                }
            }
        }
    }
</style>
