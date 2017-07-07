<template>
  <common-detail pageTitle="加工详情" :swiperImgs="swiperImgs" :baseInfo="baseInfo"
  :detailInfo="detailInfo" :shopInfo="shopInfo"></common-detail>
</template>

<script>
    import commonDetail from '@/components/business/publicDetail.vue'
    export default {
        components: {
            commonDetail
        },
        data () {
            return {
                baseInfo: {},
                swiperImgs: [],
                detailInfo:[
                        {
                            label:'品类',
                            value: '不锈钢管'
                        },
                        {
                            label:'材质',
                            value: '304'
                        },
                        {
                            label:'表面',
                            value: '2B'
                        },
                        {
                            label:'产地',
                            value: '太钢'
                        },
                        {
                            label:'规格',
                            value: '1000*90*10'
                        },
                        {
                            label:'地点',
                            value: '江苏 无锡'
                        }
                    ],
                shopInfo:{}
            }
        },
        computed: {
            ironId(){
                return this.$route.params.ironId;
            }
        },
        methods: {
            getDetail(){
                this.$http.get(this.api.ironDetail,{
                    params:{
                        ironId: this.ironId
                    }
                }).then(res => {
                    let data = res.data;
                    //获取店铺信息
                    this.getShopInfo(data.userId);
                    ['cover','image1','image2','image3'].forEach(el => {
                        let img = data[el];
                        if( img != ''){
                            this.swiperImgs.push(img)
                        }
                    });

                    this.baseInfo = {
                        title: `${ data.ironType } ${ data.material } ${ data.surface } ${ data.proPlace }`,
                        price: data.price,
                        unit: data.unit,
                        numbers: data.numbers,
                        place: data.cityName
                    }

                    this.detailInfo[0].value = data.ironType;
                    this.detailInfo[1].value = data.material;
                    this.detailInfo[2].value = data.surface;
                    this.detailInfo[3].value = data.proPlace;
                    this.detailInfo[4].value = data.title;
                    this.detailInfo[5].value = data.cityName;
                })
            },
            getShopInfo(id){
                return this.$http.get(this.api.shopInfo,{
                    params:{
                        sellerId: id 
                    }
                }).then(res => {
                    let data = res.data;
                    this.shopInfo = {
                        cover: data.cover,
                        name: data.companyName,
                        desc: data.ironTypeDesc,
                        adress: data.officeAddress
                    }
                })
            }
        },
        created () {
            this.getDetail()
        }
    }
</script>
