(()=>{
  $(function(){
    /********************************/ 
    //当用户确认登录后，删除模态框幕布
    // function removeBackground(){
    //   $("#myModal").css("display","none")
    //   $(".modal-content").css("display","none")
    //   $('.modal-backdrop').remove();
    //   $('body').removeClass('modal-open');
    // }
    //先解绑再绑定登录请求
    $("#loginBtn").off("click").on("click",function(){
      //点击时获取用户名和密码信息
      let uname = $("#uname").val();
      let upwd = $("#upwd").val();
      //定义正则验证  7-12位字母、数字组合
      let log = /^[A-Za-z0-9]{6,12}$/
      //验证
      if(!log.test(uname)){
        alert("用户名格式不正确");
        return
      }
      if(!log.test(upwd)){
        alert("密码格式不正确");
        return
      }
      $.ajax({
        url:config.baseURL+"/user/login",
        type:"post",
        data:{"uname": uname, "upwd": upwd},
        dataType:"json",
        success:function(result){
          if(result.code===1){
            //当前页面的url
            var url=document.location.href; 
            //登录成功后，显示欢迎信息
            $(".login_uname").css("display","inline-block").html(`欢迎${uname}`)
            .next("button").html("注销")


          }else{
            console.log("登录失败");
            //用户名或密码有误，显示提示信息
            $(".vali_fail").css("display","block")
          }
        }
      })
    })
  })
})()