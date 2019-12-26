$(function(){
  $.ajax({
    url:config.baseURL+"scenery/scenery_details",
    type:"get",
    dataType:"json",
    success:function(result) {
            var otres = result.data;
            console.log(otres)
            for(var i=0,html="";i<otres.length;i++){
              html+= `
              <div class="row jd-list-mod">
              <div class="col-3 leftimg">
              <a href=""><img src="${config.baseURL}${otres[i].jpic}"></a>
            </div>
            <div class="col-9 rightsub">
              <dl>
                <dt>
                  <img src="img/details_img/ta.png" alt="">
                  <a href="">${otres[i].jtitle}</a>
                </dt>
                <dd>
                  ${otres[i].jdetails}
                </dd>
                <dd>
                    <div>推荐指数: <div class="sprites"></div></div>
                </dd>
                <dd>
                    ${otres[i].jlevel} &emsp; | &emsp; 价格:  <span><b>¥</b>${otres[i].jprice.toFixed(2)}</span>
                </dd>
                <a href="details.html"">查看详情</a>
              </dl>
            </div>
          </div>`
            }
            $(".jd-list").html(html)
    }
  })
})