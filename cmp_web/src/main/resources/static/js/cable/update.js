
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

let rackStartColumn = [
    // createColumn('',                              true,  ''),
    createColumn('eqp_manage_id',               false, '관리번호', 'underline'),
    createColumn('eqp_name',                    false, '구성자원명', 'underline'),
    createColumn('port',                        false, '포트번호'),
    createColumn('asset_category',              false, '자산분류'),
    createColumn('installation_coordinates',    false, '설치좌표'),
    createColumn('model_name',                  false, '모델명'),
    // createColumn('host_name',                   false, '호스트명'),
    // createColumn('m_company',                   false, '제조사'),
    // createColumn('primary_operator',            false, '운영담당자'),
    // createColumn('primary_outsourced_operator', false, '위탁운영담당자'),
];

let rackEndColumn = [
    // createColumn('',                              true,  ''),
    createColumn('eqp_manage_id',               false, '관리번호', 'underline'),
    createColumn('eqp_name',                    false, '구성자원명', 'underline'),
    createColumn('port',                        false, '포트번호'),
    createColumn('asset_category',              false, '자산분류'),
    createColumn('installation_coordinates',    false, '설치좌표'),
    createColumn('model_name',                  false, '모델명'),
    // createColumn('host_name',                   false, '호스트명'),
    // createColumn('m_company',                   false, '제조사'),
    // createColumn('primary_operator',            false, '운영담당자'),
    // createColumn('primary_outsourced_operator', false, '위탁운영담당자'),
];

let rackSelectColumn = [
    [
        { title: '출발지', align: 'center', valign: 'middle', colspan: 6 },
        { title: '목적지', align: 'center', valign: 'middle', colspan: 6 },
    ],
    [
        createColumn('s_eqp_manage_id', false, '관리번호'),
        createColumn('s_eqp_name', false, '구성자원명'),
        createColumn('s_port', false, '포트번호'),
        createColumn('s_asset_category', false, '자산분류'),
        createColumn('s_installation_coordinates', false, '설치좌표'),
        createColumn('s_model_name', false, '모델명'),

        createColumn('e_eqp_manage_id', false, '관리번호'),
        createColumn('e_eqp_name', false, '구성자원명'),
        createColumn('e_port', false, '포트번호'),
        createColumn('e_asset_category', false, '자산분류'),
        createColumn('e_installation_coordinates', false, '설치좌표'),
        createColumn('e_model_name', false, '모델명'),
    ]
];

let selectedStartRow = null;
let selectedEndRow = null;
let selectInitStartRow = false;
let selectInitEndRow = false;

function updateSelectTable() {
    let data = [{
        s_eqp_manage_id: selectedStartRow ? selectedStartRow.eqp_manage_id : "",
        s_eqp_name: selectedStartRow ? selectedStartRow.eqp_name : "",
        s_port: selectedStartRow ? selectedStartRow.port : "",
        s_asset_category: selectedStartRow ? selectedStartRow.asset_category : "",
        s_installation_coordinates: selectedStartRow ? selectedStartRow.installation_coordinates : "",
        s_model_name: selectedStartRow ? selectedStartRow.model_name : "",
        e_eqp_manage_id: selectedEndRow ? selectedEndRow.eqp_manage_id : "",
        e_eqp_name: selectedEndRow ? selectedEndRow.eqp_name : "",
        e_port: selectedEndRow ? selectedEndRow.port : "",
        e_asset_category: selectedEndRow ? selectedEndRow.asset_category : "",
        e_installation_coordinates: selectedEndRow ? selectedEndRow.installation_coordinates : "",
        e_model_name: selectedEndRow ? selectedEndRow.model_name : ""
    }];

    $('#rackSelectTable').bootstrapTable('load', data);
}

$(function(){

    $('#rackStartTable').bootstrapTable({
        url: '/cable/rack/rackEquipmentList',
        method: 'post',
        queryParams: function(params) {
            let eqp_manage_id = $("#searchInput").val();
            params.searchData = {
                eqp_manage_id
            }
            return params;
        },
        pageSize: 5, columns: rackStartColumn, cache: false, undefinedText: "",
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
            } else {
                $("#rackStartTotalCnt").text("총 " + res.total + "건")

                let data = res.rows;
                if(!selectInitStartRow){
                    data.forEach(ele => {
                        let start_eqp_id = ele.eqp_manage_id == $("#start_eqp_id").val() ? true : false;
                        let start_eqp_port = ele.port == $("#start_eqp_port").val() ? true : false;

                        if(start_eqp_id && start_eqp_port){
                            $('#rackStartTable').find('tr[data-index="' + $('#rackStartTable').bootstrapTable('getData').indexOf(ele) + '"]').addClass('selected-row');
                        }
                    })
                }
            }
        },
        onClickCell: function(field, value, row, $element) {
            if (!$element.hasClass("bs-checkbox")) {
                if ((field == 'eqp_manage_id' || field == 'eqp_name')) {
                    // 여기에 필요한 추가 기능을 작성할 수 있습니다. 예: rackDetail(row.eqp_manage_id)
                }
                else{
                    if (selectedStartRow) {
                        $('#rackStartTable').bootstrapTable('uncheckBy', {
                            field: 'eqp_manage_id',
                            values: [selectedStartRow.eqp_manage_id]
                        });


                        // 기존 선택된 행의 클래스 제거
                        $('#rackStartTable').find('tr[data-index="' + $('#rackStartTable').bootstrapTable('getData').indexOf(selectedStartRow) + '"]').removeClass('selected-row');
                    }
                    selectedStartRow = row;
                    $('#rackStartTable').bootstrapTable('checkBy', {
                        field: 'eqp_manage_id',
                        values: [selectedStartRow.eqp_manage_id]
                    });

                    // 새로운 선택된 행에 클래스 추가
                    $('#rackStartTable').find('tr[data-index="' + $('#rackStartTable').bootstrapTable('getData').indexOf(selectedStartRow) + '"]').addClass('selected-row');

                    updateSelectTable();
                }
            }
        },
    });

    $('#rackEndTable').bootstrapTable({
        url: '/cable/rack/rackEquipmentList',
        method: 'post',
        queryParams: function(params) {
            let eqp_manage_id = $("#searchInput").val();
            params.searchData = {
                eqp_manage_id
            }
            return params;
        },
        pageSize: 5, columns: rackEndColumn, cache: false, undefinedText: "",
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
            } else {
                $("#rackEndTotalCnt").text("총 " + res.total + "건")

                let data = res.rows;
                if(!selectInitEndRow){
                    data.forEach(ele => {
                        let end_eqp_id = ele.eqp_manage_id == $("#end_eqp_id").val() ? true : false;
                        let end_eqp_port = ele.port == $("#end_eqp_port").val() ? true : false;

                        if(end_eqp_id && end_eqp_port){
                            $('#rackEndTable').find('tr[data-index="' + $('#rackEndTable').bootstrapTable('getData').indexOf(ele) + '"]').addClass('selected-row');
                        }
                    })
                }
            }
        },
        onClickCell: function(field, value, row, $element) {
            if (!$element.hasClass("bs-checkbox")) {
                if ((field == 'eqp_manage_id' || field == 'eqp_name')) {
                    // 여기에 필요한 추가 기능을 작성할 수 있습니다. 예: rackDetail(row.eqp_manage_id)
                }
                else{
                    if (selectedEndRow) {
                        $('#rackEndTable').bootstrapTable('uncheckBy', {
                            field: 'eqp_manage_id',
                            values: [selectedEndRow.eqp_manage_id]
                        });

                        // 기존 선택된 행의 클래스 제거
                        $('#rackEndTable').find('tr[data-index="' + $('#rackEndTable').bootstrapTable('getData').indexOf(selectedEndRow) + '"]').removeClass('selected-row');
                    }
                    selectedEndRow = row;
                    $('#rackEndTable').bootstrapTable('checkBy', {
                        field: 'eqp_manage_id',
                        values: [selectedEndRow.eqp_manage_id]
                    });

                    // 새로운 선택된 행에 클래스 추가
                    $('#rackEndTable').find('tr[data-index="' + $('#rackEndTable').bootstrapTable('getData').indexOf(selectedEndRow) + '"]').addClass('selected-row');

                    updateSelectTable();
                }
            }
        },
    });

    $('#rackSelectTable').bootstrapTable({
        url: '/cable/rack/getCableDetailInfo',
        method: 'post',
        queryParams: function(params) {
            let cable_manage_id = $("#cable_manage_id").val();
            params.searchData = {
                cable_manage_id
            }
            return params;
        },
        pageSize: 5, columns: rackSelectColumn, cache: false, undefinedText: "",
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
                return;
            }

            selectedStartRow = res.rows;
            selectedEndRow = res.rows;
        },
    });
});

/**
 * 선번장관리 > 선번장목록 > 추가 > 저장버튼
 * 저장 버튼을 클릭했을 때 호출되는 함수입니다.
 */
function saveData() {

    let data = {};
    let isValid = true;
    let errorMessage = "";

    // 출발지
    const rackStartData = $("#rackSelectTable").bootstrapTable("getData")[0];
    const rack_start_id  = rackStartData.s_eqp_manage_id;
    // 목적지
    const rackEndData   = $("#rackSelectTable").bootstrapTable("getData")[0];
    const rack_end_id    = rackEndData.e_eqp_manage_id;

    if(rack_start_id === undefined || rack_start_id === ""){
        errorMessage += `출발지 장비를 한 개 이상 선택해야 합니다.</br>`;
        isValid = false;
    }

    if(rack_end_id === undefined || rack_end_id === ""){
        errorMessage += `목적지 장비를 한 개 이상 선택해야 합니다.</br>`;
        isValid = false;
    }

    if(!isValid){
        alert2('알림', errorMessage, 'error', '확인');
        return;
    }

    const rack_start_port = rackStartData.s_port;
    const rack_end_port   = rackEndData.e_port;

    if ((rack_start_id === rack_end_id) && (rack_start_port == rack_end_port)){
        errorMessage += `출발지와 목적지 장비는 같을 수 없습니다.</br>`;
        alert2('알림', errorMessage, 'error', '확인');
        return;
    }

    // 회선
    const cable_category = $("#cable_category").val();
    const cable_speed    = $("#cable_speed").val();
    const cable_color    = $("#cable_color").val();

    data["rackStartId"]    = rack_start_id;
    data["rackEndId"]      = rack_end_id;
    data["rackStartPort"]  = rack_start_port;
    data["rackEndPort"]    = rack_end_port;
    data["cable_category"] = cable_category;
    data["cable_speed"]    = cable_speed;
    data["cable_color"]    = cable_color;
    data["cable_installation_year"] = $("#cable_installation_year").val();

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
                url: "/cable/rack/saveCableInfo",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function(res) {
                    alert3Close();
                    if(!res.errorCode){
                        alert2("알림", "저장 중 오류가 발생했습니다. <br>관리자에게 문의하세요", "error", "확인");
                    }
                    else{
                        let isContain = res.isContain;
                        if(isContain == 0){
                            alert2("알림", "저장되었습니다.", "info", "확인", back);
                        }
                        else{
                            alert2("알림", "이미 등록된 선번장입니다.", "error", "확인");
                        }
                    }

                },
                error: function(error) {
                    alert2("알림", "저장 중 오류가 발생했습니다. <br>관리자에게 문의하세요", "error", "확인");
                }
            });
        }
    })

}
