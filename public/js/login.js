(()=>{
  $(function(){
    /*
      判断，当session对象里有uname对象，说明用户已经登录，显示欢迎的字样
    */
    if(sessionStorage.getItem("uname")!==null){
      let uname = sessionStorage.getItem("uname");
      $("a.header-login").remove().append();
      $(`<span class="header-login" style="color:#333">${uname}</span>`).prependTo('.regist_login')
    }
    /********************************/ 
    //当用户确认登录后，删除模态框幕布
    // function removeBackground(){
    //   $("#myModal").css("display","none")
    //   $(".modal-content").css("display","none")
    //   $('.modal-backdrop').remove();
    //   $('body').removeClass('modal-open');
    // }
    function showMessage(message,type,time) {
      let str = ''
      switch (type) {
        case 'success':
          str = '<div class="success-message" style="width: 300px;height: 40px;text-align: center;background-color:#daf5eb;;color: rgba(59,128,58,0.7);position: fixed;left: 43%;top: 25%;line-height: 40px;border-radius: 5px;z-index: 9999">\n' +
                '    <span class="mes-text">'+message+'</span></div>'
            break;
        case 'error':
          str = '<div class="error-message" style="width: 300px;height: 40px;text-align: center;background-color: #f5f0e5;color: rgba(238,99,99,0.8);position: fixed;left: 43%;top: 30%;line-height: 40px;border-radius: 5px;;z-index: 9999">\n' +
                '    <span class="mes-text">'+message+'</span></div>'
      }
      $('body').append(str)
      setTimeout(function () {
          $('.'+type+'-message').remove()
      },time)
    }
    //先解绑再绑定登录请求
    $(".dl").off("click").on("click",function(){

      //点击时获取用户名和密码信息
      let uname = $(".uname>.w-input").val();
      let upwd = $(".upwd>.w-input").val();
      console.log(uname,upwd)
      //定义正则验证  6-12位字母、数字组合
      let log = /^[A-Za-z0-9]{6,12}$/
      //验证
      if(!log.test(uname)){
        showMessage("用户名格式不正确","error",1000);
        //获得焦点
        $(".uname>.w-input").focus()
        return
      }
      if(!log.test(upwd)){
        showMessage("密码格式不正确","error",1000);
        //获得焦点
        $(".upwd>.w-input").focus()
        return
      }
      $.ajax({
        url:config.baseURL+"user/login",
        type:"post",
        data:{"uname": uname, "upwd": upwd},
        dataType:"json",
        success:function(result){
          if(result.code===1){
            //当前页面的url
            let url=document.location.href; 
            console.log(url);
            //登录成功，用户名保存到session中
            sessionStorage.setItem("uname",uname);
            //登录成功后，显示欢迎信息
            location=url
          }else{
            showMessage("用户名格式不正确","error",1000);
          }
        }
      })
      
    })
  })
})()