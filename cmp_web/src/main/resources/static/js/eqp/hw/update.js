let old_eqpLinkData = '';
let eqpLinkColumn = [
    { field: 'id',        title: 'id',        visible: false },
    { field: '',           title: ''         , checkbox: true },
    { field: 'host',         title: '호스트명'  , formatter: inputEqpLinkFormatter },
    { field: 'ip_address',   title: 'IP 주소'   , formatter: inputEqpLinkFormatter },
    { field: 'port',         title: '포트'      , formatter: inputEqpLinkFormatter }
];



// cable table column creation function
function createColumn(field, checkbox = false, title, type = 'default') {
    let column = {
        title: title,
        field: field,
        align: 'center',
        valign: 'middle',
        checkbox: checkbox
    };

    if (type === 'underline') {
        column.class = 'nowrap underline';
    } else {
        column.class = 'nowrap';
    }

    return column;
}

let selectedSoftwareRows = new Map();
let eqpSoftwareColumn = [
    createColumn('asset_category',              false, '자산분류'),
    createColumn('eqp_manage_id',               false, '관리번호'),
    createColumn('m_company',                   false, '제조사'),
    createColumn('model_name',                  false, '모델명'),
    createColumn('host_name',                   false, '호스트명'),
    createColumn('eqp_name',                    false, '구성자원명'),
    createColumn('dependent_config',            false, '종속 SW 여부'),
    createColumn('primary_operator',            false, '운영담당자'),
    createColumn('primary_outsourced_operator', false, '위탁운영담당자'),
];

function updateEqpSoftwareTable() {
    let data = Array.from(selectedSoftwareRows.values()).map(row => ({
        asset_category: row.asset_category,
        eqp_manage_id: row.eqp_manage_id,
        m_company: row.m_company,
        model_name: row.model_name,
        host_name: row.host_name,
        eqp_name: row.eqp_name,
        dependent_config: row.dependent_config,
        primary_operator: row.primary_operator,
        primary_outsourced_operator: row.primary_outsourced_operator,
    }));

    $('#eqpSoftwareSelectTable').bootstrapTable('load', data);
    $("#eqpSoftwareSelectTotalCnt").text("총 " + selectedSoftwareRows.size + "건")
}

function findRowIndexById(data, id) {
    return data.findIndex(row => row.eqp_manage_id === id);
}

$(function(){

    addComma(document.getElementById("acquisition_cost")); // 도입금액 콤마처리

    $('#eqpLinkTable').bootstrapTable({
        url: '/eqp/hw/selectEqpLinkList',
        method: 'post',
        queryParams: function(params) {
            let eqp_manage_id = $("#eqp_manage_id").val();
            params.searchData = {
                eqp_manage_id
            }
            return params;
        },
        pageSize: 5, columns: eqpLinkColumn, cache: false, undefinedText: "",
        pagination: true, sidePagination: 'server', checkboxHeader: true,
        classes: "txt-pd", clickToSelect: false, sortOrder: 'desc', sortName: 'ORDER',
        responseHandler: function(res) {
            return {
                rows: res.rows,
                total: res.total,
                errorCode: res.errorCode
            }
        },
        onLoadSuccess: function(res) {
            let errorCode = res.errorCode;
            if (!errorCode){
                alert2('알림', '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                return;
            }

            old_eqpLinkData = JSON.parse(JSON.stringify(res.rows));
        },
    });


    $('#eqpSoftwareTable').bootstrapTable({
        url: '/eqp/hw/equipmentSoftwareList',
        method: 'post',
        queryParams: function(params) {
            let searchInput = $("#searchInput").val();
            params.searchData = {
                searchInput
            }
            return params;
        },
        pageSize: 5, columns: eqpSoftwareColumn, cache: false, undefinedText: "",
        pagination: true, sidePagination: 'server', checkboxHeader: true,
        classes: "txt-pd", clickToSelect: false, sortOrder: 'desc', sortName: 'ORDER',
        responseHandler: function(res) {
            return {
                rows: res.rows,
                total: res.total,
                errorCode: res.errorCode
            }
        },
        onLoadSuccess: function(res) {
            let errorCode = res.errorCode;
            if (!errorCode) {
                alert2('알림', '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                return false;
            }

            $("#eqpSoftwareTotalCnt").text("총 " + res.total + "건")

            // 로드가 완료되면 선택된 행을 반영
            $('#eqpSoftwareTable').find('tr').each(function() {
                let dataIndex = $(this).data('index');
                let rowData = res.rows;
                if (selectedSoftwareRows.has(rowData.eqp_manage_id)) {
                    $(this).addClass('selected-row');
                }
            });

            // 로드가 완료되면 선택된 행을 반영
            res.rows.forEach((row, index) => {
                if (selectedSoftwareRows.has(row.eqp_manage_id)) {
                    $('#eqpSoftwareTable').find('tr[data-index="' + index + '"]').addClass('selected-row');
                }
            });
        },
        onClickCell: function(field, value, row, $element) {
            const rowIndex = findRowIndexById($('#eqpSoftwareTable').bootstrapTable('getData'), row.eqp_manage_id);
            if (selectedSoftwareRows.has(row.eqp_manage_id)) {
                selectedSoftwareRows.delete(row.eqp_manage_id);
                if (rowIndex !== -1) {
                    $('#eqpSoftwareTable').find('tr[data-index="' + rowIndex + '"]').removeClass('selected-row');
                }
            } else {
                selectedSoftwareRows.set(row.eqp_manage_id, row);
                if (rowIndex !== -1) {
                    $('#eqpSoftwareTable').find('tr[data-index="' + rowIndex + '"]').addClass('selected-row');
                }
            }
            updateEqpSoftwareTable();
        }
    });

    $('#eqpSoftwareSelectTable').bootstrapTable({
        url: '/eqp/hw/equipmentDetailSoftwareList',
        method: 'post',
        queryParams: function(params) {
            let eqp_manage_id = $("#eqp_manage_id").val();
            params.searchData = {
                eqp_manage_id
            }
            return params;
        },
        pageSize: 5, columns: eqpSoftwareColumn, cache: false, undefinedText: "",
        pagination: true, sidePagination: 'server', checkboxHeader: true,
        classes: "txt-pd", clickToSelect: false, sortOrder: 'desc', sortName: 'ORDER',
        responseHandler: function(res) {
            return {
                rows: res.rows,
                total: res.total,
                errorCode: res.errorCode
            }
        },
        onLoadSuccess: function(res) {
            let errorCode = res.errorCode;
            if (!errorCode){
                alert2('알림', '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
            }

            $("#eqpSoftwareSelectTotalCnt").text("총 " + res.total + "건")

            let rows = res.rows;
            rows.forEach(row => {
                selectedSoftwareRows.set(row.eqp_manage_id, row)

                const rowIndex = findRowIndexById($('#eqpSoftwareTable').bootstrapTable('getData'), row.eqp_manage_id);
                if (rowIndex !== -1) {
                    $('#eqpSoftwareTable').find('tr[data-index="' + rowIndex + '"]').addClass('selected-row');
                }
            })

            updateEqpSoftwareTable();
        },
        onClickCell: function(field, value, row, $element) {
            selectedSoftwareRows.delete(row.eqp_manage_id);
            updateEqpSoftwareTable();
            const rowIndex = findRowIndexById($('#eqpSoftwareTable').bootstrapTable('getData'), row.eqp_manage_id);
            if (rowIndex !== -1) {
                $('#eqpSoftwareTable').find('tr[data-index="' + rowIndex + '"]').removeClass('selected-row');
            }
        }
    });
});

// 장비분류 선택 시 선택박스 세팅
$('#asset_id').change(function(){      // 자산분류 > 자산세부분류
    const assetValue = $(this).val();
    getSelectSub(assetValue);
})
$('#sub_id').change(function(){        // 자산세부분류 > 자산상세분류
    const subValue = $(this).val();
    getSelectDetail(subValue);
})


/**
 * 장비관리 > 장비목록 > 장비수정 > 저장버튼
 * 저장 버튼을 클릭했을 때 호출되는 함수입니다.
 */
function saveData() {

    if($("#eqp_name").val() === ""){
        alert2("알림", "구성자원명을 입력해주세요", "info", "확인");
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
            if(name != ""){
                if (["eqp_name", "hostname", "model", "m_company",
                     "primary_operator", "primary_outsourced_operator",
                     "secondary_operator", "secondary_outsourced_operator",
                     "operating_department", "os_version", "dbrain_number", "license_number"].includes(name)) {
                    // 글자수 변경필요!!!
                    if (value.length > 50) {
                        errorMessage += `${labelName} 50글자 초과할 수 없습니다.</br>`;
                        isValid = false;
                    }
                }

                if ((name === "installation_units") && (value === '')){
                    value = 0;
                }
                if ((name === "equipment_size_units") && (value=== '')){
                    value = 0;
                }

                data[name] = value;

                if (name.includes("date") && !isValidDate(value)) {
                    errorMessage += `${labelName} 유효한 날짜여야 합니다.</br>`;
                    isValid = false;
                }
            }
        }
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
    if(eqpLinkData.length == 0){
        alert2("알림", "장비연결정보는 한 개 이상 등록되어야 합니다.", "error", "확인");
        return false;
    }

    let eqpLinkValid = true;
    let eqpLinkErrorMessage = "";

    eqpLinkData.forEach((item, index) => {
        let { host, ip_address, port } = item;
        let msg = `장비연결정보${index + 1} [`
        if (!host) {
            msg += ` host `;
            eqpLinkValid = false;
        }
        if (!ip_address) {
            item.ip_address = '0.0.0.0';
        }
        if (!port) {
            msg += ` Port `;
            eqpLinkValid = false;
        }

        msg += `] 가 비어있습니다.</br>`

        if (!eqpLinkValid) {
            eqpLinkErrorMessage = msg;
        }

        let ip_address_arr = item.ip_address.split(".");
        ip_address_arr = ip_address_arr.map(ele => {
            if (ele.length >= 2 && ele.startsWith("0")) {
                return ele.substring(1);
            }
            return ele;
        });
        item.ip_address = ip_address_arr.join(".");
    });

    if (!eqpLinkValid) {
        alert2("알림", eqpLinkErrorMessage, "error", "확인");
        return false;
    }

    // 추가된 항목
    const eqpLinkAdd = eqpLinkData.filter(newItem => !old_eqpLinkData.some(oldItem => oldItem.id === newItem.id) );

    // 제거된 항목
    const eqpLinkDelete = old_eqpLinkData.filter(oldItem => !eqpLinkData.some(newItem => newItem.id === oldItem.id) );

    // 수정된 항목
    const eqpLinkUpdate = eqpLinkData.filter(newItem => {
        const oldItem = old_eqpLinkData.find(oldItem => oldItem.id === newItem.id);
        const isDifferent = oldItem && (
            oldItem.host !== newItem.host ||
            oldItem.ip_address !== newItem.ip_address ||
            oldItem.port !== newItem.port
        );

        return isDifferent ? newItem : null;
    }).filter(item => item !== null);

    data["eqpLinkAdd"]    = eqpLinkAdd;
    data["eqpLinkDelete"] = eqpLinkDelete;
    data["eqpLinkUpdate"] = eqpLinkUpdate;
    data["eqp_manage_id"] = $("#eqp_manage_id").val();
    data["config_id"] = "1"; // 구성분류 : H/W

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
                url: "/eqp/hw/updateEquipmentInfo",
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
