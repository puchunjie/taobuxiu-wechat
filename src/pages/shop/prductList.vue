<template>
    <scrollList ref="sScroller" @on-pull-down="reflash" @on-pull-up="loadMore" :height="'-143'" backShow>
        <div class="item vux-1px" v-for="(item,index) in list" :key="index"  @click="showDetail(item.id)">
            <div class="img">
                <img :src="'http://www.itaobuxiu.com/'+item.cover">
            </div>
            <h3 class="tit">{{ item.title != '' ? item.title : '未知标题' }}</h3>
             <p class="price">
                &yen;{{ item.price }}
                <span>/{{ item.unit }}</span>
            </p>
            <p class="type">
                {{ item.type }}
                <span class="ad">{{ item.sourceCity }}</span>
            </p>
        </div>
    </scrollList>
</template>

<script>
    import scrollList from '@/components/business/scrollList'
    export default {
        compo
    }
</script>

