/**
 * 微信分享
 * url 当前链接
 */
export const wxConfig = 'weixin_access_token'

/**
 * 登录，退出，注册,忘记密码,获取短信验证码
 */
export const login = '/member/login'

export const loginOut = '/member/quit'

export const register = '/member/registerMobile'

export const forgetPassword = 'member/forgetPassword'

export const msgCode = 'msgCode'



/**
 * 店铺信息-简单
 * sellerId
 * 
 */
export const shopInfo = 'product/shopBrief'

/**
 * 店铺信息-详细
 * sellerId
 * 
 */
export const shopDetail = 'product/shopDetail'

// =================特价资源页面====================
/**
 * 特价资源列表  GET
 * params:key:'',
 *        currentPage: 0,
 *        pageCount: 15,
 *        type: '',
 *        material: '',
 *        surface: '',
 *        proPlace: ''
 */
export const specoffers = 'specoffer/specoffers';

/**
 * 特价资源详情 GET
 * params: offerId
 */
export const specoffer = 'specoffer/specoffer';

// =================采购页面====================

/**
 * 采购报价列表
 * 
 */
export const ironBuy = 'iron/buy';

// =================首页====================
/**
 * 新闻列表
 */

export const news = 'indexNews'

/**
 * 最新采购
 */
export const indexBuy = 'iron/buyRecommend'

//==================物流====================
/**
 * 申请物流
 */
export const logistics = 'logistics/logisticsRequest'


//==================现货市场====================
/**
 *  现货市场数据
 * currentPage:0
    pageCount:16
    maxCount:0
    totalPage:1
    cityId:
    cityLevel1Id:
    cityLevel2Id:
    keyword:
    default:true    //关键字属性
    order:default   //过滤关键字
    limit:4
    material:
    surface:
    ironType:
    proPlace:
 */
export const irons = 'iron/irons'


/**
 * 现货详情
 * ironId
 */
export const ironDetail = 'iron/ironDetail'



//==================加工信息====================
/**
 * 加工信息列表
 */
export const handings = 'handing/handing'

/**
 * 加工详情
 * handingId
 */
export const handingDetail = 'handing/handingDetail'

//==================资讯中心====================
/**
 * 平台快讯
 */
export const innerNews = 'innerNews'

export const innerNewsDetail = 'innerNewsDetail'


/**
 * 行业新闻
 */
export const allNews = 'news'

export const allNewsDetail = 'newsDetail'

/**
 * 行业招聘
 * currentPage:0
    pageCount:14
 */
export const recruits = 'recruits'

export const recruitDetail = 'recruitDetail'



//==================会员中心====================
/**
 * 用户信息
 */
export const userInfo = '/member/profile'

/**
 * 绑定专员
 * salesmanId
 */
export const bindSalesman = 'member/bindSalesman';

/**
 * 修改密码
 * oldPassword:'',
 * newPassword:'',
 * newPasswordConfirm:''
 */
export const changePassword = 'member/changePassword';


//==================买家====================
/**
 * 买家不锈钢求购列表
 * currentPage   //当前页面
 * pageCount     //每页个数
 * status // 0 进行中  1 已确认  2 已取消  -1 所有
 */
export const myBuyList = 'iron/myBuy';

/**
 * 买家不锈钢求购详情
 * ironId   //id
 */
export const myBuyDetail = 'iron/myBuyDetail';

/**
 * 买家不锈钢求购发布
 * post
 */
export const publishIron = 'iron/buy'

/**
 * 买家不锈钢求购修改
 * post
 */
export const editPublish = 'iron/editBuy';

/**
 * 点击中标
 * ironBuyId  
 * supplyId
 */
export const selectSupply = 'iron/selectSupply';


/**
 * 取消求购
 * ironId
 */
export const deleteIronBuy = 'iron/deleteIronBuy';

/**
 * 我的购物车
 * currentPage   //当前页面
 * pageCount     //每页个数
 */
export const myCarts = 'order/myCars';

/**
 * 删除购物车
 * carId
 */
export const deleteCart = 'order/deleteCar';

/**
 * 购物车批量下单
 * carId
 */
export const translateAllCart = 'order/translateAll';


/**
 * 我的订单
 * currentPage   //当前页面
 * pageCount     //每页个数
 */
export const myOrders = 'order/myOrders';

/**
 * 取消订单
 * orderId   
 */
export const deleteOrder = 'order/delete';

/**
 * 评价订单
 * orderId:12016062603  id
 * vote:4.3    评分
 */
export const voteOrder = 'order/vote';

//==================卖家====================
/**
 * 申请成为商家
 */
export const beSeller = 'member/fillSellerInfo';

/**
 * 获取个卖家人信息资料(企业资料)
 */
export const sprofile = 'seller/profile';

/**
 * 卖家不锈钢求购列表
 * currentPage   //当前页面
 * pageCount     //每页个数
 * status // 0 进行中  1 已确认  2 已取消  -1 所有
 */
export const myIronBuys = 'seller/myIronBuys';

/**
 * 卖家不锈钢求购详情
 * ironId   //id
 */
export const sMyBuyDetail = 'seller/myIronBuyDetail';

/**
 * 卖家点击报价
 * ironId:PmPNOklFbltl
 * price:123123
 * msg:123123123
 */
export const offerIronBuy = 'seller/offerIronBuy';

/**
 * 卖家点击忽略报价
 * Ironid
 */
export const missIronBuyOffer = 'seller/missIronBuyOffer';

/**
 * 我的订单
 * currentPage   //当前页面
 * pageCount     //每页个数
 */
export const commingOrders = 'seller/commingOrders';

/**
 * 忽略订单
 * orderId   
 */
export const scelOrder = 'seller/cancelOrder';

/**
 * 删除订单
 * orderId   
 */
export const sdelOrder = 'seller/deleteOrder';

/**
 * 确认订单
 * orderId   
 */
export const sconfOrder = 'seller/confirmOrder';


/**
 * 卖家店铺现货列表
 * currentPage  
 * pageCount
 */
export const shopProducts = 'iron/myProducts';

/**
 * 卖家店铺现货更新
 * ironId  
 * price
 * numbers
 */
export const updateProduct = 'iron/updateProduct';

/**
 * 卖家店铺现货删除
 * ironId  
 */
export const deleteProduct = 'iron/deleteProduct';

/**
 * 卖家店铺加工列表
 * currentPage  
 * pageCount
 */
export const shopMachining = 'handing/myProducts';

/**
 * 卖家店铺加工更新
 * handingId  
 * price
 */
export const updateMachining = 'handing/updateProduct';

/**
 * 卖家店铺加工删除
 * handingId  
 */
export const deleteMachining = 'handing/deleteProduct';

/**
 * 获取关注列表
 * GET
 */
export const followList = 'member/ironSubscribe'

/**
 * 保存关注
 * post
 */
export const saveFollow = 'member/ironSubscribe'

//==================商品，加工下单,加入购物车 ====================
/**
 * 下单
 * timeLimit:86400000
 * productType:0    0商品1加工
 * productId:0szw4LSCqkrt
 * count:1
 * message:
 * sFromCar:false  
 */
export const doOrder = '/order/translate';

/**
 * 加入购物车
 * productType:0
 * proId:T4b5ZhYfSYpl
 */
export const addCart = 'order/addToCar'