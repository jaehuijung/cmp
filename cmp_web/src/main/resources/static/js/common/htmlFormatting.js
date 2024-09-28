
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