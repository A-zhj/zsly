// 获取父元素
var col=document.querySelector(".video");
// 获取视频元素
var v3=document.getElementById("v3");
// 获取按钮
var ctrl=document.getElementById("ctrl");
// 获取按钮中的图片
var img=document.querySelector("#ctrl img")

col.onmouseenter=function(){
  ctrl.style.display="block";
}
col.onmouseleave=function(){
  ctrl.style.display="none";
}
ctrl.onclick=function(event){
  event.preventDefault();
  if (v3.paused) {
    v3.play();
    img.src="img/index_image/pause.png"
  } else {
    v3.pause();
    img.src="img/index_image/play.png"
  } 
}
document.onkeyup=function(e){
  if (e.keyCode==32||e.keyCode==13) {
    if (v3.paused) {
      v3.play();
      img.src="img/index_image/pause.png"
    } else {
      v3.pause();
      img.src="img/index_image/play.png"
    }
  }
}
// 广告
var ad=document.getElementById("ad")
v3.onplay=function(){
  ad.style.display="none"
}
v3.onpause=function(){
  ad.style.display="block"
}