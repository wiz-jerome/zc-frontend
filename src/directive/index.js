import Vue from "vue"
import head from '@/assets/image/default-head.png'
import img1 from '@/assets/image/default-img.png'

//加载图片
Vue.directive('loadingImg', {
    bind: function (el) {
        // 聚焦元素
        var url = el.src;
        el.src = img1;
        var img = new Image();
        img.src = url;

        img.onerror = () => {
          el.src = img1;
        }
        img.onload = () => {
            el.src = img.src
        }
    },

})

Vue.directive('loadingHead', {
    bind: function (el) {
        // 聚焦元素
        var url = el.src;
        el.src = head;
        var img = new Image();
        img.src = url;

        img.onerror = () => {
            el.src = head;
        }
        img.onload = () => {
            el.src = img.src
        }
    },

})


Vue.directive('dragEle', {
    bind: function (el) {
       el.addEventListener("mousedown",function (ev) {

           var oEvent = ev || event;
           var distanceX = oEvent.clientX - el.offsetLeft; //下面有解释
           var distanceY = oEvent.clientY - el.offsetTop;

           document.onmousemove = function(ev) {
               var oEvent = ev || event;
               el.style.left =  oEvent.clientX - distanceX + 'px';
               el.style.top  =  oEvent.clientY - distanceY + 'px';
           };

           document.onmouseup = function() {
               document.onmousemove = null;
               document.onmouseup = null;
           }
       })
    },

})