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
          min-width="160"
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
    <h4 class="g-situations-tit" style="margin:.65rem 0 .14rem 0">
      高频告警区域
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
          label="排名"
          min-width="40px"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column
          label="告警区域"
          prop="area"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.area}}
          </template>
        </el-table-column>
        <el-table-column
          label="告警频次"
          prop="nums"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{scope.row.nums}} 次
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
          companyName: '蓝湾智谷产业园',
          level: 'A 优秀',
        },
         {
          companyName: '蓝湾智谷产业园',
          level: 'A 优秀',
        },
         {
          companyName: '蓝湾智谷产业园',
          level: 'A 优秀',
        },
         {
          companyName: '蓝湾智谷产业园',
          level: 'A 优秀',
        }
      ],
      tableData3: [
        {
          area: '区域名称区域名称',
          nums: 13
        },
        {
          area: '区域名称区域名称',
          nums: 13
        },
        {
          area: '区域名称区域名称',
          nums: 13
        },
        {
          area: '区域名称区域名称',
          nums: 13
        }
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