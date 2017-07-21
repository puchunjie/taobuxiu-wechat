<template>
  <common-detail v-show="show.do" pageTitle="加工详情" :swiperImgs="swiperImgs" :baseInfo="baseInfo"
  :detailInfo="detailInfo" :shopInfo="shopInfo" @on-back="show.do = false"></common-detail>
</template>

<script>
    import commonDetail from '@/components/business/publicDetail.vue'
    export default {
        props:{
            handingId:{
                type: String
            },
            show:{
                type: Object,
                default:{
                    do:false
                }
            }
        },
        components: {
            commonDetail
        },
        data () {
            return {
                baseInfo: {},
                swiperImgs: [],
                detailInfo:[
                    {
                        label:'类型',
                        value: ''
                    },
                    {
                        label:'地点',
                        value: ''
                    }
                ],
                shopInfo:{},
                sellerId: ''
            }
        },
        methods: {
            getDetail(){
                this.$http.get(this.api.handingDetail,{
                    params:{
                        handingId: this.handingId
                    }
                }).then(res => {
                    let data = res.data;
                    //获取店铺信息
                    this.getShopInfo(data.userId);
                    this.sellerId = data.userId;
                    ['cover','image1','image2','image3'].forEach(el => {
                        let img = data[el];
                        if( img != ''){
                            this.swiperImgs.push(img)
                        }
                    });

                    this.baseInfo = {
                        title: data.title,
                        price: data.price,
                        unit: data.unit,
                        place: data.cityName
                    }

                    this.detailInfo[0].value = data.type;
                    this.detailInfo[1].value = data.cityName;
                    
                })
            },
            getShopInfo(id){
                this.$http.get(this.api.shopInfo,{
                    params:{
                        sellerId: id 
                    }
                }).then(res => {
                    let data = res.data;
                    this.shopInfo = {
                        cover: data.cover,
                        name: data.companyName,
                        desc: data.handingTypeDesc,
                        adress: data.officeAddress,
                        sellerId:this.sellerId
                    }
                })
            }
        },
        created () {
            this.getDetail()
        },
        watch: {
            'handingId': function(){
                this.getDetail()
            }
        }
    }
</script>
