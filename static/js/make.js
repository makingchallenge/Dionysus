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

    //검색 조건 DB 연동
    search_list( tabName );
    
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
            return;
        case "grade": //등급
            return;
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
function checkbox_onclick( click_id ) {


    var wineinfor = document.getElementById("winelist_ctw");
    wineinfor.classList.add("view_wlist");

    var dicSearchList = {}
    let dicValArr = []

    // > 선택된 목록에서 value 찾기
    let result = '';
    var list = ['type', 'country', 'price', 'concentration']

    list.forEach(function (data){
        var query = 'div[id="' + data +'"] > ul > li > input[class="set03_checkbox"]:checked';

        // const query = 'div[id="type"] > ul > li > input[class="set03_checkbox"]:checked';
        const selectedEls = document.querySelectorAll(query);
        // let span_btn = '<span>x</span>'

        // > > 반복문
        selectedEls.forEach((el) => {
            // result += '<button type="button"># ' + el.name + '</button>'; //+ span_btn
            result += '<button type="button"># ' + el.value + '</button>';

            dicValArr.push(el.value);
        });
        // console.log(data, dicValArr);
        dicSearchList[data] = dicValArr.slice();    //배열 초기화에 영향을 받지 않는 깊은 복사
        dicValArr.splice(0);    //배열 초기화
    })

    // > > 출력
    document.getElementById('list_ctt_tag').innerHTML = result;

    //리스트 추가
    setSearchList( dicSearchList )


}

function setSearchList( checkList ) {
    $.ajax({
        type: 'POST',
        url: '/api/set_searchList',
        data: JSON.stringify(checkList),
        success: function (response) {
            $('.list_ctc').empty()
            let list = response['list_data'] // DB에 저장된 데이터 가져오기

            console.log(list)

            for (let i = 0 ; i < list.length ; i++) {
                let img = list[i]['img']
                let name_eng = list[i]['name_eng']
                let name_ko = list[i]['name_ko']
                let kind = list[i]['kind']
                let country_img = list[i]['make_country_flag']
                let country_name = list[i]['make_country']
                let make = list[i]['make']
                let food = list[i]['food']

                console.log(img)
                console.log(name_eng)
                console.log(name_ko)
                console.log(kind)
                console.log(country_img)
                console.log(country_name)
                console.log(make)
                console.log(food)


                let temp_html =
                                `<li class="content" onclick="load_wineif()">
                                    <img src="${img}" alt="wine image" class="wine_img">
                                    <div>
                                        <p>${name_eng}</p>
                                        <p>${name_ko}</p>
                                        <ul>
                                            <li>
                                                <span></span><span>${kind}</span></li>
                                            <li>
                                                <img src="${country_img}" alt="${country_name}">
                                                <span>${country_name}</span></li>
                                        </ul>
                                        <p>${make} ${food}</p>
                                    </div>
                                    <span class="view_btn">+</span>
                                </li>`

                $('.list_ctc').append(temp_html)
            }


        }
    })
}


    //section03 wine list







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
    



