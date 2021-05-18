import axios from 'axios'
import Store from "../story";
import {
    mainUrl,
    ssoUrl
} from "../config/env";

axios.interceptors.request.use(function (config) {
    if (config.url.indexOf('api.help.bj.cn') == -1) {
        // config.headers['channelId'] = 41;
        config.headers['channelId'] = 287;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
};

let monitoList = () => axios.get(`/mortar/screen/monitoList`);

let monitorMediaUrlList = (cameraIndexCode, name) => axios.get(`/mortar/screen/monitorMediaUrlList`, {
    params: {
        cameraIndexCode: cameraIndexCode,
        name: name
    }
});

var adminDetail = (code) => axios.get(`http://qs-back.zhihuipk.com/channel/admin/adminDetail`, {
    headers: { 'channelId': getCookie('channelId'), 'adminAccount': getCookie('adminAccount'), 'allSessionId': getCookie('allSessionId'), 'permissionId': null }//设置header信息
})

let areaSearch = (params) => axios.post(`archives/screen/areaSearch`, params);

let companyListSearch = (params) => axios.get(`archives/screen/companyListSearch`, { params: params });

let companyBaseInfoXW = (params) => axios.get(`archives/screen/companyBaseInfoXW`, { params: params });
/**
 * 企业申请列表
 *
 */
let areaDetail = (secAreaName) => axios.get(" archives/screen/areaDetail", { params: { secAreaName: secAreaName } });


let companyInfo = (companyId) => axios.get(`archives/screen/companyInfo?companyId=` + companyId);
/**
 *企业360档案-工商变更记录
 参数名  必选  类型  说明
 companyId  是  int  公司id
 */
const getBusinessChangeRecord = (companyId) => axios.get("archives/screen/getBusinessChangeRecord", { params: { companyId: companyId } });
/**
 *企业360档案-公告统计列表（十二月）产值纳税信息页面
 参数名  必选  类型  说明
 year  是  int  年份 例：2019
 companyId  是  long  公司id
 */
const formInfo = (year, companyId) => axios.get("archives/screen/formInfo", {
    params: {
        year: year,
        companyId: companyId
    }
});

/**
 *企业360档案-企业绩效考核
 参数名  必选  类型  说明
 companyId  是  Long  公司ID
 */
const companyTargetedCompanyInfo = (companyId) => axios.get("archives/screen/companyInfo", { params: { companyId: companyId } });

/**
 *企业360档案-企业绩效考核 历史数据
 参数名  必选  类型  说明
 companyId  是  Long  公司ID
 */
const companyInfoOld = (companyId) => axios.get("archives/screen/companyInfoOld", { params: { companyId: companyId } });
/**
 *企业360档案-企业考核信息 下部数据
 参数名  必选  类型  说明
 companyId  是  Long  公司ID
 pageIndex  是  int  页码
 pageSize  是  int  每页数
 */
const gradeScoreByCompany = (params) => axios.get("archives/screen/gradeScoreByCompany", { params: params });

/**
 *企业360档案-企业风险信息记录
 参数名  必选  类型  说明
 companyId  是  int  公司id
 */
const getCompanyRiskRecord = (companyId) => axios.get("archives/screen/getCompanyRiskRecord", { params: { companyId: companyId } });
/**
 * 企业事项
 参数名  必选  类型  说明
 pageIndex  是  Integer  页码
 pageSize  是  Integer  页面大小（pageSize=0时获取全部）
 companyId  是  Long  公司Id
 */
let companyMatterRemind = (params) => axios.get("archives/screen/companyMatterRemind", { params: params });

/**
 * 企业申请列表
 *
 */
let companyWorkflowApplication = (params) => axios.get("archives/screen/companyWorkflowApplication", { params: params });
/**
 * 拓展信息
 参数名  必选  类型  说明
 companyId  是  Long  公司ID
 */
let companyExtension = (companyId) => axios.get("archives/screen/companyExtension", { params: { companyId: companyId } });



const peoplePassRecord = (params) => axios.get(`mortar/screen/lanWanPeoplePassRecord`, { params: params });


/**
 * 停车场列表接口
 */
const carParkList = () => axios.get(`/mortar/screen/carParkList`);

/**
 * 停车场列表接口
 * @param params
 */
const findCarParkPasslist = (params) => axios.get(`/mortar/screen/findCarParkPasslist`, { params: params });

/**
 * 停车场列表接口
 * @param cpgId
 */
const entranceDownlist = (cpgId) => axios.get(`/mortar/screen/entranceDownlist`, { params: { cpgId: cpgId } });

const carPassAnalysis = () => axios.get(`/mortar/screen/carPassAnalysis`);


const passDataList = () => axios.get(`/mortar/passData/passDataList`, {});

const electricityMonthOptionList = (params) => axios.get(`lwElectric/electricityMonthOptionList`, { params: params});

const electricityTotal = (params) => axios.get(`/lwElectric/electricityTotal`, { params: params});

const importLanWanExcelTotal = () => axios.get(`lwElectric/importLanWanExcelTotal`, {});

const importLanWanExcelElectric = () => axios.get(`lwElectric/importLanWanExcelElectric`, {});

const screenElectricityList = (params) => axios.get(`lwElectric/screenElectricityList`, { params: params});

const screenElectricityCharList = () => axios.get(`lwElectric/screenElectricityCharList`, {});

const downloadTemplate = () => axios.get(`lwElectric/downloadTemplate`, {});

export {
    areaDetail, adminDetail, areaSearch, companyListSearch, companyBaseInfoXW, companyTargetedCompanyInfo, companyInfoOld, gradeScoreByCompany, getCompanyRiskRecord, companyMatterRemind, companyWorkflowApplication, companyExtension, getBusinessChangeRecord, formInfo, companyInfo,
    carParkList, peoplePassRecord, electricityMonthOptionList, electricityTotal, importLanWanExcelTotal, importLanWanExcelElectric,
    findCarParkPasslist, screenElectricityList, screenElectricityCharList, downloadTemplate,
    entranceDownlist, passDataList,
    carPassAnalysis, monitoList,
    monitorMediaUrlList
}
