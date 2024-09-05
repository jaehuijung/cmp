
/**************** 전역변수 ****************/
// base url
 let urlPre = "https://127.0.0.1";
 // let urlPre = "https://3.38.246.94";

/* 시작 */

// 선번장관리 > 선번장목록 > 장비그룹 리스트
// ※ 수정필요!
// /cablelist 엔드포인트에서 바로 쿼리 날려서 모델에 데이터 담아오도록
function GroupListTable() {
	let url = urlPre+'/group/list'
	axios.get( url )
        .then(function(res) {

            let groupList = res.data;
            $('#s_group_name').empty();
            $('#e_group_name').empty();

            var soption,eoption;
            soption = $("<option value=''>선택</option>");
            eoption = $("<option value=''>선택</option>");    
            $('#s_group_name').append(soption);
            $('#e_group_name').append(eoption);

            groupList.forEach((element) => {
            soption = $("<option value='" + element.group_name +"'>" + element.group_name + "</option>");   
            $('#s_group_name').append(soption);

            eoption = $("<option value='" + element.group_name +"'>" + element.group_name + "</option>");   
            $('#e_group_name').append(eoption);

        });
    })

}


// 선번장관리 > 선번장목록 > 랙번호 리스트
// ※ 수정필요!
// /cablelist 엔드포인트에서 바로 쿼리 날려서 모델에 데이터 담아오도록
function RackListTable() {
	let url = urlPre+'/rack/list';

    axios.get( url )
    .then(function(res) {
        let rackList = res.data;

        var soption, eoption;

        soption = $("<option value=''>선택</option>");
        eoption = $("<option value=''>선택</option>");

        $('#s_rack_name').append(soption);
        $('#e_rack_name').append(eoption);

        rackList.forEach((element) => {
            soption = $("<option value='" + element.name +"'>" + element.name + "</option>");   
            $('#s_rack_name').append(soption);

            eoption = $("<option value='" + element.name +"'>" + element.name + "</option>");   
            $('#e_rack_name').append(eoption);

        });
    })
}



// 선번장관리 > 선번장목록 > 처음에 들어갔을 때 보여지는 문구...
// ※ 필요없으니 나중에 지우기
/*
function SearchCableinfo() {
	html = "";
	html += "<div class='CableListInfo'><p style='margin-top:30px;'><i class='bi bi-check'></i>검색버튼 클릭시 목록조회 가능(컬럼 항목 체크)</p>"
	html += "<p><i class='bi bi-check'></i> 조건을 입력하지 않고 검색시 전체 목록 검색</p></div>"
	$(".CableListDiv").append(html);
}
*/



// 선번장관리 > 선번장추가 > 호스트명 > 장비선택 > 호스트 검색 시 리스트
function SearchEqpinfo(str) {

    let url = urlPre + '/quipment/search';
    let search_keyword = 'hostname';
    let chk = str;
    let search_value;

    if (chk == "s") {
        search_value= document.getElementById("c_s_hostname").value;
    } else if(chk == "e") {
        search_value= document.getElementById("c_e_hostname").value;
    }

    if(search_value==null || search_value=="") {
        alert("호스트명을 입력하세요");
        return;
    }

    axios.get(  url, {
                params: {   search_keyword : search_keyword ,
                            search_value : search_value }
    })
    .then(function(res) {

        let sList = res.data;

        html = '';
        $(".EqpSearch").remove();
        html += "<div class='EqpSearch'>";

        if (sList.length == 0) {
            html += "<div>조회 Data가 없습니다.</div>";
        } else {
            sList.forEach((element) => {
                param = chk + "," + element.hostname + "," + element.eqp_name + "," + element.rack_name + "," + element.unit_position;
                param = param.replace(/ /g,"")

                html +=  "<div class='seleqp'>" + element.eqp_name +" ("+ element.hostname+ ")";
                html +=  "<button type='button' class='btn btn-secondary' onclick='SetEqpinfo(\"" + param + "\")';>선택</button></div>";
            });
        }

        html += "</div>";
        $(".SearchDiv").append(html);
    })
}



// 선번장관리 > 선번장추가 > 호스트명 > 장비선택 > 호스트 검색 시 리스트 선택 버튼 클릭
function SetEqpinfo(str) {

	let seqp = str.split(',');
	let chk = seqp[0];
	let hostname = seqp[1];
	let eqp_name = seqp[2];
	let unit_position = seqp[3];

	if (chk == "s") {
        $('#s_hostname').val(seqp[1]);
        $('#s_eqp_name').val(seqp[2]);
        $('#s_rack_name').val(seqp[3]);
        $('#s_unit_position').val(seqp[4]);
        $('#staticBackdrop').modal('hide');
	} else if(chk == "e") {
		$('#e_hostname').val(seqp[1]);
        $('#e_eqp_name').val(seqp[2]);
        $('#e_rack_name').val(seqp[3]);
        $('#e_unit_position').val(seqp[4]);
	    $('#end-cable').modal('hide');
	}
}



// 장비관리 > 장비상세, 장비수정, 장비추가 페이지에서 장비그룹 리스트
// ※ 수정필요!
// 이것두 바로 쿼리 날려서 모델에 데이터 담아오도록
function EqpGroupList(str) {
	
	let url = urlPre+'/group/list';
	
	axios.get( url )
    .then(function(res) {

        let groupList = res.data;
        $('#group_name').empty();
        var soption,eoption;

        option = $("<option value=''>선택</option>");
        $('#group_name').append(option);

        groupList.forEach((element) => {
            option = $("<option value='" + element.group_name +"'>" + element.group_name + "</option>");   
            $('#group_name').append(option);
        });

        if(str != "" || str != null || str != undefined){
            $('#group_name').val(str).prop("selected", true);
        }
    })
}

// 장비관리 > 장비추가 > 중복체크 버튼
// ※ 수정필요!
// 사용할 수 없는 hostname일 경우 빈 칸으로 만들어주기
function checkhostnameExist(){
	
	const hostname = $("#hostname").val()
	
	if(hostname.length == 0){
		alert("hostname을 입력해주세요.")
		return 
	}
	
	$.ajax({
			url : urlPre+'/check/hostname/' + hostname,
			type: 'get',
				dataType : 'text',
				success : function(result){
					if(result.trim() == 'true'){
						alert('사용할 수 있는 hostname 입니다')
						$("#hostnameChecked").val('true')
					
					} else {
						alert('사용할 수 없는 hostname 입니다')
						$("#hostnameChecked").val('false')
					}
				}
		   })
}


// 장비관리 > 장비상세, 장비수정, 장비추가 페이지에서 랙번호 리스트
// ※ 수정필요!
// 이것두 바로 쿼리 날려서 모델에 데이터 담아오도록
function EqpRackList(str) {
	let url = urlPre+'/rack/list';
		
    axios.get( url )
    .then(function(res) {
        let rackList = res.data;

        var option;
        option = $("<option value=''>선택</option>");

        $('#rack_name').append(option);

        rackList.forEach((element) => {
            option = $("<option value='" + element.name +"'>" + element.name + "</option>");   
            $('#rack_name').append(option);
        });

        if(str != "" || str != null || str != undefined){
            $('#rack_name').val(str).prop("selected", true);
        }
    })

}

// 장비관리 > 장비목록 > 장비 리스트 조회
// ※ 수정필요!
// 일단.. html 연산 다 걷어내기... 부트스트랩으로 어떻게 바꾸지...
function EqpListTable(page){
	
	let url = urlPre+'/quipment/list';
	
	let current_page_no = page;
	axios.get(  url	,
	          { params:{ current_page_no : current_page_no }
	        })
    .then(function(res) {

        let eqpList = res.data[0].list;
        $(".EquipmentListTable").remove();
        html = "";
        html += "<div class='EquipmentListTable' >";
        html += "<table class='table table-bordered'><thead>"

        html += "<tr style='text-align: center;vertical-align: top;font-size:15px;' class='table-secondary'>"
        html += 	"<th width=3%>NO</th>"
        html += 	"<th width=8%>그룹명</th>"
        html += 	"<th width=17%>장비명</th>"
        html += 	"<th width=7%>장비방향</th>"
        html += 	"<th width=7%>랙번호</th>"
        html += 	"<th width=7%>유닛번호</th>"
        html += 	"<th width=13%>호스트명</th>"
        html += 	"<th width=7%>제조사</th>"
        html += 	"<th width=7%>모델</th>"
        html += 	"<th width=8%>도입년도</th>"
        html += 	"<th width=11%>수정·삭제</th>"
        html += "</tr></thread><tbody>"

        eqpList.forEach((element) => {

            html += 	"<tr style='text-align: center;font-size:15px;' >"
            html += 		"<td>" + element.rownum	 + "</td>"
            html += 		"<td>" + element.group_name	 + "</td>"
            html += 		"<td>" + element.eqp_name	 + "</td>"
            html += 		"<td>" + element.eqp_direct	 + "</td>"
            html += 		"<td>" + element.rack_name	 + "</td>"
            html += 		"<td>" + element.unit_position	 + "</td>"
            html += 		"<td>" + element.hostname	 + "</td>"
            html += 		"<td>" + element.m_company+ "</td>"
            html += 		"<td>" +element.model	 + "</td>"
            html += 		"<td>" +element.yearofintroduct	 + "</td>";
            html += 		"<td>";
            html +=         "<button type='button' class='btn btn-outline-secondary' onclick='eqp_detail(" +  element.eqp_id + ");' style='font-size:13px;padding:3px 8px;margin-right:5px;'>상세</button>";
            html +=         "<button type='button' class='btn btn-outline-secondary' onclick='eqp_update(" +  element.eqp_id + ");' style='font-size:13px;padding:3px 8px;margin-right:5px;'>수정</button>";
            html +=         "<button type='button' class='btn btn-outline-secondary' onclick='eqp_delete(" +  element.eqp_id + ");' style='font-size:13px;padding:3px 8px;margin:0px;'>삭제</button>";
            html +=         "</td>";
            html += 	"</tr>"
        });

        html += "</tbody></table>"

        html += "<div class='dpagination' style='display: flex;justify-content: center;padding-top: 8px;'>";
        html += res.data[0].pagination;
        html += "</div>";
        html += "</div>"

        $(".EqpListDiv").append(html);
    })
}



// 얘는 뭐하는 놈일까...
$('#staticBackdrop').on('hidden.bs.modal', function (e) {     
	$('#c_s_hostname').val("");
    $(".EqpSearch").remove();
})

// 얘도 뭐하는 놈일까...
$('#end-cable').on('hidden.bs.modal', function (e) {     
	$('#c_e_hostname').val("");
    $(".EqpSearch").remove();
})



// 선번장관리 > 선번장목록 > 선번장 리스트 그리기
// ※ 수정필요
// html연산 다 걷어내야함
function SearchCableList(page){

    let url = urlPre + '/cable/list';
    let s_group_name = document.getElementById("s_group_name").value;
    let s_eqp_name = document.getElementById("s_eqp_name").value;
    let s_rack_name = document.getElementById("s_rack_name").value;
    let s_unit_position = document.getElementById("s_unit_position").value;
    let s_hostname = document.getElementById("s_hostname").value;
    let e_group_name = document.getElementById("e_group_name").value;
    let e_eqp_name = document.getElementById("e_eqp_name").value;
    let e_rack_name = document.getElementById("e_rack_name").value;
    let e_unit_position = document.getElementById("e_unit_position").value;
    let e_hostname = document.getElementById("e_hostname").value;
    let c_type = document.getElementById("c_type").value;
    let c_velocity = document.getElementById("c_velocity").value;
    let c_color = document.getElementById("c_color").value;
    let current_page_no = page;
    let c_s_group_name = document.getElementById("c_s_group_name");
    let c_s_eqp_direct = document.getElementById("c_s_eqp_direct");
    let c_s_rack_name = document.getElementById("c_s_rack_name");
    let c_s_unit_position = document.getElementById("c_s_unit_position");
    let c_s_hostname = document.getElementById("c_s_hostname");
    let c_s_slotnum = document.getElementById("c_s_slotnum");
    let c_s_portnum = document.getElementById("c_s_portnum");
    let c_e_eqp_name = document.getElementById("c_e_eqp_name");
    let c_e_rack_name = document.getElementById("c_e_rack_name");
    let c_e_unit_position = document.getElementById("c_e_unit_position");
    let c_e_hostname = document.getElementById("c_e_hostname");
    let c_e_slotnum = document.getElementById("c_e_slotnum");
    let c_e_portnum = document.getElementById("c_e_portnum");
    let c_c_velocity = document.getElementById("c_c_velocity");
    let c_c_type = document.getElementById("c_c_type");
    let c_c_color = document.getElementById("c_c_color");


    axios.get( url, {params:{	s_group_name : s_group_name,
                                s_eqp_name : s_eqp_name,
                                s_rack_name : s_rack_name,
                                s_unit_position : s_unit_position,
                                s_hostname : s_hostname,
                                e_group_name : e_group_name,
                                e_eqp_name : e_eqp_name,
                                e_rack_name : e_rack_name,
                                e_unit_position : e_unit_position,
                                e_hostname : e_hostname,
                                c_type : c_type,
                                c_velocity : c_velocity,
                                c_color : c_color,
                                current_page_no : current_page_no,
    }})
    .then(function(res) {

        let cableList = res.data[0].list;
        let s_colspn=0,
        e_colspn=0,
        c_colspn=0;

        $(".tab-top").remove();
        $(".CableListInfo").remove();
        $(".dpagination").remove();
        $(".CableListTable").remove();
        $("#CableColDiv").remove();

        html = "";
        html += "<div class='tab-top' style='display: flex;width:100%'>";
        html += "<div style='margin-top:20px;'>Total Count : "+res.data[0].totalCount+"</div>"
        html += "<form name='qrFormData' id='targetForm' method='GET' action='/api/qr/printqr'>"
        html += "					  									<input type='hidden' id='qrChk' name='qrChk' value=''/>"
        html += "					  									<input type='hidden' id='qrStart' name='qrStart' value=''/>"
        html += "					  									<input type='hidden' id='qrEnd' name='qrEnd' value=''/>"
        html += "					  									<input type='hidden' id='qrStartImage' name='qrStartImage' value=''/>"
        html += "					  									<input type='hidden' id='qrEndImage' name='qrEndImage' value=''/>"
        html += "					  								</form>"
        html += "<div  style='margin-top:5px;margin-left:auto;'><button type='button' class='btn btn-outline-secondary' style='margin:5px 0px 10px 10px;font-size:13px;padding:3px 8px;' onclick='excelsubmit();'>엑셀 다운로드</button>";
        html += "<button type='button' class='btn btn-outline-secondary'style='margin:5px 0px 10px 10px;font-size:13px;padding:3px 8px;' onclick='QRPDFImg()'>PDF인쇄</button></div>"
        html += "</div>"
        html += "<div class='CableListTable'>";
        html += "<table class='table table-bordered'>"
        html += "<tr class='table-secondary'  style='text-align: center;font-size:15px;'>"
        html += 	"<th><input type='checkbox' name='mastarChkbox' onclick=QRChkFunction(this)></th>"
        html += 	"<th>NO</th>"

        if (c_s_group_name.checked) {
        s_colspn++;
        html += 	"<th>장비그룹명</th>" }
        if (c_s_eqp_name.checked) {
        s_colspn++;
        html += 	"<th>장비명</th>" }
        if (c_s_eqp_direct.checked) {
        s_colspn++;
        html += 	"<th>장비방향</th>"}
        if (c_s_rack_name.checked) {
        s_colspn++;
        html += 	"<th>랙번호</th>" }
        if (c_s_unit_position.checked) {
        s_colspn++;
        html += 	"<th>유닛번호</th>" }
        if (c_s_hostname.checked) {
        s_colspn++;
        html += 	"<th>호스트명</th>" }
        if (c_s_slotnum.checked) {
        s_colspn++;
        html += 	"<th>슬롯번호</th>" }
        if (c_s_portnum.checked) {
        s_colspn++;
        html += 	"<th>포트번호</th>" }
        if (c_e_rack_name.checked) {
        e_colspn++;
        html += 	"<th>랙번호</th>" }
        if (c_e_unit_position.checked) {
        e_colspn++;
        html += 	"<th>유닛번호</th>" }
        if (c_e_hostname.checked) {
        e_colspn++;
        html += 	"<th>호스트명</th>" }
        if (c_e_slotnum.checked) {
        e_colspn++;
        html += 	"<th>슬롯번호</th>" }
        if (c_e_portnum.checked) {
        e_colspn++;
        html += 	"<th>포트번호</th>" }
        if (c_c_velocity.checked) {
        c_colspn++;
        html += 	"<th>선속도</th>" }
        if (c_c_type.checked) {
        c_colspn++;
        html += 	"<th>선구분</th>" }
        if (c_c_color.checked) {
        c_colspn++;
        html += 	"<th>선색상</th>" }
        html += "</tr><thead id='kk'></thread><tbody>"


        cableList.forEach((element) => {
            let start_rack = String(element.s_rack_name).padStart(2, "0");
            let end_rack = String(element.e_rack_name).padStart(2, "0");
            let start_unit_position =  String(element.s_unit_position).padStart(2, "0");
            let end_unit_position =  String(element.e_unit_position).padStart(2, "0");

            qrParams = "[R" + start_rack + "-" + start_unit_position + "]"
            + element.s_hostname + "_" + element.s_slotnum + "_" + element.s_portnum + "&&"
            + "[R" + end_rack + "-" + end_unit_position + "]"
            + element.e_hostname + "_" + element.e_slotnum + "_" + element.e_portnum + "&&"
            + element.s_qr_image + "&&"
            + element.e_qr_image;

            html += 	"<tr style='color:"+element.request+";text-align: center;font-size:15px;'>";
            html += 		"<td><input type='checkbox' name='chkbox' onclick=QRUpdateTextFunction(this) id="+element.idx +" value="+ qrParams +"></td>";
            html += 		"<td>" + element.rownum	 + "</td>";

            if (c_s_group_name.checked) {
            html += 		"<td>" + element.s_group_name	 + "</td>";	}
            if (c_s_eqp_name.checked) {
            html += 		"<td>" + element.s_eqp_name	 + "</td>";	}
            if (c_s_eqp_direct.checked) {
            html += 		"<td>" + element.s_eqp_direct	 + "</td>"; }
            if (c_s_rack_name.checked) {
            html += 		"<td>" + element.s_rack_name	 + "</td>"; }
            if (c_s_unit_position.checked) {
            html += 		"<td>" + element.s_unit_position	 + "</td>"; }
            if (c_s_hostname.checked) {
            html += 		"<td>" + element.s_hostname	 + "</td>"; }
            if (c_s_slotnum.checked) {
            html += 		"<td>" + element.s_slotnum	 + "</td>"; }
            if (c_s_portnum.checked) {
            html += 		"<td>" + element.s_portnum	 + "</td>"; }
            if (c_e_rack_name.checked) {
            html += 		"<td>" + element.e_rack_name	 + "</td>" }
            if (c_e_unit_position.checked) {
            html += 		"<td>" + element.e_unit_position	 + "</td>" }
            if (c_e_hostname.checked) {
            html += 		"<td>" + element.e_hostname	 + "</td>" }
            if (c_e_slotnum.checked) {
            html += 		"<td>" + element.e_slotnum	 + "</td>" }
            if (c_e_portnum.checked) {
            html += 		"<td>" + element.e_portnum	 + "</td>" }
            if (c_c_velocity.checked) {
            html += 		"<td>" + element.c_velocity	 + "</td>" }
            if (c_c_type.checked) {
            html += 		"<td>" + element.c_type	 + "</td>" }
            if (c_c_color.checked) {
            html += 		"<td>" + element.c_color   + "</td>" }
            html += 	"</tr>";


        });

        html += "</tbody></table>"
        html += "</div>"
        html += "<div class='dpagination' style='display: flex;justify-content: center;padding-top: 8px;'>";
        html += res.data[0].pagination;
        html += "</div>";
        thh = "<tr class='table-secondary' style='text-align: center;'><th colspan=2>구분</th><th colspan=" + s_colspn + ">출발지</th><th colspan=" + e_colspn +">목적지</th><th colspan=" + c_colspn + ">회선</th></tr>";
        console.log("thh************", thh);
        $(".CableListDiv").append(html);
        $("#kk").append(thh);

    })
}


// [완료]
// 체크박스 모두선택/모두해제
function QRChkFunction(ele){
	const chkbox = document.getElementsByName('chkbox');
	chkbox.forEach((box) => {
		box.checked = ele.checked;
		QRUpdateTextFunction(box);
	})

}

// [완료]
// input readOnly option settings
function QRUpdateTextFunction(ele){
	let updateColumn = document.getElementsByName("update"+ele.id);
		
	if(ele.checked == true){
		for (let x=0; x<updateColumn.length; x++){
			updateColumn[x].readOnly = false;
		}
	}
	else if(ele.checked == false){
		for (let x=0; x<updateColumn.length; x++){
			updateColumn[x].readOnly = true;
		}
	}
}

/**************** 출력 ****************/
// [완료]
// QR EXCEL download
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

// [완료]
// QR PDF
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

// [완료]
// pdf button
function QRPDFFunction() { 
	let QRPrintHead = document.getElementById("QRPrintHead");
	QRPrintHead.style.display = 'none';
	
	window.print();
	QRPrintHead.style.display = 'block';
}

let zoom = 1;
let QRPrintTable = document.getElementById("QRPrintTable");

// [완료]
// pdf button
function QRPlusMinusFunction(values){
	zoom = values;
	QRPrintTable.style.zoom = zoom;
}

// [완료]
// pdf button
function QRPlusFunction(){	
	zoom = Number(zoom) + 0.25;
	
	if((3 < zoom) && (zoom <= 3.25)){
		zoom = 3;
	}

	QRPrintTable.style.zoom = zoom;
	document.getElementById('printRange').value = zoom;
}

// [완료]
// pdf button
function QRMinusFunction(){
	zoom = Number(zoom) - 0.25;
	
	if ((0.75 <= zoom) && (zoom < 1)){
		zoom = 1;
	}

	QRPrintTable.style.zoom = zoom;
	document.getElementById('printRange').value = zoom;
}


/************* 시스템 관리 *************/
// 전체 사용자
function userInfo() {
	let url = urlPre+'/api/system/alluser';
	
		
		axios.get( url )
		.then(function(res) {
			console.log("user search", res.data);
			
			let userList = res.data;		
			//$(".userDiv").remove();

			html = '';
			html += "<table class='table table-bordered' style='margin-top:20px;'><tr class='table-secondary'  style='text-align: center;'>"
			html += 	"<th>NO</th>"
			html += 	"<th>ID</th>"		
			html += 	"<th>Name</th>"
			html += 	"<th>E-mail</th>"
			html += 	"<th>Phone Number</th>" + "<th>수정</th></tr>"

			userList.forEach((element,index) => {
				let uid = element.id;
				html += 	"<tr style='text-align: center;'>"
				html += 		"<td>"+(index+1)+"</td>"
				html += 		"<td>"+ uid +"</td>"
				html += 		"<td>"+element.name +"</td>"
				html += 		"<td>"+element.email+"</td>"
				html += 		"<td>"+element.phone+"</td>"
				html += 		"<td style='width:150px;'><button type='button' class='btn btn-outline-secondary' onclick=usr_update('" +  uid + "'); style='font-size:13px;padding:3px 8px;margin-right:10px;'>수정</button><button type='button' class='btn btn-outline-secondary' onclick=usr_delete('" 	  
				html += 		uid + "'); style='font-size:13px;padding:3px 8px;'>삭제</button></td>";
				html += 	"</tr>"
			});
			
			html += "</table>"
			$(".userDiv").append(html);
		})
	
}

