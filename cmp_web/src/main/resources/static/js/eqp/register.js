
let eqpRegisterPortColumn = [
    { field: '',     title: ''      , checkbox: true },
    { field: 'Host', title: 'Host'  , formatter: inputFormatter },
    { field: 'IP',   title: 'IP'    , formatter: inputFormatter },
    { field: 'Port', title: 'Port'  , formatter: inputFormatter }
];

$(function(){

    // 화면 렌더링 시 날짜 컬럼들 현재날짜로 세팅
    setDefaultDates();

    // 화면 렌더링 시 구성분류 선택박스 세팅
    getSelectConfig();

    // 장비분류 선택 시 선택박스 세팅
    $(document).ready(function() {
        $('#config_id').change(function(){
            const configValue = $(this).val();
            getSelectAsset(configValue);
        })

        $('#asset_id').change(function(){
            const assetValue = $(this).val();
            getSelectSub(assetValue);
        })

        $('#sub_id').change(function(){
            const subValue = $(this).val();
            getSelectDetail(subValue);
        })
    })

    $('#eqpRegisterPortTable').bootstrapTable({
        columns: eqpRegisterPortColumn
    });

});

function inputFormatter(value, row, index, field) {
    return `<input type="text" class="form-control" name="${field}" value="${value}" onchange="updateTableData(${index}, '${field}', this.value)">`;
}

function updateTableData(index, field, value) {
    let $table = $('#eqpRegisterPortTable');
    let data = $table.bootstrapTable('getData');
    data[index][field] = value;
    $table.bootstrapTable('updateRow', {
        index: index,
        row: data[index]
    });
}

function eqpAddPortRow() {
    let $table = $('#eqpRegisterPortTable');
    let data = $table.bootstrapTable('getData');
    data.push({
        Host: '',
        IP: '',
        Port: ''
    });
    $table.bootstrapTable('load', data);
}

function eqpDeletePortRow() {
    let $table = $('#eqpRegisterPortTable');
    let selections = $table.bootstrapTable('getSelections');

    if (selections.length === 0) {
        alert2('알림', '삭제할 행을 선택해주세요.', 'info', '확인');
        return;
    }

    let data = $table.bootstrapTable('getData');
    for (let i = selections.length - 1; i >= 0; i--) {
        let index = data.indexOf(selections[i]);
        if (index !== -1) {
            data.splice(index, 1);
        }
    }

    $table.bootstrapTable('load', data);
}

// 전체 선택박스 : 선택/해제
function toggleSelectAll(source) {
    let checkboxes = $('#eqpRegisterPortTable tbody .row-select');
    checkboxes.prop('checked', source.checked);
}

// 전체 선택박스 : 하위 선택박스 선택/해제 시 전체 선택박스도 선택/해제
function toggleRowSelect() {
    let allCheckboxes = $('#eqpRegisterPortTable tbody .row-select');
    let checkedCheckboxes = $('#eqpRegisterPortTable tbody .row-select:checked');
    let selectAllCheckbox = $('#select-all');

    selectAllCheckbox.prop('checked', allCheckboxes.length === checkedCheckboxes.length);
}

/**
 * 구성분류 리스트
 */
function getSelectConfig(){
    $.ajax({
        url: "/cable/eqp/selectConfig",
        type: "GET",
        success: function (res) {
            const categorySelect = $("#config_id");
            categorySelect.empty();
            categorySelect.append(new Option("선택", ""));

            const assetSelect = $("#asset_id");
            assetSelect.empty();
            assetSelect.append(new Option("선택", ""));

            const subSelect = $("#sub_id");
            subSelect.empty();
            subSelect.append(new Option("선택", ""));

            const detailSelect = $("#detail_id");
            detailSelect.empty();
            detailSelect.append(new Option("선택", ""));

            $("#categories").val("");

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
        url: "/cable/eqp/selectAsset",
        type: "GET",
        data: {config_id: configValue},
        success: function (res) {
            const assetSelect = $("#asset_id");
            assetSelect.empty();
            assetSelect.append(new Option("선택", ""));

            const subSelect = $("#sub_id");
            subSelect.empty();
            subSelect.append(new Option("선택", ""));

            const detailSelect = $("#detail_id");
            detailSelect.empty();
            detailSelect.append(new Option("선택", ""));

            let data = res.selectData;
            data.forEach(function(item) {
                assetSelect.append(new Option(item.name, item.id));
            });

            $("#categories").val("");
        },
    });
}

/**
 * 자산세부 리스트
 */
function getSelectSub(assetValue){
    $.ajax({
        url: "/cable/eqp/selectSub",
        type: "GET",
        data: {asset_id: assetValue},
        success: function (res) {

            let data = res.selectData;
            if(data.length != 0){
                const subSelect = $("#sub_id");
                subSelect.empty();
                subSelect.append(new Option("선택", ""));

                const detailSelect = $("#detail_id");
                detailSelect.empty();
                detailSelect.append(new Option("선택", ""));


                data.forEach(function(item) {
                    subSelect.append(new Option(item.name, item.id));
                });

                $("#categories").val(data[0].categories);
            }
            else{
                $("#categories").val("");
            }
        },
    });
}

/**
 * 자산상세 리스트
 */
function getSelectDetail(subValue){
    $.ajax({
        url: "/cable/eqp/selectDetail",
        type: "GET",
        data: {sub_id: subValue},
        success: function (res) {

            let data = res.selectData;
            if(data.length != 0){
                const detailSelect = $("#detail_id");

                if (res.selectData[0].id === ''){
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
 */
function saveData() {

    let data = {};
    let isValid = true;
    let errorMessage = "";

    document.querySelectorAll('#selection-equipment input, #selection-equipment select').forEach(input => {
        const value = input.value.trim();
        const name = input.name;

        if (name === "acquisition_cost"){
            let acquisition_cost = removeComma(value);
            if((isNaN(acquisition_cost) || Number(acquisition_cost) > 100000000000)) {
                errorMessage += `도입금액은 숫자만 입력가능하며, 1000억 이하입니다.\n`;
                isValid = false;
            }

            data[name] = acquisition_cost;
        }
        else if(name.includes("ip_block")){
            // 아무 처리도 하지 않음
        }
        else{
            if (["eqp_name", "hostname", "model", "m_company", "primary_operator", "primary_outsourced_operator",
                "secondary_operator", "secondary_outsourced_operator", "operating_department", "cpu", "mem",
                "disk", "os_version", "dbrain_number", "serial_number", "installation_coordinates"].includes(name)) {
                if (value.length > 30) {
                    errorMessage += `${name}는 30글자 초과할 수 없습니다.\n`;
                    isValid = false;
                }
            }
            if ((name === "installation_units" || name === "equipment_size_units") && (isNaN(value) || Number(value) > 1000)) {
                errorMessage += `${name}는 숫자만 입력가능하며, 1000 이하입니다.\n`;
                isValid = false;
            }

            if (name.includes("date") && !isValidDate(value)) {
                errorMessage += `${name}는 유효한 날짜여야 합니다.\n`;
                isValid = false;
            }
            data[name] = value;
        }

        data["ip_address"] = combineIP(); // ip_block1 ~ ip_block4까지 구분자 붙여서 ip_address 문자열 생성
    });


    $('select').each(function() {
        const selectedId = $(this).attr('id');
        const selectedValue = $(this).val();
        const selectedText = $(this).find("option:selected").text();
    });

    if (!isValid) {
        alert2("알림", errorMessage, "error", "확인");
        return false;
    }
    if($("#config_id").val() === ""){
        alert2("알림", "구성분류를 선택해주세요", "info", "확인");
        return false;
    }
    if($("#asset_id").val() === ""){
        alert2("알림", "자산분류를 선택해주세요", "info", "확인");
        return false;
    }
    if($("#sub_id").val() === ""){
        alert2("알림", "자산세부분류를 선택해주세요", "info", "확인");
        return false;
    }

    if($("#detail_id").val() === ""){
        const selectCase1 = document.getElementById('detail_id');
        const options = selectCase1.options;
        if(options.length != 1){
            alert2("알림", "자산상세분류를 선택해주세요", "info", "확인");
            return false;
        }
    }


    data["categories"] = $("#categories").val();

    Swal.fire({
        title: '알림',
        html : '저장하시겠습니까?',
        icon : 'info',
        focusConfirm: false,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        showCancelButton: true,
        customClass: {
            popup: 'custom-width'
        },
    }).then((result) => {
        if (result.isConfirmed) {
            alert3("save");

            $.ajax({
                type: "POST",
                url: "/cable/eqp/saveEquipmentInfo",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(res) {
                    alert3Close();
                    if(!res.errorCode){
                        alert2("알림", "저장 중 오류가 발생했습니다. <br>관리자에게 문의하세요", "error", "확인");
                    }
                    else{
                        alert2("알림", "저장되었습니다.", "info", "확인", back);
                    }

                },
                error: function(error) {
                    alert2("알림", "저장 중 오류가 발생했습니다. <br>관리자에게 문의하세요", "error", "확인");
                }
            });
        }
    })
}
