$(function(){
  $.ajax({
    url:"footer.html",
    type:"get",
    success: function(html) {
      $(html).replaceAll("#footer"),
      $(`<link rel="stylesheet" href="css/footer.css">`).appendTo("head")
    }
  })
})


var MyDiv =document.getElementById("body");
  window.onscroll = function() {
    scrollFunction()
  }

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementsByClassName("gotoTop")[0].style.display = "block";
  } else {
    document.getElementsByClassName("gotoTop")[0].style.display = "none";
  }
}

    /*平滑返回顶部*/
function returnTop() {
  //把内容滚动指定的像素数（第一个参数是向右滚动的像素数，第二个参数是向下滚动的像素数）
  //向上是负数，向下是正数
  window.scrollBy(0, -100);
  //延时递归调用，模拟滚动向上效果
  scrolldelay = setTimeout('returnTop()', 10);
  //获取scrollTop值，声明了DTD的标准网页取document.documentElement.scrollTop，否则取document.body.scrollTop；因为二者只有一个会生效，另一个就恒为0，所以取和值可以得到网页的真正的scrollTop值
  var sTop = document.documentElement.scrollTop + document.body.scrollTop;
  //判断当页面到达顶部，取消延时代码（否则页面滚动到顶部会无法再向下正常浏览页面）
  if (sTop == 0) clearTimeout(scrolldelay);
}