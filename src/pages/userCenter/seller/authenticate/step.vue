<template>
    <view-box body-padding-bottom=".2rem">
        <header>
            <span class="back iconfont icon-fanhui" @click.self="$router.go(-1)"></span>
            填写入驻资料
            <a class="phone"  :href="'tel:'+ userInfo.salesMan.tel" v-if="userInfo.salesMan.name != ''"><span class="iconfont icon-kefu"></span></a>
             <a class="phone" v-else @click="bindingShow"><span class="iconfont icon-kefu"></span></a> 
        </header>
        <!-- 表单步骤区域 -->
        <section class="step-content" v-show="step === 1">
            <div class="warp">
                <div class="group vux-1px-b">
                    <label>公司全称</label>
                    <input placeholder="请输入公司全称（必填）" v-model="apiData.companyName">
                </div>
                <div class="group">
                    <label>注册资金</label>
                    <input placeholder="请输入注册资金（必填）" v-model="apiData.regMoney">
                    <span class="unit">万元</span>
                </div>
            </div>

            <div class="warp">
                <div class="group vux-1px-b">
                    <label>联系人</label>
                    <input placeholder="请输入联系人（必填）" v-model="apiData.contact">
                </div>
                <div class="group vux-1px-b">
                    <label>联系电话</label>
                    <input placeholder="请输入联系电话（必填）" v-model="apiData.cantactTel">
                </div>
                <div class="group vux-1px-b">
                    <label>传真</label>
                    <input placeholder="请输入传真（必填）" v-model="apiData.fax">
                </div>
                <div class="group vux-1px-b">
                    <label>办公地址</label>
                    <input placeholder="请输入办公地址（必填）" :value="adStr">
                    <div class="ad-cover" @click="adShow.show = true"></div>
                </div>
                <div class="group vux-1px-b">
                    <label>详细地址</label>
                    <input placeholder="请输入详细地址（必填）" v-model="apiData.officeAddress">
                </div>
                <div class="group">
                    <label>QQ</label>
                    <input placeholder="请输入QQ（选填）" v-model="apiData.qq">
                </div>
            </div>

            <div class="warp" style="padding:.05rem .1rem">
                <div class="group">
                    <label for="coverUpload">企业封面</label>
                    <span class="unit">请选择您的企业封面图片<span v-show="coverOk" class="iconfont icon-gouxuan" style="color:green"></span></span>
                    <input id="coverUpload" type="file" accept="image" ref="cover" @change="coverDone" style="display:none">
                </div>
            </div>
            
            <div class="warp">
                <div class="group vux-1px-b">
                    <label>企业简介</label>
                    <group gutter="0">
                        <x-textarea style="font-size:.14rem;padding:.05rem 0;text-indent: .05rem;" :max="150" placeholder="请输入您的公司简介（限150字）" v-model="apiData.shopProfile"></x-textarea>
                    </group>
                </div>
            </div>

            <a class="submit-btn" @click="nextStep">下一步</a>
        </section>

        <section class="step-content" v-show="step === 2">
            <p class="tip">(营业执照、组织机构代码证,税务登记证) 注:请上传1M以内的JPG或者PNG格式的图片</p>
            <group gutter="0">
                <x-switch title="三证合一" v-model="apiData.isThreeInOne"></x-switch>
            </group>
            <div class="warp clearfix">
                <template  v-if="!apiData.isThreeInOne">
                    <div class="img-contnet">
                        <p>营业执照</p>
                        <label class="upload" for="businessLic">
                            <span class="iconfont icon-shangchuantupian" v-if="businessLicShow === ''"></span>
                            <img :src="businessLicShow" v-else>
                        </label>
                        <input id="businessLic" type="file" accept="image" ref="businessLic" @change="showImg('businessLic')">
                    </div>
                    <div class="img-contnet">
                        <p>组织代码机构证</p>
                        <label class="upload" for="codeLic">
                            <span class="iconfont icon-shangchuantupian" v-if="codeLicShow === ''"></span>
                            <img :src="codeLicShow" v-else>
                        </label>
                        <input id="codeLic" type="file" accept="image" ref="codeLic" @change="showImg('codeLic')">
                    </div>
                    <div class="img-contnet">
                        <p>税务登记证</p>
                        <label class="upload" for="financeLic">
                            <span class="iconfont icon-shangchuantupian" v-if="financeLicShow === ''"></span>
                            <img :src="financeLicShow" v-else>
                        </label>
                        <input id="financeLic" type="file" accept="image" ref="financeLic" @change="showImg('financeLic')">
                    </div>
                </template>
                <div class="img-contnet" v-else>
                     <p>三证合一</p>
                    <label class="upload" for="allCer">
                        <span class="iconfont icon-shangchuantupian" v-if="allCerShow === ''"></span>
                        <img :src="allCerShow" v-else>
                    </label>
                    <input id="allCer" type="file" accept="image" ref="allCer" @change="showImg('allCer')">
                </div>
            </div>
            <a class="submit-btn" @click="step = 1">上一步</a>
            <a class="submit-btn" @click="submitFrom">提交</a>
        </section>
        <address-picker :showChose="adShow" @on-seleted="selectedAdress"></address-picker>
    </view-box>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { ViewBox, Group, XTextarea, XSwitch } from 'vux'
    import addressPicker from '@/components/basics/addressPicker.vue'
    export default {
        components: {
            ViewBox,
            Group,
            XTextarea,
            addressPicker,
            XSwitch
        },
        data () {
            return {
                step: 1,
                adShow:{
                    show:false
                },
                adStr: '',
                apiData: {
                    companyName: '',//公司名称
                    regMoney: '',//注册资金
                    contact: '',//联系人
                    cantactTel: '',//联系电话
                    fax: '',//传真
                    cityId:'',//城市id
                    officeAddress:'',//办公地址
                    qq: '',
                    shopProfile:'',//店铺简介
                    isThreeInOne:false//是否三证合一
                },
                allCerShow:'',
                businessLicShow:'',
                codeLicShow:'',
                financeLicShow:'',
                coverOk: false
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ])
        },
        methods: {
            // 选择地址
            selectedAdress(data){
                this.adStr = data.str;
                this.apiData.cityId = data.id;
            },
            // 客服
            bindingShow(){
                let _this = this;
                this.$vux.confirm.show({
                    content: '暂未绑定专属客服，现在是否需要立即绑定？',
                    onConfirm () {
                        _this.$router.push({name:'bindingOfficer'})
                    }
                })
            },
            // 封面上传完毕
            coverDone(e){
                let files = e.target.files || e.dataTransfer.files;  
                if (!files.length) return;
                this.coverOk = true;
            },
            // 图片预览
            showImg(ref){
                let _this = this;
                let input = this.$refs[ref] ;
                let reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload=function(e){
                    _this[ref+'Show'] = this.result;
                }
            },
            // 下一步,验证信息是否完整
            nextStep(){
                if(this.checkStep1()){
                    this.step = 2;
                }else{
                    this.$vux.toast.show({
                        text: '请将信息填写完整',
                        type: 'warn',
                        width: '2rem'
                    });
                }
            },
            checkStep1(){
                let ok = true;
                for (var key in this.apiData) {
                    if(this.apiData[key] === '' && key != 'qq'){
                        ok = false;
                        return false
                    }
                }
                return ok && this.coverOk
            },
            checkStep2(){
                if(this.apiData.isThreeInOne){
                    return this.allCerShow != ''
                }else{
                    return this.financeLicShow != '' && this.codeLicShow != '' && this.businessLicShow != ''
                }
            },
            // 创建fromData
            createFormData(){
                let data = new FormData();
                for (var key in this.apiData) {
                    data.append(key, this.apiData[key])
                }
                let cover = this.$refs.cover.files || this.$refs.cover.files;
                data.append('cover', cover[0]);
                if(this.apiData.isThreeInOne){
                    let allCer = this.$refs.allCer.files || this.$refs.allCer.files;
                    data.append('allCer', allCer[0]);
                }else{
                    let financeLic = this.$refs.financeLic.files || this.$refs.financeLic.files;
                    let codeLic = this.$refs.codeLic.files || this.$refs.codeLic.files;
                    let businessLic = this.$refs.businessLic.files || this.$refs.businessLic.files;
                    data.append('financeLic', financeLic[0]);
                    data.append('codeLic', codeLic[0]);
                    data.append('businessLic', businessLic[0]);
                }
                return data
            },
            submitFrom(){
                if(this.checkStep2()){
                    this.$vux.loading.show({
                        text: '上传中。。。'
                    })
                    let sbumitData = this.createFormData();
                    this.$http.post(this.api.beSeller,sbumitData,{
                        headers: { 'Content-Type': 'multipart/form-data' },
                        pic: true
                    }).then(res => {
                        this.$vux.loading.hide()
                        if(res.status === 0){
                            this.$router.push({name: 'userIndex'})
                        }else{
                            this.$vux.toast.show({
                                text: res.errorMsg,
                                type: 'warn',
                                width: '2rem'
                            });
                        }
                    })
                }else{
                    this.$vux.toast.show({
                        text: '请上传证书!',
                        type: 'warn',
                        width: '2rem'
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    header {
        position: relative;
        width: 100%;
        background-color: #007de4;
        height: .4rem;
        line-height: .4rem;
        text-align: center;
        color: #fff;
        font-size: .16rem;
        .back {
            position: absolute;
            left: .1rem;
            font-size: .22rem;
        }
        .phone {
            position: absolute;
            right: .1rem;
            color: #fff;
            span {
                font-size: .22rem;
            }
        }
    }

    .step-content{
        width: 100%;
        .warp{
            width: 100%;
            padding: 0 .1rem;
            margin-top: .1rem;
            background:#fff;
            label{
                display: block;
                width: 100%;
                line-height: .3rem;
                text-indent: .05rem;
            }
            input{
                width: 80%;
                line-height: .3rem;
                text-indent: .05rem;
                border:none; 
                outline:none;
            }
            .unit{
                position: absolute;
                right: 0;
                bottom: .05rem;
                pointer-events:none;
            }
            .group{
                position: relative;
                .ad-cover{
                    position: absolute;
                    width: 100%;
                    height: .3rem;
                    bottom: 0;
                }
            }

            .img-contnet{
                width: 50%;
                float: left;
                p{
                    line-height: .3rem;
                    text-indent: .1rem;
                }
                .upload{
                    height: 1.7rem;
                    line-height: 1.7rem;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                        pointer-events:none;
                    }
                }
                .iconfont{
                    font-size: 1.5rem;
                    pointer-events:none;
                }
                input {
                    display: none;
                }
            }
        }
        .submit-btn{
            display: block;
            width: 90%;
            margin: .1rem auto 0;
            height: .4rem;
            line-height: .4rem;
            background-color: #007de4;
            color: #fff;
            border-radius: .05rem;
            text-align: center;
        }

         .tip{
            padding: .1rem;
            font-size: .12rem;
            color: #3e3e3e;
        }
    }
</style>
