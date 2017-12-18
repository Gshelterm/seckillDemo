// javascript模块化 对象
// 存放主要交互逻辑代码
var seckill = {
    // 封装秒杀相关ajax的url
    URL: {
        now : function () {
            return '/seckill/time/now';
        },
        exposer : function (seckillId) {
            return '/seckill/' + seckillId + '/exposer';
        },
        execution : function (seckillId, md5) {
            return '/seckill/' + seckillId + '/' + md5 + '/execution';
        }
    },

    validatePhone: function (phone) {
        if (phone && phone.length == 11 && !isNaN(phone)) {
            return true;
        } else {
            false;
        }
    },


    // 秒杀详情页
    detail: {
        init : function (params) {
            // 手机号验证和登录， 计时交互
            // 在cookie中查找手机号，验证是否登录
            var killPhone = $.cookie('killPhone');

            if (!seckill.validatePhone(killPhone)) {
                // 绑定phone
                var killPhoneModal = $('#killPhoneModal');
                // 弹出层选项设置
                killPhoneModal.modal({
                    show: true, //显示弹出层
                    backdrop: 'static', // 禁止位置关闭
                    keyboard: false // 关闭键盘事件
                })
                $('#killPhoneBtn').click(function () {
                    var inputPhone = $('#killPhoneKey').val();
                    if (seckill.validatePhone(inputPhone)) {
                        $.cookie('killPhone', inputPhone, {expires: 7, path:'/seckill'});
                        window.location.reload();
                    } else {
                        $('#killPhoneMessage').hide().html('<label class="label label-danger">手机号错误!</label>').show(300);

                    }
                })
            }
            // 已经登录

            var startTime = params['startTime'];
            var endTime = params['endTime'];
            var seckillId = params['seckillId'];
            $.get(seckill.URL.now(), {}, function (result) {
                console.log(result['success']);
                if (result && result['success']) {
                    var nowTime = result['data'];
                    seckill.countdown(seckillId, nowTime, startTime, endTime);
                }
                else {
                    console.log("result: " + result);
                }
            })
        }
    },


    countdown : function (seckillId, nowTime, startTime, endTime) {
        console.log(seckillId + '_' + nowTime + '_' + startTime + '_' + endTime);
        var seckillBox = $('#seckill-box');
        // 秒杀结束
        if (nowTime > endTime) {
            seckillBox.html('秒杀结束!')
        }
        else if (nowTime < startTime) {
            // 秒杀未开始
            var killTime = new Date(startTime + 1000);
            // countdown插件
            seckillBox.countdown(killTime, function (event) {
                var format = event.strftime('秒杀倒计时: %D天 %H时 %M分 %S秒')
                seckillBox.html(format);
            }).on('finish.countdown', function () {
                seckill.handleSeckill(seckillId, seckillBox);
            });
        }
        else {
            seckill.handleSeckill(seckillId, seckillBox);
        }
    },

    // 处理秒杀逻辑
    handleSeckill : function (seckillId, node) {
        // 获取秒杀地址，控制显示逻辑，执行秒杀
        node.hide()
            .html('<button class="btn btn-primary btn-lg" id="killBtn">开始秒杀</button>');
        // post请求到相应url
        $.post(seckill.URL.exposer(seckillId), {}, function(result) {
            // 在回掉函数中执行交互流程
            console.log('exposeUrl: ' + result['success']);
            if (result && result['success']) {
                var exposer = result['data'];
                if (exposer['exposed']) {
                    // 开始秒杀
                    // 获取秒杀地址
                    var md5 = exposer['md5'];
                    var killUrl = seckill.URL.execution(seckillId, md5);
                    console.log('killUrl: ' + killUrl);
                    $('#killBtn').one('click', function () {
                        // 执行秒杀请求
                        // 1.先禁用按钮
                        $(this).addClass('disabled');
                        // 2.发送秒杀请求执行秒杀
                        $.post(killUrl, {}, function (result) {
                            if (result && result['success']) {
                                var killResult = result['data'];
                                var state = killResult['state'];
                                var stateInfo = killResult['stateInfo'];
                                node.html('<span class="label label-success">'+ stateInfo +'</span>');
                            }
                        })
                    });
                    node.show();
                }
                else {
                    // 秒杀未开始， 因为各个客户端系统计时差异，countdown到时间点(暴露秒杀接口地址)时可能并不到服务端开启秒杀的时间
                    var now = exposer['now'];
                    var start = exposer['start'];
                    var end = exposer['end'];
                    seckill.countdown(seckillId,now,start,end);
                }
            } else {
                console.log('result:' + result);
            }
        });
    }
}