

$(function(){

    addComma(document.getElementById("acquisition_cost")); // 도입금액 콤마처리

});



/**
 * 장비관리 > 장비목록 > 장비상세 > 수정버튼
 * 수정 버튼을 클릭했을 때 호출되는 함수입니다.
 * 사용자가 수정 페이지로 이동하도록 합니다.
 */
function updateData(){
    let id = $("#eqp_manage_id").val();
    const url = `/cable/eqp/update/${id}`;
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
                url : '/cable/eqp/delete',
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
