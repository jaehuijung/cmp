
// cable table column creation function
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
        createColumn('cable_manage_id', false, '케이블 관리번호', "visible"),
        createColumn('', true, ''),
        createColumn('no', false, 'no', 'formatter'),

        // 출발지
        createColumn('s_asset_category',              false, '자산분류'),
        createColumn('s_installation_coordinates',    false, '설치좌표'),
        createColumn('s_eqp_manage_id',               false, '관리 id', 'underline'),
        createColumn('s_eqp_name',                    false, '구성자원명', 'underline'),
        createColumn('s_model_name',                  false, '모델명'),
        createColumn('s_host_name',                   false, '호스트명'),
        createColumn('s_m_company',                   false, '제조사'),
        createColumn('s_port',                        false, '포트번호'),
        createColumn('s_primary_operator',            false, '운영담당자'),
        createColumn('s_primary_outsourced_operator', false, '위탁운영담당자'),

        // 목적지
        createColumn('e_asset_category',              false, '자산분류'),
        createColumn('e_installation_coordinates',    false, '설치좌표'),
        createColumn('e_eqp_manage_id',               false, '관리 id', 'underline'),
        createColumn('e_eqp_name',                    false, '구성자원명', 'underline'),
        createColumn('e_model_name',                  false, '모델명'),
        createColumn('e_host_name',                   false, '호스트명'),
        createColumn('e_m_company',                   false, '제조사'),
        createColumn('e_port',                        false, '포트번호'),
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
                if((field == 's_eqp_manage_id' || field == 's_eqp_name' || field == 'e_eqp_manage_id' || field == 'e_eqp_name')){
                    rackDetail(row.eqp_manage_id)
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

function cableCreate(){
    const url = "/cable/rack/create";
    window.location.href = url;
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
	let chkboxCnt = $("input:checkbox[name=chkbox]:checked")

	html = "";
	html += "<!DOCTYPE HTML>"
	html += "<html>"
	html += "<head>"
	html += 	"<meta charset='utf-8'>"
	html += 	"<title>QR Print</title>"
	html += 	"<link rel='stylesheet' href='/css/printQR2.css' />"
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
	for (let x=0; x<chkboxCnt.length; x++){
		// 0 : 시작문자 1 : 끝문자 2 : 시작이미지 3 : 끝 이미지
		let qrParams = chkboxCnt[x].value.split("&&");
            html += "<div class='printWrap'>"
            html += "		<div class='printLeftWrap'>"
            html += "		    <div class='SElebel'>S</div>"
            html += "			<div class='printLeftImgSrc'>"
            html += "				<img src="+qrParams[2]+" alt='img' class='printImg'>"
            html += "			</div>"
            html += "			<div class='printLeftLabelSrc'>"
            html += "				<div class='infoLabel' align=left>"+qrParams[0]+"</div>"
            html += "				<div class='infoLabel' align=left>"+qrParams[1]+"</div>"
            html += "			</div>"
            html += "			<div class='printLeftLabelSrc'>"
            html += "				<div class='infoLabel'><-></div><div>&nbsp;</div>"
            html += "			</div>"
            html += "		</div>"
            html += "		<div class='printRightWrap'>"
            html += "		  <div class='SElebel'>E</div>"
            html += "			 <div class='printRightImgSrc'>"
            html += "				<img src="+qrParams[3]+" alt='img' class='printImg'>"
            html += "			</div>"
            html += "			<div class='printLeftLabelSrc'>"
            html += "				<div class='infoLabel'><-></div><div>&nbsp;</div>"
            html += "			</div>"
            html += "			<div class='printRightLabelSrc'>"
            html += "				<div class='infoLabel' align=left>"+qrParams[1]+"</div>"
            html += "				<div class='infoLabel' align=left>"+qrParams[0]+"</div>"
            html += "			</div>"
            html += "		</div>"
            html += "	</div>"
	}
	html += 	"</div>"
	html += 	"<script src='/js/function.js'></script>"
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

