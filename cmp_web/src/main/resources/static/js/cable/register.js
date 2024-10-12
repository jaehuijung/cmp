
// cable table column creation function
function createColumn(field, checkbox = false, title, type = 'default', formatter = null, visible = true) {
    let column = {
        title: title,
        field: field,
        align: 'center',
        valign: 'middle',
        checkbox: checkbox
    };

    if (formatter) {
        column.formatter = formatter;
    }

    if (type === 'underline') {
        column.class = 'nowrap underline';
    } else {
        column.class = 'nowrap';
    }

    if (!visible) {
        column.visible = visible;
    }

    return column;
}

let rackStartColumn = [
    createColumn('',                              true,  ''),
    createColumn('asset_category',              false, '자산분류'),
    createColumn('installation_coordinates',    false, '설치좌표'),
    createColumn('eqp_manage_id',               false, '관리 id', 'underline'),
    createColumn('eqp_name',                    false, '구성자원명', 'underline'),
    createColumn('model_name',                  false, '모델명'),
    createColumn('host_name',                   false, '호스트명'),
    createColumn('m_company',                   false, '제조사'),
    createColumn('port',              false, '포트번호'),
    createColumn('primary_operator',            false, '운영담당자'),
    createColumn('primary_outsourced_operator', false, '위탁운영담당자'),
];

let rackEndColumn = [
    createColumn('',                              true,  ''),
    createColumn('asset_category',              false, '자산분류'),
    createColumn('installation_coordinates',    false, '설치좌표'),
    createColumn('eqp_manage_id',               false, '관리 id', 'underline'),
    createColumn('eqp_name',                    false, '구성자원명', 'underline'),
    createColumn('model_name',                  false, '모델명'),
    createColumn('host_name',                   false, '호스트명'),
    createColumn('m_company',                   false, '제조사'),
    createColumn('port',                false, '포트번호'),
    createColumn('primary_operator',            false, '운영담당자'),
    createColumn('primary_outsourced_operator', false, '위탁운영담당자'),
];

$(function(){

    getSelectLink(); // 화면 렌더링 시 회선 선택박스 세팅

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
            }
        },
        onClickCell: function(field, value, row, $element) {
            if (!$element.hasClass("bs-checkbox")) {
                if((field == 'eqp_manage_id' || field == 'eqp_name')){
                    // rackDetail(row.eqp_manage_id)
                }
                else{
                    let $checkbox = $element.closest('tr').find('.bs-checkbox input[type="checkbox"]');
                    if ($checkbox.length) {
                        $checkbox.click();
                    }
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
            }
        },
        onClickCell: function(field, value, row, $element) {
            if (!$element.hasClass("bs-checkbox")) {
                if((field == 'eqp_manage_id' || field == 'eqp_name')){
                    //rackDetail(row.eqp_manage_id)
                }
                else{
                    let $checkbox = $element.closest('tr').find('.bs-checkbox input[type="checkbox"]');
                    if ($checkbox.length) {
                        $checkbox.click();
                    }
                }
            }
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
    const rackStartData = $("#rackStartTable").bootstrapTable('getSelections');
    // 목적지
    const rackEndData = $("#rackEndTable").bootstrapTable('getSelections');

    if(rackStartData.length == 0){
        errorMessage += `출발지 장비를 한 개 이상 선택해야 합니다.</br>`;
        isValid = false;
    }

    if(rackStartData.length > 1){
        errorMessage += `출발지는 하나의 장비만 선택되어야 합니다.</br>`;
        isValid = false;
    }

    if(rackEndData.length == 0){
        errorMessage += `목적지 장비를 한 개 이상 선택해야 합니다.</br>`;
        isValid = false;
    }

    if(rackEndData.length > 1){
        errorMessage += `목적지는 하나의 장비만 선택되어야 합니다.</br>`;
        isValid = false;
    }

    if(!isValid){
        alert2('알림', errorMessage, 'error', '확인');
        return;
    }

    const rack_start_id  = $("#rackStartTable").bootstrapTable('getSelections')[0].eqp_manage_id;
    const rack_start_port = $("#rackStartTable").bootstrapTable('getSelections')[0].port;
    const rack_end_id    = $("#rackEndTable").bootstrapTable('getSelections')[0].eqp_manage_id;
    const rack_end_port   = $("#rackEndTable").bootstrapTable('getSelections')[0].port;


    if ((rack_start_id === rack_end_id) && (rack_start_port == rack_end_port)){
        errorMessage += `출발지와 목적지 장비는 같을 수 없습니다.</br>`;
        alert2('알림', errorMessage, 'error', '확인');
    }

    // 회선
    const cable_category = $("#cable_category").val();
    const cable_speed    = $("#cable_speed").val();
    const cable_color    = $("#cable_color").val();

    data["rackStartId"]    = rack_start_id;
    data["rackEndId"]      = rack_end_id;
    data["cable_category"] = cable_category;
    data["cable_speed"]    = cable_speed;
    data["cable_color"]    = cable_color;

    console.log(data)

}
