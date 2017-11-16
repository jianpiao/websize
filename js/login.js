//用户名
window.userName = str =>{
        let rem = /^[a-zA-Z0-9\u4e00-\u9fa5]{3,15}$/;
        return rem.test(str);
    }

//密码
window.userPassword = str =>{
        let rem = /^[a-zA-Z](?=.*\d)(?=.*[a-zA-Z]).{7,19}$/;
        return rem.test(str);
    }
    
//邮箱地址
window.userEmail = str =>{
        let rem = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return rem.test(str);
    }
    
var _name = false ,
    _password = false , 
    _email = false

$(document).ready(function(){
    //  登录 注册切换
    $('.log_header  p').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    })

    //  切换到登录
    $('.log').click(function(){
        $('.log_content > input').removeClass('input')
        $('.form-description span , .form-description br').remove()
        $('.log_content').css('display','block')
        $('.register_content').css('display','none')
    })
    //  切换到注册
    $('.register').click(function(){
        $('.register_content > input').removeClass('input')
        $('.form-description span , .form-description br').remove()
        $('.log_content').css('display','none')
        $('.register_content').css('display','block')
    })


    //输入框检测
    $('.reg_username').focusout(function(){
        $('.reg_username').val(localStorage.getItem('name'))
        reg_username()
    })
    
    $('.reg_password').focusout(function(){
        $('.reg_password').val(localStorage.getItem('password'))
        reg_password()
    })

    $('.reg_email').focusout(function(){
        $('.reg_email').val(localStorage.getItem('email'))
        reg_email()
    })
    
    $('.log_username').focusout(function(){
        log_username()
    })
    
    $('.log_password').focusout(function(){
        log_password()
    })
   



    function reg_username(){
        let this_ = $('.reg_username')
        let val = this_.val()
        if(!userName(val)){
            _name = false
           this_.addClass('input')
        }else{
            _name = true
            this_.removeClass('input')
        }
    }

    function reg_password(){
        let this_ = $('.reg_password')
        let val = this_.val()
        if(!userPassword(val)){
            _password = false
            this_.addClass('input')
        }else{
            _password = true
            this_.removeClass('input')
        }
    }

    function reg_email(){
        let this_ = $('.reg_email')
        let val = this_.val()
        if(!userEmail(val)){
            _email = false
            this_ .addClass('input')
        }else{
            _email = true
            this_ .removeClass('input')
        }
    }

    function log_username(){
        let this_ = $('.log_username')
        let val = this_.val()
        if(!userName(val)){
            _name = false
            this_.addClass('input')
        }else{
            _name = true
            this_.removeClass('input')
        }
    }

    function log_password(){
        let this_ = $('.log_password')
        let val = this_.val()
        if(!userPassword(val)){
            _password = false
            this_.addClass('input')
        }else{
            _password = true
            this_.removeClass('input')
        }
    }



    //  登陆
    $('.log_content > button').click(() =>{
        if(_name === true && _password === true){
            $.ajax({
                url: "php/login.php",
                type: "post",
                data:{
                    user_name: $('.log_username').val(),
                    user_password: $('.log_password').val()
                },
                success:function(data){
                    if(data == 1){
                        alert("成功登录了！")
                        localStorage.setItem('name', $('.log_username').val())
                        $(() => {
                            window.location.href = "http://12.10.60.211/private/index.html"
                        })
                    }else{
                        alert("登录失败，请重新登录")
                    }
                },
                error:function(e){
                    alert("服务器繁忙。")
                }
            })
            
        }else{
            log_username()
            log_password()
            $('.form-description span , .form-description br').remove()
            $('.form-description').append('<br/><br/><span style="color: red;">用户名或者密码错误，请正确输入！</span>')
        }
    })

    //  注册
    $('.register_content > button').click(() =>{
        let name = $('.reg_username').val()
        let password = $('.reg_password').val()
        let email = $('.reg_email').val()   
        localStorage.setItem("name", name )
        localStorage.setItem("password", password)
        localStorage.setItem("email", email)
        if(_name === true && _password === true && _email === true){
            $.ajax({
                url: "php/reg.php",
                type:"post",
                data:{
                    user_name: $('.reg_username').val() ,
                    user_password: $('.reg_password').val() ,
                    email: $('.reg_email').val()       
                },
                success:function(data){
                    if(data == 1){
                        alert("注册成功啦！")
                    }else if(data == 2){
                        $('.form-description span , .form-description br').remove()
                        $('.form-description').append('<br/><br/><span style="color: red;">用户名已经被注册</span>')
                    }else if(data == 3){
                        $('.form-description span , .form-description br').remove()
                        $('.form-description').append('<br/><br/><span style="color: red;">用户名已经被注册</span>')
                    }else if(data == 4){
                        $('.form-description span , .form-description br').remove()
                        $('.form-description').append('<br/><br/><span style="color: red;">邮箱已经被注册</span>')
                    }else{
                        alert("注册失败！")
                    }
                },
                error:function(error){
                    alert("服务器繁忙。"+error)
                }
            })
        
        }else{
            reg_username()
            reg_email()
            reg_password()
            $('.form-description span , .form-description br').remove()
            $('.form-description').append('<br/><br/><span style="color: red;">用户名,密码或邮箱错误，请正确输入！</span>')
        }
    })

})