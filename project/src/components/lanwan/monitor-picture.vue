<template>
<!-- 移动监测画面 -->
  <ul class="picture-box">
    <li class="img-item" v-for="(item,index) in monitorList" :key="index" :class="{'item-margin':index%2==0}">
      <img :src="item.img" alt="">
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      monitorList: [
        {
          img:"../../../static/lanwan/monitor1.png"
        },
        {
          img:"../../../static/lanwan/monitor2.png"
        },
        {
          img:"../../../static/lanwan/monitor3.png"
        },
      ],
    };
  },
  mounted() {
    
  },
  methods: {},
};
</script>
<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .picture-box {
    display: flex;
    flex-wrap: wrap;
    padding: 0 .2rem;
    .img-item {
      width: 2rem;
      height: 1.13rem;
      margin-top: .1rem;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .item-margin {
      margin-right: 0.1rem;
    }
  }
</style>