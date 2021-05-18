<template>
    <div class="m-town-profile-root">
        <div class="m-title">{{title}}</div>
        <div class="m-content">
            {{content}}
            <span class="m-unit">{{unit}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
        title: {
            required: true,
            type: String,
        },
        content: {
            required: true,
            type: String,
        },
        unit: {
            required: true,
            type: String
        }
    }
  }
</script>

<style lang="scss" scoped>
  .m-town-profile-root {
    background: url('../../assets/image/bg-right-top-button.png') no-repeat;
    background-size: cover;
    height: 0.7rem;
    padding-left: 0.2rem;
    display: inline-block;
    width: 50%;

    .m-title {
      color: #FFF;
      font-size: 0.14rem;
      line-height: 0.32rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: 'PingFangSC-Regular';
    }

    .m-content {
      color: rgba(255, 255, 255, 1);
      font-size: 0.2rem;
      line-height: 1;
      margin-top: 0.05rem;
      font-family: 'alterbatebold';

      .m-unit {
        margin-left: 0.03rem;
        font-size: 0.1rem;
        color: rgba(255, 255, 255, 1);
        font-family: 'PingFangSC-Regular';
      }
    }
  }
  
</style>
