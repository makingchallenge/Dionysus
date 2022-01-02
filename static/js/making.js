

$(document).ready(function(){
  
  let randomNumber = Math.floor(Math.random() * 4) + 1;
  $('#section4-img_random').children('#img').attr('src', '/static/images/wine_thumbnail_' + randomNumber + '.png');


  let img_random = ['.section4-img']
  for (let i = 0; i < img_random.length; i++) {
      let image = img_random[i]['src']
      let url = img_random[i]['a href']
      let comment = img_random[i]['alt']

  /*let temp_html = `
    <a href="${url}" target="_blank">
        <img alt="${comment}" 
    src="${image}"/></a>`*/

    /*이렇게도해보고 저렇게도 해보고했는데 안돼네요..뭐가문제일까요...*/
    let temp_html = ` <div>

    <a class="section4-img_ramdon" href="https://www.youtube.com/watch?v=GEFcRflo0c4" target="_blank">
        <img alt="간단하면서 예쁜, 5분 완성 와인안주 추천 BEST 5 (요리 못해도 따라하기 쉬워요!!!)" 
    src="/static/images/wine_thumbnail_01.png"/>
    </a>
    <a class="section4-img_ramdon" href="https://www.youtube.com/watch?v=dQnjf9ouGgk" target="_blank">
        <img alt="제가 갖고 있는 와인 중에 제일 저렴한(?) 와인으로 뱅쇼 끓여봤습니다...?" 
    src="/static/images/wine_thumbnail_04.png"/>
    </a>
   
</div> 
<div>

    <a class="section4-img_ramdon" href="https://www.youtube.com/watch?v=8u08MgeKPg0" target="_blank">
        <img alt="소소한 홈파티에 필요한 와인... 그리고 안주 분위기 내기 좋은 와인과 어울리는 와인안주 10가지" 
    src="/static/images/wine_thumbnail_03.png"/>
    </a>
    <a class="section4-img_ramdon" href="https://www.youtube.com/watch?v=fPGo1oiMaIY" target="_blank">
        <img alt="코스트코 음식과 추천와인으로 크리스마스 홈파티🥂크리스마스음식/연말음식 costco" 
    src="/static/images/wine_thumbnail_02.png"/>
    </a>
    
</div> 
<div>

    <a class="section4-img_random" href="https://www.youtube.com/watch?v=XdTFLPQoDN8" target="_blank">
        <img alt="[쉐프의 레시피] 집에서 간단하게 만드는 와인바 음식" 
    src="/static/images/wine_thumbnail_05.png"/>
    </a>
    
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=5l7evxFTCBc" target="_blank">
        <img alt="안보면 후회하는 초간단요리 4가지 팁 와인안주" 
    src="/static/images/wine_thumbnail_06.png"/>
    </a>
</div> 
<div>
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=IDACE3ozqYw" target="_blank">
        <img alt="일반인 99%가 모르는 와인 마실 때 유용한 와인 꿀팁 7가지" 
    src="/static/images/wine_thumbnail_07.png"/>
    </a>
    
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=G24sSpk9fe8" target="_blank">
        <img alt="[와인팁] TOP 보르도와인은 대체 얼마나 숙성시켜야 할까요?" 
    src="/static/images/wine_thumbnail_08.png"/>
    </a>
   
</div> 
<div>
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=47Y4jVLqw3s" target="_blank">
        <img alt="와인에 따라 와인잔도 달라져야 한다? 와인 맛을 결정하는 와인잔 종류의 모든 것!" 
    src="/static/images/wine_thumbnail_09.png"/>
    </a>
    
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=cAPZ_JdS0eI" target="_blank">
        <img alt="[와인상식 #15] 와인 마신 후 머리가 아프다면? 5가지 팁을 알려드려요" 
    src="/static/images/wine_thumbnail_10.png"/>
    </a>
   
</div>
<div>
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=Yq-W-W3dwek" target="_blank">
        <img alt="절대 피해야 할 와인 보관법 5가지 (+ 와인냉장고 없을 때 가장 좋은 와인 보관 방법)" 
    src="/static/images/wine_thumbnail_11.png"/>
    </a>
    
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=OPjP8Vot1Uo" target="_blank">
        <img alt="와인잔의 종류와 디캔터 그리고 디캔팅하는 법과 팁까지 알려드립니다." 
    src="/static/images/wine_thumbnail_12.png"/>
    </a>
    
</div>
<div>

    <a class="section4-img_random" href="https://www.youtube.com/watch?v=5qTXSZkGZ9w" target="_blank">
        <img alt="와인따는법 절대 실패없는 코르크 오픈 꿀팁방출! [와인디렉터 양갱]" 
    src="/static/images/wine_thumbnail_13.png"/>
    </a>
    
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=WC6De3y53ew" target="_blank">
        <img alt="와인용어, 와인 전용 표현, 소믈리에가 쓰는 와인어휘" 
    src="/static/images/wine_thumbnail_14.png"/>
    </a>
</div>
<div>

    <a class="section4-img_random" href="https://www.youtube.com/watch?v=bI5YKFUoYoc" target="_blank">
        <img alt="와인따개없이 와인따는법 3가지(현실 버전" 
    src="/static/images/wine_thumbnail_15.png"/>
    </a>
    
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=OPjP8Vot1Uo" target="_blank">
        <img alt="[와인팁] 샴페인은 왜 다른 스파클링와인하고 다를까?" 
    src="/static/images/wine_thumbnail_16.png"/>
    </a>
</div>
<div>

    <a class="section4-img_random" href="https://www.youtube.com/watch?v=gv-h5dRW_pc" target="_blank">
        <img alt="요리할 때 와인을 넣고 끓이는 이유ㅣ쿠킹팁ㅣ권오진 셰프" 
    src="/static/images/wine_thumbnail_17.png"/>
    </a>
   
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=QJhWHE7wbj8" target="_blank">
        <img alt="와인 초보도 와인 좀 아네?라고 듣는, 와인 매너 BEST 7 (와인 마시는 법, 와인 따르는 법 등)" 
    src="/static/images/wine_thumbnail_18.png"/>
    </a>
</div>
<div>
    <a class="section4-img_random" href="https://www.youtube.com/watch?v=lE_xeld-BGk" target="_blank">
        <img alt="와인을 살때 절대 하지말아야할 10가지 꿀팁" 
    src="/static/images/wine_thumbnail_19.png"/>
    </a>

    <a class="section4-img_random" href="https://www.youtube.com/watch?v=BsI4xXb3bKU" target="_blank">
        <img alt="[와인 TIP] 스파클링 와인, 샴페인 오픈 방법!!!" 
    src="/static/images/wine_thumbnail_20.png"/>
    </a>
    */
   /* 
</div>`



  $('#section4-img_random').extend(temp_html)  

}
}
);






/* 심호선
$(document).ready(function(){
    $('.carousel').slick({
    slidesToShow: 4,
    dots:true,
    centerMode: true,
    });
  });
 */

  