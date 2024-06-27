
/**************** 전역변수 ****************/
// base url
//let urlPre = "https://mapleutil.site";
let urlPre = "http://127.0.0.1:8080";
// let urlPre = "https://116.36.98.167";


/**************** 로그인 ****************/
// [완료]
// 로그인 페이지 이동
function moveLogin(){
	location.href = urlPre + '/sl/user/login'
}

// [완료]
// 회원가입 페이지 이동
function moveJoin(){
	location.href = urlPre + '/sl/user/join'
}


/**************** 생성 ****************/
// [완료]
// QR 등록 페이지 이동
function moveQRInsert(){
	location.href = urlPre + '/sl/qr/insert';
}

// [완료]
// QR 등록
function QRInsertDatabase(){
	console.log("qr insert database!");
	let url = urlPre+'/api/qr/insertqr';

	let sRackNumber = document.getElementById("sRackNumber").value;
	let sRackLocation = document.getElementById("sRackLocation").value;
	let sServerName = document.getElementById("sServerName").value;
	let sPortNumber = document.getElementById("sPortNumber").value;
	let eRackNumber = document.getElementById("eRackNumber").value;
	let eRackLocation = document.getElementById("eRackLocation").value;
	let eServerName = document.getElementById("eServerName").value;
	let ePortNumber = document.getElementById("ePortNumber").value;
	
	
	//실패 없이 빈값이면 무조건 아래 값 적용
	if (sRackNumber == ""){
		sRackNumber = "1"
	}
	if (sRackLocation == ""){
		sRackLocation = "2"
	}
	if (sServerName == ""){
		sServerName = "3"
	}
	if (sPortNumber == ""){
		sPortNumber = "4"
	}
	if (eRackNumber == ""){
		eRackNumber = "5"
	}
	if (eRackLocation == ""){
		eRackLocation = "6"
	}
	if (eServerName == ""){
		eServerName = "7"
	}
	if (ePortNumber == ""){
		ePortNumber = "8"
	}

	document.getElementById("sRackNumber").value = '';
    document.getElementById("sRackLocation").value = '';
    document.getElementById("sServerName").value = '';
    document.getElementById("sPortNumber").value = '';
    document.getElementById("eRackNumber").value = '';
    document.getElementById("eRackLocation").value = '';
    document.getElementById("eServerName").value = '';
    document.getElementById("ePortNumber").value = '';

	axios.get( url, {params:{ sRackNumber : sRackNumber,
                              sRackLocation : sRackLocation,
                              sServerName : sServerName,
                              sPortNumber : sPortNumber,
                              eRackNumber : eRackNumber,
                              eRackLocation : eRackLocation,
                              eServerName : eServerName,
                              ePortNumber : ePortNumber
							}})
	moveQR();
}


/**************** 조회 ****************/
// [완료]
// 등록된 QR 정보 조회 페이지 이동
function moveQR(){
	location.href = urlPre + '/sl/qr/showqr';
}

// [완료]
// 리스트 검색
function QRSearchTable(){
	
	console.log("^^");
	let url = urlPre+'/api/qr/searchqrdetail';

	let sRackNumber = document.getElementById("sRackNumber").value;
	let sRackLocation = document.getElementById("sRackLocation").value;
	let sServerName = document.getElementById("sServerName").value;
	let sPortNumber = document.getElementById("sPortNumber").value;
	let eRackNumber = document.getElementById("eRackNumber").value;
	let eRackLocation = document.getElementById("eRackLocation").value;
	let eServerName = document.getElementById("eServerName").value;
	let ePortNumber = document.getElementById("ePortNumber").value;

	axios.get( url, {params:{ sRackNumber : sRackNumber,
		sRackLocation : sRackLocation,
		sServerName : sServerName,
		sPortNumber : sPortNumber,
		eRackNumber : eRackNumber,
		eRackLocation : eRackLocation,
		eServerName : eServerName,
		ePortNumber : ePortNumber
	  }})
	  .then(function(res){
			console.log(res.data)
			console.log("search")
			let qrList = res.data;		
			$(".QRListTable").remove();

			html = "";
			html += "<div class='QRListTable'>";
			html += "<div id='qrFunctionBtn'>"
			html += "<input type='button' id='targetBtn' value='추가' onclick='moveQRInsert()'/>"			
			html += "<input type='button' id='targetBtn' value='변경' onclick='QRUpdate("+'"search"'+");'/>"
			html += "<input type='button' id='targetBtn' value='삭제' onclick='QRDelete();'>"			
			html += "</div>"
			html += "<div id='downloadBtn'>"
			html += "<form name='qrFormData' id='targetForm' method='GET' action='/api/qr/printqr' onsubmit='qrSubmit();'>"
			html += 	"<input type='hidden' id='qrChk' name='qrChk' value=''/>"
			html += 	"<input type='hidden' id='qrStart' name='qrStart' value=''/>"
			html += 	"<input type='hidden' id='qrEnd' name='qrEnd' value=''/>"
			html += 	"<input type='hidden' id='qrStartImage' name='qrStartImage' value=''/>"
			html += 	"<input type='hidden' id='qrEndImage' name='qrEndImage' value=''/>"
			html += 	"<input type='submit' id='targetBtn' value='EXCEL'/>"
			html += "</form>"
			html += "<input type='button' id='targetBtn' value='PDF' onclick='QRPDFImg()'/>"
			html += "</div>"

			html += "<table class='QRTable' border='1'>"
			html += "<tr>"
			html += 	"<th><input type='checkbox' name='mastarChkbox' onclick=QRChkFunction(this)></th>"
			html += 	"<th>idx</th>"
			html += 	"<th>sRackNumber</th>"
			html += 	"<th>sRackLocation</th>"
			html += 	"<th>sServerName</th>"
			html += 	"<th>sPortNumber</th>"
			html += 	"<th>eRackNumber</th>"
			html += 	"<th>eRackLocation</th>"
			html += 	"<th>eServerName</th>"
			html += 	"<th>ePortNumber</th>"
			html += "</tr>"

			qrList.forEach((element) => {
				// 편의상 라벨 출력할 때 라벨 포맷에 맞도록 새로운 문자열 파라미터 생성
				// "[" + "start랙번호" + "-" + "start랙위치" + "] " + "start서버명" + "_" + "start포트번호" + "&&"
				// "[" + "end랙번호" + "-" + "end랙위치" + "] " + "end서버명" + "_" + "end포트번호" + "&&"
				// "start이미지" + "&&" + "end이미지"
				qrParams = "[" + element.sRackNumber + "-" + element.sRackLocation + "]　"
							+ element.sServerName + "_" + element.sPortNumber + "&&" 
							+ "[" + element.eRackNumber + "-" + element.eRackLocation + "]　"
							+ element.eServerName + "_" + element.ePortNumber + "&&"
							+ element.qrStartImage + "&&" 
							+ element.qrEndImage;

				html += 	"<tr style='color:"+element.request+";'>"		
				html += 		"<th><input type='checkbox' name='chkbox' onclick=QRUpdateTextFunction(this) id="+element.idx +" value="+ qrParams +"></th>";
				html += 		"<th>"+element.idx+"</th>"
				html += 		"<th><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.sRackNumber	 + "' readonly></th>"
				html += 		"<th><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.sRackLocation + "' readonly></th>"
				html += 		"<th><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.sServerName	 + "' readonly></th>"
				html += 		"<th><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.sPortNumber	 + "' readonly></th>"
				html += 		"<th><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.eRackNumber	 + "' readonly></th>"
				html += 		"<th><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.eRackLocation + "' readonly></th>"
				html += 		"<th><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.eServerName	 + "' readonly></th>"
				html += 		"<th><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.ePortNumber	 + "' readonly></th>"
				html += 	"</tr>"
			});

			html += "</table>"
			html += "</div>"
			$(".QRListDiv").append(html);
	  })
}


function GroupListTable() {
	let url = urlPre+'/test/group/list';
	
	axios.get( url )
			.then(function(res) {
				
				
				let groupList = res.data;		
				$(".GroupListTable").remove();
				
				html = "";
			    html += "<div class='GroupListTable'>";	
				html += "<select id='mainCate' name='mainCate' style='width:200px;'>"
				html += "<option value=''>선택</option>";
				groupList.forEach((element) => {
				html += "<option value='>" + element.id +"'>" + element.group_name + "</option>";
				});
		       
				html += "</select>"
				html += "</div>"
				$(".GroupListDiv").append(html);
			})
	
}

function checkhostnameExist(){
	
	const hostname = $("#hostname").val()
	
	if(hostname.length == 0){
		alert("hostname을 입력해주세요.")
		return 
	}
	
	/*$.ajax({
		url : '${root}user/check' + user_id,
		type: 'get',
			dataType : 'text',
			success : function(result){
				if(result.trim() == 'true'){
					alert('사용할 수 있는 아이디입니다')
					$("#userIdChecked").val('true')
					$("#joinUserBean #idCheck span").text('')
				} else {
					alert('사용할 수 없는 아이디 입니다')
					$("#userIdChecked").val('false')
				}
			}
	   })
	}*/
	
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

function resetUserIdExist() {
		$("#userIdChecked").val('false')
}

function RackListTable() {
	let url = urlPre+'/test/rack/list';
		
		axios.get( url )
				.then(function(res) {
					
					
					let rackList = res.data;		
					$(".RackListTable").remove();
					
					html = "";
				    html += "<div class='RackListTable'>";	
					html += "<select id='mainCate' name='mainCate' style='width:200px;'>"
					html += "<option value=''>선택</option>";
					rackList.forEach((element) => {
					html += "<option value='>" + element.id +"'>" + element.name + "</option>";
					});
			       
					html += "</select>"
					html += "</div>"
					$(".RackListDiv").append(html);
				})
	
}

function EqpListTable(){
	
	let url = urlPre+'/test/quipment/list';
	axios.get( url )
		.then(function(res) {
			console.log("db search!", res.data);
			
			let eqpList = res.data;		
			$(".EquipmentListTable").remove();
			html = "";
		    html += "<div class='EquipmentListTable'>";	
			html += "<table class='cable-list'><thead>"

			html += "<tr>"
			html += 	"<th width=5%><input type='checkbox' name='mastarChkbox' onclick=QRChkFunction(this)></th>"
			html += 	"<th width=5%>NO</th>"
			html += 	"<th width=15%>장비그룹명</th>"
			html += 	"<th width=15%>장비명</th>"
			html += 	"<th width=10%>장비방향</th>"
			html += 	"<th width=5%>렉번호</th>"
			html += 	"<th width=5%>유닛번호</th>"
			html += 	"<th width=16%>호스트명</th>"
			html += 	"<th width=8%>제조사</th>"
			html += 	"<th width=8%>모델</th>"
			html += 	"<th width=8%>도입년도</th>"
	
			html += "</tr></thread><tbody>"
			

			eqpList.forEach((element) => {
						
	      
		    html += 	"<tr>"
			html += 		"<td><input type='checkbox' name='chkbox' onclick=QRUpdateTextFunction(this)></td>";
			html += 		"<td>" + element.rownum	 + "</td>"	
			html += 		"<td>" + element.group_name	 + "</td>"	
			html += 		"<td>" + element.eqp_name	 + "</td>"		
			html += 		"<td>" + element.eqp_direct	 + "</td>"
			html += 		"<td>" + element.rack_name	 + "</td>"
			html += 		"<td>" + element.unit_position	 + "</td>"
			html += 		"<td>" + element.hostname	 + "</td>"
			html += 		"<td>" + element.m_company+ "</td>"
			html += 		"<td>" +element.model	 + "</td>"
			html += 		"<td>" +element.yearofintroduct	 + "</td>"

			
			
		
			html += 	"</tr>"
	
			});
	       
	html += "</tbody></table>"
			html += "</div>"
			$(".EqpListDiv").append(html);
		})
}



function CableListTable(){
	let url = urlPre+'/test/cable/list';
	axios.get( url )
		.then(function(res) {
			console.log("db search!", res.data);
			
			let cableList = res.data;		
			$(".CableListTable").remove();
			html = "";
		    html += "<div class='CableListTable'>";	
			html += "<table class='table table-bordered'><thead>"
			html += "<tr><th colspan=11>출발지</th><th colspan=5>목적지</th><th colspan=3>회선</th></tr>"
			html += "<tr>"
			html += 	"<th><input type='checkbox' name='mastarChkbox' onclick=QRChkFunction(this)></th>"
			html += 	"<th>NO</th>"
			html += 	"<th>장비그룹명</th>"
			html += 	"<th>장비명</th>"
			html += 	"<th>장비방향</th>"
			html += 	"<th>렉번호</th>"
			html += 	"<th>유닛번호</th>"
			html += 	"<th>호스트명</th>"
			html += 	"<th>슬롯번호</th>"
			html += 	"<th>포트번호</th>"
			html += 	"<th>렉번호</th>"
			html += 	"<th>유닛번호</th>"
			html += 	"<th>호스트명</th>"
			html += 	"<th>슬롯번호</th>"
			html += 	"<th>포트번호</th>"
			html += 	"<th>선속도</th>"
			html += 	"<th>선구분</th>"
			html += 	"<th>선색상</th>"
			html += "</tr></thread><tbody>"
			

			cableList.forEach((element) => {
				
				// 편의상 라벨 출력할 때 라벨 포맷에 맞도록 새로운 문자열 파라미터 생성
						// "[" + "start랙번호" + "-" + "start랙위치" + "] " + "start서버명" + "_" + "start포트번호" + "&&"
						// "[" + "end랙번호" + "-" + "end랙위치" + "] " + "end서버명" + "_" + "end포트번호" + "&&"
						// "start이미지" + "&&" + "end이미지"
						qrParams = "[" + element.s_rack_name + "-" + element.s_unit_position + "]　"
								 + element.s_hostname + "_" + element.s_portnum + "&&" 
								 + "[" + element.e_rack_name + "-" + element.e_unit_position + "]　"
								 + element.e_hostname + "_" + element.e_portnum + "&&"
								 + element.s_qr_image + "&&" 
								 + element.e_qr_image;
						
	
			html += 	"<tr style='color:"+element.request+";'>"
			html += 		"<td><input type='checkbox' name='chkbox' onclick=QRUpdateTextFunction(this) id="+element.idx +" value="+ qrParams +"></td>";
			html += 		"<td>" + element.rownum	 + "</td>"	
			html += 		"<td>" + element.group_name	 + "</td>"	
			html += 		"<td>" + element.eqp_name	 + "</td>"		
			html += 		"<td>" + element.eqp_direct	 + "</td>"
			html += 		"<td>" + element.s_rack_name	 + "</td>"
			html += 		"<td>" + element.s_unit_position	 + "</td>"
			html += 		"<td>" + element.s_hostname	 + "</td>"
			html += 		"<td>" + element.s_slotnum	 + "</td>"
			html += 		"<td>" + element.s_portnum	 + "</td>"
			html += 		"<td>" + element.e_rack_name	 + "</td>"
			html += 		"<td>" + element.e_unit_position	 + "</td>"
			html += 		"<td>" + element.e_hostname	 + "</td>"
			html += 		"<td>" + element.e_slotnum	 + "</td>"
			html += 		"<td>" + element.e_portnum	 + "</td>"			
			html += 		"<td>" + element.c_velocity	 + "</td>"
			html += 		"<td>" + element.c_type	 + "</td>"
			html += 		"<td>" + element.c_color   + "</td>"
			html += 	"</tr>"
	
			});
	       
	html += "</tbody></table>"
			html += "</div>"
			$(".CableListDiv").append(html);
		})
}


// [완료]
// 등록된 QR 조회
function QRListTable(){

	let url = urlPre+'/api/qr/searchqr';
	
	axios.get( url )
	.then(function(res) {
		console.log("db search!", res.data);
		
		let qrList = res.data;		
		$(".QRListTable").remove();

		html = "";
		html += "<div class='QRListTable'>";
		/*html += "<div id='qrFunctionBtn'>"
		html += "<input type='button' id='targetBtn' value='추가' onclick='moveQRInsert()'/>"
		html += "<input type='button' id='targetBtn' value='변경' onclick='QRUpdate("+'"list"'+");'/>"
		html += "<input type='button' id='targetBtn' value='삭제' onclick='QRDelete();'>"
		html += "</div>"
		html += "<div id='downloadBtn'>"
		html += "<form name='qrFormData' id='targetForm' method='GET' action='/api/qr/printqr' onsubmit='qrSubmit();'>"
		html += 	"<input type='hidden' id='qrChk' name='qrChk' value=''/>"
		html += 	"<input type='hidden' id='qrStart' name='qrStart' value=''/>"
		html += 	"<input type='hidden' id='qrEnd' name='qrEnd' value=''/>"
		html += 	"<input type='hidden' id='qrStartImage' name='qrStartImage' value=''/>"
		html += 	"<input type='hidden' id='qrEndImage' name='qrEndImage' value=''/>"
		html += 	"<input type='submit' id='targetBtn' value='EXCEL'/>"
        html += "</form>"
        html += "<input type='button' id='targetBtn' value='PDF' onclick='QRPDFImg()'/>"
        html += "</div>"*/

		html += "<table class='QRTable' border='1'>"
		html += "<tr>"
		html += 	"<th><input type='checkbox' name='mastarChkbox' onclick=QRChkFunction(this)></th>"
		html += 	"<th>idx</th>"
		html += 	"<th>sRackNumber</th>"
		html += 	"<th>sRackLocation</th>"
		html += 	"<th>sServerName</th>"
		html += 	"<th>sPortNumber</th>"
		html += 	"<th>eRackNumber</th>"
		html += 	"<th>eRackLocation</th>"
		html += 	"<th>eServerName</th>"
		html += 	"<th>ePortNumber</th>"
		html += "</tr>"

		qrList.forEach((element) => {
			// 편의상 라벨 출력할 때 라벨 포맷에 맞도록 새로운 문자열 파라미터 생성
			// "[" + "start랙번호" + "-" + "start랙위치" + "] " + "start서버명" + "_" + "start포트번호" + "&&"
			// "[" + "end랙번호" + "-" + "end랙위치" + "] " + "end서버명" + "_" + "end포트번호" + "&&"
			// "start이미지" + "&&" + "end이미지"
			qrParams = "[" + element.sRackNumber + "-" + element.sRackLocation + "]　"
					 + element.sServerName + "_" + element.sPortNumber + "&&" 
					 + "[" + element.eRackNumber + "-" + element.eRackLocation + "]　"
					 + element.eServerName + "_" + element.ePortNumber + "&&"
					 + element.qrStartImage + "&&" 
					 + element.qrEndImage;

			html += 	"<tr style='color:"+element.request+";'>"		
			html += 		"<td><input type='checkbox' name='chkbox' onclick=QRUpdateTextFunction(this) id="+element.idx +" value="+ qrParams +"></td>";
			html += 		"<th>"+element.idx+"</th>"
			html += 		"<td><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.sRackNumber	 + "' readonly></td>"
			html += 		"<td><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.sRackLocation + "' readonly></td>"
			html += 		"<td><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.sServerName	 + "' readonly></td>"
			html += 		"<td><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.sPortNumber	 + "' readonly></td>"
			html += 		"<td><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.eRackNumber	 + "' readonly></td>"
			html += 		"<td><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.eRackLocation + "' readonly></td>"
			html += 		"<td><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.eServerName	 + "' readonly></td>"
			html += 		"<td><input type='text' name=update" + element.idx + " id='updateInput' value='" + element.ePortNumber	 + "' readonly></td>"
			html += 	"</tr>"
		});
		
		html += "</table>"
		html += "</div>"
		$(".QRListDiv").append(html);
	})
}

// [완료]
// 삭제버튼
function QRDelete(){
	let url = urlPre+'/api/qr/qrdelete';
	let chkboxCnt = $("input:checkbox[name=chkbox]:checked")

	for (let x=0; x<chkboxCnt.length; x++){
		axios.get(url, {params: { idx: chkboxCnt[x].id }})
		.then(function(){
			if(x==chkboxCnt.length-1){
				QRListTable();
				alert('삭제되었습니다.')
			}
		})
	}	
}

// [진행중]
// 변경버튼
// 20230630 이후 코드 변경으로 인해 발생한 문제
// 데이터 변경 시 QR 이미지 처리 필요
// 해결방안1. 변경할 때마다 이미지를 생성하는것은 비효율 > 인덱스 일련번호로 이미지 생성 후 일련번호를 서버에서 검증
// 해결방안2. 변경할 때마다 이미지를 생성 > 변경할때마다 이미지 새로 생성
function QRUpdate(chk){
	let url = urlPre+'/api/qr/qrupdate';
	let chkboxCnt = $("input:checkbox[name=chkbox]:checked")

	for (let x=0; x<chkboxCnt.length; x++){
		let updateColumn = document.getElementsByName("update"+chkboxCnt[x].id)
		let params = []
		for (let y=0; y<updateColumn.length; y++){
			params.push(updateColumn[y].value)
		}

		axios.get(url, {params: {
			idx : chkboxCnt[x].id,
			sRackNumber : params[0], sRackLocation : params[1], sServerName : params[2], sPortNumber : params[3], 
			eRackNumber : params[4], eRackLocation : params[5], eServerName : params[6], ePortNumber : params[7]
		}})
		.then(function(){
			if (chk == 'search'){
				QRSearchTable();
			}
			else if(chk == 'list'){
				QRListTable();
				alert('수정되었습니다.')
			}			
		})
	}	
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
    console.log("QR EXCEL Print!");

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

		console.log(startList);
		console.log(endList);
		console.log(startImageList);
		console.log(endImageList);

		alert("qr라벨 " + chkBox.length + "개 download!");
    }
    else{
        alert("not chk");		
    }

}

// [완료]
// QR PDF
function QRPDFImg(){
	console.log("QR PDF print");	
	let chkboxCnt = $("input:checkbox[name=chkbox]:checked")
	
	html = "";
	html += "<!DOCTYPE HTML>"
	html += "<html xmlns:th='http://www.thymeleaf.org'>"
	html += "<head>"
	html += 	"<meta charset='utf-8'>"
	html += 	"<title>QR Print TEST</title>"
	html += 	"<link rel='stylesheet' href='/css/printQR.css' />"
	html += "</head>"
	html += "<body>"
	html += 	"<hr id='sep'>"	
	html += 	"<div id= QRPrintHead>"		
	html +=		"<p>※ 미리보기 영역은 QR 이미지가 어떤 모양인지 확인하기 위해 보여짐</p>"
	html +=		"<p>　예를들어 미리보기 영역의 모양을 실제로 A4로 출력했을 때 다르기 때문에 QR 라벨 확인 후 저장 시 인쇄 옵션에서 적절히 배율 설정 필요</p>"
	html += 		"<input type='button' class='printBtn' value='저장' onClick='QRPDFFunction();'>"
	html += 		"<input type='button' class='printBtn' value='-' onClick='QRMinusFunction();'>"
	html += 		"<input type='range'  id='printRange' value='1' min='1' max='3' step='0.01' oninput='QRPlusMinusFunction(this.value);'/>"
	html += 		"<input type='button' class='printBtn' value='+' onClick='QRPlusFunction();'>"
	html += 	"</div>"	
	html += 	"<hr id='sep'>"
	html += 	"<div class='QRPrintTable' id='QRPrintTable'>";
	html += 	"<div class='QRPrintWrap' id='QRPrintWrap'>";
	for (let x=0; x<chkboxCnt.length; x++){
		// 0 : 시작문자 1 : 끝문자 2 : 시작이미지 3 : 끝 이미지
		let qrParams = chkboxCnt[x].value.split("&&");

		html += "<div class='printWrap'>"
		html += 	"<div class='printLeftWrap'>"
		html += 		"<div class='printLeftImgSrc'>"
		html += 			"<img src="+qrParams[2]+" alt='img' class='printImg'>"
		html += 		"</div>";
		html += 		"<div class='printLeftLabelSrc'>"
		html +=					"<p class='printLabel'>"+qrParams[0]+" <-> </br>"+qrParams[1]+"</p>";
		html += 		"</div>";
		html += 	"</div>";
		html += 	"<div class='printRightWrap'>"
		html += 		"<div class='printRightImgSrc'>"
		html += 			"<img src="+qrParams[3]+" alt='img' class='printImg'>"
		html += 		"</div>";
		html += 		"<div class='printRightLabelSrc'>"
		html +=					"<p class='printLabel'>"+qrParams[0]+" <-> </br>"+qrParams[1]+"</p>";
		html += 		"</div>";
		html += 	"</div>";
		html += "</div>";
	}
	html += 	"</div>"
	html += 	"</div>"
	html += 	"<script src='/js/function.js'></script>"
	html += "</body>"
	html += "</html>";

	let windowUrl = "";
	let windowTarget = "_blank";
	let windowOption = "width=1280, menubar=no, toolbar=no, location=no, status=no";
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
// [완료]
// 전체 사용자
function systemUserInfo(el){
	let url = urlPre+'/api/system/alluser';
	const tabMenu = document.querySelectorAll('.tab-menu ul li');
	tabMenu.forEach((el) => {
		el.classList.remove('active')
	})
	el.classList.add('active');
	
	axios.get( url )
	.then(function(res) {
		console.log("user search", res.data);
		
		let userList = res.data;		
		$(".systemTable").remove();

		html = '';
		html += "<table class='systemTable' border='1'>"
		html += 	"<th>idx</th>"
		html += 	"<th>id</th>"		
		html += 	"<th>name</th>"
		html += 	"<th>email</th>"
		html += 	"<th>phone</th>"

		userList.forEach((element,index) => {
			html += 	"<tr>"
			html += 		"<th>"+(index+1)+"</th>"
			html += 		"<th>"+element.id+"</th>"
			html += 		"<th>"+element.name+"</th>"
			html += 		"<th>"+element.email+"</th>"
			html += 		"<th>"+element.phone+"</th>"
			html += 	"</tr>"
		});
		
		html += "</table>"
		$(".systemDiv").append(html);
	})
}

// [완료]
// 사용로그
function systemQRLogTable(el){
	let url = urlPre+'/api/system/searchlog';
	const tabMenu = document.querySelectorAll('.tab-menu ul li');
	tabMenu.forEach((el) => {
		el.classList.remove('active')
	})
	el.classList.add('active');
	
	axios.get( url )
	.then(function(res) {
		console.log("db search log", res.data);

		let index = 1;
		let logList = res.data;		
		$(".systemTable").remove();

		html = '';
		html += "<div class='systemTable'>"
		html += "<table class='systemTable' border='1'>"
		html += "<tr>"
        html += 	"<th>idx</th>"
        html += 	"<th>id</th>"
        html += 	"<th>ip</th>"
        html += 	"<th>times</th>"
		html += 	"<th>RackNumber</th>"
		html += 	"<th>RackLocation</th>"
		html += 	"<th>ServerName</th>"
		html += 	"<th>PortNumber</th>"
        html += "</tr>"

		logList.forEach(element => {			
			html += 	"<tr>"
			html += 		"<th>"+index+"</th>"
			html += 		"<th>"+element.id+"</th>"
			html += 		"<th>"+element.ip+"</th>"
			html += 		"<th>"+element.times+"</th>"
			html += 		"<th>"+element.RackNumber+"</th>"
			html += 		"<th>"+element.RackLocation+"</th>"
			html += 		"<th>"+element.ServerName+"</th>"
			html += 		"<th>"+element.PortNumber+"</th>"
			html += 	"</tr>"

			index++;
		});
		html += "</table>"
		html += "</div>"
		$(".systemDiv").append(html);		
	})
}

