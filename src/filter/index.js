import Vue from "vue"

Vue.filter('keepTwoNumber',function (value) {
    value = Number(value);
    return value.toFixed(2);
})

Vue.filter('formatDateToCN',function (value) {
    return value
})

Vue.filter('activityFlowName',function (value) {
    var result = "";
    switch (value){
        case 0:result = "待交付";break;
        case 1:result = "待审核";break;
        case 2:result = "待领钱";break;
        case 3:result = "未通过";break;
        case 4:result = "已完成";break;
        case 5:result = "已关闭";break;
    }

    return result
})