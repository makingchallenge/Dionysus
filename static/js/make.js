



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
    slidesPerView: 1,
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



//부팅시 시작
$(document).ready(function () {
    //검색 조건 list 불러오기
    search_list("type")
    search_list("country")
    search_list("concentration")
    //추천 list 불러오기
    recommend_wines()
});

//section03 reset the check box

function clear_checkbox() {
    var obj = document.getElementsByClassName('set03_checkbox');

    for (var i = 0; i < obj.length; i++) {
        obj[i].checked = false;
    }



    $('.list_ctc').empty()  //리스트 리셋
    document.getElementById("winelist_ctw").style.display = "none";

    //리스트 상단 태그 리셋
    document.getElementById('list_ctt_tag').innerHTML = '';

}

function recommend_wines() {
    $.ajax({
        type: 'GET',
        url: '/api/recommend',
        data: {},
        success: function (response) {
            let mywines = response['wine_lists']
            // console.log(wine_lists)
            for (let i = 0; i < mywines.length; i++) {
                // let wine_num = mywines[i]['wine_num']
                let wine_num = mywines[i]['\ufeffwine_num']
                let img = mywines[i]['img']
                let kind = mywines[i]['kind']
                let name_ko = mywines[i]['name_ko']
                let name_eng = mywines[i]['name_eng']
                let make_country = mywines[i]['make_country']
                let cnt = mywines[i]['click_cnt']
                // console.log(wine_num, cnt)

                // let temp_html = `<li onclick="load_wineif()">
                let temp_html = `<li onclick="click_count('${wine_num}')" class="swiper-slide">
                                    <img src="${img}" alt="wine img">
                                    <span class="plus_btn">+</span>
                                    <div>
                                        <p>
                                            <span></span>${name_ko}</p>
                                        <p>${name_eng}</p>
                                        <p>${make_country}</p>
                                    </div>
                                </li>`
                $('#recommend_box').append(temp_html)
            }
        }
    })
}

function click_count(wine_num) {
    // console.log(wine_num)
    $.ajax({
        type: 'POST',
        url: '/api/click',
        data: {num_give:wine_num},
        success: function (response) {
            
        }
    });
    wine_info(wine_num)
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

// 검색 조건 DB 연동
function search_list( name ) {
    let search_name;
    let checkBoxNum;
    let checkBoxValue;
    let idData;

    switch (name) {
        case "type": //종류
            search_name = "$kind";
            checkBoxNum = 101;
            checkBoxValue = "와인 종류 모두"
            break;
        case "country": //국가
            search_name = "$make_country";
            checkBoxNum = 201;
            checkBoxValue = "국가 모두"
            break;
        case "price":   //가격대
            return; //변경 없음
        case "grade": //등급
            return; //변경 없음
        case "concentration": //알콜
            search_name = "$alcohol";
            checkBoxNum = 501;
            checkBoxValue = "알콜농도 상관없음"
            break;
    }

    let search_list = document.getElementById(name);
    search_list.innerText = '';   //검색 리스트 초기화

    idData = "checkbox0" + checkBoxNum;

    //추가할 html & all 기본 추가
    let temphtml = `<ul>
                        <li class="round_checkbox">
                        <input type="checkbox" id=${idData} class="set03_checkbox" onclick="checkbox_onclick()" value="${checkBoxValue}">
                        <label for=${idData}>All</label>
                        </li>`

    $.ajax({
                type: 'POST',
                url: '/api/search_list',
                data: {name_give:search_name},
                success: function (response) {
                    let list = response['search_list'] // DB에 저장된 데이터 가져오기

                    for(let i = 0; i < list.length; i++) {
                        checkBoxNum += 1;
                        idData = "checkbox0" + checkBoxNum;
                        let subhtml = `<li class="round_checkbox">
                                            <input type="checkbox" id=${idData} class="set03_checkbox" onclick="checkbox_onclick()" value="${list[i]['_id']}">
                                            <label for=${idData}>${list[i]['_id']}</label>
                                        </li>`;
                        temphtml += subhtml;    // 체크박스 1개씩 추가
                    }
                    temphtml += `</ul>`;
                    search_list.innerHTML = temphtml;
                }
            });
}


    //section03 if click the checkbox - 리스트 좌측 상단 태그 추가, 리스트 추가
function checkbox_onclick() {
    var wineinfor = document.getElementById("winelist_ctw");
    wineinfor.classList.add("view_wlist");
    // Back 전송용 딕셔너리 생성
    var dicSearchList = {}
    let dicValArr = []

    // > 선택된 목록에서 value 찾기
    let result = '';
    var list = ['type', 'country', 'price', 'concentration']
    // 선택 개수 확인 -> 수동으로 전체 선택 해제시 사용
    let cnt = 0;

    list.forEach(function (data){
        var query = 'div[id="' + data +'"] > ul > li > input[class="set03_checkbox"]:checked';

        const selectedEls = document.querySelectorAll(query);

        // > > 반복문
        selectedEls.forEach((el) => {
            result += '<button type="button"># ' + el.value + '</button>';//+ span_btn

            dicValArr.push(el.value);
            cnt += 1;
        });
        dicSearchList[data] = dicValArr.slice();    //배열 초기화에 영향을 받지 않는 깊은 복사
        dicValArr.splice(0);    //배열 초기화
    })

    //radio_onclick--------------------
    // > 선택된 목록에서 value 찾기
    const query2 = 'input[type="radio"]:checked';
    const selectedEls2 = document.querySelectorAll(query2);

    selectedEls2.forEach((el) => {
        result += '<button type="button" ># ' + el.value + '</button>'; //+ span_btn

        dicValArr.push(el.value);   //배열에 velue 추가
        cnt += 1;
    });
    dicSearchList['taste'] = dicValArr.slice();    //배열 초기화에 영향을 받지 않는 깊은 복사
    dicValArr.splice(0);    //배열 초기화

    // > > 출력
    document.getElementById('list_ctt_tag').innerHTML = result;

    //리스트 추가
    if (cnt != 0) { //선택된 것이 있을때만 실행
        setSearchList( dicSearchList )
    }
    else{
        $('.list_ctc').empty()  //리스트 리셋
        document.getElementById("winelist_ctw").style.display = "none";
    }
}

    //section03 wine list
// 검색 결과를 화면에 출력
function setSearchList( checkList ) {
    let temp_html = ``
    $.ajax({
        type: 'POST',
        url: '/api/set_searchList',
        data: JSON.stringify(checkList), //Json형식으로 데이터 수신
        success: function (response) {
            $('.list_ctc').empty()
            let list = response['list_data'] // DB에 저장된 데이터 가져오기

            for (let i = 0 ; i < list.length ; i++) {
                let wine_num = list[i]['\ufeffwine_num']
                let img = list[i]['img']
                let name_eng = list[i]['name_eng']
                let name_ko = list[i]['name_ko']
                let kind = list[i]['kind']
                let kind_color = 'red'
                let country_img = list[i]['make_country_flag']
                let country_name = list[i]['make_country']
                let make = list[i]['make']
                let food = list[i]['food']
                //와인 색 css를 위한 부분
                switch (kind) {
                    case '레드':
                        kind_color = 'red'
                        break;
                    case '화이트':
                        kind_color = 'white'
                       break;
                    case '스파클링':
                        kind_color = 'sparkling'
                        break;
                    case '로제':
                        kind_color = 'rose'
                        break;
                    case '주정강화':
                        kind_color = 'fortified'
                        break;
                    case '우리술':
                        kind_color = 'our_alcohol'
                        break;
                    case '사케/청주':
                        kind_color = 'cheongju'
                        break;
                    case '기타':
                        kind_color = 'etc'
                        break;
                    case '고도주':
                        kind_color = 'godoju'
                        break;
                    default:
                        break
                }

                temp_html +=
                                `<li class="content" onclick="click_count('${wine_num}')">
                                    <img src="${img}" alt="wine image" class="wine_img">
                                    <div>
                                        <p>${name_eng}</p>
                                        <p>${name_ko}</p>
                                        <ul>
                                            <li>
                                                <span class="${kind_color}"></span><span>${kind}</span></li>
                                            <li>
                                                <img src="${country_img}" alt="${country_name}">
                                                <span>${country_name}</span></li>
                                        </ul>
                                        <p>${make} ${food}</p>
                                    </div>
                                    <span class="view_btn">+</span>
                                </li>`
            }
            $('.list_ctc').append(temp_html)
            document.getElementById("winelist_ctw").style.display = "block";
        }
    })
}
    //section03 if click the all checkbox - 같은 형제 값 checkbox 값 모두 제외

    //wine info
function wine_info(wine_num1) {
    $.ajax({
        type: 'POST',
        url: '/api/info',
        data: {num_give: wine_num1},
        success: function (response) {
            // load_wineif()  
            let information = response['info_lists'] //여기서 str으로 들어오구요
            // console.log(typeof(information))
            information = JSON.parse(information) //이걸로 오브젝트라는 데이터 형식으로 바꾸고
            // console.log(information)
            
            let wine_num = information['\ufeffwine_num']
            let img = information['img']
            let kind = information['kind']
            let name_ko = information['name_ko']
            let name_eng = information['name_eng']
            let make_country_flag = information['make_country_flag']
            let make_country = information['make_country']
            let blend = information['blend']
            let make_area = information['make_area']
            let alcohol = information['alcohol']
            let temperature = information['temperature']
            let price = information['price']
            let make = information['make']
            let food = information['food']
            let company = information['company']
            let Sweetness = information['Sweetness']
            let acidity = information['acidity']
            let body = information['body']
            let Tannin = information['Tannin']

            let temp = ``
            for (var i = 0; i < Sweetness; i++) {
                temp += `<span></span>`
            }
            let Sweetness_html = temp

            temp = ``
            for (i = 0; i < acidity; i++) {
                temp += `<span></span>`
            }
            let acidity_html = temp

            temp = ``
            for (i = 0; i < body; i++) {
                temp += `<span></span>`
            }
            let body_html = temp

            temp = ``
            for (i = 0; i < Tannin; i++) {
                temp += `<span></span>`
            }
            let Tannin_html = temp

            let temp_html_2 = `<div class="wine_box">
                                    <img src="${img}" alt="wine img">
                                    <div class="wine_inf">
                                        <p class="s_tit">${name_eng}</p><!--영문이름-->
                                        <p class="t_tit">${name_ko}</p><!--이름-->
                                        <ul class="s_txt">
                                            <li><span></span><span>${kind}</span></li><!--종류-->
                                            <li><img src="${make_country_flag}" alt="portugal"><span>${make_country}</span></li><!--제조국-->
                                        </ul>
                                        <table class="t_txt">
                                            <tr>
                                                <th>주요품종</th>
                                                <td>${blend}</td>
                                                <th>제조지역</th>
                                                <td>${make_area}</td>
                                            </tr>
                                            <tr>
                                                <th>당도</th>
                                                <td>${Sweetness_html}</td>
                                                <th>타닌</th>
                                                <td>${Tannin_html}</td>
                                            </tr>
                                            <tr>
                                                <th>산도</th>
                                                <td>${acidity_html}</td>
                                                <th>바디</th>
                                                <td>${body_html}</td>
                                            </tr>
                                            <tr>
                                                <th>도수</th>
                                                <td>${alcohol}</td>
                                                <th>음용온도</th>
                                                <td>${temperature}</td>
                                            </tr>
                                            <tr>
                                                <th>가격</th>
                                                <td colspan="3"><span>${price.toLocaleString('en')}</span>원</td>
                                            </tr>
                                        </table>
                                        <div class="w_txt">
                                            <span>양조 방법</span>
                                            <p>${make}</p>
                                        </div>
                                        <div class="w_txt">
                                            <span>추천음식</span>
                                            <p>${food}</p>
                                        </div>
                                        <div class="w_txt">
                                            <span>제조사</span>
                                            <p>${company}</p>
                                        </div>

                                    </div>
                                </div>`
                $('#wine_infor_content').append(temp_html_2)         
                      
            load_wineif()
        }
    })
}
    // wine infor load
function load_wineif() {
    document.getElementById("wine_infor_content").removeAttribute('class');
    document.getElementById("wine_infor_content").classList.add("viewmd");
    document.getElementById("wine_infor_content").classList.add("wine_infor_content");


    //모달 안 내용 중 정보 관련 추가



    //var wineinfor = document.getElementById("r_nav");
    //wineinfor.classList.add("view_rnav");

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

    //우측 네비 와인 정보 추가 / 1. slide 미 작업한 상태 / 2. slide 작업 시 내용 추가 sciprt 부분 작업
    var wineinfor = document.getElementById("r_nav");
    wineinfor.classList.add("view_rnav");


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
