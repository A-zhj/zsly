$(function(){
  $.ajax({
    url:"carousel.html",
    type:"get",
    success: function(html) {
      //  console.log(html)
      $(html).replaceAll("#lunbo");
      $(`<link rel="stylesheet" href="css/carousel.css">`).appendTo("head")
    }
  })
})
