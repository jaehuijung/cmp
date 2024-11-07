
/**
 * 장비 연결정보, 소프트웨어 등록정보 테이블을 새로고침하는 함수
 */
function tableRefresh(id){
    $(id).bootstrapTable('refresh');
}

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

    if (field === 'dependent_config') {
        column.formatter = function(value, row, index) {
            if (value === '1') {
                return '공개';
            } else {
                return '상용';
            }
        };
    }

    if (formatter != '') {
        column.formatter = formatter;
    }

    return column;
}

function createCommonEqpHardwareColumns(portFormatter, tableId) {
    return [
        ...(tableId === '#eqpHardwareSelectTable' ? [createColumn('', true, '', '')] : []),
        ...(tableId === '#eqpHardwareSelectTable' ? [createColumn('eqp_port', false, '장비포트번호', '', (value, row, index) => portFormatter(value, row, index, tableId))] : []),
        createColumn('asset_category', false, '자산분류'),
        createColumn('installation_coordinates', false, '설치좌표'),
        createColumn('eqp_manage_id', false, '관리번호'),
        createColumn('m_company', false, '제조사'),
        createColumn('model_name', false, '모델명'),
        createColumn('host_name', false, '호스트명'),
        createColumn('eqp_name', false, '구성자원명'),
        createColumn('primary_operator', false, '운영담당자'),
        createColumn('primary_outsourced_operator', false, '위탁운영담당자'),
        ...(tableId === '#eqpHardwareSelectTable' ? [createColumn('port_number', false, '포트번호', '', (value, row, index) => portFormatter(value, row, index, tableId))] : []),
    ];
}

let eqpHardwareColumn = createCommonEqpHardwareColumns(eqpHardwarePortFormatter, '#eqpHardwareTable');
let eqpHardwareSelectColumn = createCommonEqpHardwareColumns(eqpHardwarePortFormatter, '#eqpHardwareSelectTable');

function eqpHardwarePortFormatter(value, row, index, tableId) {
    return `<input type="text" class="form-control" value="${value || ''}"
            data-row-index="${index}" data-field="port_number"
            oninput="updateEqpHardwarePortInputData(this, ${index}, 'port_number', '${tableId}')">`;
}

function updateEqpHardwarePortInputData(input, index, field, tableId) {
    let $table = $(tableId);
    let data = $table.bootstrapTable('getData');

    data[index][field] = input.value;
}


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

    $('#eqpHardwareSelectTable').bootstrapTable({
        data: [],
        columns: eqpHardwareSelectColumn, pageSize: 5, pagination: true,
        onClickCell: function(field, value, row, $element) {
            let $checkbox = $element.closest('tr').find('.bs-checkbox input[type="checkbox"]');
            if (($checkbox.length) && (field != 'port_number') && (field != 'eqp_port')) {
                $checkbox.click();
            }
        }
    });

    $('#eqpSoftwareSelectTable').bootstrapTable({
        data: [],
        columns: eqpSoftwareColumn, pageSize: 5, pagination: true,
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



/*
    하드웨어 등록정보 관련 ... 나중에 주석 추가
*/
let selectedRow = null;

function addEquipmentHardwareRow(){
    let selectedEqpHardware = [];
    let initLoadChk = false;
    Swal.fire({
        title: 'H/W 장비 연결정보',
        html: generateEquipmentHardwareRowHTML(),
        focusConfirm: false,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        showCancelButton: true,
        allowOutsideClick: false,
        heightAuto: false,
        customClass: {
            popup: 'custom-width'
        },
        didOpen: () => {

            $('#searchHardwareInput').keyup(function(e) {
                if(e.which == 13) {
                    $('#eqpHardwareTable').bootstrapTable('refresh');
                }
            });

            $('#eqpHardwareTable').bootstrapTable({
                url: '/eqp/hw/equipmentHardwareList',
                method: 'post',
                queryParams: function(params) {
                    let searchHardwareInput = $("#searchHardwareInput").val();
                    params.searchData = { searchHardwareInput };
                    return params;
                },
                pageSize: 10, columns: eqpHardwareColumn, cache: false, undefinedText: "",
                pagination: true, sidePagination: 'client', checkboxHeader: true,
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
                    if (selectedRow) {
                        // 기존 선택된 행의 클래스 제거
                        $('#eqpHardwareTable').find('tr[data-index="' + $('#eqpHardwareTable').bootstrapTable('getData').indexOf(selectedRow) + '"]').removeClass('selected-row');
                    }

                    selectedRow = row;
                    // 새로운 선택된 행에 클래스 추가
                    $('#eqpHardwareTable').find('tr[data-index="' + $('#eqpHardwareTable').bootstrapTable('getData').indexOf(selectedRow) + '"]').addClass('selected-row');

                },

            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (selectedRow) {
                $('#eqpHardwareSelectTable').bootstrapTable('append', selectedRow);
                let updateLen = $('#eqpHardwareSelectTable').bootstrapTable('getData').length;
                $("#eqpHardwareSelectTotalCnt").text("총 " + updateLen + "건");
            } else {
                alert2('알림', '선택된 항목이 없습니다.', 'error', '확인');
            }
        }
    });
}

function generateEquipmentHardwareRowHTML(){
    return `
        <div class="contentCard">
            <div class="contentCardWrap">
                <div class="contentCardTitle">
                    <h2>▪️ 장비 연결정보 선택</h2>
                </div>
                <div style='display: flex; justify-content: space-between; align-items: flex-end;'>
                    <div>
                        <p class="totalCnt" id="eqpHardwareTotalCnt"></p>
                    </div>
                    <div class="searchWordWrap">
                        <div class="searchWordInput">
                            <label class="searchTitle" for="searchHardwareInput">검색어</label>
                            <input type="text"    class="searchInput" id="searchHardwareInput" placeholder="검색어를 입력하세요"/>
                            <button type="button" class="searchButton" onclick="tableRefresh('#eqpHardwareTable');">검색</button>
                        </div>
                    </div>
                </div>
                <div class="tbl-bootstrap-wrap">
                    <table id="eqpHardwareTable"></table>
                </div>
            </div>
        </div>
    `;
}

function deleteEquipmentHardwareRow(){
    let $table = $('#eqpHardwareSelectTable');
    let selectedRows = $table.bootstrapTable('getSelections');

    if (selectedRows) {
        let selectedIndices = selectedRows.map(row => $table.bootstrapTable('getData').indexOf(row));
        selectedIndices.sort((a, b) => b - a);

        selectedIndices.forEach(index => {
            $table.bootstrapTable('remove', {
                field: '$index',
                values: [index]
            });
        });

        let rows = $table.bootstrapTable('getData');
        $("#eqpHardwareSelectTotalCnt").text("총 " + rows.length + "건");
    } else {
        alert2('알림', '선택된 항목이 없습니다.', 'error', '확인');
    }
}

/*
    소프트웨어 등록정보 관련
*/
function addEquipmentSoftwareRow(){
    let selectedEqpSoftware = [];
    Swal.fire({
        html: generateEquipmentSoftwareRowHTML(),
        focusConfirm: false,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        showCancelButton: true,
        allowOutsideClick: false,
        heightAuto: false,
        customClass: {
            popup: 'custom-width'
        },
        didOpen: () => {
            $('#searchSoftwareInput').keyup(function(e) {
                if(e.which == 13) {
                    $('#eqpSoftwareTable').bootstrapTable('refresh');
                }
            });

            $('#eqpSoftwareTable').bootstrapTable({
                url: '/eqp/hw/equipmentSoftwareList',
                method: 'post',
                queryParams: function(params) {
                    let searchSoftwareInput = $("#searchSoftwareInput").val();
                    params.searchData = { searchSoftwareInput };
                    return params;
                },
                pageSize: 10, columns: eqpSoftwareColumn, cache: false, undefinedText: "",
                pagination: true, sidePagination: 'client', checkboxHeader: true,
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

                    let selectedRows = $('#eqpSoftwareSelectTable').bootstrapTable('getData');
                    if (selectedRows.length > 0) {
                        res.rows.forEach((row, index) => {
                            let matchedRow = selectedRows.find(selected => selected.eqp_manage_id === row.eqp_manage_id);
                            if (matchedRow) {
                                $('#eqpSoftwareTable').bootstrapTable('check', index);
                            }
                        });
                    }

                    res.rows.forEach((row, index) => {
                        if (selectedEqpSoftware.find(selected => selected.eqp_manage_id === row.eqp_manage_id)) {
                            $('#eqpSoftwareTable').bootstrapTable('check', index);
                        }
                    });
                },
                onClickCell: function(field, value, row, $element) {
                    let $checkbox = $element.closest('tr').find('.bs-checkbox input[type="checkbox"]');
                    if (($checkbox.length) && (field != 'port_number')) {
                        $checkbox.click();
                    }
                },
                onCheck: function (row) {
                    if (!selectedEqpSoftware.some(selected => selected.eqp_manage_id === row.eqp_manage_id)) {
                        selectedEqpSoftware.push(row);
                    }
                },
                onUncheck: function (row) {
                    selectedEqpSoftware = selectedEqpSoftware.filter(selected => selected.eqp_manage_id !== row.eqp_manage_id);
                },
                onCheckAll: function(rows) {
                    rows.forEach(row => {
                        if (!selectedEqpSoftware.some(selected => selected.eqp_manage_id === row.eqp_manage_id)) {
                            selectedEqpSoftware.push(row);
                        }
                    });
                },
                onUncheckAll: function(rows) {
                    rows.forEach(row => {
                        selectedEqpSoftware = selectedEqpSoftware.filter(selected => selected.eqp_manage_id !== row.eqp_manage_id);
                    });
                }
            });
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (selectedEqpSoftware.length > 0) {
                $('#eqpSoftwareSelectTable').bootstrapTable('removeAll');
                $('#eqpSoftwareSelectTable').bootstrapTable('append', selectedEqpSoftware);

                let totalPages = Math.ceil(selectedEqpSoftware.length / $('#eqpSoftwareSelectTable').bootstrapTable('getOptions').pageSize);
                for (let page = totalPages; page > 0; page--) {
                    $('#eqpSoftwareSelectTable').bootstrapTable('selectPage', page);
                    $('#eqpSoftwareSelectTable').bootstrapTable('uncheckAll');
                }

                $("#eqpSoftwareSelectTotalCnt").text("총 " + selectedEqpSoftware.length + "건");
            } else {
                alert2('알림', '선택된 항목이 없습니다.', 'error', '확인');
            }
        }
    });
}

function generateEquipmentSoftwareRowHTML(){
    return `
        <div class="contentCard">
            <div class="contentCardWrap">
                <div class="contentCardTitle">
                    <h2>▪️ 소프트웨어 등록정보 선택</h2>
                </div>
                <div style='display: flex; justify-content: space-between; align-items: flex-end;'>
                    <div>
                        <p class="totalCnt" id="eqpSoftwareTotalCnt"></p>
                    </div>
                    <div class="searchWordWrap">
                        <div class="searchWordInput">
                            <label class="searchTitle" for="searchSoftwareInput">검색어</label>
                            <input type="text"    class="searchInput" id="searchSoftwareInput" placeholder="검색어를 입력하세요"/>
                            <button type="button" class="searchButton" onclick="tableRefresh('#eqpSoftwareTable');">검색</button>
                        </div>
                    </div>
                </div>
                <div class="tbl-bootstrap-wrap">
                    <table id="eqpSoftwareTable"></table>
                </div>
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

        let rows = $table.bootstrapTable('getData');
        $("#eqpSoftwareSelectTotalCnt").text("총 " + rows.length + "건")
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
        `.contentCardWrap input, .contentCardWrap select`,
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
                     "operating_department", "cpu", "mem", "disk", "os_version",
                     "dbrain_number", "serial_number", "installation_coordinates"].includes(name)) {
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

                if ((name === "installation_units") && (value === '')){
                    value = 0;
                }
                if ((name === "equipment_size_units") && (value=== '')){
                    value = 0;
                }

                data[name] = value;
            }
        }
    });

    data["ip_address"] = combineIP(); // ip_block1 ~ ip_block4까지 구분자 붙여서 ip_address 문자열 생성

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
    data["config_id"] = "1"; // 구성분류 : H/W

    // 얘네는 있을 수도 있고 없을 수도 있고
    data["eqpHardwareSelectList"] = $("#eqpHardwareSelectTable").bootstrapTable("getData"); // 장비연결정보
    data["eqpSoftwareSelectList"] = $("#eqpSoftwareSelectTable").bootstrapTable("getData");  // 소프트웨어 등록정보

    Swal.fire({
        title: '알림',
        html : '저장하시겠습니까?',
        icon : 'info',
        focusConfirm: false,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        showCancelButton: true,
        heightAuto: false,
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
