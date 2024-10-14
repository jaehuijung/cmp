
/**
 * 사용자 목록 테이블(userTable)을 새로고침하는 함수
 */
function tableRefresh(){
    $("#userTable").bootstrapTable('refresh');
}

/**
 * BootstrapTable에서 사용할 컬럼 리스트를 생성하는 함수
 *
 * @param {string} field - 컬럼 데이터 필드명
 * @param {boolean} checkbox - 체크박스 여부
 * @param {string} title - 컬럼 제목
 * @returns {object} 컬럼 설정 객체
 */
// 모든 유형의 컬럼을 생성할 수 있는 공통 함수
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
    }
    else if(type === 'formatter'){
        column.formatter = function(value, row, index) {
            let tableOptions = $('#userTable').bootstrapTable('getOptions');
            return tableOptions.totalRows - ((tableOptions.pageNumber - 1) * tableOptions.pageSize) - index;
        };
    }
    else if (type === 'visible') {
        column.visible = false;
    }
    else {
        column.class = 'nowrap';
    }

    return column;
}

/**
 * userTable에서 사용할 컬럼 리스트
 */
var userColumns = [
    createColumn('',              true,  ''                         ),
    createColumn('idx',           false, 'idx',        'visible'  ),
    createColumn('no',            false, 'no',         'formatter'  ),
    createColumn('id',            false, '사용자 ID',  'underline'  ),
    createColumn('name',          false, '사용자명',   'underline'  ),
    createColumn('email',         false, '사용자이메일'             ),
    createColumn('phone',         false, '사용자연락처'             ),
    createColumn('position',      false, '사용자 직위'              ),
    createColumn('group_idx',     false, '사용자 그룹'              ),
];

$(function(){

    $('#userTable').bootstrapTable({
        url: '/settings/user/list',
        method: 'post',
        queryParams: function(params) {
            let searchInput = $("#searchInput").val().trim();
            params.searchData = {
                searchInput
            }
            return params;
        },
        pageSize: 10, columns: userColumns, cache: false, undefinedText: "",
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

            $("#userTotalCnt").text("총 " + res.total + "건")
        },
        onClickCell: function (field, value, row, $element){
            if (!$element.hasClass("bs-checkbox")) {
                if((field == 'id' || field == 'name')){
                    userDetail(row.idx)
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

    $('#searchInput').keyup(function(e){
        if(e.which == 13){
            tableRefresh();
        }
    })

});

function userCreate(){
    const url = "/settings/user/create";
    window.location.href = url;
}

function userDetail(id){
    const url = `/settings/user/detail/${id}`;
    window.location.href = url;
}

function userUpdate(id){
    let data = $("#userTable").bootstrapTable('getSelections');

    if (data.length == 0){
        alert2('알림', '수정할 사용자를 선택하세요.', 'info', '확인');
    }
    else if (data.length > 1){
        alert2('알림', '하나의 사용자 정보만 수정할 수 있습니다.', 'info', '확인');
    }
    else{
        let id = data[0].idx;
        const url = `/settings/user/update/${id}`;
        window.location.href = url;
    }
}

function userDelete(){
let data = $("#userTable").bootstrapTable('getSelections');

    if (data.length == 0){
        alert2('알림', '삭제할 사용자를 선택하세요.', 'info', '확인');
    }

    else{
        Swal.fire({
            title: '사용자 삭제',
            html : '선택한 사용자를 삭제하시겠습니까? 삭제하면 복구할 수 없습니다.',
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
                alert3("load");
                $.ajax({
                    url : '/settings/user/delete',
                    type: 'post',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    dataType : 'JSON',
                    success : function(res){
                        alert3Close();
                        let errorCode = res.errorCode;

                        if(!errorCode){
                            alert2('알림', '사용자 정보를 삭제하는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                        }
                        else{
                            alert2('알림', '삭제되었습니다.', 'info', '확인', tableRefresh());
                        }
                   }
                });
            }
        });
    }
}
