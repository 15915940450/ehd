var kc6931=document.createElement('section');
kc6931.className='kc6931_wrap';
kc6931.innerHTML=`<div class="kc6931"><div id="tmp">
  <div class="wrap">
  <div id="mmm_mmm" class="ec"></div>
  </div>
  <table>
  <thead>
  <tr>
  <th colspan="2">MARK SIX<!-- 星期 --></th>
  <!-- <th>期</th> -->
  <th>特碼</th>
  <th>生肖</th>
  <th>五行</th>
  </tr>
  </thead>
  <tbody>
  <!-- <tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  </tr> -->
  </tbody>
  </table>
  </div></div>
  <style>
  *{
    margin: 0;
    padding: 0;
    font-family: "Times New Roman", '新細明體', serif;
    font-size: 14px;
  }
  #tmp table{
    width: 100%;
    border-collapse: collapse;
  }
  #tmp table td,#tmp table th{
    padding: 12px 5px;
    text-align: left;
    vertical-align: middle;
    color:#919191;
    border-bottom: 1px solid #E9E9E9;
  }
  #tmp table th{
    color:#666;
    border-bottom: 2px solid #E9E9E9;
    font-size:11px;
  }
  #tmp table td:nth-child(3){
    font-weight: 900;
    font-size: 15px;
    color: #222;
    font-family: arial;
    text-decoration: underline;
  }
  #tmp table tr:hover td{
    background-color: #F9F9F9;
  }
  .wrap{
    /*width:100%;
    height:200px;
    background:#f5f5f5;
    padding-top: 10px;*/
    padding-top: 10px;
  }
  .ec{
    width:calc(100% - 30px);
    height:200px;
  }
  .kc6931_wrap{
    position:fixed;
    left:0;
    bottom:220px;
    width:100%;
    height:660px;
    z-index:666666;
  }
  .kc6931{
    width:100%;
    min-width:700px;
    height:660px;
    background:#FEFEFE;
    box-shadow:0 0 4px 4px rgba(0,0,0,.1);
    overflow:auto;
  }
  </style>`;
document.body.appendChild(kc6931);

Array.prototype.howManyNums=function(num){
  this.sort();
  if(this.indexOf(num)===-1){
    return 0;
  }else{
    return this.lastIndexOf(num)-this.indexOf(num)+1;
  }
};
function minA(url,callback,err){
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
    if(xmlhttp.readyState===4 && xmlhttp.status===200){
      callback(xmlhttp.responseText);
    }else if(xmlhttp.readyState===4 && xmlhttp.status!=200 && err){
      err();
    }
  };
  xmlhttp.open('GET',url,true);
  xmlhttp.send();
}
//==echarts:es
function es(h,g,f,d){var c=document.getElementById(h);var b=echarts.init(c);var a={legend:{data:g},tooltip:{trigger:"axis",},grid:{top:"60",left:"60",right:"60",bottom:30},toolbox:{show:false,orient:"vertical",x:"right",y:"center",feature:{mark:{show:true},dataView:{show:true,readOnly:false},magicType:{show:true,type:["line","bar","stack","tiled"]},restore:{show:true},saveAsImage:{show:true}}},calculable:true,xAxis:[{type:"category",boundaryGap:false,axisLine : {show:false }, axisTick:{ length:2, interval:0 }, axisLabel :{ rotate:-15, margin:12},data:f}],yAxis:[{type:'value',axisLabel:{formatter:'{value}次'},splitLine:{ lineStyle:{ color:['#EEE'] } }, axisLine : {show:false }}],series:d,dataZoom:[{type:"slider",show:false,xAxisIndex:[0],start:0,end:100}]};b.setOption(a)};

var eleTmp=document.getElementById('tmp');
var eleTbody=document.querySelector('#tmp table tbody');
minA('http://m.1396ck.com/stat/5?client_lang=zh-tw&year='+new Date().getFullYear(),function(data){
  if(data){
    var objData=JSON.parse(data);
    var arrData=objData.items;
    var arrTr=[];
    var arrTd=[];
    var arrWeek=['日','一','二','三','四','五','六'];
    var arrTe=[];
    for(var i=0;i<arrData.length;i++){
      var arrYMD=arrData[i].period.split(/[\u4e00-\u9fa5]/ig);  //匹配中文[\u4e00-\u9fa5]
      // var numY=Number(arrData[i].period.substring(0,4));
      // var numM=Number(arrData[i].period.substring(5,7))-1;
      // var numD=Number(arrData[i].period.substring(8,10));
      var datePeriod=new Date(Number(arrYMD[0]),(Number(arrYMD[1])-1),Number(arrYMD[2]));  //var birthday = new Date(1995, 11, 17);
      // alert(datePeriod);
      arrTd[0]='<td>星期'+arrWeek[datePeriod.getDay()]+'</td>';
      arrTd[1]='<td>'+arrData[i].period+'</td>';
      arrTd[2]='<td>'+arrData[i].numbers.slice(-2)+'</td>';
      arrTd[3]='<td>'+arrData[i].sx.slice(-1)+'</td>';
      arrTd[4]='<td>'+arrData[i].wx.slice(-1)+'</td>';
      var strTr='<tr>'+arrTd.join('')+'</tr>';
      arrTr.push(strTr);
      arrTe.push(Number(arrData[i].numbers.slice(-2)));
    }

    var arrLegend=["特"];
    var arrX=[];
    var arrYseries=[];
    var arrY=[];
    for(var l=0;l<arrLegend.length;l++){
      arrY.push([]);
    }
    for(var i=1;i<=49;i++){
      arrX.push(i);
      arrY[0].push(arrTe.howManyNums(i));
    }
    for(var j=0;j<arrLegend.length;j++){
      var tmp={
        name:arrLegend[j],
        type:'bar',
        data:arrY[j]
      };
      arrYseries.push(tmp);
    }
    es('mmm_mmm',arrLegend,arrX,arrYseries);
    eleTbody.innerHTML=arrTr.join('');
  }else{
    eleTmp.innerHTML="無數據";
  }
},function(){
  alert('ajax fail');
});
