<template>
    <view-box>
        <div class="detail-container">
            <section class="swiper-container">
                <swiper :height="'1.9rem'">
                    <swiper-item v-for="(item,index) in imgList" :key="index">
                        <img class="full" :src="item.src" @click="show(index)">
                    </swiper-item>
                </swiper>
                <div v-transfer-dom>
                    <previewer :list="imgList" ref="previewer" ></previewer>
                </div>
            </section>
            <section class="productinfo-title vux-1px-b">
                <p>{{ title }}</p>
                <span>{{ formatDate }}</span>
            </section>

            <section class="productinfo-advantage clearfix">
                <div class="cell" v-for="(el,index) in icons" :key="index">
                    <i class="iconfont" :class="el.icon"></i> 
                    <span>{{ el.title }}</span>
                </div> 
            </section>

            <section class="productinfo-sku">
                <ul class="clearfix">
                    <li v-for="(obj,key) in skus" :key="key" :class="{'full':obj.full,'oranger':key === 'price'}">
                        <label>{{ obj.title }}：</label>
                        <span v-html="obj.str"></span>
                    </li>
                </ul>
            </section>

            <section class="productinfo-desc wangEditor-container">
                <h4 class="tit vux-1px-b">货品描述</h4>
                <div class="wangEditor-txt" v-html="des"></div>
            </section>

            <section class="productinfo-footer vux-1px-t">
                <div class="productinfo-number">
                    产品编号：<br>
                    <span>{{ offerId.offerId }}</span>
                </div> 
                <a :href="'tel:'+ tel" class="productinfo-call">拨打电话</a>
            </section>
        </div>
    </view-box>
</template>

<script>
    import { Swiper, SwiperItem, Previewer, TransferDom, dateFormat, ViewBox } from 'vux'
    export default {
        components: {
            Swiper,
            SwiperItem,
            Previewer,
            ViewBox
        },
        directives: {
            TransferDom
        },
        data () {
            return {
                imgList: [],
                icons:[
                    {
                        title:'低于市场价格',
                        icon:'icon-paimai'
                    },{
                        title:'免费上门质检',
                        icon:'icon-dunpai'
                    },{
                        title:'全程VIP待遇',
                        icon:'icon-icon-vip'
                     }
                ],
                title: '',
                date: '',
                des: '',
                tel: '',
                skus:{
                    price:{
                        title: '价格',
                        str: '',
                        full: true
                    },
                    type:{
                        title: '品类',
                        str: '',
                        full: false
                    },
                    material:{
                        title: '材质',
                        str: '',
                        full: false
                    },
                    surface: {
                        title: '表面',
                        str: '',
                        full: false
                    },
                    proPlace: {
                        title: '产地',
                        str: '',
                        full: false
                    },
                    count: {
                        title: '数量',
                        str: '',
                        full: false
                    },
                    tolerance: {
                        title: '公差',
                        str: '',
                        full: false
                    },
                    spec: {
                        title: '规格',
                        str: '',
                        full: true
                    },
                    adress: {
                        title: '地址',
                        str: '',
                        full: true
                    }
                }
            }
        },
        computed: {
            offerId(){
                return {
                    offerId: this.$route.params.offerId
                }
            },
            formatDate(){
                return dateFormat(new Date(this.date*1), 'YYYY-MM-DD')
            }
        },
        methods: {
            show (index) {
                this.$refs.previewer.show(index)
            },
            getDetail(){
                this.$http.get(this.api.specoffer,{
                    params: this.offerId
                }).then(res => {
                    let specOffer = res.data.data.specOffer;
                    if(res.data.status === 0){
                        this.title = specOffer.title;
                        this.date = specOffer.pushTime;
                        this.des = specOffer.des;
                        this.tel = specOffer.tel;
                        this.handleImg(specOffer);
                        this.handleSkus(specOffer);
                    }
                })
            },
            handleImg(specOffer){
                // T_T 处理图片数据,本该后端处理 待优化
                this.imgList.push({src:'/'+specOffer.cover,w: 800,h: 400});
                for(let i = 1 ; i < 6; i++ ){
                    let pic = specOffer['pic'+i];
                    if(pic != ''){
                        this.imgList.push({src:'/'+pic,w: 800,h: 400})
                    }
                }
            },
            handleSkus(specOffer){
                this.skus.price.str = `${ specOffer.price }元/${ specOffer.unit } <em style="color:#333;font-size:.12rem">(${ specOffer.priceDesc1 }|${ specOffer.priceDesc2 })</em>`;
                this.skus.type.str = specOffer.type;
                this.skus.material.str = specOffer.material;
                this.skus.surface.str = specOffer.surface;
                this.skus.proPlace.str = specOffer.proPlace;
                this.skus.count.str = specOffer.count;
                this.skus.tolerance.str = specOffer.tolerance;
                this.skus.spec.str = specOffer.spec;
                this.skus.adress.str = `${ specOffer.province } ${ specOffer.city } ${ specOffer.cityDesc }`;
            }
        },
        created () {
            this.getDetail()
        }
    }
</script>


<style lang="less" scoped>
    .bkf{
        background-color: #fff;
    }
    .detail-container{
        width: 100%;
        .swiper-container{
            width: 100%;
            .full{
                width: 100%;
                height: 100%;
            }
        }
        
        .productinfo-title{
            position: relative;
            width: 100%;
            padding: .05rem .1rem .1rem;
            p{
                font-size: .16rem;
                font-weight: 700;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            span{
                font-size: .12rem;
                color: #828282;
            }
            .bkf
        }

        .productinfo-advantage{
            width: 100%;
            padding: .1rem;
            .cell{
                float: left;
                width: 100%/3;
                height: 60px;
                i{
                    width: .35rem;
                    height: .35rem;
                    font-size: .35rem;
                    line-height: .35rem;
                    display: block;
                    margin: 0 auto;
                    color: #5c96ff;
                }
                span{
                    display: block;
                    text-align: center;
                    font-size: .12rem;
                    margin-top: .05rem;
                    color: #828282;
                }
            }
            .bkf
        }

        .productinfo-sku{
            width: 100%;
            padding: .1rem;
            margin-top: .1rem;
            li{
                width: 48%;
                float: left;
                color: #333;
                margin-bottom: .05rem;
                font-size: .13rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                margin-right: 2%;
                text-indent: .1rem;
                label{
                    display: inline-block;
                    color: #828282;
                    width: .4rem;
                    margin-right: .1rem;
                    text-align: right;
                }
            }
            li.full{
                width: 100%;
            }
            li.oranger{
                color: #f90000;
                span{
                    font-size: .14rem;
                }
            }
            .bkf
        }

        .productinfo-desc{
            width: 100%;
            margin-top: .1rem;
            padding-bottom: .45rem;
            .tit{
                height: .38rem;
                line-height: .38rem;
                text-indent: .1rem;
                color: #333;
                font-weight: 700;
            }
            .wangEditor-txt{
                padding: .1rem;
            }
        }

        .productinfo-footer{
            position: fixed;
            width: 100%;
            padding: 0 .1rem;
            bottom: 0;
            left: 0;
            height: .5rem;
            line-height: .5rem;
            font-size: .12rem;
            z-index: 999;
            .productinfo-number{
                float: left;
                line-height: .2rem;
                margin-top: .05rem;
                span{
                    color: #828282;
                }
            }
            .productinfo-call{
                display: block;
                float: right;
                width: 1.1rem;
                height: .4rem;
                line-height: .4rem;
                background-color: #e94b1b;
                margin-top: .05rem;
                border-radius: .05rem;
                color: #fff;
                text-align: center;
                font-size: .14rem;
            }
            .bkf
        }
    }
</style>
