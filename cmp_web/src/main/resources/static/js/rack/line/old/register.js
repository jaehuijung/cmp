
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

let lineStartColumn = [
    createColumn('asset_category',              false, '자산분류'),
    createColumn('installation_coordinates',    false, '설치좌표'),
    createColumn('eqp_manage_id',               false, '관리번호'),
    createColumn('m_company',                   false, '제조사'),
    createColumn('model_name',                  false, '모델명'),
    createColumn('host_name',                   false, '호스트명'),
    createColumn('eqp_name',                    false, '구성자원명'),
    // createColumn('primary_operator',            false, '운영담당자'),
    createColumn('primary_outsourced_operator', false, '운영사용자'),
];

let lineEndColumn = [
    createColumn('eqp_port',                    false, '장비포트번호'),
    createColumn('asset_category',              false, '자산분류'),
    createColumn('installation_coordinates',    false, '설치좌표'),
    createColumn('eqp_manage_id',               false, '관리번호'),
    createColumn('m_company',                   false, '제조사'),
    createColumn('model_name',                  false, '모델명'),
    createColumn('host_name',                   false, '호스트명'),
    createColumn('eqp_name',                    false, '구성자원명'),
    createColumn('eqp_link_port',               false, '연결장비포트번호'),
    //createColumn('primary_operator',            false, '운영담당자'),
    createColumn('primary_outsourced_operator', false, '운영사용자'),
];

let selectedStartRow = null;
let selectedEndRow = null;

let lineStartSelectColumn = [
    [
        { title: '출발지(Start)', align: 'center', valign: 'middle', colspan: 9 },
    ],
    [
        createColumn('s_asset_category',              false, '자산분류'),
        createColumn('s_installation_coordinates',    false, '설치좌표'),
        createColumn('s_eqp_manage_id',               false, '관리번호'),
        createColumn('s_m_company',                   false, '제조사'),
        createColumn('s_model_name',                  false, '모델명'),
        createColumn('s_host_name',                   false, '호스트명'),
        createColumn('s_eqp_name',                    false, '구성자원명'),
        createColumn('s_port',                        false, '포트번호'),
        // createColumn('s_primary_operator',            false, '운영담당자'),
        createColumn('s_primary_outsourced_operator', false, '운영사용자'),
    ]
];

let lineEndSelectColumn = [
    [
        { title: '목적지(End)',   align: 'center', valign: 'middle', colspan: 9 },
    ],
    [
        createColumn('e_asset_category',              false, '자산분류'),
        createColumn('e_installation_coordinates',    false, '설치좌표'),
        createColumn('e_eqp_manage_id',               false, '관리번호'),
        createColumn('e_m_company',                   false, '제조사'),
        createColumn('e_model_name',                  false, '모델명'),
        createColumn('e_host_name',                   false, '호스트명'),
        createColumn('e_eqp_name',                    false, '구성자원명'),
        createColumn('e_port',                        false, '포트번호'),
        // createColumn('e_primary_operator',            false, '운영담당자'),
        createColumn('e_primary_outsourced_operator', false, '운영사용자'),
    ]
];

function updateStartSelectTable() {
    let data = [{
        s_asset_category: selectedStartRow ? selectedStartRow.asset_category : "",
        s_installation_coordinates: selectedStartRow ? selectedStartRow.installation_coordinates : "",
        s_eqp_manage_id: selectedStartRow ? selectedStartRow.eqp_manage_id : "",
        s_m_company: selectedStartRow ? selectedStartRow.m_company : "",
        s_model_name: selectedStartRow ? selectedStartRow.model_name : "",
        s_host_name: selectedStartRow ? selectedStartRow.host_name : "",
        s_eqp_name: selectedStartRow ? selectedStartRow.eqp_name : "",
        s_port: selectedStartRow ? selectedEndRow.eqp_port : "",
        //s_primary_operator: selectedStartRow ? selectedStartRow.primary_operator : "",
        s_primary_outsourced_operator: selectedStartRow ? selectedStartRow.primary_outsourced_operator : ""
    }];

    $('#lineStartSelectTable').bootstrapTable('load', data);
}

function updateEndSelectTable() {
    let data = [{
        e_asset_category: selectedEndRow ? selectedEndRow.asset_category : "",
        e_installation_coordinates: selectedEndRow ? selectedEndRow.installation_coordinates : "",
        e_eqp_manage_id: selectedEndRow ? selectedEndRow.eqp_manage_id : "",
        e_m_company: selectedEndRow ? selectedEndRow.m_company : "",
        e_model_name: selectedEndRow ? selectedEndRow.model_name : "",
        e_host_name: selectedEndRow ? selectedEndRow.host_name : "",
        e_eqp_name: selectedEndRow ? selectedEndRow.eqp_name : "",
        e_port: selectedEndRow ? selectedEndRow.eqp_link_port : "",
        //e_primary_operator: selectedEndRow ? selectedEndRow.primary_operator : "",
        e_primary_outsourced_operator: selectedEndRow ? selectedEndRow.primary_outsourced_operator : ""
    }];

    $('#lineEndSelectTable').bootstrapTable('load', data);
}

function tableRefresh(id){
    $(id).bootstrapTable('refresh');
}

$(function(){

    setDefaultDates(); // 화면 렌더링 시 날짜 컬럼들 현재날짜로 세팅
    getSelectLink(); // 화면 렌더링 시 회선 선택박스 세팅

    // line_speed 선택박스의 항목이 변경되었을 때의 이벤트 처리
    $('#line_speed').change(function() {
        const selectedSpeedId = $(this).val(); // 선택된 speed의 id를 가져옴
        $('#line_color').val(selectedSpeedId); // line_color 선택박스에서 동일한 id를 선택
    });

    $('#lineStartTable').bootstrapTable({
        url: '/rack/line/startEquipmentList',
        method: 'post',
        queryParams: function(params) {
            let searchInput = $("#searchStartInput").val();
            params.searchData = {
                searchInput
            }
            return params;
        },
        pageSize: 5, columns: lineStartColumn, cache: false, undefinedText: "",
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

            $("#lineStartTotalCnt").text("총 " + res.total + "건");
            customRenderPagination(res.total);
        },
        onClickCell: function(field, value, row, $element) {
            // 기존 선택된 행의 클래스 제거
            if (selectedStartRow) {
                $('#lineStartTable').find('tr[data-index="' + $('#lineStartTable').bootstrapTable('getData').indexOf(selectedStartRow) + '"]').removeClass('selected-row');
            }

            // 새로운 선택된 행에 클래스 추가
            selectedStartRow = row;
            $('#lineStartTable').find('tr[data-index="' + $('#lineStartTable').bootstrapTable('getData').indexOf(selectedStartRow) + '"]').addClass('selected-row');

            // 선번장 구성 목적지 테이블 데이터 업데이트
            selectedEndRow = [{}];
            updateEndSelectTable();

            // 선번장 구성 출발지 테이블 데이터 업데이트 (목적지 row 초기화 먼저 해야 선번장구성 출발지 포트번호 컬럼 초기화 가능)
            updateStartSelectTable();

            // 목적지 선택 테이블 데이터 업데이트
            $('#lineEndTable').bootstrapTable('refresh');
        },
    });

    $('#lineEndTable').bootstrapTable({
        url: '/rack/line/endEquipmentList',
        method: 'post',
        queryParams: function(params) {
            let eqp_manage_id = selectedStartRow ? selectedStartRow.eqp_manage_id : "";
            let searchInput = $("#searchEndInput").val();

            params.searchData = {
                eqp_manage_id, searchInput
            }
            return params;
        },
        pageSize: 5, columns: lineEndColumn, cache: false, undefinedText: "",
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

            $("#lineEndTotalCnt").text("총 " + res.total + "건");
            customRenderPagination(res.total);
        },
        onClickCell: function(field, value, row, $element) {
            // 기존 선택된 행의 클래스 제거
            if (selectedEndRow) {
                $('#lineEndTable').find('tr[data-index="' + $('#lineEndTable').bootstrapTable('getData').indexOf(selectedEndRow) + '"]').removeClass('selected-row');
            }

            // 새로운 선택된 행에 클래스 추가
            selectedEndRow = row;
            $('#lineEndTable').find('tr[data-index="' + $('#lineEndTable').bootstrapTable('getData').indexOf(selectedEndRow) + '"]').addClass('selected-row');

            // 선번장 구성 출발지 테이블 데이터 업데이트 (포트번호 업데이트용)
            updateStartSelectTable();

            // 선번장 구성 목적지 테이블 데이터 업데이트
            updateEndSelectTable();
        },
    });

    $('#lineStartSelectTable').bootstrapTable({
        columns: lineStartSelectColumn,
        data: [{}],
    });

    $('#lineEndSelectTable').bootstrapTable({
        columns: lineEndSelectColumn,
        data: [{}],
    })

    $('#searchStartInput').keyup(function(e) {
        if(e.which == 13) {
            tableRefresh('#lineStartTable');
        }
    });

    $('#searchEndInput').keyup(function(e) {
        if(e.which == 13) {
            tableRefresh('#lineEndTable');
        }
    });

});

/**
 * 선번장관리 > 선번장목록 > 추가
 * 맨 처음 페이지 렌더링 될 때 날짜 항목들 현재값으로 설정
 */
function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식의 현재 날짜

    ['line_installation_year'].forEach(id => {
        const element = document.getElementById(id);
        if (!element.value) {
            element.value = today;
        }
    });
}

/**
 * 선번장관리 > 선번장목록 > 추가 > 저장버튼
 * 저장 버튼을 클릭했을 때 호출되는 함수입니다.
 */
function saveData() {

    let data = {};
    let isValid = true;
    let errorMessage = "";

    // 출발지
    const lineStartData = $("#lineStartSelectTable").bootstrapTable("getData")[0];
    const line_start_id  = lineStartData.s_eqp_manage_id;
    // 목적지
    const lineEndData   = $("#lineEndSelectTable").bootstrapTable("getData")[0];
    const line_end_id    = lineEndData.e_eqp_manage_id;

    if(line_start_id === undefined || line_start_id === ""){
        errorMessage += `출발지 장비를 한 개 이상 선택해야 합니다.</br>`;
        isValid = false;
    }

    if(line_end_id === undefined || line_end_id === ""){
        errorMessage += `목적지 장비를 한 개 이상 선택해야 합니다.</br>`;
        isValid = false;
    }

    if(!isValid){
        alert2('알림', errorMessage, 'error', '확인');
        return;
    }

    const line_start_port = lineStartData.s_port;
    const line_end_port   = lineEndData.e_port;

    if ((line_start_id === line_end_id) && (line_start_port == line_end_port)){
        errorMessage += `출발지와 목적지 장비는 같을 수 없습니다.</br>`;
        alert2('알림', errorMessage, 'error', '확인');
        return;
    }

    // 회선
    const line_category = $("#line_category").val();
    const line_speed    = $("#line_speed").val();
    const line_color    = $("#line_color").val();

    data["lineStartId"]    = line_start_id;
    data["lineEndId"]      = line_end_id;
    data["lineStartPort"]  = line_start_port;
    data["lineEndPort"]    = line_end_port;
    data["line_category"]  = line_category;
    data["line_speed"]     = line_speed;
    data["line_color"]     = line_color;
    data["line_installation_year"] = $("#line_installation_year").val();

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
                url: "/rack/line/saveLineInfo",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(res) {
                    alert3Close();
                    if(!res.errorCode){
                        alert2("알림", "저장 중 오류가 발생했습니다. <br>관리자에게 문의하세요", "error", "확인");
                        return false;
                    }

                    let isContain = res.isContain;
                    if(isContain != 0){
                        alert2("알림", "이미 등록된 선번장입니다.", "error", "확인");
                        return false;
                    }

                    alert2("알림", "저장되었습니다.", "info", "확인", back);
                },
                error: function(error) {
                    alert2("알림", "저장 중 오류가 발생했습니다. <br>관리자에게 문의하세요", "error", "확인");
                    return false;
                }
            });
        }
    })

}
