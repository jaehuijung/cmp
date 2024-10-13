
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


/**
 * 선번장관리 > 선번장목록 > 선번장상세 > 수정버튼
 * 수정 버튼을 클릭했을 때 호출되는 함수입니다.
 * 사용자가 수정 페이지로 이동하도록 합니다.
 */
function updateData(){
    let id = $("#cable_manage_id").val();
    const url = `/cable/rack/update/${id}`;
    window.location.href = url;
}

/**
 * 선번장관리 > 선번장목록 > 선번장상세 > 삭제버튼
 * 삭제 버튼을 클릭했을 때 호출되는 함수입니다.
 * 사용자가 선택한 장비를 삭제합니다
 */
function deleteData(){
    Swal.fire({
        title: '선번장 목록 삭제',
        html : '선택한 선반장을 삭제하시겠습니까? 삭제하면 복구할 수 없습니다.',
        icon : 'error',
        focusConfirm: false,
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
        showCancelButton: true,
        customClass: {
            popup: 'custom-width'
        },
    }).then((result) => {
        if (result.isConfirmed) {
            alert3("delete");
            let data = [{"cable_manage_id": $("#cable_manage_id").val()}];
            $.ajax({
                url : '/cable/rack/delete',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType : 'JSON',
                success : function(res){
                    alert3Close();
                    let errorCode = res.errorCode;

                    if(!errorCode){
                        alert2('알림', '데이터를 삭제하는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                    }
                    else{
                        alert2('알림', '삭제되었습니다.', 'info', '확인', back);
                    }
               }
            });
        }
    });
}

