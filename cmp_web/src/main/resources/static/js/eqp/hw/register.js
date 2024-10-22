let eqpLinkColumn = [
    { field: '',             title: ''         , checkbox: true },
    { field: 'host',         title: '호스트명'  , formatter: inputEqpLinkFormatter },
    { field: 'ip_address',   title: 'IP 주소'   , formatter: inputEqpLinkFormatter },
    { field: 'port',         title: '포트'      , formatter: inputEqpLinkFormatter }
];


function createColumn(field, checkbox = false, title, type = '', formatter = '') {
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

    if (formatter != '') {
        column.formatter = formatter;
    }

    return column;
}

function eqpHardwarePortFormatter(value, row, index) {
    return `<input type="text" class="form-control" value="${value || ''}"
            data-row-index="${index}" data-field="port_number"
            oninput="updateEqpHardwarePortInputData(this, ${index}, 'port_number')">`;
}

function updateEqpHardwarePortInputData(input, index, field) {
    let $table = $('#eqpHardwareTable');
    let data = $table.bootstrapTable('getData');

    data[index][field] = input.value;
}

let eqpHardwareColumn = [
    createColumn('',                            true,  ''),
    createColumn('asset_category',              false, '자산분류'),
    createColumn('installation_coordinates',    false, '설치좌표'),
    createColumn('eqp_manage_id',               false, '관리번호'),
    createColumn('m_company',                   false, '제조사'),
    createColumn('model_name',                  false, '모델명'),
    createColumn('host_name',                   false, '호스트명'),
    createColumn('eqp_name',                    false, '구성자원명'),
    createColumn('primary_operator',            false, '운영담당자'),
    createColumn('primary_outsourced_operator', false, '위탁운영담당자'),
    createColumn('port_number',                 false, '포트번호', '', eqpHardwarePortFormatter)
];

let eqpSoftwareColumn = [
    createColumn('',                            true,  ''),
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

let selectedHardwareRows = new Map();
let selectedSoftwareRows = new Map();

function updateEqpHardwareTable() {
    let data = Array.from(selectedHardwareRows.values()).map(row => ({
        asset_category: row.asset_category,
        installation_coordinates: row.installation_coordinates,
        eqp_manage_id: row.eqp_manage_id,
        m_company: row.m_company,
        model_name: row.model_name,
        host_name: row.host_name,
        eqp_name: row.eqp_name,
        primary_operator: row.primary_operator,
        primary_outsourced_operator: row.primary_outsourced_operator,
    }));

    $('#eqpHardwareSelectTable').bootstrapTable('load', data);
    $("#eqpHardwareSelectTotalCnt").text("총 " + selectedHardwareRows.size + "건")
}

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
    setDefaultDates(); // 화면 렌더링 시 날짜 컬럼들 현재날짜로 세팅
    getSelectConfig(); // 화면 렌더링 시 구성분류 선택박스 세팅

    // 장비분류 선택 시 선택박스 세팅
    getSelectAsset("1"); // 구성분류 > 자산분류(H/W에 해당하는 항목만)

    $('#asset_id').change(function(){      // 자산분류 > 자산세부분류
        const assetValue = $(this).val();
        getSelectSub(assetValue);
    })
    $('#sub_id').change(function(){        // 자산세부분류 > 자산상세분류
        const subValue = $(this).val();
        getSelectDetail(subValue);
    })

    /*
    $('#eqpLinkTable').bootstrapTable({
        columns: eqpLinkColumn
    });

    $('#eqpHardwareTable').bootstrapTable({
        url: '/eqp/hw/equipmentHardwareList',
        method: 'post',
        queryParams: function(params) {
            let searchInput = $("#searchInput").val();
            params.searchData = {
                searchInput
            }
            return params;
        },
        pageSize: 5, columns: eqpHardwareColumn, cache: false, undefinedText: "",
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

            $("#eqpHardwareTotalCnt").text("총 " + res.total + "건")

            res.rows.forEach((row, index) => {
                if (selectedHardwareRows.has(row.eqp_manage_id)) {
                    $('#eqpHardwareTable').find('tr[data-index="' + index + '"]').addClass('selected-row');
                }
            });

            $('#eqpHardwareTable').find('tr').each(function() {
                let dataIndex = $(this).data('index');
                let rowData = res.rows;
                if (selectedHardwareRows.has(rowData.eqp_manage_id)) {
                    $(this).addClass('selected-row');
                }
            });

        },
        onClickCell: function(field, value, row, $element) {
            const rowIndex = findRowIndexById($('#eqpHardwareTable').bootstrapTable('getData'), row.eqp_manage_id);
            if (selectedHardwareRows.has(row.eqp_manage_id)) {
                selectedHardwareRows.delete(row.eqp_manage_id);
                if (rowIndex !== -1) {
                    $('#eqpHardwareTable').find('tr[data-index="' + rowIndex + '"]').removeClass('selected-row');
                }
            } else {
                selectedHardwareRows.set(row.eqp_manage_id, row);
                if (rowIndex !== -1) {
                    $('#eqpHardwareTable').find('tr[data-index="' + rowIndex + '"]').addClass('selected-row');
                }
            }
            updateEqpHardwareTable();
        }
    });


    $('#eqpHardwareSelectTable').bootstrapTable({
        columns: eqpHardwareColumn,
        data: [],
        pageSize: 5, pagination: true,
        onClickCell: function(field, value, row, $element) {
            selectedHardwareRows.delete(row.eqp_manage_id);
            updateEqpHardwareTable();
            const rowIndex = findRowIndexById($('#eqpHardwareTable').bootstrapTable('getData'), row.eqp_manage_id);
            if (rowIndex !== -1) {
                $('#eqpHardwareTable').find('tr[data-index="' + rowIndex + '"]').removeClass('selected-row');
            }
        }
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

            res.rows.forEach((row, index) => {
                if (selectedSoftwareRows.has(row.eqp_manage_id)) {
                    $('#eqpSoftwareTable').find('tr[data-index="' + index + '"]').addClass('selected-row');
                }
            });

            $('#eqpSoftwareTable').find('tr').each(function() {
                let dataIndex = $(this).data('index');
                let rowData = res.rows;
                if (selectedSoftwareRows.has(rowData.eqp_manage_id)) {
                    $(this).addClass('selected-row');
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
        columns: eqpSoftwareColumn,
        data: [],
        pageSize: 5, pagination: true,
        onClickCell: function(field, value, row, $element) {
            selectedSoftwareRows.delete(row.eqp_manage_id);
            updateEqpSoftwareTable();
            const rowIndex = findRowIndexById($('#eqpSoftwareTable').bootstrapTable('getData'), row.eqp_manage_id);
            if (rowIndex !== -1) {
                $('#eqpSoftwareTable').find('tr[data-index="' + rowIndex + '"]').removeClass('selected-row');
            }
        }
    });
*/

    $('#eqpHardwareSelectTable').bootstrapTable({
        columns: eqpHardwareColumn,
        data: [],
        pageSize: 5, pagination: true,
        onClickCell: function(field, value, row, $element) {
            let $checkbox = $element.closest('tr').find('.bs-checkbox input[type="checkbox"]');
            if (($checkbox.length) && (field != 'port_number')) {
                $checkbox.click();
            }
        }
    });

    $('#eqpSoftwareSelectTable').bootstrapTable({
        columns: eqpSoftwareColumn,
        data: [],
        pageSize: 5, pagination: true,
        onClickCell: function(field, value, row, $element) {
            let $checkbox = $element.closest('tr').find('.bs-checkbox input[type="checkbox"]');
            if (($checkbox.length) && (field != 'port_number')) {
                $checkbox.click();
            }
        }
    });
});

/**
 * 장비관리 > 장비목록 > 장비추가
 * 맨 처음 페이지 렌더링 될 때 날짜 항목들 현재값으로 설정
 */
function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식의 현재 날짜

    ['asset_acquisition_date', 'eol_status', 'eos_status'].forEach(id => {
        const element = document.getElementById(id);
        if (!element.value) {
            element.value = today;
        }
    });
}

function addEquipmentHardwareRow(){
    Swal.fire({
        title: 'H/W 장비 연결정보',
        html: generateEquipmentHardwareRowHTML(),
        focusConfirm: false,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        showCancelButton: true,
        allowOutsideClick: false,
        customClass: {
            popup: 'custom-width'
        },
        didOpen: () => {
            $('#eqpHardwareTable').bootstrapTable({
                url: '/eqp/hw/equipmentHardwareList',
                method: 'post',
                queryParams: function(params) {
                    let searchInput = $("#searchInput").val();
                    params.searchData = { searchInput };
                    return params;
                },
                pageSize: 5, columns: eqpHardwareColumn, cache: false, undefinedText: "",
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

                    $("#eqpHardwareTotalCnt").text("총 " + res.total + "건")

                },
                onClickCell: function(field, value, row, $element) {
                    let $checkbox = $element.closest('tr').find('.bs-checkbox input[type="checkbox"]');
                    if (($checkbox.length) && (field != 'port_number')) {
                        $checkbox.click();
                    }
                }
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let selectedRows = $('#eqpHardwareTable').bootstrapTable('getSelections');
            if (selectedRows.length > 0) {
                $('#eqpHardwareSelectTable').bootstrapTable('append', selectedRows);
            } else {
                alert2('알림', '선택된 항목이 없습니다.', 'error', '확인');
            }
        }
    });
}

function generateEquipmentHardwareRowHTML(){
    return `
        <div id="equipment-connection-info">
            <div class="equipment-connection-title">
                <h2>H/W 장비연결정보 선택</h2>
            </div>
            <div class="tbl-bootstrap-wrap">
                <table id="eqpHardwareTable"></table>
            </div>
        </div>
    `;
}

function deleteEquipmentHardwareRow(){
    let $table = $('#eqpHardwareSelectTable');
    let selectedRows = $table.bootstrapTable('getSelections');

    if (selectedRows.length > 0) {
        let eqp_manage_id = selectedRows.map(row => row.eqp_manage_id); // 각 행에 유일한 ID가 있다고 가정
        $table.bootstrapTable('remove', {
            field: 'eqp_manage_id',
            values: eqp_manage_id
        });
    } else {
        alert2('알림', '선택된 항목이 없습니다.', 'error', '확인');
    }
}

function addEquipmentSoftwareRow(){
    Swal.fire({
        title: 'S/W 장비 연결정보',
        html: generateEquipmentSoftwareRowHTML(),
        focusConfirm: false,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        showCancelButton: true,
        allowOutsideClick: false,
        customClass: {
            popup: 'custom-width'
        },
        didOpen: () => {
            $('#eqpSoftwareTable').bootstrapTable({
                url: '/eqp/hw/equipmentSoftwareList',
                method: 'post',
                queryParams: function(params) {
                    let searchInput = $("#searchInput").val();
                    params.searchData = { searchInput };
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

                },
                onClickCell: function(field, value, row, $element) {
                    let $checkbox = $element.closest('tr').find('.bs-checkbox input[type="checkbox"]');
                    if (($checkbox.length) && (field != 'port_number')) {
                        $checkbox.click();
                    }
                }
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let selectedRows = $('#eqpSoftwareTable').bootstrapTable('getSelections');
            if (selectedRows.length > 0) {
                $('#eqpSoftwareSelectTable').bootstrapTable('append', selectedRows);
            } else {
                alert2('알림', '선택된 항목이 없습니다.', 'error', '확인');
            }
        }
    });
}

function generateEquipmentSoftwareRowHTML(){
    return `
        <div id="equipment-connection-info">
            <div class="equipment-connection-title">
                <h2>S/W 장비연결정보 선택</h2>
            </div>
            <div class="tbl-bootstrap-wrap">
                <table id="eqpSoftwareTable"></table>
            </div>
        </div>
    `;
}

function deleteEquipmentSoftwareRow(){
    let $table = $('#eqpSoftwareSelectTable');
    let selectedRows = $table.bootstrapTable('getSelections');

    if (selectedRows.length > 0) {
        let eqp_manage_id = selectedRows.map(row => row.eqp_manage_id); // 각 행에 유일한 ID가 있다고 가정
        $table.bootstrapTable('remove', {
            field: 'eqp_manage_id',
            values: eqp_manage_id
        });
    } else {
        alert2('알림', '선택된 항목이 없습니다.', 'error', '확인');
    }
}


/**
 * 장비관리 > 장비목록 > 장비추가 > 저장버튼
 * 저장 버튼을 클릭했을 때 호출되는 함수입니다.
 */
function saveData() {

    if($("#eqp_name").val() === ""){
        alert2("알림", "구성자원명을 입력해주세요", "info", "확인");
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

    if($("#serial_number").val() === ""){
        alert2("알림", "시리얼 번호를 입력해주세요", "info", "확인");
        return false;
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
                // 글자수 변경필요!!!
                if (value.length > 50) {
                    errorMessage += `${labelName} 50글자 초과할 수 없습니다.</br>`;
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
    /*
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

    data["eqpLink"] = eqpLinkData;
    */
    data["config_id"] = "1"; // 구성분류 : H/W

    /*
    let eqpSoftwareSelectData = $("#eqpSoftwareSelectTable").bootstrapTable("getData");
    if(eqpSoftwareSelectData.length == 0){
        alert2("알림", "소프트웨어는 1건 이상 등록되어야 합니다.", "info", "확인");
        return false;
    }

    data["eqpSoftware"] = eqpSoftwareSelectData; // 소프트웨어 등록정보
    */

    Swal.fire({
        title: '알림',
        html : '저장하시겠습니까?',
        icon : 'info',
        focusConfirm: false,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            alert3("save");

            $.ajax({
                type: "POST",
                url: "/eqp/hw/saveEquipmentInfo",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(res) {
                    alert3Close();
                    if(!res.errorCode){
                        alert2("알림", "저장 중 오류가 발생했습니다. <br>관리자에게 문의하세요", "error", "확인");
                        return false;
                    }

                    alert2("알림", "저장되었습니다.", "info", "확인", back);
                },
                error: function(error) {
                    alert2("알림", "저장 중 오류가 발생했습니다. <br>관리자에게 문의하세요", "error", "확인");
                }
            });
        }
    })
}
