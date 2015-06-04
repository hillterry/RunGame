/**
 * Created by γγ on 2015/5/11.
 */
$(function () {
    function GetRequest() {
        var url = location.search; //
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    var Shap = function (x, y, w, h, v, img_src, img_sX, img_sY, img_sW, img_sH, increment, animation) {
        this.x = x;
        this.y = y;
        this.v = v;
        this.w = w;
        this.h = h;
        this.img_src = img_src;
        this.img_sX = img_sX | 0;
        this.img_sY = img_sY | 0;
        this.img_sW = img_sW | 0;
        this.img_sH = img_sH | 0;
        this.increment = increment;
        this.animation = {
            movement: animation
        };
    }

    var Opt = function (runMetres, playAnimation, setLoadTime, runV, set_15_time, time_15, animate_v, loadingImages, theEnd, ready, loader, setfinger, finger_index, maxV, downVSetTime, ready123) {
        this.runMetres = runMetres | 0;
        this.playAnimation = playAnimation | false;
        this.setLoadTime = setLoadTime | 0;
        this.runV = runV | 0;
        this.set_15_time = set_15_time | 0;
        this.time_15 = time_15 | 0;
        this.animate_v = animate_v | 0;
        this.shaps = new Array();
        this.loadingImages = new Array();
        this.theEnd = theEnd | new Object();
        this.ready = ready | new Object();
        this.loader = loader | new Object();
        this.setfinger = setfinger | 0;
        this.finger_index = finger_index | 0;
        this.maxV = maxV | 4;
        this.downVSetTime = downVSetTime | 0;
        this.ready123 = ready123 | 1;
        this.winW = 0;
        this.winH = 0;
        this.status =false;
        this.data = {};
        this.level = 1;
        this.total = 0;
        this.serverPath ="http://text/....";
        this.levelUp =false;
    }
    var setting = new Opt();

    var data = {
        "person": {
            "user_name": "test2",
            "user_image": "images/head-p.jpg",
            "is_receiver": "0",
            "is_sender": "0",
            "user_id": "2",
            "level": "0",
            "distance": "0",
            "is_check":"0"
        },
        "sender": {
            "user_name": "test2",
            "user_image": "images/head-p.jpg",
            "is_receiver": "0",
            "is_sender": "1",
            "user_id": "2",
            "level": "3",
            "distance": "97",
            "is_check":"1"
        },
        "friends": [
            {
                "level": "1",
                "distance": "97",
                "user_name": "test1",
                "user_image": "images/head-p.jpg",
                "create_time": "0000-00-00"
            },
            {
                "level": "2",
                "distance": "89",
                "user_name": "test3",
                "user_image": "images/head-p.jpg",
                "create_time": "2015-05-13 "
            }
        ],
        "ranking": [
            {
                "level": "1",
                "distance": "97",
                "user_name": "test1",
                "user_image": "images/head-p.jpg",
                "create_time": "0000-00-00"
            },
            {
                "level": "1",
                "distance": "89",
                "user_name": "test3",
                "user_image": "images/head-p.jpg",
                "create_time": "2015-05-13 "
            },
            {
                "level": "1",
                "distance": "99",
                "user_name": "test4",
                "user_image": "images/head-p.jpg",
                "create_time": "2015-05-13"
            },
            {
                "level": "1",
                "distance": "89",
                "user_name": "test2",
                "user_image": "images/head-p.jpg",
                "create_time": "0000-00-00 "
            }
        ],
        "total": 0
    }


    var prizelist =[
        {
            level:1,
            desc:"奖品1",
            distanc:800
        },
        {
            level:2,
            desc:"奖品2",
            distanc:1500
        },
        {
            level:3,
            desc:"奖品3",
            distanc:3000
        },
        {
            level:4,
            desc:"奖品4",
            distanc:5000
        }
    ]
    //停止动画
    function stop() {
        setting.shaps[2] = setting.theEnd;
        setting.playAnimation = false;
        setting.status = true;
        setting.level = setting.data.friends.length==0?1:setting.data.friends.pop().level;
        setting.runMetres = setting.runMetres<setting.data.person.distance?setting.data.person.distance:setting.runMetres;
        setting.data.person.distance =setting.runMetres;
        setting.total = setting.data.sender?parseInt(setting.data.total)+ parseInt(setting.runMetres):parseInt(setting.data.total);
        var prize = prizelist[setting.level-1];
        var surplusM =parseInt(prize.distanc) -parseInt(setting.total);
        if(surplusM<=0){
            setting.level++;
            prize = prizelist[setting.level-2];
            surplusM = parseInt(prize.distanc) - parseInt(setting.total);
            if(prize.level>=4){
                $(".surprise").html("哇喔！魔鬼的指法！");
                $(".prize-img").attr("src","images/prize2.jpg")
            }
            $(".level").html(parseInt(prize.level));
            $("#prize").html(prize.desc);
            $(".prize-desc").html(prize.desc);
            $(".surplusM").html(surplusM);
            $(".prizelist").show();
            setting.levelUp =true;
        }
        else{
            $(".level").html(parseInt(setting.level));
            $("#prize").html(prize.desc);
            $(".surplusM").html(surplusM);
            if(setting.data.friends.length==0){
                $(".surplusM").html(prize.distanc);
            }
        }
        clearTimeout(setting.set_15_time);
        clearTimeout(setting.downVSetTime);
        $(".game .title .time").addClass("move");
        $(".game .title .result").addClass("moveL");
        $("#myMetres").html(setting.total);
        $("#runway li:first-child .head-photo p").html(setting.runMetres+"m");
        document.getElementById("audioShaking").pause();
        //添加用户
        addUser();
    }

    //添加用户
    function addUser(type){
        var url=setting.serverPath+"/index.php?func=addFriend";
        var param = {"user_id":'0',"parent_id":"","distance":50,"level":0,"is_check":""};
        if(setting.data.sender) {
            param.parent_id = setting.data.sender.user_id;
        }
        if(type==1||setting.data.sender){
            param.is_check = 1;
        }
        param.user_id = setting.data.person.user_id;
        param.distance = setting.runMetres;
        param.level = setting.level;
        if(setting.data.person.is_check==0){
            var ajax = $.ajax({
                type: 'get',
                url: url,
                dataType: 'json',
                data: param,
                success: function (rusult) {
                    var json = rusult;
                    if(json){
                        if(!type&&!setting.levelUp){
                                setTimeout(function () {
                                    //window.location.reload();
                                    getMsg(1);
                                }, 2000);
                        }
                    }else{

                    }
                },
                error: function () {

                }
            })
        }

    }

    //开始动画
    function start(person, cxt) {
        setting.shaps[2] = person;
        setting.playAnimation = true;
        $(".game .title .time").show();
        $("#ready123").hide();
        animate(false, cxt);
        countDown();
    }

    //执行动画函数
    function animate(isInit, cxt) {
        var canvas = cxt.canvas;
        cxt.clearRect(0, 0, canvas.width, canvas.height);

        //遍历画布元素，添加到画布中
        for (var i in setting.shaps) {
            //画元素
            var item = setting.shaps[i];
            item.animation.movement(item, cxt);
        }
        if (!isInit && setting.playAnimation) {
            setTimeout(function () {
                animate(false, cxt)
            }, 166.66 / setting.animate_v);
        }
    }

    //加载动画
    function load(loading_img, cxt_loading) {
        cxt_loading.clearRect(0, 0, setting.loader.w, setting.loader.h);
        //画元素
        var max_w = loading_img.width;
        cxt_loading.drawImage(loading_img, setting.loader.img_sX, setting.loader.img_sY, setting.loader.img_sW, setting.loader.img_sH, setting.loader.x, setting.loader.y, setting.loader.w, setting.loader.h);
        cxt_loading.globalCompositeOperation = "source-over";
        if (setting.loader.img_sX == max_w - setting.loader.increment) {
            setting.loader.img_sX = 0;
        }
        setting.loader.img_sX += setting.loader.increment;
        setting.setLoadTime = setTimeout(function () {
            load(loading_img, cxt_loading)
        }, 16.666 * 4);
    }

    //person Animation
    function p_movement(shap, context) {
        var img = new Image();
        var item = shap;
        img.src = item.img_src;
        var max_w = img.width;
        context.drawImage(img, item.img_sX, item.img_sY, item.img_sW, item.img_sH, item.x, item.y, item.w, item.h);
        context.globalCompositeOperation = "source-over";
        if (item.img_sX == max_w - item.increment) {
            item.increment *= -1;
        }
        if (item.img_sX == 0) {
            item.increment = item.increment < 0 ? item.increment * -1 : item.increment;
        }
        item.img_sX += item.increment;
    }

    //runway Animation
    function runway_movement(shap, context) {
        var img = new Image();
        var item = shap;
        img.src = item.img_src;
        var max_w = img.width;
        context.drawImage(img, item.img_sX, item.img_sY, item.img_sW, item.img_sH, item.x, item.y, item.w, item.h);
        context.globalCompositeOperation = 'source-atop';
        //if(item.increment ==0) return;
        if (item.img_sX >= max_w - item.increment) {
            item.img_sX = 0;
        }
        item.img_sX += item.increment;
    }

    //15秒倒计时
    function countDown() {
        if (setting.time_15 < 0) {
            clearTimeout(setting.set_15_time);
            stop();
            return;
        }
        var s = parseInt(setting.time_15 / 10);
        var ms = setting.time_15 % 10;
        $("#time").html(s + "." + ms + "s");
        setting.time_15--;
        if(setting.time_15%10==0){
            run_metres();
        }
        setting.set_15_time = setTimeout(countDown, 100);
    }

    //计算跑的米数
    function run_metres() {
        if (setting.playAnimation) {
            setting.runMetres += setting.runV;
            $("#metres").html(parseInt(setting.runMetres));
            $("#run_metres").html(parseInt(setting.runMetres));
        }
    }


    ////补零
    //function appendZero(num){
    //    return parseInt(num)>=10?num:"0"+num;
    //}

    //页面加载
    function loading(callback, imgAddress) {
        var imgId = 0;
        var audioElement = document.getElementById("audioShaking");
        var loadImg = function () {
            var imgObj = new Image();
            imgObj.src = imgAddress[imgId];
            imgObj.onload = function () {
                if (imgObj.complete == true) {
                    setting.loadingImages.push(imgObj);
                    imgId++;
                    if (imgId < imgAddress.length) {
                        loadImg();
                    }
                    if (imgId == imgAddress.length) {
                        audioElement.play();
                        $(".game-body").show();
                        callback();
                    }
                }
            }
        }
        audioElement.src = $(audioElement).attr('data-src');
        console.log($(audioElement).attr('data-src'));
        if (audioElement.readyState == 4) {  // android会走此逻辑
            loadImg();
            audioElement.load();    // 需要主动触发下，不然不会加载
            audioElement.pause();
        } else {    // iOS走此逻辑
            audioElement.addEventListener("canplaythrough", function () {
                loadImg();
            }, false);
            audioElement.load();    // 需要主动触发下，不然不会加载
            audioElement.pause();
        }
        audioElement.pause();
    }

    //手指提示动画
    function finger() {
        $(".button p a").removeClass("active");
        switch (setting.finger_index++ % 2) {
            case 0 :
                console.log("come in");
                $(".button p:nth-child(1) a").addClass("active");
                break;
            case 1 :
                $(".button p:nth-child(2) a").addClass("active");
                break;
        }
        setting.setfinger = setTimeout(finger, 150);
    }


    //自我降速
    function downV() {
        if (setting.animate_v > 4) {
            setting.animate_v -= 1;
        }
        if(setting.runV>8){
            setting.runV -=1;
        }
        setting.downVSetTime = setTimeout(downV, 1000);
    }


    getMsg();
    //获取用户信息，跑道信息
    function getMsg(type) {
        var Request = new Object();
        Request = GetRequest();
        var parent_id =Request["parent_id"];
        var url = setting.serverPath+"/index.php?func=user&parent_id="+parent_id;
        $(".game").hide();
        if(type){
            $(".runway-body").show();
        }
        var ajax = $.ajax({
            type: 'get',
            url: url,
            dataType: 'json',
            async : false,
            success: function (rusult) {
                var json = rusult;
                if(json){
                    data =json;
                    if(data.sender&&data.sender.is_check==0){
                        window.location.href = setting.serverPath+"/index.php";
                    }
                    setting.data=data;
                    data.person.level = data.person.level=="0"||data.person.level==null?1:data.person.level;
                    var prize = prizelist[data.person.level-1];
                    var subMetres = parseInt(prize.distanc)-parseInt(data.total);
                    showBtn(setting.data)
                    ranking(setting.data);
                    if(data.friends){
                        runmsg(setting.data)
                    }
                    if(data.sender){
                        shareFVar.imgUrl =data.sender.user_image;
                        setting.level= data.sender.level;
                        shareVar.link =link+setting.data.sender.user_id;
                    }else{
                        shareVar.link =link+setting.data.person.user_id;
                        shareFVar.imgUrl =data.person.user_image;
                    }
                    if(data.person.is_sender){
                        var url = setting.serverPath+"/index.php";
                        $("#myRunway").attr("href",url);
                        $("#creatRun").attr("href",url);
                    }
                    setting.runMetres =data.person.distance;
                    shareVar.imgUrl =domain+ "/images/share.jpg";
                    shareFVar.link  =shareVar.link;
                    shareFVar.title  =shareVar.title;
                    shareFVar.desc ='距离'+prize.desc+'还差'+subMetres+'米，求助跑！';
                }else{

                }
            },
            error: function () {

            }
        })
    }

    //显示按钮
    function showBtn(msg){
        var person = msg.person;
        var friends = msg.friends;
        var sender = msg.sender;
        var level =sender?sender.level:person.level;
        var prize = prizelist[level-1];
        var surplusM= parseInt(prize.distanc)-parseInt(msg.total);
        var name = sender?sender.user_name:person.user_name;
        var Myname = person.user_name;
        $(".surplusM").html(surplusM);
        if(msg.ranking.length==0){
            $(".surplusM").html(prize.distanc);
        }
        $(".name").html(name);        //用户名称
        $(".myName").html(Myname);
        $("#prize").html(prize.desc);
        $(".level").html(parseInt(prize.level));
        if(!sender){                                        //是否接受邀请
            $("#myMetres").html(msg.total);
            $("#help").hide();
            $("#creatRun").hide();
            $("#myRunway").hide();
            $("#enter").hide();
            if(person.is_sender==1||msg.total>0){                       //没有接受邀请，发起了跑道
                $(".runway-body").show();
                if(person.is_check==1){
                    $(".again").hide();
                }
            }else{
                $(".index").show();
                $(".game").hide();
            }
            if(person.level==1){                 //已经拥有奖品
                $("#myPrize").hide();
            }
        }else{
            $("#myMetres").html(person.distance);
            $(".again").hide();
            $("#myPrize").hide();
            $("#moreF").hide();
            $(".invite").hide();
            $(".runway-body").show();
            if(person.is_sender==0){      //接受了邀请，没有发起跑道
                $("#myRunway").hide();
                $(".game").hide();
            }else{                        //接受了邀请，发起了跑道
                $("#creatRun").hide();
            }
            if(person.is_check==1){
                $("#help").hide();
                $("#enter").show();
            }else{
                $(".brandAdv").show();
                $("#enter").hide();
            }
        }
        if(friends.length==0){
            $("#moreF").hide();
            $(".friend_list").hide();
        }else{
            $("#callF").hide();
        }
    }

    //排行榜
    function ranking(msg){
        var data = msg.ranking;
        var html ="";
        console.log(data)
        for(var i =0;i<data.length;i++){
            var item = data[i];
            html+='<li>';
            html+='<div class="head-photo">';
            html+='<span ><i></i><img src="'+item.user_image+'" alt=""/></span>';
            html+='</div>';
            html+='<div class="text-r">';
            html+='<p>'+item.user_name+'</p>';
            if(setting.data.sender){
                if(item.user_name==setting.data.sender.user_name){
                    html+='<p>自己跑了<b>'+item.distance+'</b>米  <span>'+item.create_time+'</span></p>';
                }else{
                    html+='<p>帮Ta跑了<b>'+item.distance+'</b>米  <span>'+item.create_time+'</span></p>';
                }
            }else{
                if(item.user_name==setting.data.person.user_name){
                    html+='<p>自己跑了<b>'+item.distance+'</b>米  <span>'+item.create_time+'</span></p>';
                }else{
                    html+='<p>帮我跑了<b>'+item.distance+'</b>米  <span>'+item.create_time+'</span></p>';
                }
            }
            html+='</div>';
            html+='</li>';
        }
        $("#ranking").html(html);
    }

    //跑道信息
    function runmsg(msg) {
        var sender =msg.sender?msg.sender:msg.person;
        var friends = msg.friends;
        var html = "";
        //friends.splice(0,0,sender);             //把发起者添加到跑道队列
        var runs = new Array();
        friends.forEach(function(item,index,array){
            console.log(index);
            if(index ==friends.length-1&&index!=0){
                runs[(index-1)*2+1] = item;
            }else{
                runs[index*2] = item;
            }
        })
        if(runs.length==1||runs.length==0){
            runs.splice(0,0,sender);                //把发起者添加到跑道队列
        }else{
            runs.splice(0,0,sender,"");
        }
        runs.push("final");                //把发起者添加到跑道队列

        var length = runs.length;         //间隔中间项
        console.log(length);
        for(var i=0;i<length;i++)
        {
            var index =i%6+1;
            switch (index){                     //根据页面做6位用户信息循环一次ul
                case 1:
                    html += '<ul>';
                    html +=getHtml(1,runs[i]);
                    break;
                case 2:
                    html +=getHtml(2,runs[i]);
                    break;
                case 3:
                    html +=getHtml(3,runs[i]);
                    break;
                case 4:
                    if(runs[i]=="final"){
                        html += '<li class="runways-r">';            //跑道右转弯
                        html += '<section class="runway-r-g">';
                        html += '</section>';
                        html += '</li>';
                    }else{
                        html += '<li class="runways-r">';            //跑道右转弯
                        html += '<section class="runway-r">';
                        html += '</section>';
                        html += '</li>';
                    }
                    html +=getHtml(4,runs[i]);
                    break;
                case 5:
                    html +=getHtml(5,runs[i]);
                    break;
                case 6:
                    html +=getHtml(6,runs[i]);
                    if(runs[i+1]=="final"){
                        html += '<li class="runways-L">';            //跑道左转弯
                        html += '<section class="runway-L-g">';
                        html += '</section>';
                        html += '</li>';
                    }else{
                        html += '<li class="runways-L">';            //跑道左转弯
                        html += '<section class="runway-L">';
                        html += '</section>';
                        html += '</li>';
                    }
                    html += '</ul>';
                    break;
            }
        }
        $("#runway").html(html);
        var len =$("#runway .head-photo").length;
        $("#runway .head-photo").each(function(index){
                if(index==len-1){
                    $(this).children("span").removeClass("king");
                }
        })
    }

    //拼接用户的html字符串
    function getHtml(index,person){
        var html = "";
        if(person=="final"){
            html += '<li class="runways-'+index+'">';
            html += '<section class="runway-'+index+'-g">';
        }else{
            html += '<li class="runways-'+index+'">';
            html += '<section class="runway-'+index+'">';
        }
        if(person&&person!="final"){
            html += '<div class="head-photo">';
            html += '<span class="king" > <i></i><img src="' + person.user_image + '" alt=""/></span>';
            html += '<p>' + person.distance + 'm</p>';
            html += '</div>';
        }
        else{
            html += '<div class="prize">';
            html += '<span><img src="images/prize.png" alt=""/></span>';
            html += '</div>';
        }
        html += '</section>';
        html += '</li>';

        return html;
    }

    function main() {
        //初始化值
        var canvas = $("#myCanvas");
        var cxt = canvas.get(0).getContext("2d");
        var startButton = $("#startAnimation");
        var person = null;
        var runway = null;
        var bg = null;
        var statu = 0;
        var clickcount = 0;

        function init() {
            setting = new Opt();
            setting.data=data;
            setting.winW = $(window).get(0).innerWidth;
            setting.winH = $(window).get(0).innerHeight;
            setting.imgAddress = ["images/persons.png", "images/tree.png", "images/ready.png", "images/game-bg.jpg", "images/theEnd.png","images/prize1.jpg","images/prize2.jpg"];
            person = new Shap((setting.winW - 125) / 2, (setting.winH - 125) / 2, 111, 275, 1, setting.imgAddress[0], 0, 0, 162, 400, 162, p_movement);
            runway = new Shap(0, 0, setting.winW, setting.winH, 1, setting.imgAddress[1], 0, 0, 640, 960, 640, runway_movement);
            bg = new Shap(0, 0, setting.winW, setting.winH, 1, setting.imgAddress[3], 0, 0, 640, 960, 0, p_movement);
            setting.ready = new Shap((setting.winW - 175) / 2, (setting.winH - 75) / 2, 175, 323, 1, setting.imgAddress[2], 0, 0, 246, 455, 0, p_movement);
            setting.theEnd = new Shap((setting.winW - 175) / 2, (setting.winH - 75) / 2, 175, 356, 1, setting.imgAddress[4], 0, 0, 279, 568, 0, p_movement);
            cxt.fillStyle = "rgb(0,0,0)";
            setting.time_15 = 100;
            setting.animate_v = 2;
            setting.runV = 6;
            setting.maxV = 5;
            setting.ready123 = 1;
            setting.shaps.push(bg);
            setting.shaps.push(runway);
            setting.shaps.push(setting.ready);
            canvas.attr("width", setting.winW);
            canvas.attr("height", setting.winH);
            $("#button i").show();
            $("#ready").show();
            $(".game .title .result").removeClass("moveL");
            $(".game .title .time").removeClass("move");
            $(".game .title .time").hide();
            $("#metres").html("0");
            $("#time").html("15.0s");
            $(".runway-body").hide();
            $(".game").show();
            startButton.show();
            //加载页面，加载运动图片加载完毕执行下一步
            loading(function () {
                $(".loading").fadeOut(300);
                clearTimeout(setting.setLoadTime);
                animate(true, cxt);
            }, setting.imgAddress);
        }
        //初始化函数
        init();
        downV();
        finger();
        $("#button").on("touchstart", function (event) {
            event.originalEvent.preventDefault();
            if (!statu) {
                //start(person,cxt);
                ready_go();
                $(".ready123").show();
                $("#ready").hide();
                $("#button i").hide();
                clearTimeout(setting.setfinger);
                //document.getElementById("audioShaking").play();
            }
            statu = 1;
        })
        $(".button a").on("touchstart", function (event) {
            event.originalEvent.preventDefault();
            if (!$(this).hasClass("active")) {
                clickcount++;
            }
            $(".button a").removeClass("active");
            $(this).addClass("active");
            if (clickcount == 5) {
                if (setting.animate_v < setting.maxV&&setting.playAnimation) {
                    setting.animate_v++;
                }
                if (setting.runV < 9&&setting.playAnimation) {
                    setting.runV++;
                }
                clickcount = 0;
            }
        });


        //响应式
        $(window).resize(function () {
            if (setting.playAnimation) {
                var winW = $(window).get(0).innerWidth;
                var winH = $(window).get(0).innerHeight;
                canvas.attr("width", winW);
                canvas.attr("height", winH);
                setting.winW = winW;
                setting.winH = winH;
                setting.theEnd.x =(setting.winW - 175) / 2;
                setting.theEnd.y=(setting.winH - 75) / 2;
                setting.shaps[0].w = winW;
                setting.shaps[0].h = winH;
                setting.shaps[1].w = winW;
                setting.shaps[1].h = winH;
                setting.shaps[2].x = (winW - 125) / 2;
                setting.shaps[2].y = (winH - 125) / 2;
            } else {
                init();
            }
        }).resize();

        //1.2.3 .go...
        function ready_go() {
            if (setting.ready123 == 5) {
                setting.ready123 = 1;
                start(person, cxt);
                $(".ready123 .go123").removeClass("go_4");
                return;
            }
            $(".ready123 .go123").removeClass("go_" + (setting.ready123 - 1));
            $(".ready123 .go123").addClass("go_" + setting.ready123);
            setting.ready123++;
            setTimeout(ready_go, 1000);
        }
    }

    $(".btn").click(function(){
        $(".index").hide();
        $(".game").show();
        main();
    })

    $(".again").click(function(){
        $(".runway-body").hide();
        $(".game").show();
        $(".surplusM").html("800");
        main();
    })
    $("#help").click(function(){
        $(".runway-body").hide();
        $(".game").show();
        main();
    })

    $("#callF").click(function(){
        addUser(1);
        $(".again").hide();
    })
    function shareCallback(){
        addUser(1);
        $(".again").hide();
    }
    shareVar.success =shareCallback;
    shareFVar.success =shareCallback;
    $(".close,.ctn").click(function(){
        $(".prizelist").hide();
        setTimeout(function () {
            //window.location.reload();
            getMsg(1);
        }, 2000);
    })
})

$(function () {
    $(".invite").click(function(){
        $(".share").show();
    })
    $(".share").click(function(){
        $(this).hide();
    })
    $(".close-btn").click(function(){
        $(".brandAdv").hide();
    })

    setTimeout(function(){
        $(".brandAdv").hide();
    },5000)
})

$(window).resize(function () {
    var h = $(window).height();
    $(".index").css("min-height", h);
}).resize();
