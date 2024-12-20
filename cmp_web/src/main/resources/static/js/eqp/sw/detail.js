
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
    }
    else if (type === 'hidden') {
        column.visible = false;
    }
    else {
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

let eqpHardwareConnectColumn = [
    createColumn('asset_category', false, '자산분류'),
    createColumn('installation_coordinates', false, '설치좌표'),
    createColumn('eqp_manage_id', false, '관리ID'),
    createColumn('m_company', false, '제조사'),
    createColumn('model_name', false, '모델명'),
    createColumn('eqp_name', false, '구성자원명'),
    createColumn('host_name', false, '호스트명'),
    createColumn('primary_outsourced_operator', false, '운영사용자')
    // createColumn('eqp_link_port', false, '포트번호', '')
];


$(function(){

    addComma(document.getElementById("acquisition_cost")); // 도입금액 콤마처리

    $('#eqpHardwareConnectTable').bootstrapTable({
        url: '/eqp/sw/hardwareConnectList',
        method: 'post',
        queryParams: function(params) {
            let eqp_manage_id = $("#eqp_manage_id").val();
            params.searchData = {
                eqp_manage_id
            }

            return params;
        },
        columns: eqpHardwareConnectColumn, pageSize: 5, pagination: true, sidePagination: 'client',
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

            $("#eqpHardwareTotalCnt").text("총 " + res.total + "건");
        },
    });

});

/**
 * 장비관리 > 장비목록 > 장비상세 > 수정버튼
 * 수정 버튼을 클릭했을 때 호출되는 함수입니다.
 * 사용자가 수정 페이지로 이동하도록 합니다.
 */
function updateData(){
    let id = $("#eqp_manage_id").val();
    const url = `/eqp/sw/update/${id}`;
    window.location.href = url;
}

/**
 * 장비관리 > 장비목록 > 장비상세 > 삭제버튼
 * 삭제 버튼을 클릭했을 때 호출되는 함수입니다.
 * 사용자가 선택한 장비를 삭제합니다
 */
function deleteData(){
    Swal.fire({
        title: '장비 목록 삭제',
        html : '선택한 장비를 삭제하시겠습니까? 삭제하면 복구할 수 없습니다.',
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
            let data = [{"eqp_manage_id": $("#eqp_manage_id").val()}];
            $.ajax({
                url : '/eqp/sw/delete',
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
                        let errorTarget = res.errorTarget;
                        if(errorTarget.length == 0){
                            alert2('알림', '삭제되었습니다.', 'info', '확인', back);
                        }
                        else{
                            alert2('알림', '선번장에 등록되어 있는 장비는 삭제할 수 없습니다.', 'info', '확인');                        }
                    }
               }
            });
        }
    });
}
