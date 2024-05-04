(function ($) {
    'use strict';
    var to = getParam('to');
    if (to) {
        window.scrollTo($(to).offset().top - 100)
    }

    // Preloader
    $(window).on('load', function () {
        $('.preloader').addClass('hidden');
        $('[data-popup="tooltip"]').tooltip();
    });
    $(document).on('click', '[click-to]', function () {
        var to = $(this).attr('click-to');
        setParam("to", encodeURIComponent(to), true);
        if (!$(to)[0]) {
            window.location.href = '/?to=' + to
        } else {
            window.scrollTo($(to).offset().top - 100)
        }
    })
    // Canvas
    $(".desktop_trigger, .trigger-right").on('click', function () {
        $(".desktop_trigger").toggleClass('active');
        $(".aside_canvas").toggleClass('open');
    });
    // Search
    $(".search_trigger>a, .close-search-trigger").on('click', function () {
        $(".search-form-wrapper").toggleClass('open');
    });
    // Mobile Menu
    $(".mobile_trigger, .trigger-left").on('click', function () {
        $(".mobile_trigger").toggleClass('active');
        $(".aside_mobile").toggleClass('open');
    });
    $(".aside_mobile .menu-item-has-children > a").on('click', function (e) {
        var submenu = $(this).next(".sub-menu");
        e.preventDefault();
        submenu.slideToggle(200);
    });
    var header = $(".can-sticky");
    var footer = $(".ft-sticky");
    var headerHeight = header.innerHeight();
    var FooterHeight = footer.innerHeight();

    function doSticky() {
        if (window.pageYOffset > headerHeight) {
            header.addClass("sticky");
        } else {
            header.removeClass("sticky");
        }
        if (window.pageYOffset > FooterHeight) {
            footer.addClass("d-flex");
        } else {
            footer.removeClass("d-flex");
        }
    }

    doSticky();
    //On scroll events
    $(window).on('scroll', function () {
        doSticky();
    });
    if ($(".back-to-top").length) {
        $(".back-to-top").on("click", function () {
            var target = $(this).attr("data-target");
            // animate
            $("html, body").animate({
                scrollTop: $(target).offset().top,
            }, 1000);

            return false;
        });
    }
    // testimonial Slider
    $('.testimonial_slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        dots: true,
        autoplaySpeed: 2000,
        responsive: [{
            breakpoint: 1199, settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 767, settings: {
                slidesToShow: 1, arrows: false
            }
        }]
    });
    $('.testimonial_slider_single').slick({
        slidesToShow: 1, slidesToScroll: 1, autoplay: true, arrows: false, dots: true, autoplaySpeed: 2000
    });
    $('.testimonial_slider_main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: true,
        dots: false,
        infinite: true,
        autoplaySpeed: 2000,
        asNavFor: '.testimonial_slider_nav',
        responsive: [{
            breakpoint: 991, settings: {
                arrows: false
            }
        }]
    });
    $('.testimonial_slider_nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: true,
        infinite: true,
        autoplaySpeed: 2000,
        asNavFor: '.testimonial_slider_main',
        focusOnSelect: true
    });
    // Coach Slider
    $('.coach_slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        dots: true,
        dotsClass: "slick-dots style_2",
        autoplaySpeed: 2000,
        responsive: [{
            breakpoint: 1499, settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 991, settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 680, settings: {
                slidesToShow: 1
            }
        }]
    });
    // Magnific Popup
    $('.popup-youtube').magnificPopup({type: 'iframe'});
    $('.gallery-thumb').magnificPopup({
        type: 'image', gallery: {
            enabled: true
        }
    });

    // Filter Isotope
    function doIsotope() {
        var $filterGrid = '';

        $('.masonry').imagesLoaded(function () {
            $filterGrid = $('.filteritems').isotope({
                itemSelector: '.masonry-item', percentPosition: true, masonry: {
                    columnWidth: '.masonry-item'
                }
            });
        });

        $('.filter-btns').on('click', '.filter-trigger', function () {
            var filterValue = $(this).attr('data-filter');
            $filterGrid.isotope({filter: filterValue});
        });

        $('.filter-trigger').on('click', function (e) {
            $(this).closest('.filter-btns').find('.active').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
        });
        // init isotope on features
        $('.feature-masonry').isotope({
            itemSelector: '.grid-item', percentPosition: true
        });
        // init isotope on features
        $('.blog-masonry').isotope({
            itemSelector: '.masonry-item', percentPosition: true
        });

    }

    doIsotope();
    // Counter
    $(".counter>b").each(function () {
        var $this = $(this);
        $this.one('inview', function (event, isInView) {
            if (isInView) {
                $this.countTo({speed: 2000});
            }
        });
    });
    // Progress bar
    $(".progress_block").each(function () {
        var progressBar = $(this).find(".progress-bar");
        var progressTitle = $(this).find(".title>b");
        $(progressBar).one('inview', function (event, isInView) {
            if (isInView) {
                $(progressBar).animate({
                    width: $(progressBar).attr("aria-valuenow") + "%"
                });
            }
        });
        $(progressTitle).one('inview', function (event, isInView) {
            if (isInView) {
                $(progressTitle).animate({
                    left: $(progressTitle).attr("data-to") + "%"
                });
            }
        });
    });
    // Easy pie bar
    $(".circle_bar").each(function () {
        var circleBar = $(this);
        $(circleBar).one('inview', function (event, isInView) {
            if (isInView) {
                $(circleBar).easyPieChart({
                    //your configuration goes here
                    easing: 'easeOut', delay: 3000, scaleColor: false, lineWidth: 6, trackWidth: 6, animate: 2000,
                });
            }
        });
    });
    $(".countdown-timer").each(function () {
        var $this = $(this);
        $this.countdown($this.data('countdown'), function (event) {
            $(this).text(event.strftime('%D : %H : %M : %S'));
        });
    });

    //fqa
    $('.accordion').find('.accordion-title').on('click', function () {
        $(this).toggleClass('active');
        $(this).next().slideToggle('fast');
        $('.accordion-content').not($(this).next()).slideUp('fast');
        $('.accordion-title').not($(this)).removeClass('active');
    });

    // WOW JS
    new WOW().init();

    $('[click-to="#faq"]').attr('href', 'JavaScript:void(-1)')
})(jQuery);

//处理用户消息
function initMsg() {
    // window.playWav = function () {
    //     var uiPath = $('[name="uiPath"]').attr('content');
    //     var tipWav = uiPath + 'project/zhy/web/static/file/tip.wav';
    //     var player = new Audio(tipWav);
    //     player.play();
    // }
    // $(document).click(function (e) {
    //     if (window.isPlay) return;
    //     playWav();
    //     window.isPlay = true;
    // })
    var curDate = new Date();
    $('.tip-content .tip-item').each(function (i, v) {
        var $v = $(v);
        var $date = $v.find('.tip-tb-date');
        var date = new Date($v.find('.tip-tb-date').attr('data-date'));
        var day = parseInt((curDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        $date.text(day == 0 ? '今天' : day + '天前');
    })
    $('.msg-btn').hover(function () {
        $('.msg-btn').removeClass('show');
    })
    // if ($('.msg-btn.un-msg')[0]) {
    //     //存在未读消息，就播放提示音
    //     var uiPath = $('[name="uiPath"]').attr('content');
    //     var tipWav = uiPath + 'project/zhy/web/static/file/tip.wav';
    //     var player = new Audio(tipWav);
    //     player.play();
    // }

    function stopTips() {
        var $msg = $('.msg-btn.un-msg');
        $msg.removeClass('un-msg')
        $msg.find('.help-tips.msg').removeClass('help-tips').removeClass('msg')
    }

    $('#readAll').click(function () {
        ajax({
            url: '/readMsg', success: function (res) {
                $('.msg-btn').removeClass('msg');
                stopTips();
                $('.tip-content .tip-item').each(function () {
                    $(this)
                        .find('.tip-tb-state')
                        .removeClass('red')
                        .text('已读');
                });
            }
        })
    })
    $('.tip-content .tip-item').click(function () {
        var $this = $(this);
        var linkUrl = $this.attr('data-link');
        var id = $this.attr('data-id');
        var state = $this.attr('data-state');
        if (!id) return;
        if (state == 'F') {//已读
            ajax({
                url: '/readMsg?id=' + id, success: function (res) {
                    $this.attr('data-state', 'T');
                    $this.find('.tip-tb-state')
                        .removeClass('red')
                        .text('已读');

                    if (!$('.tip-tb-state.red')[0]) {
                        stopTips();
                    }
                }
            })
        }

        linkUrl && window.open(linkUrl);
    })
}

initMsg();

function initIndex() {

    $('#test').click(function () {
        ajaxPost('/user/conversion', {
            musicName: '测试音乐.mp3'
        }, function (res) {
            console.log(res);
        })
    })


    window.showToVipWindow = function () {
        if (!window.isShowToVipWindow) {
            window.isShowToVipWindow = true;
            var lv = ['年费会员', '永久会员', '永久会员'];
            var text = (curUserData ? "尊敬的" + (lv[curUserData.vipId - 1] || '普通会员') : "尊敬的游客") + "，今日转换次数已达上限";
            $('#vipWindowContent').text(text);
            if (!curUserData) {
                $('#vipWindowContent2 .text').text('登录账户后，日转换');
                $('#vipWindowContent2 .red').text('+5');
                $('.look-btn').attr('href', '/user/login')
            } else if (!lv[curUserData.vipId - 1]) {
                $('#vipWindowContent2 .text').text('成为会员，日转换数量');
                $('#vipWindowContent2 .red').text('最高300次');
                $('.look-btn').attr('href', '/vip')
            } else if (lv[curUserData.vipId - 1] == '年费会员') {
                $('#vipWindowContent2 .text').text('升级成终身会员，日转换数量');
                $('#vipWindowContent2 .red').text('300次');
                $('.look-btn').attr('href', '/vip')
            } else if (lv[curUserData.vipId - 1] == '永久会员') {
                $('#vipWindowContent').hide();
                $('#vipWindowContent2 .text').text('尊敬的永久会员，今日转换次数已达300首上限');
                $('#vipWindowContent2 .red').hide();
                $('.look-btn').hide();
            }
            window.toVipWindow = layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                skin: 'to-vip-warp',
                content: $('.to-vip-window'),
                end: function () {
                    $('.to-vip-window').hide();
                }
            })
            $('.to-vip-window .close-btn').off().click(function () {
                layer.close(window.toVipWindow);
                window.isShowToVipWindow = false;
            })
        }
    }
    window.showNumWindow = function (vipName, uNum, cNum, overNum) {
        $('.num-window .title').text('尊敬的' + vipName);
        // $('.num-window .uNum').text(uNum);
        // $('.num-window .cNum').text(cNum);

        $('.num-window .overNum').text(overNum);
        window.numTimeout && clearTimeout(window.numTimeout);
        window.numTimeout = setTimeout(function () {
            $('.num-window .close-btn').click();
        }, 3000);
        if (!window.isShowNumWindow) {
            window.isShowNumWindow = true;
            window.numWindowIndex = layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                shade: 0,
                offset: 'b',
                skin: 'num-window-warp',
                content: $('.num-window'),
                end: function () {
                    $('.num-window').hide();
                }
            })
            $('.num-window .close-btn').off().click(function () {
                layer.close(window.numWindowIndex);
                window.isShowNumWindow = false;
            })
        }
    }
    window.addEventListener("message", function (e) {
        var data = e.data;
        if (data.op == 'toVip') {
            showToVipWindow();
        } else if (data.op == 'getOverNum') {
            $('#client')[0].contentWindow.postMessage({
                type: 'getOverNum',
                data: $('#overNum').val() || 0
            }, '*');
        } else if (data.op == 'getBaseUrl') {
            $('#client')[0].contentWindow.postMessage({
                type: 'getBaseUrl',
                data: {baseUrl: window.location.origin, userId: curUserData && curUserData.id}
            }, '*');
        } else if (data.op == 'toIframeBottom') {
            window.scrollTo($('#client').offset().top + $('#client').height() - window.screen.height / 1.5)
        } else if (data.op == 'setIframeHeight') {
            $('#client').css('height', data.data + 50 + 'px')
        } else if (data.op == 'toFqa') {
            toFQA()
        } else if (data.op == 'showNum') {
            var vipName = data.vipName;
            var cNum = data.cNum;
            var uNum = data.uNum;
            var overNum = data.res.data.overNum;
            if (vipName.indexOf('会员') == -1 && vipName != '游客用户') {
                vipName += '会员';
            }
            showNumWindow(vipName, uNum, cNum, overNum)
        }
    })
}

$('.mgg-btn').click(toFQA)

function toFQA() {
    // var index = data.index;
    var $to = $('.accordion-title').eq(0);
    if (!$to.hasClass('active')) {
        $to.click();
    }
    window.scrollTo($to.offset().top - 180)
}

function initMyCenter() {
    $(".toggle-password").on('click', function () {
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    var app = new Vue({
        el: '#app', data: {
            scene: 0,//0菜单 1 绑定手机 2修改密码 3优惠券

        }, // filters: vue_filters,
        mounted: function () {
            var that = this;
        }, watch: {}, methods: {
            resetPwdClick: function () {
                layer.open({
                    type: 1, title: false, closeBtn: true, content: $('#resetPwd'), end: function () {
                        $('#resetPwd').hide();
                    }
                })
            }, bindPhoneClick: function () {
                layer.open({
                    type: 1, title: false, closeBtn: true, content: $('#bindPhone'), end: function () {
                        $('#bindPhone').hide();
                    }
                })
            }, bindWxClick: function () {
                var url = window.location.protocol + '//www.zhuanhuanyun.cn/user/ucBindWx?origin=' + encodeURIComponent(window.location.origin)
                new WxLogin({
                    self_redirect: false,
                    id: "bindWxQrcode",
                    appid: "wxacca765fe6bab063",
                    scope: "snsapi_login",
                    redirect_uri: url,
                    state: "889998", // style: "white",
                    // href: ""
                })
                layer.open({
                    type: 1, title: false, closeBtn: true, content: $('#bindWx'), end: function () {
                        $('#bindWx').hide();
                    }
                })
            }, toScene: function (i) {
                // this.scene = i;
                msgError("暂未开放，尽请期待");
            }, logout: function () {
                window.location.href = 'logout';
            }
        }
    })
    initSmsYzm();

    var msgStr = getParam('err');
    if (msgStr) {
        msgError(msgStr);
        setParam('err', '', true)
    }

    layui.use(['form'], function () {
        var form = layui.form;
        // 提交事件
        form.on('submit(bindPhone)', function (data) {
            var i = layer.load(1);
            ajaxGet('/user/ajaxChangePhone', data.field, function (res) {
                layer.close(i);
                if (res.state == 'ok') {
                    msg(res.msg);
                    setTimeout(function () {
                        layer.closeAll();
                        // setTimeout(function () {
                        //     window.location.reload()
                        // }, 200)
                        $('#curPhone').text(data.field.phone)
                        $('[name="oldPhone"]').val(data.field.phone)
                        form.val('bindPhoneForm', {oldPhone: '', phone: '', smsCode: ''});
                        ajaxGet('/user/get')
                    }, 1000)
                } else {
                    msgError(res.msg);
                }
            }, function () {
                msgError('网络错误');
            })
            return false;
        });
        form.on('submit(resetPwd)', function (data) {
            var i = layer.load(1);
            if (data.field.newPassword != data.field.repassword) {
                layer.close(i);
                return msgError('两次密码输入不一致，请重新输入');
            }
            ajaxPost('/user/ajaxResetPassword', data.field, function (res) {
                layer.close(i);
                if (res.state == 'ok') {
                    msg(res.msg);
                    setTimeout(function () {
                        layer.closeAll();
                        form.val('resetForm', {oldPassword: '', newPassword: '', repassword: ''});
                    }, 1000)
                } else {
                    msgError(res.msg);
                }
            }, function () {
                msgError('网络错误');
            })
            return false;
        });
    })
}

function initPay() {
    var payWinVue = new Vue({
        el: '#payWin', data: {
            vipId: '', couponsList: [],//优惠券列表
            activeCoupons: null, couponsCode: '',//优惠码
            payInfo: {
                orderAmount: null,//订单金额
                couponsAmount: null,//优惠金额
                payAmount: null,//实际需要支付的金额
                wxQrcode: null,//微信支付二维码
                aliQrcode: null//支付宝支付二维码
            }, wxQRCodeInstance: null, aliQRCodeInstance: null

        }, watch: {
            payInfo: {
                handler: function () {
                    var that = this;
                    var renderQr = function (domId, qrCodeInstance, qrValue) {
                        var instance = that[qrCodeInstance];
                        if (!instance) {
                            that[qrCodeInstance] = new QRCode(document.getElementById(domId), {
                                text: qrValue,
                                width: 100,
                                height: 100,
                                colorDark: "#000000",
                                colorLight: "#ffffff",
                                correctLevel: QRCode.CorrectLevel.H
                            });
                        } else {
                            instance.clear(); // clear the code.
                            instance.makeCode(qrValue); // make another code.
                        }
                    }
                    renderQr("wxQr", 'wxQRCodeInstance', this.payInfo.wxQrcode)
                    renderQr("zfbQr", 'aliQRCodeInstance', this.payInfo.aliQrcode)
                }, deep: true,
            }
        }, methods: {
            applyCouponsClick: function () {
                if (!this.couponsCode) {
                    return msgError("请输入优惠码");
                }
                msgError("该优惠码不存在");
            }, loading: function (isShow) {
                loading(isShow, $('#payWin'))
            }, paySuccess: function () {
                msg('支付成功');
                setTimeout(function () {
                    window.location.href = '/myVip';
                }, 1000)
            }, refreshPayInfo: function () {
                var that = this;
                this.loading(true);
                ajaxPost('/order/createPayOrder', {
                    vipId: that.vipId,
                    couponsId: that.activeCoupons ? that.activeCoupons.id : '',
                    couponsCode: that.couponsCode
                }, function (res) {
                    that.loading(false);
                    console.log(res);
                    if (res.state !== 'ok') {
                        msgError(res.msg);
                        if (res.code === -9999) {
                            setTimeout(function () {
                                window.location.href = "/user/login?backurl=/vip"
                            }, 1500);
                        }
                    } else {
                        that.payInfo = res.data;
                    }
                })
            }
        }
    })
    var payWinVue2 = new Vue({
        el: '#payWin2', data: {
            vipId: '', couponsList: [],//优惠券列表
            activeCoupons: null, couponsCode: '',//优惠码
            selectPayType: 'ali',//wx ali
            amount: 0,//支付金额
            vipName: '', couponAmount: 0,//优惠金额
            qrcode: '',//二维码内容
            qrCodeInstance: null
        }, watch: {
            qrcode: {
                handler: function () {
                    var that = this;
                    var instance = this.qrCodeInstance;
                    if (!instance) {
                        this.qrCodeInstance = new QRCode(document.getElementById('qrcode2'), {
                            text: this.qrcode,
                            width: 240,
                            height: 240,
                            colorDark: "#000000",
                            colorLight: "#ffffff",
                            correctLevel: QRCode.CorrectLevel.H
                        });
                    } else {
                        instance.clear();
                        instance.makeCode(this.qrcode);
                    }
                }, deep: true,
            }
        }, filters: {
            num: function (x) {
                var f = parseFloat(x);
                if (f <= 0) {
                    return '0.00';
                }
                if (isNaN(f)) {
                    return false;
                }
                var f = Math.round(x * 100) / 100;
                var s = f.toString();
                var rs = s.indexOf(".");
                if (rs < 0) {
                    rs = s.length;
                    s += ".";
                }
                while (s.length <= rs + 2) {
                    s += "0";
                }
                return s;
            }
        }, methods: {
            execPay: function () {
                var that = this;

                ajaxPost('/order/createOrderV2', {
                    vipId: that.vipId,
                    payType: that.selectPayType,
                    couponsId: that.activeCoupons ? that.activeCoupons.id : '',
                    couponsCode: that.activeCoupons ? that.activeCoupons.disCode : '',
                }, function (res) {
                    that.loading(false);
                    console.log(res);
                    if (res.state !== 'ok') {
                        msgError(res.msg);
                        if (res.code === -9999) {
                            setTimeout(function () {
                                window.location.href = "/user/login?backurl=/vip"
                            }, 1500);
                        }
                    } else {
                        if (res.data == 'paySuccess') {
                            msg('开通VIP成功');
                            setTimeout(function () {
                                window.location.href = '/myVip';
                            }, 1000)
                        } else {
                            setTimeout(function () {
                                that.qrcode = res.data;
                            }, 100)
                        }
                    }
                })
            }, createOrder: function () {
                this.loading(true);
                if (this.activeCoupons == null && this.couponsCode) {
                    this.applyCouponsClick(this.execPay);
                } else {
                    this.execPay();
                }
            }, applyCouponsClick: function (cb) {
                if (this.couponsCode && this.activeCoupons) {
                    this.activeCoupons = null;
                    this.couponsCode = '';
                    return;
                }
                if (!this.couponsCode) {
                    return msgError("请输入优惠码");
                }
                var that = this;
                this.loading(true)
                ajax({
                    url: '/order/useCode?code=' + this.couponsCode, success: function (res) {
                        that.loading(false);
                        console.log(res);
                        if (res.state == 'ok') {
                            that.activeCoupons = res.data;
                            that.$forceUpdate();
                            cb && cb();
                        } else {
                            msgError(res.msg);
                        }
                    }
                })
            }, loading: function (isShow) {
                loading(isShow, $('#payWin2'))
            }, paySuccess: function () {
                msg('支付成功');
                setTimeout(function () {
                    window.location.href = '/myVip';
                }, 1000)
            }, /*refreshPayInfo: function () {
                var that = this;
                this.loading(true);
                ajaxPost('/order/createPayOrder', {
                    vipId: that.vipId,
                    couponsId: that.activeCoupons ? that.activeCoupons.id : '',
                    couponsCode: that.couponsCode
                }, function (res) {
                    that.loading(false);
                    if (res.state !== 'ok') {
                        msgError(res.msg);
                        if (res.code === -9999) {
                            setTimeout(function () {
                                window.location.href = "/user/login?backurl=/vip"
                            }, 1500);
                        }
                    } else {
                        that.payInfo = res.data;
                    }
                })
            }*/
        }
    })

    if (curUserData && curUserData.id) {
        window.websocket = webSocket('/websocket/pay/' + curUserData.id, {
            onMsg: function (e) {
                console.log('收到socket消息', e.data);
                if (e.data == 'paySuccess') {
                    payWinVue2.paySuccess()
                }
            }
        })
    }

    $('.payBtn').click(function () {
        var $this = $(this);
        var vipId = $this.attr('vipid');
        if (!vipId) {
            return msg('请选择年费会员或永久会员进行支付');
        }
        if (!curUserData) {
            msgError('请登录后再进行开通会员');
            setTimeout(function () {
                window.location.href = "/user/login?backurl=/vip"
            }, 1500);
            return
        }
        payWinVue2.vipId = vipId;
        payWinVue2.amount = $this.attr('amount');
        payWinVue2.vipName = $this.attr('name');
        //弹出支付类型选择框
        window.payWindow = layer.open({
            type: 1, title: false, closeBtn: true, content: $('#payWin2'), end: function () {
                $('#payWin2').hide();
                payWinVue2.qrcode = ''
                loading(false, $('#payWin2'))
            }
        })
        // payWinVue2.refreshPayInfo()
        // createOrder(vipid, 'wx');
        // layer.msg('请选择支付方式', {
        //     time: 2000000000, //200s后自动关闭
        //     btn: ['微信', '支付宝'],//按钮
        //     btn2: function () {
        //         layer.closeAll();
        //         createOrder(vipid, 'ali');
        //     }, btn1: function () {
        //         layer.closeAll();
        //         createOrder(vipid, 'wx');
        //     }
        // });
    })

    function createOrder(vipId, payType) {
        layer.load(1);
        window.vipId = vipId;
        window.payType = payType;
        ajaxPost('/order/createOrder', {
            vipId: vipId, payType: payType
        }, function (res) {
            layer.closeAll();
            if (res.state != 'ok') {
                if (res.code == -9999) {
                    setTimeout(function () {
                        window.location.href = "/user/login?backurl=/vip"
                    }, 1500);
                }
                return msgError(res.msg);
            }
            layer.open({
                type: 2,
                title: false,
                closeBtn: true,
                area: ["400px", "600px"],
                content: '/pay/pay-' + res.data + '.' + (payType == 'wx' ? 'php' : 'html')
            })
            console.log(res);
        })
    }

    window.payTimeout = function () {
        layer.closeAll();
        createOrder(window.vipId, window.payType);
    }
    window.paySuccessNoCheck = function () {
        msg('支付成功');
        setTimeout(function () {
            window.location.href = '/myVip';
        }, 1000)
    }

    window.paySuccess = function () {
        layer.load(1);
        ajaxPost("/pay/paySuccess", {}, function (res) {
            if (res.state == 'ok' && res.data) {
                msg('支付成功');
                setTimeout(function () {
                    window.location.href = '/myVip';
                }, 1000)
            } else {
                msg(res.msg);
            }
            console.log("支付结果：", res);
        })
    }
}

function initAbout() {
    layui.use(['form'], function () {
        var form = layui.form;

        form.on('submit(submit)', function (data) {
            if (!curUserData) {
                return msgError('未登录，请登录后再提交', function () {
                    window.location.href = '/user/login?backurl=/about'
                });
            }
            loading(true, null, '请稍等...')
            ajaxPost('/submitFeedback', data.field, function (res) {
                loading(false)
                if (res.state == 'ok') {
                    msg('提交成功');
                    setTimeout(function () {
                        form.val('form', {nickName: '', contactInfo: '', content: ''});
                    }, 1000)
                } else {
                    msgError(res.msg);
                }
            }, function () {
                msgError('网络错误');
            })
            return false;
        });
    })
}

function initSmsYzm() {
    var time = -1;
    var interval = null;
    var s = $('.send-smscode-btn').data('time');
    if (parseInt(s) > 0) {
        time = parseInt(s);
        timedonw();
    }
    $('.send-smscode-btn').click(function () {
        var that = $(this);
        if (time > 0) {
            return msgError(time + '秒后可重新发送');
        }
        var oldPhone = $('[name="oldPhone"]').val();
        var phone = $('[name="phone"]').val();
        if (oldPhone == phone) {
            return msgError('新手机号不能与当前绑定的手机号一样');
        }
        if (!phone) {
            return msgError('请输入手机号码');
        }
        var i = layer.load(1);
        ajaxPost('/user/sendSmsCode', {scene: that.data('scene'), phone: phone}, function (res) {
            layer.close(i);
            if (res.state == 'ok') {
                msg('短信验证码发送成功');
                time = 60;
                timedonw();
            } else {
                msgError(res.msg);
            }
        }, function () {
            msgError('网络错误');
        })
    })

    function timedonw() {
        interval = setInterval(function () {
            time--;
            if (time == 0) {
                clearInterval(interval);
                $('.send-smscode-btn').text('发送短信验证码');
            } else {
                $('.send-smscode-btn').text(time + '秒后可重新发送');
            }
        }, 1000)

    }
}


var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?9fff6e0fc081b91f0f9329a6764554a3";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();


(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?4a1b0278174f6260bea89a2085b43c6e";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
