

/**
 * 선번장 목록 테이블(cableTable)을 새로고침하는 함수
 */
function tableRefresh(){
    $("#cableTable").bootstrapTable('refresh');
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
        column.class = 'nowrap underline';
    }
    else if (type === 'visible') {
        column.visible = false;
    }
    else if(type === 'formatter'){
        column.formatter = function(value, row, index) {
            let tableOptions = $('#cableTable').bootstrapTable('getOptions');
            return tableOptions.totalRows - ((tableOptions.pageNumber - 1) * tableOptions.pageSize) - index;
        };
    }
    else {
        column.class = 'nowrap';
    }

    return column;
}

// Define columns for cableTable
let columns = [
    [
        { title: '구분',   align: 'center', valign: 'middle', colspan: 3 },
        { title: '출발지', align: 'center', valign: 'middle', colspan: 10 },
        { title: '목적지', align: 'center', valign: 'middle', colspan: 10 },
        { title: '회선',   align: 'center', valign: 'middle', colspan: 3 }
    ],
    [
        // 구분
        createColumn('', true, ''),
        createColumn('no', false, 'no', 'formatter'),
        createColumn('cable_manage_id', false, '케이블 관리번호', 'underline'),

        // 출발지
        createColumn('s_eqp_manage_id',               false, '관리번호'),
        createColumn('s_eqp_name',                    false, '구성자원명'),
        createColumn('s_port',                        false, '포트번호'),
        createColumn('s_asset_category',              false, '자산분류'),
        createColumn('s_installation_coordinates',    false, '설치좌표'),
        createColumn('s_model_name',                  false, '모델명'),
        createColumn('s_host_name',                   false, '호스트명'),
        createColumn('s_m_company',                   false, '제조사'),
        createColumn('s_primary_operator',            false, '운영담당자'),
        createColumn('s_primary_outsourced_operator', false, '위탁운영담당자'),

        // 목적지
        createColumn('e_eqp_manage_id',               false, '관리번호'),
        createColumn('e_eqp_name',                    false, '구성자원명'),
        createColumn('e_port',                        false, '포트번호'),
        createColumn('e_asset_category',              false, '자산분류'),
        createColumn('e_installation_coordinates',    false, '설치좌표'),
        createColumn('e_model_name',                  false, '모델명'),
        createColumn('e_host_name',                   false, '호스트명'),
        createColumn('e_m_company',                   false, '제조사'),
        createColumn('e_primary_operator',            false, '운영담당자'),
        createColumn('e_primary_outsourced_operator', false, '위탁운영담당자'),

        // 회선
        createColumn('cable_speed',     false, '속도'),
        createColumn('cable_category',  false, '구분'),
        createColumn('cable_color',     false, '색상')
    ]
];

$(function() {
    $('#cableTable').bootstrapTable({
        url: '/cable/rack/list',
        method: 'post',
        queryParams: function(params) {
            let searchInput = $("#searchInput").val().trim();
            params.searchData = {
                searchInput
            }
            return params;
        },
        pageSize: 10,
        columns: columns,
        cache: false,
        undefinedText: "",
        pagination: true,
        sidePagination: 'server',
        checkboxHeader: true,
        classes: "txt-pd",
        clickToSelect: false,
        sortOrder: 'desc',
        sortName: 'ORDER',
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
            } else {
                $("#cableTotalCnt").text("총 " + res.total + "건")
            }
        },
        onClickCell: function(field, value, row, $element) {
            if (!$element.hasClass("bs-checkbox")) {
                if(field == 'cable_manage_id'){
                    rackDetail(row.cable_manage_id)
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
            $('#cableTable').bootstrapTable('refresh');
        }
    });
});

// 선번장관리 > 선번장목록 > 선번장추가 페이지 이동
function rackCreate(){
    const url = "/cable/rack/create";
    window.location.href = url;
}

// 선번장관리 > 선번장목록 > 선번장상세 페이지 이동
function rackDetail(id){
    const url = `/cable/rack/detail/${id}`;
    window.location.href = url;
}

// 선번장관리 > 선번장목록 > 선번장수정 페이지 이동
function rackUpdate(){
    let data = $("#cableTable").bootstrapTable('getSelections');

    if (data.length == 0){
        alert2('알림', '수정할 선번장을 선택하세요.', 'info', '확인');
    }
    else if (data.length > 1){
        alert2('알림', '하나의 선반장만 수정할 수 있습니다.', 'info', '확인');
    }
    else{
        let id = data[0].cable_manage_id;
        const url = `/cable/rack/update/${id}`;
        window.location.href = url;
    }
}

/**
 * 선번장관리 > 선번장목록 > 삭제 버튼
 * 선택된 하나 또는 여러 개의 장비를 삭제함
*/
function rackDelete() {
    let data = $("#cableTable").bootstrapTable('getSelections');

    if (data.length == 0){
        alert2('알림', '삭제할 장비를 선택하세요.', 'info', '확인');
    }

    else{
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
                    url : '/cable/rack/delete',
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
 * 선번장관리 > 선번장목록 > 선번장 목록 다운로드 버튼
 * 선택된 하나 또는 여러 개의 장비를 다운로드함
*/
function selectRackDownload(){
    console.log("엑셀 다운로드")
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

// PDF 다운로드 버튼
function QRPDFImg(){
	let pdfSelection = $("#cableTable").bootstrapTable("getSelections");

    if(pdfSelection.length === 0){
        alert2('알림', 'pdf로 출력할 선번장을 선택해주세요.', 'info', '확인');
        return false;
    }

	html = "";
	html += "<!DOCTYPE HTML>"
	html += "<html>"
	html += "<head>"
	html += 	"<meta charset='utf-8'>"
	html += 	"<title>QR Print</title>"
	// html += 	"<link rel='stylesheet' href='/css/printQR2.css' />"
	html += "</head>"
	html += "<body><header>"
	html += 	"<hr id='sep'>"	
	html += 	"<div id= QRPrintHead>"		
	html +=		"<p>※ 미리보기 영역은 QR 이미지가 어떤 모양인지 확인하기 위해 보여짐</p>"
	html +=		"<p>　예를들어 미리보기 영역의 모양을 실제로 A4로 출력했을 때 다르기 때문에 QR 라벨 확인 후 저장 시 인쇄 옵션에서 적절히 배율 설정 필요</p>"
	html += 		"<input type='button' class='printBtn' value='저장' onClick='QRPDFFunction();'>"
	html += 		"<input type='button' class='printBtn' value='-' onClick='QRMinusFunction();'>"
	html += 		"<input type='range'  id='printRange' value='1' min='1' max='3' step='0.01' oninput='QRPlusMinusFunction(this.value);'/>"
	html += 		"<input type='button' class='printBtn' value='+' onClick='QRPlusFunction();'>"
	html += 	"</div>"	
	html += 	"<hr id='sep' style='margin:20px 0px;'></header>"
	html += 	"<div class='QRPrintWrap' id='QRPrintWrap'>";


    pdfSelection.forEach(ele => {
        html += "<div class='printWrap'>"
        html += "		<div class='printLeftWrap'>"
        html += "		    <div class='SElebel'>S</div>"
        html += "			<div class='printLeftImgSrc'>"
        html += "				<img src="+ele.qr_image_location+" alt='img' class='printImg'>"
        html += "			</div>"
        html += "			<div class='printLeftLabelSrc'>"
        html += "				<div class='infoLabel' align=left>"+ele.cable_category+"</div>"
        html += "				<div class='infoLabel' align=left>"+ele.cable_color+"</div>"
        html += "			</div>"
        html += "			<div class='printLeftLabelSrc'>"
        html += "				<div class='infoLabel'><-></div><div>&nbsp;</div>"
        html += "			</div>"
        html += "		</div>"
        html += "		<div class='printRightWrap'>"
        html += "		  <div class='SElebel'>E</div>"
        html += "			 <div class='printRightImgSrc'>"
        html += "				<img src="+ele.qr_image_location+" alt='img' class='printImg'>"
        html += "			</div>"
        html += "			<div class='printLeftLabelSrc'>"
        html += "				<div class='infoLabel'><-></div><div>&nbsp;</div>"
        html += "			</div>"
        html += "			<div class='printRightLabelSrc'>"
        html += "				<div class='infoLabel' align=left>"+ele.cable_category+"</div>"
        html += "				<div class='infoLabel' align=left>"+ele.cable_color+"</div>"
        html += "			</div>"
        html += "		</div>"
        html += "	</div>"
	})
	html += 	"</div>"
	html += "</body>"
	html += "</html>";

	let windowUrl = "";
	let windowTarget = "_blank";
	let windowOption = "width=900,height=800, menubar=no, toolbar=no, location=no, status=no";
	win = window.open(windowUrl, windowTarget, windowOption);
	self.focus();
	win.document.open();
	win.document.write(html);
}

// pdf 저장 버튼
function QRPDFFunction() {
	let QRPrintHead = document.getElementById("QRPrintHead");
	QRPrintHead.style.display = 'none';
	
	window.print();
	QRPrintHead.style.display = 'block';
}

let zoom = 1;
let QRPrintTable = document.getElementById("QRPrintTable");

// pdf 확대/축소 스크롤
function QRPlusMinusFunction(values){
	zoom = values;
	QRPrintTable.style.zoom = zoom;
}

// pdf 확대 버튼
function QRPlusFunction(){	
	zoom = Number(zoom) + 0.25;
	
	if((3 < zoom) && (zoom <= 3.25)){
		zoom = 3;
	}

	QRPrintTable.style.zoom = zoom;
	document.getElementById('printRange').value = zoom;
}

// pdf 축소 버튼
function QRMinusFunction(){
	zoom = Number(zoom) - 0.25;
	
	if ((0.75 <= zoom) && (zoom < 1)){
		zoom = 1;
	}

	QRPrintTable.style.zoom = zoom;
	document.getElementById('printRange').value = zoom;
}

