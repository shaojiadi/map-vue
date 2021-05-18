<template>
    <div class="g-barchart">
        <townProfileItem v-for="item in townProfileList" :key="item.title" :title="item.title" :content="item.content" :unit="item.unit"/>
    </div>
</template>

<script>
  import townProfileItem from './townProfileItem';
  export default {
    components: {
        townProfileItem,
    },
    data () {
        return {
            townProfileList: [
                {
                    title: '引进内资',
                    content: '3.9',
                    unit: '亿元',
                },
                {
                    title: '引进外资',
                    content: '400',
                    unit: '万美元',
                },
                {
                    title: '浙商回归资金',
                    content: '3.5',
                    unit: '亿元',
                },
                {
                    title: '旧厂区改造及技术改造项目',
                    content: '55',
                    unit: '项',
                },
            ]
        }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/css/mixin';
  .g-barchart{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-evenly;;
  }
</style>
