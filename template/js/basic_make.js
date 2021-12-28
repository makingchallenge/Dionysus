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
        
    
    
    
    