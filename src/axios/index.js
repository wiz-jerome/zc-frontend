import axios from './axios'

export default {

    getUser(success){
      axios.api({
          url: "user/login",
          method:axios.POST,
          success:success,
          data:{
              type:0,
              account:"15998504005",
              password:"123456",
          },
      })

    },

    //获取活动基础信息
    activityDetail(id,success){
        axios.api({
            url:`activity/${id}/detail`,
            method:axios.GET,
            data:{},
            success:success
       })
    },
 
    //获取领钱用户列表
    getMoneyUserList(param,success){
        axios.api({
            // url:`activity/${param.id}/finish_user?currentResult=${param.currentResult}&pageSize=${param.pageSize}`,
            url:`activity/${param.id}/finishUserForBusiness?currentResult=${param.currentResult}&pageSize=${param.pageSize}`,
            method:axios.GET,
            data:{},
            success:success
        })
    },

    //关注取消关注活动
    followActivity(id,param,success){
        axios.api({
            url:`activity/${id}/follow`,
            method:axios.POST,
            data:param,
            success,success
        })
    },

    //活动进展
    getUserActivityFlow(id,success){
        axios.api({
            url:`my/activity/${id}`,
            method:axios.GET,
            success:success
        })
    },

    //问卷
    getQuestionList(id,success){
        axios.api({
            url:`my/activity/question/${id}`,
            method:axios.GET,
            success:success
        })
    },

    //关注取消关注商家
    followMember(id,param,success){
        axios.api({
            url:`member/${id}/follow`,
            method:axios.POST,
            data:param,
            success,success
        })
    },

    //活动报名
    joinActivity(id,param,success){
        axios.api({
            url:`my/activity/${id}`,
            method:axios.POST,
            data:param,
            success,success
        })
    },

    //串联活动提交
    submitSeriesActivity(id,param,success){
        axios.api({
            url:`my/activity/submit/${id}/series`,
            method:axios.PUT,
            data:param,
            success,success
        })
    },

    //(视频、线下)普通活动提交
    submitActivity(id,param,success){
        axios.api({
            url:`my/activity/submit/${id}`,
            method:axios.PUT,
            data:param,
            success,success
        })
    },

    //串联列表获取子活动列表
    getChildrenList(id,success){
        axios.api({
            url:`activity/${id}/series`,
            method:axios.GET,
            success,success
        })
    },

    //问卷活动提交
    submitQuestionActivity(id,param,success){
        axios.api({
            url:`my/activity/submit/${id}/question`,
            method:axios.PUT,
            data:param,
            success,success
        })
    },

    //问卷提交
    submitQuestion(id,param,success){
        axios.api({
            url:`my/activity/question/${id}`,
            method:axios.PUT,
            data:param,
            success,success
        })
    },

    //协同活动--好友列表
    getSynergeticActivityTeam(id,param,success){
        axios.api({
            url:`my/activity/${id}/cooper`,
            method:axios.GET,
            success:success
        })
    },

    //协同任务 移除队员
    removeTeamerFromSynergetic(id,id1,success){
        axios.api({
            url:`my/activity/remove/cooper/${id}/${id1}`,
            method:axios.PUT,
            success:success
        })
    },

    //活动领钱
    getActivityMoney(id,success){
        axios.api({
            url:`my/activity/money/${id}`,
            method:axios.PUT,
            success:success
        })
    },

    //子活动详情
    getChildActivityDetail(id,childId,success){
        axios.api({
            url:`activity/${id}/series/${childId}`,
            method:axios.GET,
            success:success
        })
    },

    //子活动提交
    commitChildActivity(id,param,success){
        axios.api({
            url:`/my/activity/submit/${id}/series`,
            data:param,
            method:axios.PUT,
            success:success
        })
    },

    //获取问卷结果
    getQuestionResult(id,success){
        axios.api({
            url:`/my/activity/question/${id}/result`,
            method:axios.GET,
            success:success
        })
    },

    //活动取消
    cancelActivity(id,success){
        axios.api({
            url:`/my/activity/${id}/cancel`,
            method:axios.PUT,
            success:success
        })
    },
    //获取子活动图片
    getActivityChildImage(id,type,success){
        axios.api({
            url:`/activity/${id}/image?activityType=${type}`,
            method:axios.GET,
            success:success
        })
    },


    //资讯问卷提交
    submitInfoQuestion(id,param,success){
        axios.api({
            url:`/my/activity/information/${id}`,
            method:axios.PUT,
            data:param,
            success:success
        })
    },
    //竞猜资讯提交
    submitCompetitionInfoQuestion(id,param,success){
        axios.api({
            url:`my/activity/submit/${id}/competitionActivty`,
            method:axios.PUT,
            data:param,
            success:success
        })
    },



}