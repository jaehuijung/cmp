
/**
 * 장비 목록 테이블(eqpTable)을 새로고침하는 함수
 */
function tableRefresh(){
    $("#eqpTable").bootstrapTable('refresh');
}

/**
 * BootstrapTable에서 사용할 컬럼 리스트를 생성하는 함수
 *
 * @param {string} field - 컬럼 데이터 필드명
 * @param {boolean} checkbox - 체크박스 여부
 * @param {string} title - 컬럼 제목
 * @returns {object} 컬럼 설정 객체
 */
function createColumn1(field, checkbox = false, title) {
    return {
        title: title,
        field: field,
        align: 'center',
        valign: 'middle',
        class: 'nowrap underline',
        checkbox: checkbox
    };
}

function createColumn2(field, checkbox = false, title) {
    return {
        title: title,
        field: field,
        align: 'center',
        valign: 'middle',
        class: 'nowrap',
        checkbox: checkbox
    };
}

/**
 * eqpTable에서 사용할 컬럼 리스트
*/
var columns = [
    createColumn2('',                              true,  ''),
    createColumn1('eqp_manage_id',                 false, '관리번호'),
    createColumn1('eqp_name',                      false, '장비명'),
    createColumn2('host_name',                     false, '호스트명'),
    createColumn2('model_name',                    false, '모델명'),
    createColumn2('m_company',                     false, '제조사'),
    createColumn2('operating_status',              false, '운영상태'),
    createColumn2('operating_department',          false, '운영부서'),
    createColumn2('primary_operator',              false, '운영담당자(정)'),
    createColumn2('secondary_operator',            false, '운영담당자(부)'),
    createColumn2('primary_outsourced_operator',   false, '위탁운영사용자(정)'),
    createColumn2('secondary_outsourced_operator', false, '위탁운영사용자(부)')
];


$(function(){

    $('#eqpTable').bootstrapTable({
        url: '/cable/eqp/list',
        method: 'post',
        queryParams: function(params) {
            let searchInput = $("#searchInput").val().trim();
            params.searchData = {
                searchInput
            }
            return params;
        },
        pageSize: 10, columns: columns, cache: false, undefinedText: "",
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

            $("#eqpTotalCnt").text("총 " + res.total + "건")
        },
        onClickCell: function (field, value, row, $element){
            if (!$element.hasClass("bs-checkbox")) {
                if((field == 'eqp_manage_id' || field == 'eqp_name')){
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


/**
 * 컬럼 활성화/비활성화를 처리하는 함수
 *
 * @param {string} type - 선택박스 타입 (all 등)
 * @param {boolean} isChecked - 체크 여부
 */
function searchState(type, isChecked){
    // 체크되었을 때
    if (isChecked) {
        if (type === "all") {
            // 전체 컬럼 필터링
            columns = columns.filter(column =>
                [
                    'host_name', 'model_name', 'm_company', 'operating_status', 'operating_department',
                    'primary_operator', 'secondary_operator','primary_outsourced_operator', 'secondary_outsourced_operator'
                ].indexOf(column.field) === -1
            );

            // 다시 순서대로 열 추가
            columns.splice(3,  0, {field: 'host_name', align: 'center', valign: 'middle', class: 'nowrap', title: '호스트명'});
            columns.splice(4,  0, {field: 'model_name', align: 'center', valign: 'middle', class: 'nowrap', title: '모델명'});
            columns.splice(5,  0, {field: 'm_company', align: 'center', valign: 'middle', class: 'nowrap', title: '제조사'});
            columns.splice(6,  0, {field: 'operating_status', align: 'center', valign: 'middle', class: 'nowrap', title: '운영상태'});
            columns.splice(7,  0, {field: 'operating_department', align: 'center', valign: 'middle', class: 'nowrap', title: '운영부서'});
            columns.splice(8,  0, {field: 'primary_operator', align: 'center', valign: 'middle', class: 'nowrap', title: '운영담당자(정)'});
            columns.splice(9,  0, {field: 'secondary_operator', align: 'center', valign: 'middle', class: 'nowrap', title: '운영담당자(부)'});
            columns.splice(10, 0, {field: 'primary_outsourced_operator', align: 'center', valign: 'middle', class: 'nowrap', title: '위탁운영담당자(정)'});
            columns.splice(11, 0, {field: 'secondary_outsourced_operator', align: 'center', valign: 'middle', class: 'nowrap', title: '위탁운영담당자(부)'});

            // 모든 단일 선택박스 체크
            document.querySelectorAll(".selectStateChk").forEach(ele => {
                ele.checked = true;
            });
        } else {
            // 특정 유형 컬럼 추가
            switch (type) {
                case "host_name":
                    columns.splice(3, 0, {field: 'host_name', align: 'center', valign: 'middle', class: 'nowrap', title: '호스트명'});
                    break;
                case "model_name":
                    columns.splice(4, 0, {field: 'model_name', align: 'center', valign: 'middle', class: 'nowrap', title: '모델명'});
                    break;
                case "m_company":
                    columns.splice(5, 0, {field: 'm_company', align: 'center', valign: 'middle', class: 'nowrap', title: '제조사'});
                    break;
                case "operating_status":
                    columns.splice(6, 0, {field: 'operating_status', align: 'center', valign: 'middle', class: 'nowrap', title: '운영상태'});
                    break;
                case "operating_department":
                    columns.splice(7, 0, {field: 'operating_department', align: 'center', valign: 'middle', class: 'nowrap', title: '운영부서'});
                    break;
                case "primary_operator":
                    columns.splice(8, 0, {field: 'primary_operator', align: 'center', valign: 'middle', class: 'nowrap', title: '운영담당자(정)'});
                    break;
                case "secondary_operator":
                    columns.splice(9, 0, {field: 'secondary_operator', align: 'center', valign: 'middle', class: 'nowrap', title: '운영담당자(부)'});
                    break;
                case "primary_outsourced_operator":
                    columns.splice(10, 0, {field: 'primary_outsourced_operator', align: 'center', valign: 'middle', class: 'nowrap', title: '위탁운영담당자(정)'});
                    break;
                case "secondary_outsourced_operator":
                    columns.splice(11, 0, {field: 'secondary_outsourced_operator', align: 'center', valign: 'middle', class: 'nowrap', title: '위탁운영담당자(부)'});
                    break;
            }
        }
    }
    // 체크 해제되었을 때
    else {
        if (type === "all") {
            // 전체 컬럼 필터링
            columns = columns.filter(column =>
                [
                    'host_name', 'model_name', 'm_company', 'operating_status', 'operating_department',
                    'primary_operator', 'secondary_operator', 'primary_outsourced_operator', 'secondary_outsourced_operator'
                ].indexOf(column.field) === -1
            );

            // 모든 단일 선택박스 해제
            document.querySelectorAll(".selectStateChk").forEach(ele => {
                ele.checked = false;
            });
        } else {
            // 특정 컬럼 제거
            columns = columns.filter(column => column.field !== type);
            // 전체 선택박스 해제
            document.querySelector(".selectStateChkAll").checked = false;
        }
    }

    $('#eqpTable').bootstrapTable('refreshOptions', { columns: columns });
}

// 장비관리 > 장비목록 > 장비추가 페이지 이동
function eqpCreate(){
    const url = "/cable/eqp/create";
    window.location.href = url;
}

// 장비관리 > 장비목록 > 장비상세 페이지 이동
function eqpDetail(id){
    const url = `/cable/eqp/detail/${id}`;
    window.location.href = url;
}

// 장비관리 > 장비목록 > 장비수정 페이지 이동
function eqpUpdate() {
    let data = $("#eqpTable").bootstrapTable('getSelections');

    if (data.length == 0){
        alert2('알림', '수정할 장비를 선택하세요.', 'info', '확인');
    }
    else if (data.length > 1){
        alert2('알림', '하나의 장비만 수정할 수 있습니다.', 'info', '확인');
    }
    else{
        let id = data[0].eqp_manage_id;
        const url = `/cable/eqp/update/${id}`;
        window.location.href = url;
    }
};

/**
 * 장비관리 > 장비목록 > 삭제 버튼
 * 선택된 하나 또는 여러 개의 장비를 삭제함
*/
function eqpDelete() {
    let data = $("#eqpTable").bootstrapTable('getSelections');

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
                            alert2('알림', '삭제되었습니다.', 'info', '확인', tableRefresh());
                        }
                   }
                });
            }
        });
    }
}


/**
 * 장비관리 > 장비목록 > 장비 다운로드 버튼
*/
function selectEquipmentDownload(){

    let data = $("#eqpTable").bootstrapTable('getSelections');
    if (data.length == 0){
        alert2('알림', '다운로드 할 장비를 선택하세요.', 'info', '확인');
    }
    else{

        /*
        장비목록 컬럼변경때문에 테이블 일단 조회추가수정상세 구현한 다음에
        $.ajax({
            url : '/cable/eqp/excelInsert',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success : (res) => {
                notifySaveResult(res);
            }
        });
        */
    }
}


/**
 * 장비관리 > 장비목록 > 엑셀 업로드 버튼
 * 1. 모달 생성
*/
function excelUpload(){
    Swal.fire({
        title: '엑셀 파일 업로드',
        html: generateAssetUploadHTML(),
        focusConfirm: false,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        showCancelButton: true,
        customClass: {
            popup: 'custom-width'
        },
    }).then((result) => {
        if (result.isConfirmed) {
            handleFileUpload();
        }
    });
}


/**
 * 장비관리 > 장비목록 > 엑셀 업로드
 * 2. 모달의 HTML을 생성하는 함수
 * @returns {string} 업로드 모달의 HTML 문자열
 */
function generateAssetUploadHTML(){
    return `
        <div style="text-align: left;">
            <p>※ 업로드 한 파일을 저장하기 전 반드시 검증이 필요합니다.</p>
            <p>　검증결과 엑셀 파일 확인 후 저장 버튼을 눌러 데이터를 저장하세요.</p>
            <br>

            <div style="display: flex; flex-direction: column; ">
                <div style="margin-bottom: 10px;">
                    <button type="button" class="btn btn-outline-secondary" onclick="downloadExcelTemplate()">엑셀 양식 다운로드</button>
                    <button type="button" class="btn btn-outline-secondary" onclick="validExcelEquipmentList()">검증</button>
                </div>
                <div>
                    <form id="uploadForm" enctype="multipart/form-data" style="width: fit-content;">
                        <input type="file" id="excelFile" name="file" accept=".xls,.xlsx" />
                    </form>
                </div>
            </div>
        </div>
    `;
}


/**
 * 장비관리 > 장비목록 > 엑셀 업로드 버튼
 * 3. 파일 업로드를 처리하는 함수. 파일이 선택되었는지 확인하고 사용자에게 보여질 저장 팝업 함수 호출
 */
function handleFileUpload(){
    let file = $("#excelFile")[0].files[0];
    if(file !== undefined){
        confirmAndSaveFile(file);
    } else {
        alert2('알림', '엑셀 파일을 먼저 업로드하세요!.', 'error', '확인', excelUpload());
    }
}


/**
 * 장비관리 > 장비목록 > 엑셀 업로드 버튼
 * 4. 사용자에게 파일 데이터 저장을 확인받는 팝업을 표시하고 확인 버튼 클릭 시 파일 데이터를 서버에 저장하는 함수 호출.
 * @param {File} file - 사용자가 업로드한 파일
*/
function confirmAndSaveFile(file){
    Swal.fire({
        title: '알림',
        html: '반드시 선택된 파일이 검증파일인지 확인하세요. 장비 목록을 저장하시겠습니까?',
        icon: 'info',
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        showCancelButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            saveFile(file);
        } else if (result.isDismissed) {
            excelUpload();
        }
    });
}


/**
 * 장비관리 > 장비목록 > 엑셀 업로드 버튼
 * 5. 파일 데이터를 서버에 저장하고, 결과를 받는 함수.
 * @param {File} file - 서버에 저장할 파일
 */
function saveFile(file){
    let formData = new FormData();
    formData.append("file", file);
    $.ajax({
        url : '/cable/eqp/excelInsert',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success : (res) => {
            notifySaveResult(res);
        }
    });
}

/**
 * 장비관리 > 장비목록 > 엑셀 업로드 버튼
 * 6. 서버에 데이터 저장 결과를 사용자에게 알리고 결과 파일을 다운로드하는 함수.
 * @param {Object} res - 서버에서 받은 저장 결과 데이터
 */
function notifySaveResult(res){
    Swal.fire({
        title: '알림',
        html: `데이터 저장 내역</br>성공 : ${res.successList.length}건</br>실패 : ${res.failList.length}건`,
        icon: 'info',
        confirmButtonText: '확인'
    })
    .then(() => {
        $.ajax({
            url : '/cable/eqp/excelResponse',
            type: 'post',
            data: JSON.stringify(res),
            contentType: 'application/json',
            processData: false,
            xhrFields: {
                responseType: 'blob'
            },
            success : (response) => {
                downloadFileFunction(response, 'equipmentResultTemplate.xlsx');
                alert2('알림', '저장되었습니다. 결과 파일을 확인하세요.', 'info', '확인', tableRefresh());
            }
        });
    });
}


/**
 * 장비관리 > 장비목록 > 엑셀 업로드 버튼
 * 7. 엑셀 양식 다운로드 버튼 클릭 시 호출되는 함수로 서버에서 장비목록 추가용 엑셀 템플릿을 다운로드함.
 */
function downloadExcelTemplate(){
    $.ajax({
        url: "/cable/eqp/excelTemplate",
        method: "GET",
        xhrFields: {
            responseType: 'blob'
        },
        success: function(res) {
            downloadFileFunction(res, 'equipmentUploadTemplate.xlsx');
        },
        error: function() {
            alert2('알림', '엑셀 파일을 다운로드하는 중 오류가 발생했습니다.', 'error', '확인', excelUpload());
        }
    });
}


/**
 * 장비관리 > 장비목록 > 엑셀 업로드 버튼
 * 8. 사용자가 업로드한 장비목록 엑셀 파일을 검증하는 함수로 선택된 파일을 서버로 전송해 검증하며, 결과 파일을 다운로드함.
 */
function validExcelEquipmentList() {

    let data = $("#excelFile")[0].files[0];
    if(data != undefined){
        let formData = new FormData();
        formData.append("file", data);

        $.ajax({
            url : '/cable/eqp/excelValid',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            xhrFields: {
                responseType: 'blob'
            },
            success : function(res){
                downloadFileFunction(res, 'validEquipmentUploadTemplate.xlsx');
                alert2('알림', '반드시 검증파일 확인 후 검증파일을 저장하세요.', 'info', '확인', excelUpload);
            },
            error: function (err) {
                alert2('알림', '업로드 중 오류가 발생했습니다.', 'error', '확인', excelUpload);
            }
        });
    } else {
        alert2('알림', '엑셀 파일을 먼저 업로드하세요.', 'error', '확인', excelUpload);
    }
}


/**
 * 장비관리 > 장비목록 > 엑셀 업로드 버튼
 * 9. 다운로드한 파일을 사용자에게 저장하도록 하는 함수로 엑셀 양식 / 검증 / 결과파일 다운로드에서 사용됨
 * @param {Blob} res - 서버에서 응답받은 파일 데이터
 * @param {string} fileName - 저장할 파일의 이름
 */
function downloadFileFunction(res, fileName){
    const url = window.URL.createObjectURL(res);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}
