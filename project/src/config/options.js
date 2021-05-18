import Vue from "vue";
import { replaceTime} from '@/config/mUtils'

/**
 * 静态数据
 */

Vue.prototype.J_options = {
    companyType: [   //客户类型
        { label: "企业", text: "企业", value: 1 },
        { label: "商户", text: "商户", value: 2 }
    ],
    houseResBusState: [
        { label: "可招商", value: 1 },
        { label: "不可招商", value: 2 }
    ],
    companyIc: [     //行业分类
        { label: "互联网", value: 1 },
        { label: "电子信息", value: 2 },
        { label: "先进制造", value: 3 },
        { label: "生物医药", value: 4 },
        { label: "资源环境", value: 5 },
        { label: "现代农业", value: 6 },
        { label: "信息软件", value: 7 },
        { label: "文化产业", value: 8 },
        { label: "电子商务", value: 9 },
        { label: "其它", value: 0 }
    ],
    customType: [  //自定义配置类型
        { label: "提醒设置", value: 1 },
        { label: "招商时间设置", value: 2 },
        { label: "合同编号设置", value: 3 },
        { label: "合同价格设置", value: 4 }
    ],
    tagType: [  //标签类型
        { name: "房源标签", id: 2 },
        { name: "客户标签", id: 1 }
    ],
    manageType: [ //内部管理
        { name: "内部管理员", id: 1 },
        { name: "企业人员", id: 2 },
        { name: "角色权限", id: 3 }
    ],
    sex: [ //性别
        { name: "男" },
        { name: "女" }
    ],
    companyUse: [     //经营范围
        { label: "餐饮美食", value: 2 },
        { label: "社区生活", value: 3 },
        { label: "百货零售", value: 4 },
        { label: "酒店宾馆", value: 5 },
        { label: "教育培训", value: 6 },
        { label: "休闲娱乐", value: 7 },
        { label: "体育健身", value: 8 },
        { label: "美容美发", value: 9 },
        { label: "其它", value: 0 }
    ],
    companyState: [   //客户状态
        { text: "初次洽谈", value: 1 },
        { text: "意向客户", value: 3 },
        { text: "签约谈判", value: 4 }
    ],
    companySource: [   //客户来源
        { label: "中介", value: 1 },
        { label: "政府关系", value: 2 },
        { label: "股东关系", value: 3 },
        { label: "同行介绍", value: 4 },
        { label: "自拓单", value: 5 }
    ],
    attractInvestStatus: [   //招商目标状态
        { text: "待审批", value: 0 },
        { text: "已通过", value: 1 },
        { text: "已驳回", value: 2 }
    ],
    receptionType: [
        { text: "洽谈", value: 0 },
        { text: "带看房源", value: 1 },
        { text: "签订合同意向书", value: 2 }
    ],
    companyPoolType: [//公海客户来源
        { text: "渠道客户", value: 1 },
        { text: "回流客户", value: 2 }
    ],
    companyTypeList: [
        { text: "办公", value: 1 },
        { text: "商用", value: 2 }
    ]
};

Vue.filter("empty", (val) => {
    switch (val) {
        case null:
        case undefined:
        case "":
            return "-";
        default:
            return val;
    }
});

Vue.filter("priceEmpty", (val) => {
    switch (val) {
        case null:
        case undefined:
        case "":
            return 0;
        default:
            return val;
    }
});
Vue.filter("roundTwo", (val, type) => {
    switch (val) {
        case null:
        case undefined:
        case "":
            return "-";
        default:
            let num = Math.round(val * 100) / 100;
            if (type === 1) {
                num = Math.abs(num);
            }
            if (num === 0 && val > 0) {
                return "不足0.01";
            } else if (isNaN(num)) {
                return 0;
            }
            return num;
    }
});

Vue.filter("absEmpty", (val) => {
    switch (val) {
        case null:
        case undefined:
        case "":
            return 0;
        default:
            let num = val * 1;
            if (isNaN(num)) {
                return 0;
            } else if (num > 0) {
                return "+" + Math.abs(num);
            } else {
                return num;
            }
    }
});

Vue.filter("houseResBusState", (val) => {
    switch (val) {
        case null:
        case undefined:
        case "":
            return "-";
        case 1:
            return "可招商";
        case 2:
            return "不可招商";
    }

});
Vue.filter("date", (val) => {
    switch (val) {
        case null:
        case undefined:
        case "":
            return "-";
        default:
            return new Date(replaceTime(val)).format("yyyy-MM-dd");
    }
});
Vue.filter("date2", (val) => {
    switch (val) {
        case null:
        case undefined:
        case "":
            return "-";
        default:
            return new Date(replaceTime(val)).format("yyyy/MM/dd");
    }
});

Vue.filter("datetime", (val) => {
    switch (val) {
        case null:
        case undefined:
        case "":
            return "-";
        default:
            return new Date(replaceTime(val)).format("yyyy-MM-dd hh:mm:ss");
    }
});

Vue.filter("datetimeType", (val, type) => {//自定义 date、datetime格式显示
    switch (val) {
        case null:
        case "null":
        case undefined:
        case "undefined":
        case "":
            return "-";
        default:
            return new Date(replaceTime(val)).format(type);
    }
});


Vue.filter("darkHorseType", function (value) {//黑马等级（A-黑马  、B-良好 、C-普通 、D-较差）
    switch (value) {
        case 1:
            return "A级";
        case 2:
            return "B级";
        case 3:
            return "C级";
        case 4:
            return "D级";
        case -1:
            return "无要求";
        default:
            return "无要求";
    }
});

Vue.filter("riskType", function (value) {//风险等级（A-安全  、B-较安全、C-有风险 、D-高风险）
    switch (value) {
        case 1:
            return "A级";
        case 2:
            return "B级";
        case 3:
            return "C级";
        case 4:
            return "D级";
        case -1:
            return "无要求";
        default:
            return "无要求";
    }
});


Vue.filter("riskRank", function (value) {//风险等级
    switch (value) {
        case 1:
            return "A-安全";
        case 2:
            return "B-较安全";
        case 3:
            return "C-有风险";
        case 4:
            return "D-高风险";
        default:
            return value;
    }
});


Vue.filter("quarterType", function (value) {//季度
    switch (value) {
        case 1:
            return "一";
        case 2:
            return "二";
        case 3:
            return "三";
        case 4:
            return "四";
        default:
            return value;
    }
});
Vue.filter("assessState", function (value) {// 考核状态(0评分进行中1已完成2已过期)
    switch (value) {
        case 0:
            return "评分进行中";
        case 1:
            return "已完成";
        case 2:
            return "已过期";
        case 3:
            return "延期中";
        default:
            return value;
    }
});

Vue.filter("levelsType", function (value) {//风险等级
    switch (value) {
        case 1:
            return "系统判定 为准";
        case 2:
            return "编辑数据 为准";
        default:
            return '无';
    }
});

