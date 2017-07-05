<template>
  <view-box style="background-color:#fff">
        <com-header>淘不锈_{{ title }}</com-header>
        <div class="content">
            <template v-if="item.content">
                <h3 class="title">{{ item.title }}</h3>
                <p class="time">{{ formateDate(item.pushTime) }}</p>
                <div class="detail" v-html="item.content"></div>
            </template>
            <template v-else>
                <h3 class="title">{{ item.companyName }}</h3>
                <p class="time">{{ formateDate(item.pushTime) }}</p>
                <div class="detail recruit">
                    <p>薪资待遇：{{ item.salary }}</p>
                    <p>福利待遇：{{ item.welfare }}</p>
                    <p>要求：{{ item.description }}</p>
                    <p>联系人：{{ item.tel }}</p>
                    <p>公司地址：{{ item.place }}</p>
                </div>
            </template>
        </div>
  </view-box>
</template>

<script>
    import { ViewBox, dateFormat } from 'vux'
    import comHeader from '@/components/business/commonHead'
    export default {
        components: {
            ViewBox,
            comHeader
        },
        data () {
            return {
                item: {}
            }
        },
        computed: {
            title(){
                switch (this.$route.params.apiKey) {
                    case 'innerNewsDetail':
                        return '平台快讯'
                        break;
                    case 'allNewsDetail':
                        return '行业新闻'
                        break;
                    case 'recruitDetail':
                        return '招聘资讯'
                        break;       
                    default:
                        return '资讯中心'
                        break;
                }
            },
            apiKey(){
                return this.$route.params.apiKey;
            },
            id(){
                return this.$route.params.id;
            }
        },
        methods: {
            formateDate(time){
                return dateFormat(new Date(time*1), 'YYYY-MM-DD hh:mm')
            },
            getDetail(){
                this.$http.get(this.api[this.apiKey],{
                    params:{
                        id: this.id
                    }
                }).then(res => {
                    this.item = res.data
                })
            }
        },
        created () {
            this.getDetail();
        }
    }
</script>


<style lang="less" scoped>
    .content{
        width: 100%;
        padding: .1rem;
        .title{
            text-align: center;
            font-size: .18rem;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .time{
            text-align: center;
            font-size: .14rem;
            color: #999;
            line-height: .24rem;
        }
        .detail{
            margin-top: .1rem;
        }
        .recruit p{
            line-height: .3rem;
        }
    }

    
</style>

