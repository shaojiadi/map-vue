<template>
     <div class="f-camera-popup" >
            <div class="f-camera-popup-header">
                <p class="head-title">用电分析数据导入</p>
            </div>
            <div style="display:flex;height: 0.5rem;line-height: 0.5rem;margin-left: 0.5rem;">
              请选择导入月份
              <el-date-picker
            v-model="value2"
            type="month"
            style="margin-left:0.2rem;background:transparent;"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="pickerOptions"
            placeholder="选择月">
            </el-date-picker>
            </div>
            <div class="content">
              <el-upload
            class="import-box"
            style="margin-left:0.3rem;margin-top:0.3rem;background:transparent;"
            drag
            :action="`lwElectric/importLanWanExcelTotal/?channelId=287&&selectTime=${value2}`"
            :show-file-list="false"
            :on-success="importSuccess"
            :on-error="importError"
            :before-upload="change"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text" v-html="importTip"></div>
          </el-upload>
            </div>
            
            <div class="downRed"><div class="circle"></div>
              请严格按模板进行Excel清单文件便携，<span style="cursor: pointer;color:#fff;" @click="download">清单模板一键下载</span></div>
            <div class="downRed"><div class="circle"></div>
            请规范填写数据项，负责会产生导入失败的问题</div>
            <div class="downRed"><div class="circle"></div>
            请确认导入月份，每个月份仅保留最新的导入数据</div>
            <div class="fanhui" @click="close">返回</div>
      </div>
 
</template>

<script>
import * as global from "../config/mUtils";
import * as getData from "../service/getData";
import { log } from 'util';
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      value2:'',
      channelId: sessionStorage.getItem("channelId"),
      adminId: sessionStorage.getItem("adminId"),
      adminAccount: sessionStorage.getItem("adminAccount"),
      allSessionId: sessionStorage.getItem("allSessionId"),
      importTip: `请将Excel清单文件拖到此区域，或<em>点击上传</em><br/>系统将识别文件内容进行自动导入`,
      importTipDefalue: `请将Excel清单文件拖到此区域，或<em>点击上传</em><br/>系统将识别文件内容进行自动导入`,
      importTipSuccess: `<div class="tit green"><i class="el-icon-success"></i>清单录入完成！</div>`,
      importTipError: ` <div class="tit red"><i class="el-icon-error"></i>录入异常！</div><div class="info">请检查文件是否出现错误数据或空缺数据<br/>修改完成后再次上传</div>`,
      errorList: [],
      loading: false,
    };
  },
  created() {},
  mounted() {},
  props: ["importAddress1","exportAddress"],
  computed: {},
  methods: {
    close() {
      this.$emit("closeDialog");
    },
    download(){
      window.open(this.exportAddress+'/?type=1')
    },
    importSuccess(res) {
      this.loading = false
      if (res.code === 1) {

        // if (res.errorList.length) {
        //   this.importTip = this.importTipError;
        //   this.errorList = res.errorList;
        // } else {
        //   this.importTip = this.importTipSuccess;
        // }
        this.$emit("init");
        this.$message.success(res.message);
        this.$emit("closeDialog");
      } else {
        this.$message.error(res.message);
      }
    },
    importError() {
      this.importTip = this.importTipError;
    },
    change() {
      this.loading = true
      this.importTip = this.importTipDefalue;
      this.errorList = [];
    }
  },
  components: {},
  watch: {}
};
</script>
<style scoped lang="scss">
@import "../assets/css/mixin";
</style>
<style lang="scss" scoped>
.f-camera-popup {
  flex-direction: column;
  position: fixed;
  width: 7.62rem;
  height: 5.8rem;
  background: url("/static/bounced-img/daoru.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  left: 7.37rem;
  top: 0.82rem;
  transform: translateX(-50%);
  margin-left: 0.18rem;
  margin-bottom: 0.5rem;
  z-index: 999;
  .f-camera-popup-header{
    width: 100%;
    height: 0.8rem;
    p{
      line-height: 0.8rem;
      font-size:0.3rem;
      text-align: center;
    }
  }
  .content{
    margin:0.2rem .5rem;
    // height: 2rem;
    img{
      padding: 0.2rem 2.5rem;
    }
    p{
      text-align: center;
    }
  }
  .downRed{
    display: flex;
    height: 0.3rem;
    line-height: 0.3rem;
    padding-left: 0.5rem;
    .circle{
    width: 0.08rem;
    height: 0.08rem;
    background: #FF7070;
    border-radius: 50%;
    margin-top: 0.2rem;
    margin-right: 0.2rem;
  }
  }
  .fanhui{
    width:1.5rem;
    cursor: pointer;
    height:0.5rem;
    margin: auto;
    margin-top:0.2rem;
    line-height: 0.5rem;
    text-align: center;
    background: #0D5589;
    border: 0px solid #90DBFF;
    border-radius: 0.1rem;
  }
}
.g-basic-info {
  .info-item {
    border: 1px dashed #eee;
    padding: 10px;
    padding-bottom: 0;
    margin-bottom: 10px;
    &::after {
      content: "";
      zoom: 1;
      display: block;
      clear: both;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .import-box {
    width: 100%;
    .el-upload {
      width: 100%;
      .el-upload-dragger {
        background:transparent !important;
        width: 100%;
        margin-left:1rem;
      }
      .el-upload__text{
          color: #fff;
      }
    }
    margin-bottom: 20px;
    .tit {
      vertical-align: top;
      margin-bottom: 5px;
      &.green {
        color: rgb(9, 187, 7);
      }
      &.red {
        color: rgb(216, 30, 6);
      }
      i {
        font-size: 18px;
        margin-right: 5px;
        vertical-align: top;
      }
    }
    .info {
      color: #ccc;
      font-size: 12px;
    }
  }
  .import-tip {
    display: flex;
    align-items: center;
    margin-top: 2px;
    line-height: 1;

    i {
      color: rgb(217, 59, 10);
      font-size: 18px;
      margin-right: 5px;
    }
  }
}
.error-list{

  li{
    background-color: #eee;
  border-radius: 10px;
  padding: 10px 20px;
    color: rgb(217, 59, 10);
    margin-bottom: 5px;
  }
}
</style>
<style>
.el-upload-dragger{
    background:#1776d85e !important;
    width: 6rem !important;
    height:2rem !important;
}

.el-upload-dragger .el-upload__text{
      color: #8ACFFD !important;
    }
  .el-input__inner{
    background: transparent !important;
  }
  .el-upload-dragger .el-upload__text em{
    color: #fff !important;
    margin-left: 0.1rem;
  }
  .el-upload-dragger .el-icon-upload{
    color: #fff !important;
  }
  .el-month-table td.disabled .cell{
        background-color: transparent !important;
  }
</style>



// WEBPACK FOOTER //
// src/components/batch-import.vue