let eqpRegisterPortColumn = [
    { field: '',     title: ''      , checkbox: true },
    { field: 'Host', title: 'Host'  , formatter: inputEqpLinkFormatter },
    { field: 'IP',   title: 'IP'    , formatter: inputEqpLinkFormatter },
    { field: 'Port', title: 'Port'  , formatter: inputEqpLinkFormatter }
];

$(function(){
    setDefaultDates(); // 화면 렌더링 시 날짜 컬럼들 현재날짜로 세팅
    getSelectConfig(); // 화면 렌더링 시 구성분류 선택박스 세팅

    // 장비분류 선택 시 선택박스 세팅
    $(document).ready(function() {
        $('#config_id').change(function(){     // 구성분류 > 자산분류
            const configValue = $(this).val();
            getSelectAsset(configValue);
        })
        $('#asset_id').change(function(){      // 자산분류 > 자산세부분류
            const assetValue = $(this).val();
            getSelectSub(assetValue);
        })
        $('#sub_id').change(function(){        // 자산세부분류 > 자산상세분류
            const subValue = $(this).val();
            getSelectDetail(subValue);
        })
    })

    $('#eqpLinkTable').bootstrapTable({
        columns: eqpRegisterPortColumn
    });
});



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

    if($("#eqp_name").val() === ""){
        alert2("알림", "장비명을 입력해주세요", "info", "확인");
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

    let data = {};
    let isValid = true;
    let errorMessage = "";

    document.querySelectorAll(
        `#section-equipment-basic-info input, #section-equipment-basic-info select,
        #section-equipment-category input, #section-equipment-category select,
        #section-equipment-operation-info input, #section-equipment-operation-info select,
        #section-equipment-details input, #section-equipment-details select`,
    ).forEach(input => {
        let value = input.value.trim();
        let name = input.name;
        let labelName = getLabelForInput(input);

        if (name === "acquisition_cost"){
            let acquisition_cost = removeComma(value);

            if (acquisition_cost === ''){
                acquisition_cost = 0;
            }

            if(isNaN(acquisition_cost) || Number(acquisition_cost) > 100000000000) {
                errorMessage += `${labelName} 숫자만 입력가능하며, 1000억 이하입니다.</br>`;
                isValid = false;
            }

            data[name] = acquisition_cost;
        }
        else{
            if (["eqp_name", "hostname", "model", "m_company", "primary_operator", "primary_outsourced_operator",
                "secondary_operator", "secondary_outsourced_operator", "operating_department", "cpu", "mem",
                "disk", "os_version", "dbrain_number", "serial_number", "installation_coordinates"].includes(name)) {
                if (value.length > 30) {
                    errorMessage += `${labelName} 30글자 초과할 수 없습니다.</br>`;
                    isValid = false;
                }
            }
            if ((name === "installation_units" || name === "equipment_size_units") && (isNaN(value) || Number(value) > 1000)) {
                errorMessage += `${labelName} 숫자만 입력가능하며, 1000 이하입니다.</br>`;
                isValid = false;
            }

            if (name.includes("date") && !isValidDate(value)) {
                errorMessage += `${labelName} 유효한 날짜여야 합니다.</br>`;
                isValid = false;
            }

            if(name != ""){
                if ((name === "installation_units") && (value === '')){
                    value = 0;
                }
                if ((name === "equipment_size_units") && (value=== '')){
                    value = 0;
                }

                data[name] = value;
            }
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

    data["categories"] = $("#categories").val(); // 장비 추가 시 서버에서 관리번호 생성할 때 자산세부분류 사용

    // 장비연결정보 추가
    const eqpLinkData = $("#eqpLinkTable").bootstrapTable('getData');
    if (eqpLinkData.length > 0) {

        let eqpLinkValid = true;
        let eqpLinkErrorMessage = "";

        eqpLinkData.forEach((item, index) => {
            let { Host, IP, Port } = item;
            eqpLinkErrorMessage += `장비연결정보${index + 1} [`
            if (!Host) {
                eqpLinkErrorMessage += ` Host `;
                eqpLinkValid = false;
            }
            if (!IP) {
                item.IP = '0.0.0.0';
            }
            if (!Port) {
                eqpLinkErrorMessage += ` Port `;
                eqpLinkValid = false;
            }

            eqpLinkErrorMessage += `] 가 비어있습니다.</br>`
        });

        if (!eqpLinkValid) {
            alert2("알림", eqpLinkErrorMessage, "error", "확인");
            return false;
        }


        data["eqpLink"] = eqpLinkData;
    }

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

/**
 * 장비관리 > 장비목록 > 장비추가 > 저장버튼
 * 저장하기 전 검증 실패시 에러메세지에 보여줄 항목 이름 조회
 */
function getLabelForInput(input) {
    const id = input.id;
    if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) {
            return label.textContent;
        }
    }
    return input.name; // label이 없으면 name을 사용
}