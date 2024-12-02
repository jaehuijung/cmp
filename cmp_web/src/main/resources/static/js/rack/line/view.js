

/**
 * 선번장 목록 테이블(lineTable)을 새로고침하는 함수
 */
function tableRefresh(type = ''){
    if (type === 'reset'){
        $("#searchInput").val('');
    }

    $("#lineTable").bootstrapTable('refresh');
}

function createColumn(field, checkbox = false, title, type = 'default') {
    let column = {
        title: title,
        field: field,
        align: 'center',
        valign: 'middle',
        checkbox: checkbox
    };

    if (type === 'underline') {
        column.class = 'nowrap underline custom-width-min-160';
    }
    else if(type === 'formatter'){
        column.formatter = function(value, row, index) {
            let tableOptions = $('#lineTable').bootstrapTable('getOptions');
            return tableOptions.totalRows - index;
        };
    }
    else {
        column.class = 'nowrap';
    }

    return column;
}

let columns = [
    [
        { title: '구분',          align: 'center', valign: 'middle', colspan: 3 },
        { title: '출발지(Start)', align: 'center', valign: 'middle', colspan: 9 },
        { title: '목적지(End)',   align: 'center', valign: 'middle', colspan: 9 },
        { title: '회선',          align: 'center', valign: 'middle', colspan: 3 }
    ],
    [
        // 구분
        createColumn('', true, ''),
        createColumn('no', false, 'no', 'formatter'),
        createColumn('line_manage_id', false, '<span class="custom-font-color-red">*</span> 케이블 관리번호', 'underline'),

        // 출발지
        createColumn('s_asset_category',              false, '자산분류'),
        createColumn('s_installation_coordinates',    false, '설치좌표'),
        createColumn('s_eqp_manage_id',               false, '<span class="custom-font-color-red">*</span> 관리번호'),
        createColumn('s_m_company',                   false, '<span class="custom-font-color-red">*</span> 제조사'),
        createColumn('s_model_name',                  false, '<span class="custom-font-color-red">*</span> 모델명'),
        createColumn('s_host_name',                   false, '<span class="custom-font-color-red">*</span> 호스트명'),
        createColumn('s_eqp_name',                    false, '<span class="custom-font-color-red">*</span> 구성자원명'),
        createColumn('s_port',                        false, '<span class="custom-font-color-red">*</span> 포트번호'),
        createColumn('s_primary_outsourced_operator', false, '<span class="custom-font-color-red">*</span> 운영사용자'),
        // createColumn('s_primary_operator',            false, '운영담당자'),

        // 목적지
        createColumn('e_asset_category',              false, '자산분류'),
        createColumn('e_installation_coordinates',    false, '설치좌표'),
        createColumn('e_eqp_manage_id',               false, '<span class="custom-font-color-red">*</span> 관리번호'),
        createColumn('e_m_company',                   false, '<span class="custom-font-color-red">*</span> 제조사'),
        createColumn('e_model_name',                  false, '<span class="custom-font-color-red">*</span> 모델명'),
        createColumn('e_host_name',                   false, '<span class="custom-font-color-red">*</span> 호스트명'),
        createColumn('e_eqp_name',                    false, '<span class="custom-font-color-red">*</span> 구성자원명'),
        createColumn('e_port',                        false, '<span class="custom-font-color-red">*</span> 포트번호'),
        createColumn('e_primary_outsourced_operator', false, '<span class="custom-font-color-red">*</span> 운영사용자'),
        // createColumn('e_primary_operator',            false, '운영담당자'),

        // 회선
        createColumn('line_speed',     false, '<span class="custom-font-color-red">*</span> 속도'),
        createColumn('line_category',  false, '<span class="custom-font-color-red">*</span> 구분'),
        createColumn('line_color',     false, '<span class="custom-font-color-red">*</span> 색상')
    ]
];

$(function() {
    $('#lineTable').bootstrapTable({
        url: '/rack/line/list',
        method: 'post',
        queryParams: function(params) {
            let searchInput = $("#searchInput").val().trim();
            params.searchData = {
                searchInput
            }
            return params;
        },
        pageSize: 10, columns: columns, cache: false, undefinedText: "",
        pagination: true, sidePagination: 'client', checkboxHeader: true,
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
            if (!errorCode) {
                alert2('알림', '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                return false;
            }

            $("#lineTotalCnt").text("총 " + res.total + "건");
            customRenderPagination(res.total);
        },
        onClickCell: function(field, value, row, $element) {
            if (!$element.hasClass("bs-checkbox")) {
                if(field == 'line_manage_id'){
                    lineDetail(row.line_manage_id);
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

    $('#searchInput').keyup(function(e) {
        if(e.which == 13) {
            $('#lineTable').bootstrapTable('refresh');
        }
    });
});

/**
 * 컬럼 활성화/비활성화를 처리하는 함수
 *
 * @param {string} btn - 선택박스의 구분 ('s' 또는 'e')
 * @param {string} type - 선택박스 타입 ('all' 또는 개별 컬럼명 예: 's_asset_category')
 * @param {boolean} isChecked - 체크 여부
 */
function searchState(btn, type, isChecked) {
    let startColumns = [
        's_asset_category',
        's_installation_coordinates',
        'eqp_manage_id',
        's_m_company',
        's_model_name',
        's_host_name',
        's_eqp_name',
        's_port',
        // 's_primary_operator',
        's_primary_outsourced_operator'
    ];

    let endColumns = [
        'e_asset_category',
        'e_installation_coordinates',
        'eqp_manage_id',
        'e_m_company',
        'e_model_name',
        'e_host_name',
        'e_eqp_name',
        'e_port',
        // 'e_primary_operator',
        'e_primary_outsourced_operator'
    ];

    let querySelector = "", querySelectorAll = "", columnIdx = "", columnsToToggle = [];

    if (btn === 's') {
        querySelector = "#start .selectStateChk";
        querySelectorAll = "#start .selectStateChkAll";
        columnIdx = 3;
        columnsToToggle = startColumns;
    } else if (btn === 'e') {
        querySelector = "#end .selectStateChk";
        querySelectorAll = "#end .selectStateChkAll";
        columnIdx = 12;
        columnsToToggle = endColumns;
    }

    if (type === "all") {
        columnsToToggle.forEach((field, index) => {
            if(field != 'eqp_manage_id'){
                columns[1][columnIdx + index].visible = isChecked;
            }
        });

        document.querySelectorAll(querySelector).forEach(ele => ele.checked = isChecked);
        document.querySelector(querySelectorAll).checked = isChecked;
    } else {
        let columnIndex = columnsToToggle.indexOf(type);
        if (columnIndex !== -1) {
            columns[1][columnIdx + columnIndex].visible = isChecked;
        }

        if(isChecked){
            let allChecked = Array.from(document.querySelectorAll(querySelector)).every(ele => ele.checked);
            if (allChecked) {
                document.querySelector(querySelectorAll).checked = true;
            }
        }
        else{
            let someUnchecked = Array.from(document.querySelectorAll(querySelector)).some(ele => !ele.checked);
            if (someUnchecked) {
                document.querySelector(querySelectorAll).checked = false;
            }
        }
    }

    $('#lineTable').bootstrapTable('refreshOptions', { columns: columns });
}

// 선번장관리 > 선번장목록 > 선번장추가 페이지 이동
function lineCreate(){
    const url = "/rack/line/create";
    window.location.href = url;
}

// 선번장관리 > 선번장목록 > 선번장상세 페이지 이동
function lineDetail(id){
    const url = `/rack/line/detail/${id}`;
    window.location.href = url;
}

// 선번장관리 > 선번장목록 > 선번장수정 페이지 이동
function lineUpdate(){
    let data = $("#lineTable").bootstrapTable('getSelections');

    if (data.length == 0){
        alert2('알림', '수정할 선번장을 선택하세요.', 'info', '확인');
        return false;
    }

    if (data.length > 1){
        alert2('알림', '하나의 선반장만 수정할 수 있습니다.', 'info', '확인');
        return false;
    }

    let id = data[0].line_manage_id;
    const url = `/rack/line/update/${id}`;
    window.location.href = url;
}

/**
 * 선번장관리 > 선번장목록 > 삭제 버튼
 * 선택된 하나 또는 여러 개의 장비를 삭제함
*/
function lineDelete() {
    let data = $("#lineTable").bootstrapTable('getSelections');

    if (data.length == 0){
        alert2('알림', '삭제할 장비를 선택하세요.', 'info', '확인');
        return false;
    }

    Swal.fire({
        title: '선번장 목록 삭제',
        html : '선택한 선번장을 삭제하시겠습니까? 삭제하면 복구할 수 없습니다.',
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
                url : '/rack/line/delete',
                type: 'post',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType : 'JSON',
                success : function(res){
                    alert3Close();

                    let errorCode = res.errorCode;
                    if(!errorCode){
                        alert2('알림', '데이터를 삭제하는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                        return false;
                    }

                    alert2('알림', '삭제되었습니다.', 'info', '확인', tableRefresh());
               }
            });
        }
    });
}

/**
 * 선번장관리 > 선번장목록 > 선번장 목록 다운로드 버튼
 * 선택된 하나 또는 여러 개의 장비를 다운로드함
*/
function selectLineDownload(){
    alert3("save");

    $.ajax({
        url: "/rack/line/downloadLineInfo",
        method: "post",
        xhrFields: {
            responseType: 'blob'
        }
    }).done(function(res) {
        alert3Close();
    }).then(function(res) {
        downloadFileFunction(res, 'lineList.xlsx');
        alert2('알림', '선번장 목록이 다운로드되었습니다.', 'info', '확인');
    }).catch(function() {
        alert2('알림', '엑셀 파일을 다운로드하는 중 오류가 발생했습니다. 관리자에게 문의하세요.', 'error', '확인');
    });
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


// 엑셀 download
function qrSubmit(){
    let chkBox = $("input:checkbox[name=chkbox]:checked");
    let startList = [];
    let endList = [];
	let startImageList = [];
	let endImageList = [];

    document.getElementById("qrChk").value = 0;
	document.getElementById("qrStart").value = "";
	document.getElementById("qrEnd").value = "";
	document.getElementById("qrStartImage").value = "";
	document.getElementById("qrEndImage").value = "";

    if (chkBox.length != 0){
        for(let chkcnt=0; chkcnt<chkBox.length; chkcnt++){
			let qrSplitTmp = chkBox[chkcnt].value.split("&&");
			
			startList.push(qrSplitTmp[0]);
			endList.push(qrSplitTmp[1]);
			startImageList.push(qrSplitTmp[2]);
			endImageList.push(qrSplitTmp[3]);
        }

		document.getElementById("qrChk").value = chkBox.length; // 선택한 라벨 전체 개수
		document.getElementById("qrStart").value = startList.join(","); // 라벨에 들어갈 QR 시작 문자열
		document.getElementById("qrEnd").value = endList.join(","); // 라벨에 들어갈 QR 끝 문자열
		document.getElementById("qrStartImage").value = startImageList.join(","); // 라벨에 들어갈 QR 시작 이미지 경로
		document.getElementById("qrEndImage").value = endImageList.join(","); // 라벨에 들어갈 QR 끝 이미지 경로

		alert("qr라벨 " + chkBox.length + "개 download!");
    }
    else{
        alert("not chk");		
    }

}

// qr page loading
function QRLoad(){
    let labelList = $("#lineTable").bootstrapTable("getSelections");

    if(labelList.length === 0){
        alert('알림', 'pdf로 출력할 선번장을 선택해주세요.', 'info', '확인');
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/rack/line/qrLoad",
        contentType: "application/json",
        data: JSON.stringify(labelList),
        success: function(result){
            let newWindow = window.open("", "_blank", "width=1120,height=800,menubar=no,toolbar=no,location=no,status=no");
            newWindow.document.write(result);
        },
        error: function(err){
            console.error('Error:', err);
        }
    });
}