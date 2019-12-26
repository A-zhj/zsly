$(function(){
  $.ajax({
    url:config.baseURL+"food/food_details",
    type:"get",
    dataType:"json",
    success: function(result) {
      var otres = result.data;
            console.log(otres)
            for(var i=0,html="";i<otres.length;i++){
              html+= `
              `
            }
            $(".jd-list").html(html)
      
    }
  })
})