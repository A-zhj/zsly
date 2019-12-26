var i=0; //现在正在显示第几张图片，从0开始
var LGWIDTH=500;//每个大li的固定宽度
var SMWIDTH=90;//每个小li的固定宽度
var DURATION=500;//每次轮播动画持续的时间
// 大轮播的ul
var ulImgs=document.getElementById("ul-imgs");
// 小轮播的ul
var ulIdex=document.getElementById("ul-idex");
// 小轮播图片列表
var lis=ulIdex.children;
// 当前li的总个数
var LICOUNT=lis.length;

// 从当前位置移动到范围内任意一个位置
function moveTo(to){
    //如果用户没有传入要调到第几张图片时，默认跳到下一张
    if(to==undefined){
        to=i+1;   
    }
    // 如果从头开始,再重新加上transition
    if(i==0){  
        if(to>i){//如果要看到当前位置右边图片,正常进行
            ulIdex.className="transition";
            // ulIdex.style.marginLeft=-(LICOUNT-1)*SMWIDTH+"PX";
        }else{//只有i=0在开头，且还要看到左边的图片时，会报错
        ulIdex.className="";
        // ulIdex.style.marginLeft=-(LICOUNT-1)*SMWIDTH+"PX";
        ulImgs.style.marginLeft=-(LICOUNT-1)*LGWIDTH+"px";
        setTimeout(function(){
            moveTo(LICOUNT-1);
        },100);
        return;
        }
    }
    i=to;//将表示第几张图片的变量i变为目标位置
    ulImgs.style.marginLeft=-i*LGWIDTH+"px";
    for(var li of lis){
        li.className="";
    }
    // if(i%5==0){
    //     ulIdex.style.marginLeft=-i*SMWIDTH+"px";
    // }
    if(i==LICOUNT){
        i=0;
        setTimeout(function(){
        ulIdex.className="";//清掉transition属性
        ulIdex.style.marginLeft=0;//将ulIdex拉回0位置
        },DURATION)
    }
    lis[i].className="active";
}   
       

//左右箭头
var prev=document.getElementById("prev");
var next=document.getElementById("next");
var smprev=document.getElementById("smprev");
var smnext=document.getElementById("smnext");
var canClick=true;
next.onclick=function(){
    move(1);
}
    smnext.onclick=function(){
    move(1);
}
function move(n){
    if(canClick){
        moveTo(i+n);
        canClick=false;
        setTimeout(function(){
            canClick=true;
        },DURATION+100);
    }
}
prev.onclick=function(){
    move(-1);
}
smprev.onclick=function(){  
        move(-1);
}
   
// 每隔三秒自动播放
var timer=setInterval(function(){
    moveTo();
},3000);
var banner=document.getElementById("banner");
// 鼠标移入时停止
var clear=function(){
    clearInterval(timer);
}
banner.onmouseover=clear;
smprev.onmouseover=clear;
smnext.onmouseover=clear;
ulIdex.onmouseover=clear;
// 鼠标移出时继续
var play=function(){
    timer=setInterval(function(){
        moveTo()
    },3000); 
}
banner.onmouseout=play;
smprev.onmouseout=play;
smnext.onmouseout=play;
ulIdex.onmouseout=play;
//点击小图片
for(var a=0;a<LICOUNT;a++){
    var item=lis[a];
    item.onclick=function(e){
        e.preventDefault();
        if(canClick){
            var li=this;
            if(li.nodeName=="LI")
                if(li.className!=="active"){
                    for(var i=0;i<LICOUNT;i++){
                        if(lis[i]==li){
                            break;
                        }
                    }
                    moveTo(i);
                    setTimeout(function(){
                        canClick=true;
                    },DURATION)
                }
        }
    }
}

