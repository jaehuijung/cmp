/**
 * 공지사항 테이블(noticeTable)을 새로고침하는 함수
 */
function tableRefresh(type = ''){
    if (type === 'reset'){
        $("#searchInput").val('');
    }

    $("#noticeTable").bootstrapTable('refresh');
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
function createColumn(field, checkbox = false, title, width='') {
    let column = {
        title: title,
        field: field,
        align: 'center',
        valign: 'middle',
        checkbox: checkbox
    };

    if (width != ''){
        column.width = width;
    }

    return column;
}

/**
 * noticeTable에서 사용할 컬럼 리스트
 */
var noticeColumns = [
    createColumn('',                true,  ''       ),
    createColumn('notice_name',     false, '제목',    '600px' ),
    createColumn('notice_content',  false, '작성자',  '150px'),
    createColumn('created_at',      false, '작성일',  '150px'),
    createColumn('notice_count',    false, '조회수',  '150px'),
];


$(function(){

    $('#noticeTable').bootstrapTable({
        url: '/main/notice/list',
        method: 'post',
        queryParams: function(params) {
            let searchInput = $("#searchInput").val().trim();
            params.searchData = {
                searchInput
            }
            return params;
        },
        pageSize: 10, columns: noticeColumns, cache: false, undefinedText: "",
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

            $("#noticeTotalCnt").text("총 " + res.total + "건")
        },
        onClickCell: function (field, value, row, $element){
            if (!$element.hasClass("bs-checkbox")) {
                if((field == 'notice_id' || field == 'notice_name')){
                    eqpDetail(row.eqp_manage_id)
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

// 메인 > 공지사항 > 공지사항 추가 페이지 이동
function noticeCreate(){
    const url = "/main/notice/create";
    window.location.href = url;
}

// 메인 > 공지사항 > 공지사항 상세 페이지 이동
function eqpDetail(id){
    const url = `/main/notice/detail/${id}`;
    window.location.href = url;
}

// 메인 > 공지사항 > 공지사항 수정 페이지 이동
function eqpUpdate() {
    let data = $("#noticeTable").bootstrapTable('getSelections');

    if (data.length == 0){
        alert2('알림', '수정할 장비를 선택하세요.', 'info', '확인');
    }
    else if (data.length > 1){
        alert2('알림', '하나의 장비만 수정할 수 있습니다.', 'info', '확인');
    }
    else{
        let id = data[0].notice_id;
        const url = `/main/notice/update/${id}`;
        window.location.href = url;
    }
};

/**
 // 메인 > 공지사항 > 공지사항 삭제 버튼
 * 선택된 하나 또는 여러 개의 공지사항을 삭제함
*/
function eqpDelete() {
    let data = $("#noticeTable").bootstrapTable('getSelections');

    if (data.length == 0){
        alert2('알림', '삭제할 장비를 선택하세요.', 'info', '확인');
    }

    else{
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
                alert3("load");
                $.ajax({
                    url : '/main/notice/delete',
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
                            if(!errorCode){
                                alert2('알림', '데이터를 삭제하는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                                return false;
                            }

                            alert2('알림', '삭제되었습니다.', 'info', '확인', tableRefresh());
                        }
                   }
                });
            }
        });
    }
}



