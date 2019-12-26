  // 日期选项卡
//DOM4bu 
//查找触发事件元素
var timas = document.querySelectorAll(".tima>button");
//console.log(timas)
for(var i=1;i<timas.length;i++){
  //console.log(timas[i]);
  var a = 0;
    timas[i].addEventListener('click',function(e){
    a++;
    if(e.target.nodeName=="BUTTON"){
    if(a>=1){
      a=0;
      for(var j=1;j<timas.length;j++){
        timas[j].style.background='';
        for(var h=1;h<timas.length;h++){
        timas[h].style.color = "#000"
        e.target.style.color = "#fff"
        }
      }
 
      e.target.style.background = "#48B9C1"
    }else {
      e.target.style.background = "#48B9C1"
    }
    }
    //旅票总额
    var price = document.querySelector(".head>.tima>button>.pri");
    var h1 = document.querySelector(".head>h1");
    var title =h1.innerHTML.split('+')[0];
    var total = parseFloat(
    price.innerHTML.slice(1)
    )
    var totaldetails = document.querySelector(".price :nth-child(2)>.spandetails");
    var totaltitle = document.querySelector(".price :nth-child(2)>span");
    var totap = document.querySelector(".hader :nth-child(4) :nth-child(1)>p");
    var valuespan = document.querySelector(".shopp>span");
    var crspan = document.querySelector(".price :nth-child(3)>.crspan");
    var tota = document.querySelector(".price>.backgr>.total");
    // console.log(totap)
    
    //将结果追加到页面
    totaldetails.innerHTML = `¥${total.toFixed(2)}`;
    totaltitle.innerHTML = `${title}+往返票`
    totap.innerHTML = `¥${total.toFixed(2)}/人`;
    valuespan.innerHTML = 1;
    crspan.innerHTML = `¥${total.toFixed(2)}`
    tota.innerHTML=`¥${total.toFixed(2)}`;
  })
}


//旅票添加
  var table=document.querySelector(".shopp");
  //console.log(table)
  table.onclick=function(e){
  var valuespan = document.querySelector(".shopp>span");
  // console.log(valuespan)
  if(valuespan.innerHTML=="0"){
    alert("请选择出现的日期");
    return;
  }
  //只有单击到span是才会触发
  if(e.target.nodeName=="BUTTON"){
    var span=e.target.parentNode.children[1]
    var n=parseInt(valuespan.innerHTML);
    if(e.target.innerHTML=="+"){
      if(n>=9){
          n=9;
          alert("最多同时添加9个旅客")
          return;
        }
      n++;
      // console.log(n)
    }else if(n>1){
      n--;
    }else if(n=1){
      alert("至少添加一个旅客")
    }
    span.innerHTML=n;
  }
//旅票总额
var price = document.querySelector(".hader :nth-child(4) :nth-child(1)>p");
  //console.log(price)
  //转为浮点数
var total = parseFloat(
  price.innerHTML.slice(1)
)

var tota = document.querySelector(".price>.backgr>.total");
var totaspan = document.querySelector(".bodys :nth-child(1)>span");

//将结果追加到页面
var sutotal = total*n;
tota.innerHTML=`¥${sutotal.toFixed(2)}`;
totaspan.innerHTML = `${n}个`;

// 旅客信息
// var bodys = document.querySelectorAll(".bodys");
//console.log(bodys);
//先让后面两个表格隐藏
//查找<span>1个</span>
var tablespan = document.querySelector(".bodys :nth-child(1)>span");
//console.log(tablespan);
var urtablespan = parseInt(tablespan.innerHTML)
//console.log(urtablespan);
// if(urtablespan==1){
//   bodys[1].style.display = "none";
//   bodys[2].style.display = "none";
// }else if(urtablespan==2){
//   bodys[1].style.display = "block";
//   bodys[2].style.display = "none";
// }else {
//   bodys[1].style.display = "block";
//   bodys[2].style.display = "block";
// }
// var strInput = document.querySelector(".bodys")
// console.log(strInput)
for(var i=1,html="";i<=urtablespan;i++){
  html+=`
 <div class="bodys">
 <div class="sd">
   <h3>出行人信息</h3>
   需填写<span>1个</span>出行人
 </div>
 <div>
   <p>出行人1</p>
 </div>
 <div>
   <p>中文姓名：</p><input class="input1" type="text" name="uname" placeholder="必须与身份证上姓名一致"><span class="vali_info spen1">请填写正确的中文姓名</span>
   
 </div>
 <div>
   <p>个人电话：</p><input class="input2" type="text" name="phone" placeholder="请输入电话号码"><span class="vali_info spen2">请填写正确的电话号码</span>
 </div>
 <div>
   <p>身份证号：</p><input class="input3" type="text" name="idcard" placeholder="请输入身份证"><span class="vali_info spen3">请填写正确的身份证号</span>
 </div>
</div>
`
$("#strInput").html(html);
}


//旅客信息验证
var names = document.querySelectorAll(".bodys input");

for(var i=0;i<names.length;i++){
  //获取焦点
  names[i].onfocus = function(){
    var span=this.nextElementSibling 
    span.style.visibility = "visible";
  };
  //失去焦点
  names[i].onblur = function(){
    var span=this.nextElementSibling 
    span.style.visibility = "hidden";
  };
}
//表单验证--中文名验证
var uname = document.getElementsByName("uname");
//console.log(uname)
var spans = document.querySelectorAll(".span1,.span2,.span3");
for(var i=0;i<uname.length;i++){
  uname[i].onblur = function(){
    var n = this.value;
    console.log(n);
    var use_name = /^[\u4E00-\u9FA5]{2,6}$/;
    if(n==""){
        this.nextElementSibling.innerHTML = "用户名不能为空";
        this.nextElementSibling.style.color = "red"
        this.nextElementSibling.style.fontSize = "16px"
      //this.nextElementSibling.innerHTML = "";
      return;
    }else if(use_name.test(n)){
      
        this.nextElementSibling.innerHTML = "√";
        this.nextElementSibling.style.color = "green"
        this.nextElementSibling.style.fontSize = "36px"

    }else {
    
        this.nextElementSibling.innerHTML = "×";
        this.nextElementSibling.style.color = "red"
        this.nextElementSibling.style.fontSize = "36px"

    }
  }
}

//表单验证--电话验证
var phones = document.getElementsByName("phone");
//console.log(phones)
for(var i=0;i<phones.length;i++){
  phones[i].onblur = function(){
    var n = this.value;
    //console.log(n);
    var use_phone = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
    if(n==""){
        this.nextElementSibling.innerHTML = "用户名不能为空";
        this.nextElementSibling.style.color = "red"
        this.nextElementSibling.style.fontSize = "16px"
      //this.nextElementSibling.innerHTML = " ";
      return;
    }else if(use_phone.test(n)){
      
        this.nextElementSibling.innerHTML = "√";
        this.nextElementSibling.style.color = "green"
        this.nextElementSibling.style.fontSize = "36px"
  
    }else {
     
        this.nextElementSibling.innerHTML = "×";
        this.nextElementSibling.style.color = "red"
        this.nextElementSibling.style.fontSize = "36px"
  
    }
  }
}

//
//表单验证--电话验证
var idcards = document.getElementsByName("idcard");
// console.log(idcards)
for(var i=0;i<phones.length;i++){
  idcards[i].onblur = function(){
    var n = this.value;
    //console.log(n);
    var use_idcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(n==""){
        this.nextElementSibling.innerHTML = "用户名不能为空";
        this.nextElementSibling.style.color = "red"
        this.nextElementSibling.style.fontSize = "16px"
      return;
    }else if(use_idcard.test(n)){
      
        this.nextElementSibling.innerHTML = "√";
        this.nextElementSibling.style.color = "green"
        this.nextElementSibling.style.fontSize = "36px"
 
    }else {
     
        this.nextElementSibling.innerHTML = "×";
        this.nextElementSibling.style.color = "red"
        this.nextElementSibling.style.fontSize = "36px"
  
    }
  }
}
}

var triangle = document.querySelector(".hader>div>.p1>a>img")
//console.log(triangle)
triangle.onclick = function(e){
  e.preventDefault();//取消默认行为
  alert("1、最早可订明日票最晚需在出行前1天16:30前购买。2、需同时满足如下条件的游客方可预订：年龄：18周岁（不含）以上身高：1.5米（不含）以上。3、选择的使用日期当天有效，过期概作废")
}

var button = document.querySelector(".zf")
console.log(button)
button.onclick = function(){
  alert("请稍等....")
  window.location.href="http://wwww.baidu.com"
}