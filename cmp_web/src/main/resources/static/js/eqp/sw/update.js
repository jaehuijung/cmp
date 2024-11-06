
$(function(){

    addComma(document.getElementById("acquisition_cost")); // 도입금액 콤마처리

    // 장비분류 선택 시 선택박스 세팅
    $('#asset_id').change(function(){      // 자산분류 > 자산세부분류
        const assetValue = $(this).val();
        getSelectSub(assetValue);
    })
    $('#sub_id').change(function(){        // 자산세부분류 > 자산상세분류
        const subValue = $(this).val();
        getSelectDetail(subValue);
    })

});


/**
 * 장비관리 > 장비목록 > 장비수정 > 저장버튼
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

    if($("#amount").val() === ""){
        alert2("알림", "수량을 입력해주세요", "info", "확인");
        return false;
    }

    if($("#license_number").val() === ""){
        alert2("알림", "라이센스 번호를 입력해주세요", "info", "확인");
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
                if (["eqp_name", "model", "m_company",
                     "primary_operator", "primary_outsourced_operator",
                     "secondary_operator", "secondary_outsourced_operator",
                     "operating_department", "os_version", "dbrain_number", "license_number"].includes(name)) {
                    // 글자수 변경필요!!!
                    if (value.length > 50) {
                        errorMessage += `${labelName} 50글자 초과할 수 없습니다.</br>`;
                        isValid = false;
                    }
                }

                data[name] = value;

                if (name.includes("date") && !isValidDate(value)) {
                    errorMessage += `${labelName} 유효한 날짜여야 합니다.</br>`;
                    isValid = false;
                }
            }
        }
    });


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
    data["config_id"] = "2"; // 구성분류 : S/W
    data["eqp_manage_id"] = $("#eqp_manage_id").val();

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
                url: "/eqp/sw/updateEquipmentInfo",
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
