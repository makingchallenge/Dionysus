//부팅시 시작
$(document).ready(function () {
    //검색 조건 list 불러오기
    search_list("type")
    search_list("country")
    search_list("concentration")
});

//section03 reset the check box
function clear_checkbox() {
    var obj = document.getElementsByClassName('set03_checkbox');

    for (var i = 0; i < obj.length; i++) {
        obj[i].checked = false;
    }


    //리스트 리셋 + 리스트 숨기기
    $('.list_ctc').empty()  //리스트 리셋
    document.getElementById("winelist_ctw").style.display = "none";

    //리스트 상단 태그 리셋
    document.getElementById('list_ctt_tag').innerHTML = '';



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
                    default:
                        break
                }

                temp_html +=
                                `<li class="content" onclick="load_wineif()">
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






    // wine infor load
function load_wineif() {
    document.getElementById("wine_infor_content").removeAttribute('class');
    document.getElementById("wine_infor_content").classList.add("viewmd");
    document.getElementById("wine_infor_content").classList.add("wine_infor_content");


    //모달 안 내용 중 정보 관련 추가





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
    



