

$(function(){

    // 화면 렌더링 시 날짜 컬럼들 현재날짜로 세팅
    setDefaultDates();

    // 화면 렌더링 시 구성분류 선택박스 세팅
    getSelectConfig();

    // 장비분류 선택 시 선택박스 세팅
    $(document).ready(function() {
        $('#config_category').change(function(){
            const configValue = $(this).val();
            getSelectAsset(configValue);
        })

        $('#asset_category').change(function(){
            const assetValue = $(this).val();
            getSelectSub(assetValue);
        })

        $('#sub_category').change(function(){
            const subValue = $(this).val();
            getSelectDetail(subValue);
        })

    })

});

/**
 * 구성분류 리스트
 */
function getSelectConfig(){
    $.ajax({
        url: "/eqpManage/selectConfig",
        type: "GET",
        success: function (res) {
            const categorySelect = $("#config_category");
            categorySelect.empty();
            categorySelect.append(new Option("선택", ""));

            const assetSelect = $("#asset_category");
            assetSelect.empty();
            assetSelect.append(new Option("선택", ""));

            const subSelect = $("#sub_category");
            subSelect.empty();
            subSelect.append(new Option("선택", ""));

            const detailSelect = $("#detail_category");
            detailSelect.empty();
            detailSelect.append(new Option("선택", ""));


            let data = res.selectData;
            data.forEach(function(item) {
                categorySelect.append(new Option(item.name, item.id));
            });
        },
    });
}

/**
 * 자산분류 리스트
 */
function getSelectAsset(configValue){
    $.ajax({
        url: "/eqpManage/selectAsset",
        type: "GET",
        data: {id: configValue},
        success: function (res) {
            const assetSelect = $("#asset_category");
            assetSelect.empty();
            assetSelect.append(new Option("선택", ""));

            const subSelect = $("#sub_category");
            subSelect.empty();
            subSelect.append(new Option("선택", ""));

            const detailSelect = $("#detail_category");
            detailSelect.empty();
            detailSelect.append(new Option("선택", ""));

            let data = res.selectData;
            data.forEach(function(item) {
                assetSelect.append(new Option(item.name, item.id));
            });
        },
    });
}

/**
 * 자산세부 리스트
 */
function getSelectSub(assetValue){
    $.ajax({
        url: "/eqpManage/selectSub",
        type: "GET",
        data: {id: assetValue},
        success: function (res) {
            const subSelect = $("#sub_category");
            subSelect.empty();
            subSelect.append(new Option("선택", ""));

            const detailSelect = $("#detail_category");
            detailSelect.empty();
            detailSelect.append(new Option("선택", ""));

            let data = res.selectData;
            data.forEach(function(item) {
                subSelect.append(new Option(item.name, item.id));
            });
        },
    });
}

/**
 * 자산상세 리스트
 */
function getSelectDetail(subValue){
$.ajax({
        url: "/eqpManage/selectDetail",
        type: "GET",
        data: {id: subValue},
        success: function (res) {
            const detailSelect = $("#detail_category");
            let data = res.selectData;

            if (res.selectData[0] === null){
                detailSelect.empty();
                detailSelect.append(new Option("없음", ""));
            }
            else{
                detailSelect.empty();
                detailSelect.append(new Option("선택", ""));

                data.forEach(function(item) {
                    detailSelect.append(new Option(item.name, item.id));
                });
            }

        },
    });
}

/**
 * 장비관리 > 장비목록 > 장비추가
 * 맨 처음 페이지 렌더링 될 때 날짜 항목들 현재값으로 설정
 */
function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식의 현재 날짜

    ['asset_acquisition_date', 'asset_disposal_date', 'eol_status', 'eos_status'].forEach(id => {
        const element = document.getElementById(id);
        if (!element.value) {
            element.value = today;
        }
    });
}


/**
 * 장비관리 > 장비목록 > 장비추가 > 저장버튼
 * 저장 버튼을 클릭했을 때 호출되는 함수입니다.
 * 각 폼 데이터를 수집하여 서버로 전송합니다.
 */
function saveData() {
    const data = {};
    let isValid = true;
    let errorMessage = "";

    document.querySelectorAll('#selection-equipment input, #selection-equipment select').forEach(input => {
        const value = input.value.trim();
        const name = input.name;

        if (["eqp_name", "hostname", "model", "m_company", "primary_operator", "primary_outsourced_operator",
             "secondary_operator", "secondary_outsourced_operator", "operating_department", "cpu", "mem",
             "disk", "ip_address", "os_version", "dbrain_number", "serial_number", "installation_coordinates"].includes(name)) {
            if (value.length > 30) {
                errorMessage += `${name}는 30글자 초과할 수 없습니다.\n`;
                isValid = false;
            }
        }

        if (name === "acquisition_cost" && (isNaN(value) || Number(value) > 100000000)) {
            errorMessage += `도입금액은 숫자만 입력가능하며, 1000억 이하입니다.\n`;
            isValid = false;
        }

        if ((name === "installation_units" || name === "equipment_size_units") && (isNaN(value) || Number(value) > 1000)) {
            errorMessage += `${name}는 숫자만 입력가능하며, 1000 이하입니다.\n`;
            isValid = false;
        }

        if ((value === "" && name.includes("date"))) {
            errorMessage += `${name}는 올바른 날짜를 입력해야 합니다.\n`;
            isValid = false;
        }

        data[name] = value;
    });


    $('select').each(function() {
        const selectedId = $(this).attr('id');
        const selectedValue = $(this).val();
        const selectedText = $(this).find("option:selected").text();

        console.log("선택된 요소 ID:", selectedId);
        console.log("선택된 값:", selectedValue);
        console.log("선택된 텍스트:", selectedText);
    });

    if (!isValid) {
        alert2("알림", errorMessage, "error", "확인");
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/eqpManage/saveEquipmentInfo",
        data: JSON.stringify(data), // 데이터를 JSON 문자열로 변환
        contentType: "application/json",
        success: function(response) {
            alert2("알림", "저장되었습니다.", "info", "확인");
        },
        error: function(error) {
            alert2("알림", "저장 중 오류가 발생했습니다. <br>관리자에게 문의하세요", "error", "확인");
        }
    });
}

/**
 * 장비관리 > 장비목록 > 장비추가 > 취소버튼
 * 취소 버튼을 클릭했을 때 호출되는 함수입니다.
 * 사용자가 이전 페이지로 돌아가도록 합니다.
 */
function cancelAction() {
    window.history.back();
}
