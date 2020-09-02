/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.Eric (肖辉)
 * @Date: 2019-10-14 14:47:02
 * @LastEditors: Mr.Eric (肖辉)
 * @LastEditTime: 2019-10-24 20:17:52
 */
$(document).ready(function () {
    // $("#Tabs").sortable({
    //     revert: '0.1',
    //     start: function (event, ui) {
    //         $(".J_mainContent").css({ "pointer-events": "none" });
    //     },
    //     stop: function () {
    //         $(".J_mainContent").css({ "pointer-events": "" });
    //     }
    // });
    // $(".dropdown").mouseover(function () {
    //     $(this).addClass("show");
    //     $(this).find("a[class^=dropdown-toggle]").attr("aria-expanded", "true");
    //     $(this).find("ul[class^=dropdown-menu]").addClass("show");
    // });
    // $(".dropdown").mouseleave(function () {
    //     $(this).removeClass("show");
    //     $(this).find("a[class^=dropdown-toggle]").attr("aria-expanded", "false");
    //     $(this).find("ul[class^=dropdown-menu]").removeClass("show");
    // });
});
// 初始化Layui组件
function Iframe_Modal(title,url,type,w='600px',h='893px'){
    layui.use("layer", function () {
        var layer = layui.layer;  //layer初始化
        //iframe窗
        layer.open({
            type: 2,
            title: title,
            shadeClose: false,// 是否刷新父级页面
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: [h, w],
            content: [url, type], //iframe的url，no代表不显示滚动条
            zIndex: layer.zIndex,
            success: function(layero){
                layer.setTop(layero);
            }
        });
    });
}
function Iframe_Msg(text){
    layui.use("layer", function () {
        var layer = layui.layer;
        layer.msg(text);
    });
}
//判断浏览器是否支持Web Notifications API
function suportNotify(){
    if (window.Notification && window.Notification && Notification.permission !== "denied") {
        // 支持
        return true;
    } else {
        // 不支持
        return false;
    }
}
// 消息提醒
function Msg(type,title,msg){
    // || document.hidden == false
    if(suportNotify()==false ){
        // 执行站内提示
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "progressBar": false,
            "preventDuplicates": true,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "400",
            "hideDuration": "1000",
            "timeOut": "7000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        eval("toastr."+type+"('"+title+"','"+msg+"')");
    }else{
        // 执行桌面提醒
        Notification.requestPermission(function(status) {
            //如果状态是同意
            if (status === "granted") {
                var m = new Notification(title,{
                    body: msg,//消息体内容
                    // icon:"http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg",//消息图片
                    // image:"http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg"
                });
                m.onclick = function () {//点击当前消息提示框后，跳转到当前页面
                    window.focus();
                }
            }else{
                alert('当前浏览器不支持弹出消息')
            }
        });
    }
}

function toggleFullScreen() {
    var a = $(window).height() - 10;
    $('.qp').toggleClass("icon-zhunbeiliangchan").toggleClass("icon-icon_airplay");//图标切换
    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}
// Msg('success','cs','ok');

/**
 * IM通讯模块
 */
var im_iframe = false;
var im_iframe_id = '';
var im_conversatio = [];
var iframeWin = false;
$('.im-session').on('click',function(){
    var param = $(this).data('conversatio');
    if(im_iframe == false){
        layui.use("layer", function () {
            var layer = layui.layer;  //layer初始化
            layer.open({
                id: 'IM',
                type: 2,
                title: 'IM - 云信',
                shadeClose: false,// 是否刷新父级页面
                shade: false,
                maxmin: true, //开启最大化最小化按钮
                content: ["/IM/conversatio.html",'no'], //iframe的url，no代表不显示滚动条
                zIndex: layer.zIndex,
                area: ['893px','600px'],
                success: function(layero, index){
                    im_iframe = true;
                    im_iframe_id = index;
                    im_conversatio.push(param);
                    layer.setTop(layero);
                    iframeWin = window[layero.find('iframe')[0]['name']];
                    iframeWin.addConversatio(param);
                },
                cancel: function(index, layero){ 
                    im_iframe = false;
                    im_iframe_id = '';
                    im_conversatio.splice(0,im_conversatio.length);
                    iframeWin = false;
                    layer.close(index);
                }    
            });
        });
    }else{
        var con = $.inArray(param,im_conversatio);
        if(con == -1){
            im_conversatio.push(param);
        }
        iframeWin.addConversatio(param);
    }
});