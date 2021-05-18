<template>
  <!-- 主页左侧区域安防表现 -->
  <div class="region-bg">
    <h4 class="g-situations-tit"  style="margin-bottom:.14rem">
      区域安防表现
    </h4>
    <div class="f-table f-table1">
      <el-table
        :data="
          tableData2 
        "
        style="
          height: 100%;
          overflow: hidden;
          width: 100%;
          overflow-x: hidden;
        "
      >
        <el-table-column
          prop="companyName"
          min-width="30"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.companyName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
    <h4 class="g-situations-tit" style="margin:.25rem 0 .14rem 0">
      巡检情况
    </h4>
    <div class="f-table f-table2">
      <el-table :data="tableData3"
        style="
          height: 100%;
          overflow: hidden;
          width: 100%;
          overflow-x: hidden;
        "
      >
        <el-table-column
          prop="line"
          label="巡检线路"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.line}}
          </template>
        </el-table-column>
        <el-table-column
          label="巡检结果"
          prop="danger"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <p v-if="!scope.row.danger" style="color:rgba(255,255,255,0.8)">正常</p>
            <p v-else  style="color:#f00">{{scope.row.nums}}处异常</p>
          </template>
        </el-table-column>
        <el-table-column
          label="完成率"
          prop="rate"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.rate}} %
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
  export default {
    name: '',
    data() {
      return {
        tableData2: [
        {
          companyName: '当前安全等级：',
          level: '高',
        },
         {
          companyName: '当前防控预案：',
          level: '普通预案',
        }
      ],
      tableData3: [
        {
          line: 'A区电力巡检',
          danger: true,
          nums: 1,
          rate: 97
        },
         {
          line: 'A区电力巡检',
          danger: true,
          nums: 1,
          rate: 97
        },
        {
          line: 'B区生产巡检',
          danger: false,
          rate: 97
        },
        {
          line: 'B区生产巡检',
          danger: false,
          rate: 97
        },
        {
          line: 'A区电力巡检',
          danger: true,
          nums: 1,
          rate: 97
        },
        {
          line: 'A区电力巡检',
          danger: true,
          nums: 1,
          rate: 97
        },
        {
          line: 'B区生产巡检',
          danger: false,
          rate: 97
        },
      ],
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
  .region-bg {
    width: 4.59rem;
    height: 5.03rem;
    @include bis('../../../static/lanwan/af-bg.png');
    padding: .25rem .28rem .51rem .28rem;
  }
  

</style>