
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

$(function(){

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
            }
        },
    });



});




