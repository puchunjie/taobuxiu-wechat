<template>
    <div style="background:#fff;height:100%;">
        <header slot="header">
            <span class="back iconfont icon-fanhui" @click.self="$router.go(-1)"></span>
            阅读条款
            <a class="phone"  :href="'tel:'+ userInfo.salesMan.tel" v-if="userInfo.salesMan.name != ''"><span class="iconfont icon-kefu"></span></a>
             <a class="phone" v-else @click="bindingShow"><span class="iconfont icon-kefu"></span></a> 
        </header>
        <section class="agreement">
            <h2 class="block fs-20" style="text-align:center;font-size:16px;">淘不锈商户入驻协议</h2>
            <label class="block">第1条</label>
            <p>
                为享有包括采购等更多的服务和平台操作功能，用户可以申请企业账号，首先需具备注册资格，您必须确保系依照中华人民共和国法律法规设立的合法组织，具有在中华人民共和国境内取得工商经营主体资格，并按商户企业账号要求提示上传相应证件。如您没有前述主体资格，本站有权拒绝用户注册或认证，据此造成的损失由您自行承担。
            </p>
            <br>

            <label class="block">第2条</label>
            <p>
                在您阅读并同意本协议,按照本站申请成为商家页面提示填写完整企业信息上传符合要求的资料信息并经过本站审核通过后，您即为本站企业账号 。
            </p>
            <br>

            <label class="block">第3条</label>
            <p>
                您在成功完成企业账号申请并审核通过后，即成为企业账号管理员并享有挂货以及售卖行为的权利，您可以通过本站平台在线交易、发布现货库存资源信息、发布求购信息、发布特价资源信息等企业会员服务。
            </p>
            <br>

            <label class="block">第4条</label>
            <p>
                您申请或认证企业账号时，您设置的企业信息不得侵犯或涉嫌侵犯他人合法权益。如您连续12个月未有使用手机号和密码登录本站及信息更新记录或实际使用本站服务的行为，本站保留对您中止或终止提供服务并注销账户的权利。
            </p>
            <br>

            <label class="block">第5条</label>
            <p>
                您注册为企业账号后，如注册登记信息发生变更，您须及时、主动联系本站进行更新。因您未及时更新，造成您不能享受相关服务的、或造成账号及密码泄露及一切影响正常交易等所有责任由您自行承担。
            </p>
            <br>


            <label class="block">第6条</label>
            <p>
                您应对您的手机号和密码的安全，以及对通过其手机号和密码实施的行为负责。您在本站注册的手机号和密码仅限于您自己或您所授权的企业内部人员进行使用，不得给予任何第三方使用，否则由此造成的损失由您自行承担，且本站保留暂停或终止服务的权利（参见本协议3.4项条款）。
            </p>
            <br>

            <label class="block">第7条</label>
            <p>
                除非有法律规定或司法裁定，且征得本站的同意，否则，手机号和密码不能以任何方式转让、赠与或继承。
            </p>
            <br>

            <label class="block">第8条</label>
            <p>
                您遗忘或丢失在本站注册的密码及无法找回时，可与本站客户服务人员取得联系，在提供相关证明资料并经本站审核确认后，可找回密码。
            </p>
            <br>

            <label class="block">第9条</label>
            <p>
                您注册为企业账号后，在本站进行挂货销售活动期间，请按时更新您所售卖产品的最新价格，真实库存等产品信息，如因您的挂货信息不准确，恶意或虚假挂货，一经本站核实，本站保留对您中止或终止提供服务并注销账户的权利，并且一切法律后果由您自行承担。
            </p>
            <br>

            <label class="block">第10条</label>
            <p>
                您注册为企业账号后，在本站进行发布求购的行为，需真实可靠，不得进行任何形式的恶意以及虚假发布，一经核实为违反本平台规范或法律条款的行为后，本站保留对您中止或终止提供服务并注销账户的权利，并且一切法律后果由您自行承担 。
            </p>
            <br>


            <label class="block">第11条</label>
            <p>
                本站提供的试点地区免费上门质检服务仅在征得买卖双方均同意认可的情况下方可进行。该项服务可以提供现场视频通讯服务，并于质检现场按照买卖双方均协商同意的事项进行现场质检，本站不参与买卖双方关于是否允许质检的协商讨论。在整个质检过程中，买卖双方均表示同意完成后则质检完成，本站不对质检完成后的任何资金交易，物流运输及收货等进一步交易行为进行负责，一切法律后果由买卖双方自行承担。
            </p>
            <br>
        </section>
        <router-link class="btn" slot="bottom" :to="{name:'authenticate2'}">已阅读并同意以上协议内容</router-link>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
        },
        methods: {
            bindingShow(){
                let _this = this;
                this.$vux.confirm.show({
                    content: '暂未绑定专属客服，现在是否需要立即绑定？',
                    onConfirm () {
                        _this.$router.push({name:'bindingOfficer'})
                    }
                })
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
    .agreement{
        width: 90%;
        height: 5rem;
        border: 1px solid #ddd;
        border-radius: .05rem;
        overflow-x: hidden;
        padding: 0 .1rem;
        margin: .1rem auto;
    }

    .btn{
        position: absolute;
        bottom: .1rem;
        display: block;
        width: 90%;
        text-align: center;
        left: 5%;
        height: .4rem;
        line-height: .4rem;
        background-color: #007de4;
        color: #fff;
        border-radius: .03rem;
    }
</style>
