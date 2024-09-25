

/**
 * sweetAlert2를 사용해서 알림 표시 ... 중복으로 사용되는 부분이 많아 함수 작성
 *
 * @param {string} title - 알림 제목
 * @param {string} html - 알림 내용
 * @param {string} icon - 알림 아이콘 종류 (info, error, success 등)
 * @param {string} confirmButtonText - 확인 버튼 텍스트
 * @param {function} callback - 확인 버튼 클릭 시 호출될 콜백 함수
 */
function alert2(title, html, icon, confirmButtonText, callback) {
    Swal.fire({
        title: title,
        html: html,
        icon: icon,
        confirmButtonText: confirmButtonText
    }).then((result) => {
        if (typeof callback === 'function' && result.isConfirmed) {
            callback();
        }
    });
}



$(function(){

    setDefaultDates();


});


/**
 * 장비관리 > 장비목록 > 장비추가
 * 맨 처음 페이지 렌더링 될 때 날짜 항목들 현재값으로 설정
 */
function setDefaultDates() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식의 현재 날짜

    ['asset_acquisition_date', 'asset_disposal_date', 'eol_status', 'eos_status'].forEach(id => {
        const element = document.getElementById(id);
        if (!element.value) {
            element.value = today;
        }
    });
}


/**
 * 장비관리 > 장비목록 > 장비추가 > 저장버튼
 * 저장 버튼을 클릭했을 때 호출되는 함수입니다.
 * 각 폼 데이터를 수집하여 서버로 전송합니다.
 */
function saveData() {
    const data = {};
    let isValid = true;
    let errorMessage = "";

    document.querySelectorAll('#selection-equipment input, #selection-equipment select').forEach(input => {
        const value = input.value.trim();
        const name = input.name;

        if (["eqp_name", "hostname", "model", "m_company", "primary_operator", "primary_outsourced_operator",
             "secondary_operator", "secondary_outsourced_operator", "operating_department", "cpu", "mem",
             "disk", "ip_address", "os_version", "dbrain_number", "serial_number", "installation_coordinates"].includes(name)) {
            if (value.length > 30) {
                errorMessage += `${name}는 30글자 초과할 수 없습니다.\n`;
                isValid = false;
            }
        }

        if (name === "acquisition_cost" && (isNaN(value) || Number(value) > 100000000)) {
            errorMessage += `도입금액은 숫자만 입력가능하며, 1000억 이하입니다.\n`;
            isValid = false;
        }

        if ((name === "installation_units" || name === "equipment_size_units") && (isNaN(value) || Number(value) > 1000)) {
            errorMessage += `${name}는 숫자만 입력가능하며, 1000 이하입니다.\n`;
            isValid = false;
        }

        if ((value === "" && name.includes("date"))) {
            errorMessage += `${name}는 올바른 날짜를 입력해야 합니다.\n`;
            isValid = false;
        }

        data[name] = value;
    });

    if (!isValid) {
        alert2("알림", errorMessage, "error", "확인");
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/eqpManage/saveEquipmentInfo",
        data: JSON.stringify(data), // 데이터를 JSON 문자열로 변환
        contentType: "application/json",
        success: function(response) {
            alert2("알림", "저장되었습니다.", "info", "확인");
        },
        error: function(error) {
            alert2("알림", "저장 중 오류가 발생했습니다. <br>관리자에게 문의하세요", "error", "확인");
        }
    });
}

/**
 * 장비관리 > 장비목록 > 장비추가 > 취소버튼
 * 취소 버튼을 클릭했을 때 호출되는 함수입니다.
 * 사용자가 이전 페이지로 돌아가도록 합니다.
 */
function cancelAction() {
    window.history.back();
}

