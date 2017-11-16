$(document).ready(function(){
    $('body,html').animate({
        scrollTop : 0
    },400)

    //滚动球
	$(".home").mouseover(function(){
        $(".effect-ball")
           .animate({left:'95%'},10000)
           .animate({left:'10px'},10000);
		});
    });
    //返回顶部
    $(window).scroll(function(){
        $(window).scrollTop() > 150 ? $('.backToTop').show(500) : $('.backToTop').hide(200)
    });
    $('.backToTop').click(function(){
        $('body,html').animate({
            scrollTop : 0
        },400)
    })

    $('.login-user a').text(localStorage.getItem('name'))


    //1.数据定义（实际生产环境中，应有后台给出）
        var data = [
        {img:1,h1:'Creative',h2:'DRAGON'},
        {img:2,h1:'War',h2:'EXTINCT'},
        {img:3,h1:'Beast',h2:'SHOCKED'},
        {img:4,h1:'Universe',h2:'CONFUSION'},
        {img:5,h1:'Friendly',h2:'DEVIL'},
        {img:6,h1:'Brutal',h2:'RUTHLESS'},
        {img:7,h1:'Crazy',h2:'WAR'}
        ];

        // 2. 通用函数
        var g = function (id) {
            if ( id.substr(0,1) == '.') {
                return document.getElementsByClassName(id.substr(1));
            }
            return document.getElementById(id);
        }

        //3.添加幻灯片的操作（所有幻灯片&对应的按钮）
        function addSliders(){
        //3.1获取模板
        var tpl_main = g('template_main').innerHTML
                            .replace(/^\s*/,'')
                            .replace(/\s*$/,'');
        var tpl_ctrl = g('template_ctrl').innerHTML
                            .replace(/^\s*/,'')
                            .replace(/\s*$/,'');
        /*清楚空白符*/
        //3.2定义最终输出 HTML 的变量
        var out_main = [];
        var out_ctrl = [];

        //3.3遍历所有数据，构建最终输出的HTML
        for (i in data ){
            var _html_main = tpl_main
                 .replace(/{{index}}/g,data[i].img)
                 .replace(/{{h2}}/g,data[i].h1)
                 .replace(/{{h3}}/g,data[i].h2);
  
            var _html_ctrl = tpl_ctrl
                 .replace(/{{index}}/g,data[i].img);

            out_main.push(_html_main);
            out_ctrl.push(_html_ctrl);
        }

        //3.4把HTML 回写到对应的DOM 里面
        g('template_main').innerHTML = out_main.join('');
        g('template_ctrl').innerHTML = out_ctrl.join('');
        }
        //5.幻灯片切换
        function switchSlider(n){
        //5.1获得要展现的幻灯片&控制按钮 DOM
        var main = g('main_'+n);
        var ctrl = g('ctrl_'+n);

        //5.2 获得所有的幻灯片以及控制按钮

        var clear_main = g('.main-i');
        var clear_ctrl = g('.ctrl-i');

        //5.3清楚他们的 active 样式
        for(i=0;i<clear_ctrl.length;i++){
            clear_main[i].className = clear_main[i].className
                .replace('main-i_active','');
            clear_ctrl[i].className = clear_ctrl[i].className
                .replace('ctrl-i_active','');
        }
        //5.4 为当前控制按钮和幻灯片添加附加样式
        main.className += ' main-i_active';
        ctrl.className += ' ctrl-i_active';
        }
        //6.动态调整图片的 margin-top 使其垂直居中
        function movePictures(){
            var pictures = g('.picture');
            for(i=0;i<pictures.length;i++){
                pictures[i].style.marginTop = (-1 * pictures[i].clientHeight/2) + 'px'
            }
    }
         //4.定义合适处理幻灯片输出
        window.onload = function(){
            addSliders();
            switchSlider(1);
            setTimeout(function(){
                movePictures();
            },100)
        }