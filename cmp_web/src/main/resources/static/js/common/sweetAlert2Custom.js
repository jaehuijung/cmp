
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


