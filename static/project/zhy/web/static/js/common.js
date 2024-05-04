/***
 * 名称：公共js
 */
/*判断手机*/
var layer;
layui.use('layer', function () {
    layer = layui.layer;
});

/**
 * 判断是否手机
 */
function isMobile() {
    var userAgentInfo = navigator.userAgent;

    var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

    var mobile_flag = false;

    //根据userAgent判断是否是手机
    for (var v = 0; v < mobileAgents.length; v++) {
        if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
            mobile_flag = true;
            break;
        }
    }

    var screen_width = window.screen.width;
    var screen_height = window.screen.height;

    //根据屏幕分辨率判断是否是手机
    if (screen_width < 500 && screen_height < 800) {
        mobile_flag = true;
    }

    return mobile_flag;
}

var getParam = function (name) {
    var search = document.location.search;
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]))
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1])
            } catch (e) {
                items = matcher[1]
            }
        }
    }
    return items
};

/**
 * 设置URL的参数 新增或修改都通吃哦~~~
 * @other UM工作室 Dádā.
 * @param name
 * @param value
 */
function setParam(name, value, noJump) {
    var url = window.location.search;
    var newUrl = "";
    var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
    var tmp = name + "=" + value;
    if (url.match(reg) != null) {
        newUrl = url.replace(eval(reg), tmp);
    } else {
        if (url.match("[\?]")) {
            newUrl = url + "&" + tmp;
        } else {
            newUrl = url + "?" + tmp;
        }
    }
    if (noJump) {
        history.replaceState(null, null, newUrl);
    } else {
        location.search = newUrl;
    }
}

function setParamObject(object, noJump) {
    var url = window.location.search;
    var newUrl = url;
    for (var key in object) {
        var value = object[key];
        var reg = new RegExp("(^|)" + key + "=([^&]*)(|$)");
        var tmp = key + "=" + value;
        if (url.match(reg) != null) {
            newUrl = newUrl.replace(eval(reg), tmp);
        } else {
            if (newUrl.match("[\?]")) {
                newUrl = newUrl + "&" + tmp;
            } else {
                newUrl = newUrl + "?" + tmp;
            }
        }
    }
    if (noJump) {
        history.replaceState(null, null, newUrl);
    } else {
        location.search = newUrl;
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function uuid() {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    for (i = 0; i < 32; i++) uuid[i] = chars[0 | Math.random() * chars.length];
    return getNowFormatDate() + uuid.join('') + Math.floor(Math.random() * 100000000);
}

/***
 *判断是否今天
 * @param str
 * @returns {boolean}
 */
function isToday(str) {
    var d = new Date(str.replace(/-/g, "/"));
    var todaysDate = new Date();
    if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return true;
    } else {
        return false;
    }
}

/***
 * 获得当前时间 yyyyMMddHHmmss格式
 * @returns {number}
 */
function getNowFormatDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + month + strDate
        + date.getHours() + date.getMinutes()
        + date.getSeconds();
    return currentdate;
}

/**
 * ajax封裝
 * @param op
 */
function ajax(op) {
    var config = {
        url: '',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        data: {},
        success: function (result) {
            if (op.success) {
                op.success(result);
            } else {
                tipRes(result);
            }
        }, error: function (res) {
            if (op.error) {
                op.error(res);
            } else {
                tipMsg('网络出现异常，请稍后重试！');
            }
        }
    };
    var nOp = $.extend(true, {}, config, op);
    $.ajax(nOp)
}

//post封装
function ajaxPost(url, data, successCb, errorCb) {
    ajax({
        url: url,
        type: 'post',
        data: data,
        success: successCb,
        error: errorCb
    });
}

function ajaxGet(url, data, successCb, errorCb) {
    ajax({
        url: url,
        data: data,
        success: successCb,
        error: errorCb
    });
}

/***
 * 消息提示封裝
 * @param msg
 */
function tipMsg(msg, op, fun) {
    var config = {
        icon: 2
    };
    op = $.extend(true, {}, config, op);
    layer.msg(msg, op, fun);
}

function msg(msg, fun) {
    var config = {
        icon: 1
    };
    layer.msg(msg, config, fun);
}

function msgError(msg, fun) {
    var config = {
        icon: 2
    };
    layer.msg(msg, config, fun);
}

/**
 * 根据res规则来提示
 * @param res
 */
function tipRes(res, fun) {
    tipMsg(res.msg, {
        icon: res.state == 'ok' ? 1 : 2
    }, fun)
}

/***
 * 对话狂
 * @param msg
 * @param op
 */
function alertl(msg, op) {
    var def = {
        type: 0,
        shadeClose: true,
        skin: 'atuikeLayerSkin1',
        content: msg,
        btn: ['我知道了'],
        yes: function (index, lay) {
            if (yesEvent) {
                var isColse = yesEvent(index, lay);
                isColse && layer.close(index);
            } else {
                layer.close(index);
            }
        }
    };
    if (op && op.yes) {
        var yesEvent = op.yes;
        delete op.yes;
    }
    op = $.extend(true, {}, def, op);
    layer.open(op);
}

function openDiv($elem, op) {
    var def = {
        type: 1,
        shade: 0.5,
        anim: 4,//动画类型
        title: false, //不显示标题
        content: $elem, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function () {
        }
    };
    return layer.open($.extend(true, {}, def, op));
}

//加载框
function loading(isShow, $dom, msg) {
    if (isShow) {
        msg = msg || '请稍后';
        var css = {
            border: 'none',
            backgroundColor: 'transparent',
            zIndex: '9999999999',
            width: '100px',
            height: '100px',
            cursor: 'auto'
        };
        var overlayCSS = {
            backgroundColor: '#FFFFFF',
            opacity: 0.6,
            cursor: 'auto'
        }
        if ($dom) {
            $dom.block({
                message: '<div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><p class="loading-msg">' + msg + '</p></div>',
                css: css,
                overlayCSS: overlayCSS
            });
        } else {
            $.blockUI({
                message: '<div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><p class="loading-msg">' + msg + '</ploading-msg></div>',
                css: css,
                overlayCSS: overlayCSS
            });
        }
    } else {
        if ($dom) {
            $dom.unblock();
        } else {
            $.unblockUI();
        }
    }
}

/***
 * 是否登录
 * @returns {boolean}
 */
function isLogin() {
    return $('[data-islogin]').data('islogin') == '1';

}

/***
 * 获取按钮上的loadding
 * @returns {string}
 */
function getBtnLoaddingHtml() {
    return '<i class="layui-icon layui-icon-loading layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="color:#FFF;font-size:24px;"></i>';
}

/**
 * 随机生成指定长度的码
 * @param len
 * @returns {string}
 */
function genCodeForLen(len) {
    var chars = '0123456789abcdefghijkl';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = chars.length;
    let code = '';
    for (let i = 0; i < len; i++) {
        code += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return code;      //直接转换为小写
};

/**
 * 获取websocket的基础路径
 * @returns {string}
 */
function getWebSoketBaseUrl() {
    var protocolStr = document.location.protocol;
    var protocol = "ws://";
    if (protocolStr == "https:") {
        protocol = "wss://";
    }
    return protocol + window.location.host;
}

/**
 * 设置窗口标题
 * @param title
 */
function setTitle(title) {
    document.title = title;
}

/**
 * 设置窗口标题（闪烁）
 * @param title
 */
function setTitleFlashing(title, isStop) {
    window.oldTitle = document.title == '.' ? window.oldTitle : document.title;
    window.titleFlashNum = 0;
    window.titleInterval && clearInterval(window.titleInterval);
    if (isStop) {
        setTitle('浑水摸鱼')
        return;
    }
    var flag = true;
    window.titleInterval = setInterval(function () {
        setTitle(flag ? title : '.');
        flag = !flag;
        window.titleFlashNum++;
        if (window.titleFlashNum == 10) {
            clearInterval(window.titleInterval);
            setTitle('浑水摸鱼')
        }
    }, 1500);
}

function webSocket(socketUrl, xParam) {
    var defParam = {
        //收到消息
        onMsg: function () {

        },
        //打开连接
        onOpen: function () {

        },
        //关闭链接
        onClose: function () {

        },
        //链接出错
        onError: function () {

        },
        //掉线
        onLostConnection: function () {
            webSocket(socketUrl, xParam);
        }
    };
    var param = $.extend(true, defParam, xParam);

    //初始化心跳 5秒一次
    function initWebSocketHeartbeat() {
        if (window.interval) {
            clearInterval(window.interval);
        }
        window.interval = setInterval(function () {
            try {
                websocket.send('pong');
            } catch (e) {
                console.error(e)
                //如果发送消息失败，则是掉线了，尝试重连
                param.onLostConnection();
            }
        }, 5000);
    }

    //初始化socket
    let wsUrl = getWebSoketBaseUrl() + socketUrl;
    window.websocket = new WebSocket(wsUrl);
    websocket.onopen = function (evt) {
        console.log('ws online success');
        param.onOpen(evt);
        //初始化socket心跳
        initWebSocketHeartbeat();
    };
    websocket.onerror = function (evt) {
        console.log('ws online error');
        param.onError(evt);
    };
    websocket.onmessage = function (evt) {
        console.log('收到socket消息', evt.data);
        param.onMsg(evt);
    };
    websocket.onclose = function (e) {
        console.log('关闭链接');
        param.onClose(e)

    };
    return window.websocket;
}

var outputDollars = function (number) {
    if (number.length <= 3)
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
};
var outputCents = function (amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
};


/*判断对象是否为空*/
var isEmpty = function (o) {
    if (typeof (o) == "undefined" || o == null) {
        return true;
    }
    if (o.length <= 0) {
        return true;
    }
    if (typeof (o) == 'string' && (o == '' || trim(o) == '')) {
        return true;
    }

    return false;
}

/*去掉左右空格*/
var trim = function (s) { //删除左右两端的空格
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

/*千分位转数字*/
var amtToNum = function (amt) {
    if (isEmpty(amt)) {
        return 0.00;
    }
    var num = trim(amt);
    var str = num.toString();
    if (str.length == 0) {
        return "0";
    }
    return str.replace(/,/g, "");
};
/*数字转千分位 emptyScale 是否需要小数  true 不需要 */
var numToAmt = function (num, emptyScale) {
    if (isEmpty(num)) {
        return "0";
    }
    var str = trim(num.toString());

    var amt = new Number(str.replace(/,/g, ""));

    if (amt < 0) {
        if (emptyScale) {
            return '-' + outputDollars(Math.floor(Math.abs(amt) - 0) + '')
        }
        return '-' + outputDollars(Math.floor(Math.abs(amt) - 0) + '') + outputCents(Math.abs(amt) - 0);
    } else {
        if (emptyScale) {
            return outputDollars(Math.floor(amt - 0) + '')
        }
        return outputDollars(Math.floor(amt - 0) + '') + outputCents(amt - 0);
    }
};

/**
 * 滚动到指定区域
 * @param target 值 或者元素选择器
 * @param offset
 * @param speed
 */
function scrollTo(target, offset, speed) {
    var top = target;
    if (typeof target == 'string') {
        var $dom = $(target);
        if (!$dom[0]) {
            return;
        }
        top = $dom.offset().top + (offset || 0);
    }
    console.log(top)
    $("html, body").animate({scrollTop: top}, speed || 600);
}

