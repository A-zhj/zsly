(()=>{
  $(function(){
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
  //先保存用户需要的数值
  let uname = $(".reg_item_username>input");
  let upwd = $(".reg_item_upwd>input");
  let dpwd = $(".reg_item_dpwd>input");
  let phone = $(".reg_item_phone>input");
  let email = $(".reg_item_email>input");
  /*用户名密码的正则*/ 
  let unameReg = /^[A-Za-z0-9]{6,12}$/;
  /*手机的正则 新增了166、198、199号段的手机号，所以正则表达式也要作相应改进*/ 
  let phoneReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
  /*邮件的正则*/
  let emailReg = /^\w+(\.\w+)*@\w+(\.\w+)+$/; 

  /*前台验证用户输入的内容,当有验证错误的情况，停止*/
    //(1)用户名
    uname.on("blur",()=>{
      if(unameReg.test(uname.val())){
        uname.next().removeClass().addClass("vali_success")
      }else{
        uname.next().removeClass().addClass("vali_fail");
        return;
      }
    }) 
    //(2)密码
    upwd.on("blur",()=>{
      if(unameReg.test(upwd.val())){
        upwd.next().removeClass().addClass("vali_success")
      }else{
        upwd.next().removeClass().addClass("vali_fail");
        return;
      }
    }) 
    //(3)重复密码
    dpwd.on("blur",()=>{
      if(unameReg.test(dpwd.val())&&dpwd.val()==upwd.val()){
        dpwd.next().removeClass().addClass("vali_success")
      }else{
        dpwd.next().removeClass().addClass("vali_fail");
        return;
      }
    })
    //(4)手机号格式
    phone.on("blur",()=>{
      if(phoneReg.test(phone.val())){
        phone.next().removeClass().addClass("vali_success")
      }else{
        phone.next().removeClass().addClass("vali_fail");
        return;
      }
    })
    //(5)邮件格式
    email.on("blur",()=>{
      if(emailReg.test(email.val())){
        email.next().removeClass().addClass("vali_success")
      }else{
        email.next().removeClass().addClass("vali_fail");
        return;
      }
    })
    $("#regBtn").off("click").on("click",()=>{
      $.ajax({
        url:config.baseURL+"/user/reg",
        type:"post",
        data:{ "uname":uname.val(),"upwd":upwd.val(),"phone":phone.val(),"email":email.val()},
        dataType:"json",
        success:(result)=>{
          if(result.code==1){
            showMessage(result.msg,"success",2000)
            setTimeout(() => {
              //跳转登录界面
              window.location.href="public/login.html"
            }, 3000);
          }else{
            showMessage(result.msg,"error",2000)
          }
        }
      })
    })
  })
})()