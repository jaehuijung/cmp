
/**************** 전역변수 ****************/
// base url
let urlPre = "https://127.0.0.1";

/************* 시스템 관리 *************/
// 전체 사용자
function userInfo() {
	let url = urlPre+'/api/system/alluser';
	
    axios.get( url )
    .then(function(res) {
        let userList = res.data;

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

