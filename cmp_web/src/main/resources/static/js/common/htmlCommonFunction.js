
// 날짜 형식 검증 함수
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) return false;

    // 주어진 날짜 문자열이 실제로 유효한지 확인
    const [year, month, day] = dateString.split('-').map(Number);
    return date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;
}


// 사용자가 데이터 입력 시 콤마 추가
function formatCurrency(input) {
    let value = input.value.replace(/,/g, '');
    if (value !== '' && !isNaN(value)) {
        input.value = Number(value).toLocaleString();
    }
}

// 서버에서 받아온 데이터에 콤마 추가
function addComma(input) {
    let value = input.value.replace(/,/g, '');
    if (value !== '' && !isNaN(value)) {
        input.value = Number(value).toLocaleString();
    }
}

// 콤마 제거
function removeComma(input) {
    return input.replace(/,/g, '');
}

// 글자 길이 체크
function checkLength(input, maxLength) {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}

// 이전 페이지로 돌아감
function back() {
    window.history.back();
}



// 장비목록 > 추가/상세/수정 > ip 주소 검증 함수1
function moveToNext(current, nextId) {
    if (!/^\d+$/.test(current.value)) {
        alert2("알림", "ip주소는 숫자로만 구성되어야 합니다.", "info", "확인");
        current.value = '';
    }

    if (current.value.length >= 3) {
        if (parseInt(current.value) > 255) {
            alert2("알림", "IP 블록의 값은 0에서 255 사이여야 합니다.", "info", "확인");
            current.value = '';
        }
        else{
            document.getElementById(nextId).focus();
        }
    }
}

// 장비목록 > 추가/상세/수정 > ip 주소 검증 함수2
function checkIPBlock(input) {
    if (!/^\d+$/.test(input.value)) {
        alert2("알림", "ip주소는 숫자로만 구성되어야 합니다.", "info", "확인");
        input.value = '';
    }

    if (parseInt(input.value) > 255) {
        alert2("알림", "IP 블록의 값은 0에서 255 사이여야 합니다.", "info", "확인");
        input.value = '';
    }
}

// 장비목록 > 추가/상세/수정 > ip 주소 저장용 함수
function combineIP() {
    let block1 = document.getElementById('ip_block1').value;
    let block2 = document.getElementById('ip_block2').value;
    let block3 = document.getElementById('ip_block3').value;
    let block4 = document.getElementById('ip_block4').value;

    if (block1 === "")
        block1 = 0

    if (block2 === "")
        block2 = 0

    if (block3 === "")
        block3 = 0

    if (block4 === "")
        block4 = 0

    return `${block1}.${block2}.${block3}.${block4}`;
}
