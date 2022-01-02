//section02 
$(document).ready(function () {
    recommend_wines()
});

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
                let temp_html = `<li onclick="click_count('${wine_num}')">
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


    //section03 reset the check box
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
            console.log(information)
            //여기서 파싱! for문은 어차피 1개 데이터만 가져오는 거라 없애버렸어요
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
                                                <td>$<span></span>{Sweetness}</td>
                                                <th>타닌</th>
                                                <td>${Tannin}</td>
                                            </tr>
                                            <tr>
                                                <th>산도</th>
                                                <td>${acidity}</td>
                                                <th>바디</th>
                                                <td>${body}</td>
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
                
            // for (let i = 0; i < information.length; i++) {
            //     // let wine_num = information[i]['\ufeffwine_num']
            //     let wine_num = information[i]['wine_num']
            //     let img = information[i]['img']
            //     let kind = information[i]['kind']
            //     let name_ko = information[i]['name_ko']
            //     let name_eng = information[i]['name_eng']
            //     let make_country_flag = information[i]['make_country_flag']
            //     let make_country = information[i]['make_country']
            //     let blend = information[i]['blend']
            //     let make_area = information[i]['make_area']
            //     let sweetness = information[i]['sweetness']
            //     let acidity = information[i]['acidity']
            //     let body = information[i]['body']
            //     let tannin = information[i]['tannin']
            //     let alcohol = information[i]['alcohol']
            //     let temperature = information[i]['temperature']
            //     let price = information[i]['price']
            //     let make = information[i]['make']
            //     let food = information[i]['food']
            //     let company = information[i]['company']
            //     // console.log(company)
            //     // let temp_html_2 = `<li onclick="load_wineif()">
            //     let temp_html_2 = `<div class="wine_box">
            //                         <img src="${img}" alt="wine img">
            //                         <div class="wine_inf">
            //                             <p class="s_tit">${name_eng}</p><!--영문이름-->
            //                             <p class="t_tit">${name_ko}</p><!--이름-->
            //                             <ul class="s_txt">
            //                                 <li><span></span><span>${kind}</span></li><!--종류-->
            //                                 <li><img src="${make_country_flag}" alt="portugal"><span>${make_country}</span></li><!--제조국-->
            //                             </ul>
            //                             <table class="t_txt">
            //                                 <tr>
            //                                     <th>주요품종</th>
            //                                     <td>${blend}</td>
            //                                     <th>제조지역</th>
            //                                     <td>${make_area}</td>
            //                                 </tr>
            //                                 <tr>
            //                                     <th>당도</th>
            //                                     <td>${sweetness}</td>
            //                                     <th>타닌</th>
            //                                     <td>print(ty*${tannin})</td>
            //                                 </tr>
            //                                 <tr>
            //                                     <th>산도</th>
            //                                     <td>print(${acidity})</td>
            //                                     <th>바디</th>
            //                                     <td>print(${body})</td>
            //                                 </tr>
            //                                 <tr>
            //                                     <th>도수</th>
            //                                     <td>${alcohol}</td>
            //                                     <th>음용온도</th>
            //                                     <td>${temperature}</td>
            //                                 </tr>
            //                                 <tr>
            //                                     <th>가격</th>
            //                                     <td colspan="3"><span>${price}</span>원</td>
            //                                 </tr>
            //                             </table>
            //                             <div class="w_txt">
            //                                 <span>양조 방법</span>
            //                                 <p>${make}</p>
            //                             </div>
            //                             <div class="w_txt">
            //                                 <span>추천음식</span>
            //                                 <p>${food}</p>
            //                             </div>
            //                             <div class="w_txt">
            //                                 <span>제조사</span>
            //                                 <p>${company}</p>
            //                             </div>

            //                         </div>
            //                     </div>`
            //     $('#wine_infor_content').append(temp_html_2)
            // }            
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
    // wine_info()
        
        
        
        
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
