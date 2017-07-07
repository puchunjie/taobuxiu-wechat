/**
 * 微信分享
 * url 当前链接
 */
export const wxConfig = 'weixin_access_token'

/**
 * 店铺信息
 * sellerId
 * 
 */
export const shopInfo = 'product/shopBrief'

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