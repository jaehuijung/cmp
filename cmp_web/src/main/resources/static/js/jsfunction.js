
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
				$('#s_group_name').empty();
				$('#e_group_name').empty();
				var soption,eoption;
				
				soption = $("<option value=''>선택</option>");
				eoption = $("<option value=''>선택</option>");    
			    $('#s_group_name').append(soption);
				
				
				$('#e_group_name').append(eoption);
				//html = "";
				
				//html += "<select class='form-select' id='s_group_name' style='font-size: 13px;height:30px;'>"
				//html += "<option value=''>선택</option>";
				groupList.forEach((element) => {
				//html += "<option value='" + element.group_name +"'>" + element.group_name + "</option>";
				
		       
				//html += "</select>"
				soption = $("<option value='" + element.group_name +"'>" + element.group_name + "</option>");   
				$('#s_group_name').append(soption);
				
				eoption = $("<option value='" + element.group_name +"'>" + element.group_name + "</option>");   
				$('#e_group_name').append(eoption);


				});
				//$(".GroupListDiv").append(html);
			})
	
}

function EqpGroupList(str) {
	
	
	

	let url = urlPre+'/test/group/list';
	
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
				//	$('#group_name').val(str)).prop("selected", true);
				}
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
					//$(".RackListTable").remove();

					//$('#s_rack_name').empty();
					//$('#e_rack_name').empty();
					var soption, eoption;

					soption = $("<option value=''>선택</option>");
					eoption = $("<option value=''>선택</option>");
					
					$('#s_rack_name').append(soption);
					$('#e_rack_name').append(eoption);
					/*html = "";
				    html += "<div class='RackListTable'>";	
					html += "<select id='mainCate' name='mainCate' style='width:200px;'>"
					html += "<option value=''>선택</option>";
					rackList.forEach((element) => {
					html += "<option value='>" + element.id +"'>" + element.name + "</option>";
					});
			       
					html += "</select>"
					html += "</div>"*/
					rackList.forEach((element) => {
					soption = $("<option value='" + element.name +"'>" + element.name + "</option>");   
					$('#s_rack_name').append(soption);
									
					eoption = $("<option value='" + element.name +"'>" + element.name + "</option>");   
					$('#e_rack_name').append(eoption);
					
					//$(".RackListDiv").append(html);
					});
				})
	
}

function EqpRackList(str) {
	let url = urlPre+'/test/rack/list';
		
		axios.get( url )
				.then(function(res) {
					

					let rackList = res.data;
					//$(".RackListTable").remove();

					var option;

					option = $("<option value=''>선택</option>");
					
					$('#rack_name').append(option);
					
					rackList.forEach((element) => {
					option = $("<option value='" + element.name +"'>" + element.name + "</option>");   
					$('#rack_name').append(option);
									
					});
					
					if(str != "" || str != null || str != undefined){
									$('#rack_name').val(str).prop("selected", true);
								//	$('#group_name').val(str)).prop("selected", true);
					}
					
					
				})
	
}

function EqpListTable(page){
	
	let url = urlPre+'/test/quipment/list';
	
	/*html += "<table class='table table-bordered'><thead>"
			html += "<tr><th colspan=11>출발지</th><th colspan=5>목적지</th><th colspan=3>회선</th></tr>"
			html += "<tr>"
			html += 	"<th><input type='checkbox' name='mastarChkbox' onclick=QRChkFunction(this)></th>"
			html += 	"<th>NO</th>"
			html += 	"<th>장비그룹명</th>"
			html += 	"<th>장비명</th>"
			html += 	"<th>장비방향</th>"
			
	*/		
	let current_page_no = page;	
	axios.get( url	, {params:{	
								/*group_name : group_name,
			  		  			eqp_name : eqp_name,
			  		  			rack_name : rack_name,
			  					unit_position : unit_position,
			  					hostname : hostname,
			  					m_company : m_company,
			  					yearofintroduct : yearofintroduct,
								model : model,*/
								current_page_no : current_page_no
							}} )
		.then(function(res) {
			console.log("db search!", res.data);
			
			//let eqpList = res.data;
			let eqpList = res.data[0].list;		
			$(".EquipmentListTable").remove();
			html = "";
		    html += "<div class='EquipmentListTable' >";	
			html += "<table class='table table-bordered'><thead>"

			html += "<tr style='text-align: center;vertical-align: top;' class='table-secondary'>"
		//	html += 	"<th width=5%><input type='checkbox' name='mastarChkbox' onclick=QRChkFunction(this)></th>"
			html += 	"<th width=3%>NO</th>"
			html += 	"<th width=10%>장비그룹명</th>"
			html += 	"<th width=15%>장비명</th>"
			html += 	"<th width=10%>장비방향</th>"
			html += 	"<th width=7%>렉번호</th>"
			html += 	"<th width=5%>유닛번호</th>"
			html += 	"<th width=16%>호스트명</th>"
			html += 	"<th width=6%>제조사</th>"
			html += 	"<th width=6%>모델</th>"
			html += 	"<th width=6%>도입년도</th>"
			html += 	"<th width=11%>수정</th>"
			//onclick="location.href='./index.html'"
			html += "</tr></thread><tbody>"
			

			eqpList.forEach((element) => {
						
	      
		    html += 	"<tr style='text-align: center;' >"
		//	html += 		"<td><input type='checkbox' name='chkbox' onclick=QRUpdateTextFunction(this)></td>";
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
			html += 		"<td><button type='button' class='btn btn-outline-secondary' onclick='eqp_update(" +  element.eqp_id + ");' style='font-size:10px;margin-right:5px;'>수정</button><button type='button' class='btn btn-outline-secondary' onclick='eqp_delete(" 
							+  element.eqp_id + ");' style='font-size:10px;'>삭제</button></td>";
			
			
		
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


function SearchEqpinfo(str) {
	
	
	let url = urlPre + '/test/quipment/search';
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
	
	axios.get(url, {
		params: {
			search_keyword : search_keyword ,
			search_value : search_value  
		}})
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
					//param = element.hostname + "_" + element.unit_position;
		
	                html +=  "<div class='seleqp'>" + element.eqp_name +" ("+ element.hostname+ ")";
					html +=  "<button type='button' class='btn btn-secondary' onclick='SetEqpinfo(\"" + param + "\")';>선택</button></div>";
					

				});
			}
			
			html += "</div>";
			$(".SearchDiv").append(html);
		})
}
$('#staticBackdrop').on('hidden.bs.modal', function (e) {     
	$('#c_s_hostname').val("");
	//$('#c_e_hostname').val("");
		$(".EqpSearch").remove();
	
})

$('#end-cable').on('hidden.bs.modal', function (e) {     
	$('#c_e_hostname').val("");
	//$('#c_s_hostname').val("");
		$(".EqpSearch").remove();
	
})

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
	//$(".EqpSearch").remove();
	$('#staticBackdrop').modal('hide');
	
	} else if(chk == "e") {
		$('#e_hostname').val(seqp[1]);
			$('#e_eqp_name').val(seqp[2]);
			$('#e_rack_name').val(seqp[3]);
			$('#e_unit_position').val(seqp[4]);
			//$(".EqpSearch").remove();	
	$('#end-cable').modal('hide');
	}
	//alert(eqp_name);
	
	
}

		  
function SearchCableinfo() {
	html = "";
	html += "<div class='CableListInfo'><p style='margin-top:30px;'><i class='bi bi-check'></i>검색버튼 클릭시 목록조회 가능(컬럼 항목 체크)</p>"
	html += "<p><i class='bi bi-check'></i> 조건을 입력하지 않고 검색시 전체 목록 검색</p></div>"
	$(".CableListDiv").append(html);
}


function SearchCableList(page){
	
	let url = urlPre + '/test/cable/list';
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
	let c_s_eqp_name = document.getElementById("c_s_eqp_name");
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
		
	
    //var s_chk_length = 
											
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
							current_page_no : current_page_no
						}})
		.then(function(res) {
		
			console.log(res.data[0].pagination);
			let cableList = res.data[0].list;
			let s_colspn=0,e_colspn=0,c_colspn=0;
			$(".tab-top").remove();
			$(".CableListInfo").remove();
			$(".dpagination").remove();		
			$(".CableListTable").remove();
			$("#CableColDiv").remove();
			html = "";
			html += "<div class='tab-top' style='display: flex;width:100%'>";
			html += "<div style='margin-top:20px;'>Total Count : "+res.data[0].totalCount+"</div>"
			html += "<div  style='margin-top:5px;margin-left:auto;'><button type='button' class='btn btn-outline-secondary' style='margin:5px 0px 10px 10px'>엑셀 다운로드</button>";		
			html += "<button type='button' class='btn btn-outline-secondary'style='margin:5px 0px 10px 10px' onclick='QRPDFImg()'>PDF인쇄</button></div></div>";
			//html += "<button type='button' class='btn btn-outline-secondary'style='margin:5px 0px 10px 10px' data-bs-toggle='modal' data-bs-target='#modalprint'>PDF인쇄</button></div></div>";
			
			//html += "<button type='button' class='btn btn-outline-secondary' style='margin:5px 0px 10px 10px' >PDF인쇄</button>"
		    html += "<div class='CableListTable'>";	
			html += "<table class='table table-bordered'>"
			//html += "<div id='CableColDiv'></div>"
			//html += "<tr class='table-secondary' style='text-align: center;'><th colspan=2>구분</th><th colspan=9>출발지</th><th colspan=5>목적지</th><th colspan=3>회선</th></tr>"
			html += "<tr class='table-secondary'  style='text-align: center;'>"
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
			html += 	"<th>렉번호</th>" }
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
			html += 	"<th>렉번호</th>" }
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
			
			
			console.log("s************", s_colspn);
			console.log("e************", e_colspn);
			console.log("c************", c_colspn);

			cableList.forEach((element) => {
						qrParams = "[" + element.s_rack_name + "-" + element.s_unit_position + "]　"
								 + element.s_hostname + "_" + element.s_portnum + "&&" 
								 + "[" + element.e_rack_name + "-" + element.e_unit_position + "]　"
								 + element.e_hostname + "_" + element.e_portnum + "&&"
								 + element.s_qr_image + "&&" 
								 + element.e_qr_image;
	
			html += 	"<tr style='color:"+element.request+";text-align: center;'>";
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
			html += 		"<td>" + element.s_group_name	 + "</td>"	
			html += 		"<td>" + element.s_eqp_name	 + "</td>"		
			html += 		"<td>" + element.s_eqp_direct	 + "</td>"
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

function QRPDFPrint() {
	html = "";
		html += "<!DOCTYPE HTML>"
		html += "<html>"
		html += "<head>"
		html += 	"<meta charset='utf-8'>"
		html += 	"<title>QR Print</title>"
		html += 	"<link rel='stylesheet' href='/css/printQR.css' />"
		html += 	"<script src='/js/jquery.min.js'></script>"
		html += "</head>"
		html += "<body>"
		html += "<a href='javascript:window.print();'>프린터하기</a>"
		html += "<header><button type='button' id='print_btn'>프린트</button></header>"
		html += "<section>safdasdf<section>"
		html +=     "<script> 			$(document).on('click', '#print_btn' , function(e){ window.print(); }); </script>"
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


function QRPDFImg(){
	console.log("QR PDF print");	
	let chkboxCnt = $("input:checkbox[name=chkbox]:checked")

	html = "";
	html += "<!DOCTYPE HTML>"
	html += "<html>"
	html += "<head>"
	html += 	"<meta charset='utf-8'>"
	html += 	"<title>QR Print TEST</title>"
	html += 	"<link rel='stylesheet' href='/css/printQR.css' />"
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
	//html += 	"<div class='QRPrintTable' id='QRPrintTable'>";
	html += 	"<div class='QRPrintWrap' id='QRPrintWrap'>";
	for (let x=0; x<chkboxCnt.length; x++){
		// 0 : 시작문자 1 : 끝문자 2 : 시작이미지 3 : 끝 이미지
		let qrParams = chkboxCnt[x].value.split("&&");
		//let start = qrParams[0];
		//console.log("adsfdsadfdasf");
		//console.log(chkboxCnt.length);
		
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
	/*	html += "<div class='printWrap'>"
		html += "<table style='margin:0px;padding:0px'>"
		html += "			<tr>"
		html += "						<td rowspan='2' style='width:50px;font-size:30px;text-align: center;vertical-align: top;padding:0px;margin:0px;'>S</td>"
		html += "						<td rowspan='2' style='width:80px;vertical-align: top'><img src="+qrParams[2]+" style='width:35px;'></td>"
		html += "						<td  class='qrtd'>[R09-31]</td><td  class='qrtd' style='width:200px;  border-right: 4px dashed black;'>PBBAIS01_S1_P01</td>"
		html += "						<td  class='qrtd' style='width:120px; text-align:right;'>[R09-31]</td><td  class='qrtd'>PBBAIS01_S1_P01</td>"
		html += "						<td rowspan='2' style='width:80px;text-align: right;vertical-align: top'><img src="+qrParams[3]+" style='width:35px;'></td>"
		html += " 						<td rowspan='2' style='width:50px;font-size:30px;text-align: center;vertical-align: top;padding:0px;margin:0px;'>E</td>"
		html += "					</tr>"
		html += "					<tr>"
		html += "						<td class='qrtd'>[R09-31]</td><td  class='qrtd' style='border-right: 4px dashed black;'>PBBAIS01_S1_P01</td>"
		html += "						<td  class='qrtd' style='width:100px; text-align:right;'>[R09-31]</td><td  class='qrtd'>PBBAIS01_S1_P01</td>"
		html += "					</tr>"
		html += "				</table>"
		html += 	"</div>";*/
	}
	html += 	"</div>"
	//html += 	"</div>"
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
				html += 		"<td style='width:150px;'><button type='button' class='btn btn-outline-secondary' onclick=usr_update('" +  uid + "'); style='font-size:13px;margin-right:10px;'>수정</button><button type='button' class='btn btn-outline-secondary' onclick=usr_delete('" 	  
				html += 		uid + "'); style='font-size:13px;'>삭제</button></td>";
				html += 	"</tr>"
			});
			
			html += "</table>"
			$(".userDiv").append(html);
		})
	
}

