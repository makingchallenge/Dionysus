<<<<<<< HEAD
    //section03 reset the check box
=======



//section02 slide

var swiper = new Swiper('.section02_mbbox', {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    //spaceBetween: 20,
    autoplay: true,
    autoplaySpeed : 2000,   
    pagination: {
      el: '.swiper-pagination ',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + '</span>';
      },
    },
    /*navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },*/
    breakpoints: {
        480: { //480 이상일 경우
            slidesPerView: 2,
          },
        767: { //767 이상일 경우
          slidesPerView: 4,
        },}
  });





// right nav slide 
var swiper2 = new Swiper('.r_nav_content', {
    
    slidesPerView: 4,
    loop: true,
    autoplay: true, 
    centeredSlides: true,  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        767: { //767 이상일 경우
          slidesPerView: 3,
          direction: 'vertical',
        },}
  });



  var swiper3 = new Swiper('.section04_content', {
    slidesPerView: 2,
    centeredSlides: true,
    loop: true,
    //spaceBetween: 20,
    autoplay: true,
    autoplaySpeed : 2000,   
    pagination: {
      el: '.swiper-pagination02',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + '</span>';
      },
    },
    /*navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },*/
    breakpoints: {
        480: { //480 이상일 경우
            slidesPerView: 2,
          },
        767: { //767 이상일 경우
          slidesPerView: 4,
        },}
  });



//section03 reset the check box
>>>>>>> cdac544c56c9295bbb343b65f5851600f4d1598b
function clear_checkbox() {
    var obj = document.getElementsByClassName('set03_checkbox');

    for (var i = 0; i < obj.length; i++) {
        obj[i].checked = false;
    }


    //리스트 리셋 + 리스트 숨기기


    //리스트 상단 태그 리셋




}






    //section03 tab icon button
function open_Set03_tab(evt, tabName) {
    var i, icon_tab_ct, set03_linik;
    
    icon_tab_ct = document.getElementsByClassName("icon_tab_ct");
    
    for (i = 0; i < icon_tab_ct.length; i++) {
        icon_tab_ct[i].style.display = "none";
    }

    set03_linik = document.getElementsByClassName("set03_linik");
    
    for (i = 0; i < set03_linik.length; i++) {
        set03_linik[i].className = set03_linik[i]
            .className
            .replace(" focus", "");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById("sec03_resetbtn").style.display = "block";
    evt.currentTarget.className += " focus";

}






    //section03 if click the checkbox - 리스트 추가
function checkbox_onclick() {
    var wineinfor = document.getElementById("winelist_ctw");
    wineinfor.classList.add("view_wlist");

    // > 선택된 목록에서 value 찾기
    const query = 'input[class="set03_checkbox"]:checked';
    const selectedEls = document.querySelectorAll(query);
    let result = '';
    // let span_btn = '<span>x</span>'

    // > > 반복문
    selectedEls.forEach((el) => {
        result += '<button type="button"># ' + el.name + '</button>'; //+ span_btn
    });


    // > > 출력
    document.getElementById('list_ctt_tag').innerHTML = result; 

}










//section03 if click the radio - 리스트 추가
function radio_onclick() {
    var wineinfor2 = document.getElementById("winelist_ctw");
    wineinfor2.classList.add("view_wlist");

    // > 선택된 목록에서 value 찾기
    const query2 = 'input[type="radio"]:checked';
    const selectedEls2 = document.querySelectorAll(query2);
    let result2 = '';
    // let span_btn = '<span>x</span>'

    // > > 반복문
    selectedEls2.forEach((el) => {
        result2 += '<button type="button"># ' + el.value + '</button>'; //+ span_btn
    });


    // > > 출력
    document.getElementById('list_ctt_tag').innerHTML = result2; 

}



    //section03 if click the all checkbox - 같은 형제 값 checkbox 값 모두 제외







    //section03 wine list







    // wine infor load
function load_wineif() {
    document.getElementById("wine_infor_content").removeAttribute('class');
    document.getElementById("wine_infor_content").classList.add("viewmd");
    document.getElementById("wine_infor_content").classList.add("wine_infor_content");


    //모달 안 내용 중 정보 관련 추가



    var wineinfor = document.getElementById("r_nav");
    wineinfor.classList.add("view_rnav");

    //swiper2.removeAllSlides();
    //swiper2.appendSlide();
    

    /*우측 네비 와인 정보 추가
    var r_nav_list = document.getElementById("r_nav_list");
    const li_tag = document.createElement('li');
    const img_tag = document.createElement('img');

    li_tag.setAttribute('class','swiper-slide');
    li_tag.setAttribute('onclick','load_wineif()');

    img_tag.setAttribute('src','');
    img_tag.setAttribute('alt','와인이름');
    r_nav_list.append(li_tag);
    li_tag.append(img_tag);
    
    swiper2.update(); 
    */
    /* 참고
    var data={ 'sample':'sample data' } 
    swiperContainer.removeAllSlides(); 
    $.ajax({ type:'post',
            data:data, 
            url:'요청할 url', 
            dataType:'json', 
            success:function(data){ 
                    var length = data.length; 
                    var htmlArr=[]; 
     
                    for(var i=0;i<length;i++){ 
                    htmlArr.push("<div class=\"swiper-slide\">data.sample</div>");
                    }

            swiperContainer.appendSlide(htmlArr);
            swiperContainer.update();  //슬라이드를 새로 추가할 경우 꼭 update 함수를 호출하는게 좋다
                }
            })
 */
}




    // wine infor close
var wineinfor = document.getElementById("wine_infor_content");

window.onclick = function (event) {
    if (event.target == wineinfor ) {
        wineinfor.removeAttribute('class');
        wineinfor.classList.add("wine_infor_content");


        // 모달 안 내용중 정보 리셋 추가



    }
}
    



<<<<<<< HEAD
=======








// mobile

var mb_openbtn = document.getElementById("mb_openbtn");
var header = document.getElementById("headct");
var mhead_size = document.getElementById("mhead_size");
var mhead_size02 = document.getElementById("mhead_size02");


    
function close_mobilemu() {

    
    mb_openbtn.setAttribute("onclick", "open_mobilemu()");
    header.classList.remove("mbsize");
    mhead_size.classList.remove("mbsize02");
    mhead_size.removeAttribute('onclick');
    mhead_size02.removeAttribute('onclick');
    
}


function open_mobilemu() {    
    
    mb_openbtn.setAttribute("onclick", "close_mobilemu()");
    header.classList.add("mbsize");
    mhead_size.classList.add("mbsize02");
    mhead_size.setAttribute("onclick", "close_mobilemu()");
    mhead_size02.setAttribute("onclick", "close_mobilemu()");
}
>>>>>>> cdac544c56c9295bbb343b65f5851600f4d1598b
