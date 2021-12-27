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

    //추가할 html & all 기본 추가
    let temphtml = `<ul>
                        <li class="round_checkbox">
                        <input type="checkbox" id="checkbox0101" class="set03_checkbox" onclick="checkbox_onclick()" value=${checkBoxValue}>
                        <label for="checkbox0101">All</label>
                        </li>`

    $.ajax({
                type: 'POST',
                url: '/api/search_list',
                data: {name_give:search_name},
                success: function (response) {
                    let list = response['search_list'] // DB에 저장된 데이터 가져오기

                    for(let i = 0; i < list.length; i++) {
                        checkBoxNum += 1;
                        let idData = "checkbox0" + checkBoxNum;
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

    
    //리스트 좌측 상단 태그 추가



    //리스트 추가



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
    



