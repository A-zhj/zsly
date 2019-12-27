(()=>{
  $(function(){ 
    //发送axios请求时，默认携带session对象
    //axios.defaults.withCredentials=true;
    //第一个参数是提示框的内容，第二个参数是这里是success，代表成功的提示框，这里只只是success或者error，success提示框为淡绿色，error为淡红色，第三个参数是提示框消失时间，这里1000表示1000ms，也就是一秒，传入这三个参数就可以完成提示框的调用啦，如需要更多类型提示框，可以在case里继续添加，希望你们能喜欢，有可以优化的地方也可以提出宝贵的意见
    function showMessage(message,type,time) {
      let str = ''
      switch (type) {
        case 'success':
          str = '<div class="success-message" style="width: 300px;height: 40px;text-align: center;background-color:#daf5eb;;color: rgba(59,128,58,0.7);position: fixed;left: 43%;top: 10%;line-height: 40px;border-radius: 5px;z-index: 9999">\n' +
                '    <span class="mes-text">'+message+'</span></div>'
            break;
        case 'error':
          str = '<div class="error-message" style="width: 300px;height: 40px;text-align: center;background-color: #f5f0e5;color: rgba(238,99,99,0.8);position: fixed;left: 43%;top: 10%;line-height: 40px;border-radius: 5px;;z-index: 9999">\n' +
                '    <span class="mes-text">'+message+'</span></div>'
      }
      $('body').append(str)
      setTimeout(function () {
          $('.'+type+'-message').remove()
      },time)
    }
    /*服务器发送回来的是一个对象，里面有text:验证码文本，data:验证码对象。预先设置一个空的img对象，发送请求，接收响应，为这个img对象的src添加data对象-即svg图形。Text文本可以放在session对象里，发送请求时，前台验证验证码是否跟session对象里的一致*/
    //多次使用，封装函数
    function Yzm(){
      $.ajax({
        url:config.baseURL+"user/captcha",
        type:"get",
        dataType:"json",
        success:(result)=>{
          console.log(1)
          console.log(result)
          var imgYzm = document.getElementById('imgYzm');
          imgYzm.innerHTML = result.data
          sessionStorage.setItem("imgYzm",result.text.toLowerCase());
          //showMessage(result.msg,"error",2000)
        }
      })
    }
    /*首次加载，接收验证码，描绘*/
    Yzm()
    //先保存用户需要的数值
    let $uname = $(".uname>input");
    let $upwd = $(".upwd>input");
    let $dpwd = $(".ag-upwd>input");
    let $phone = $(".phone>input");
    let $email = $(".email>input");
    let $captcha = $(".captcha>input");
    //console.log(uname,upwd,dpwd,phone,email)
    /*用户名密码的正则*/ 
    let unameReg = /^[A-Za-z0-9]{6,12}$/;
    /*手机的正则 新增了166、198、199号段的手机号，所以正则表达式也要作相应改进*/ 
    let phoneReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    /*邮件的正则*/
    let emailReg = /^\w+(\.\w+)*@\w+(\.\w+)+$/; 
  
  
    /*前台验证用户输入的内容,当有验证错误的情况，提示*/
    //(1)用户名
    $uname.on("blur",()=>{
      if(unameReg.test($uname.val())){
        $uname.next().removeClass().addClass("vali_success")
      }else{
        $uname.next().removeClass().addClass("vali_fail");
        return;
      }
    }) 
    //(2)密码
    $upwd.on("blur",()=>{
      if(unameReg.test($upwd.val())){
        $upwd.next().removeClass().addClass("vali_success")
      }else{
        $upwd.next().removeClass().addClass("vali_fail");
        return;
      }
    }) 
    //(3)重复密码
    $dpwd.on("blur",()=>{
      if(unameReg.test($dpwd.val())&&$dpwd.val()==$upwd.val()){
        $dpwd.next().removeClass().addClass("vali_success")
      }else{
        $dpwd.next().removeClass().addClass("vali_fail");
        return;
      }
    })
    //(4)手机号格式
    $phone.on("blur",()=>{
      if(phoneReg.test($phone.val())){
        $phone.next().removeClass().addClass("vali_success")
      }else{
        $phone.next().removeClass().addClass("vali_fail");
        return;
      }
    })
    //(5)邮件格式
    $email.on("blur",()=>{
      if(emailReg.test($email.val())){
        $email.next().removeClass().addClass("vali_success")
      }else{
        $email.next().removeClass().addClass("vali_fail");
        return;
      }
    })
    //(6)验证码格式
    // $captcha.on("blur",()=>{
    //   if(!$captcha.val()){
    //     $("#editCaptcha").next().removeClass().addClass("vali_fail");
    //     return
    //   }else{
    //     $("#editCaptcha").next().removeClass().addClass("vali_success")
    //   }
    // })
    //点击验证码图片时，切换验证码图片
    $("#editCaptcha").off("click").on("click",()=>{
      Yzm()
    })

    $(".reg-btn").off("click").on("click",()=>{
      /*点击发送数据前，先检查数据的格式是否正确*/
      if(unameReg.test($uname.val())){
        $uname.next().removeClass().addClass("vali_success")
      }else{
        $uname.next().removeClass().addClass("vali_fail");
        return;
      }
      if(unameReg.test($upwd.val())){
        $upwd.next().removeClass().addClass("vali_success")
      }else{
        $upwd.next().removeClass().addClass("vali_fail");
        return;
      }
      if(unameReg.test($dpwd.val())&&$dpwd.val()==$upwd.val()){
        $dpwd.next().removeClass().addClass("vali_success")
      }else{
        $dpwd.next().removeClass().addClass("vali_fail");
        return;
      }
      if(phoneReg.test($phone.val())){
        $phone.next().removeClass().addClass("vali_success")
      }else{
        $phone.next().removeClass().addClass("vali_fail");
        return;
      }
      if(emailReg.test($email.val())){
        $email.next().removeClass().addClass("vali_success")
      }else{
        $email.next().removeClass().addClass("vali_fail");
        return;
      }
      /*验证码前台验证,当发送的验证码(忽略大小写)与session中存储的验证码内容不一致，提示，终止发送*/
      if(!($captcha.val().toLowerCase()==sessionStorage.getItem("imgYzm"))){
        showMessage('验证码错误','error',2000);
        return
      }
      let url=config.baseURL+"user/reg";
      let obj =  {"uname":$uname.val(),"upwd":$upwd.val(),"phone":$phone.val(),"email":$email.val()}     
      $.ajax({
        url,
        type:"post",
        data:obj,
        dataType:"json",
        success:(result)=>{
          if(result.code==1){
            showMessage(result.msg,"success",2000)
            setTimeout(() => {
              //跳转登录界面
              window.location.href="http://127.0.0.1:5504/zsly/public/index.html"
            }, 3000);
          }else{
            showMessage(result.msg,"error",2000)
          }
        }
      })
    })
    
  })
})()