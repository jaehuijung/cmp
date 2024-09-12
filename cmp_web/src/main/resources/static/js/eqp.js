
// base url
let urlPre = "https://127.0.0.1";

$(function(){


    var columns = [
        [
            {
                title: '',
                field: '',
                align: 'center',
                valign: 'middle',
                checkbox: true,
            },
            {
                title: '장비명',
                field: 'eqp_name',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '유닛번호',
                field: 'unit_position',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '호스트명',
                field: 'hostname',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '제조사',
                field: 'm_company',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '모델',
                field: 'model',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '도입년도',
                field: 'yearofintroduct',
                align: 'center',
                valign: 'middle',
            },
            {
                title: '수정/삭제',
                field: '',
                align: 'center',
                valign: 'middle',
                formatter: function(value, row, index) {
                    let tmp = "<button type='button' class='btn btn-outline-secondary' style='font-size:13px; padding:3px 8px; margin-right:5px;'";

                    let html = "";
                    // html += tmp + "onclick='eqp_detail(" +  row.eqp_id + ");'>상세</button>";
                    // html += tmp + "onclick='eqp_create(" +  row.eqp_id + ");'>추가</button>";
                    // html += tmp + "onclick='eqp_update(" +  row.eqp_id + ");'>수정</button>";
                    // html += tmp + "onclick='eqp_delete(" +  row.eqp_id + ");'>삭제</button>";

                    return html;
                }
            },

        ]
    ];


    $('#eqpTable').bootstrapTable({
        url: '/eqpManage/list',
        method: 'post',
        queryParams: function(params) {
            return params;
        },
        pageSize: 10, columns: columns, cache: false, undefinedText: "",
        pagination: true, sidePagination: 'server', checkboxHeader: true,
        classes: "txt-pd", clickToSelect: false,
        sortOrder: 'desc', sortName: 'ORDER',
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
                Swal.fire({
                    title: '알림',
                    html: '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.',
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            }

            $("#eqpTotalCnt").text("총 " + res.total + "건")
        },
        onClickCell: function (field, value, row, $element){
            if(!$element.hasClass("bs-checkbox")){
                eqp_update_popup(row.eqp_id);
            }
        },
    });


});


/*
// detail 필요없을수도
function eqp_detail(id){

    // 페이지에서 팝업으로 변경
    // window.location = "/eqpManage/detail?eqp_id=" + id;

    $.ajax({
        url : '/eqpManage/detail?eqp_id='+id,
        type: 'get',
        dataType : 'JSON',
        success : function(res){
            let errorCode = res.errorCode;

            if(!errorCode){
                Swal.fire({
                    title: '알림',
                    html: '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.',
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            }
            else{
                let detailRow = res.rows;

                Swal.fire({
                    title: '장비 상세',
                    html: generateAssetInfoHTML(detailRow),
                    focusConfirm: false,
                    confirmButtonText: '확인',
                    customClass: {
                        popup: 'custom-width'
                    },
                    preConfirm: () => {
                        const config = Swal.getPopup().querySelector('#config').value;
                        const group = Swal.getPopup().querySelector('#group').value;
                        if (!config || !group) {
                            Swal.showValidationMessage(`Please enter both fields`);
                        }
                        return { config: config, group: group };
                    }
                });
            }

        }
    })
}
*/


function eqp_create_popup(){
    let detailRow = "";
    Swal.fire({
        title: '장비 추가1',
        html: generateAssetInfoHTML(detailRow),
        focusConfirm: false,
        confirmButtonText: '등록',
        cancelButtonText: '취소',
        showCancelButton: true,
        customClass: {
            popup: 'custom-width'
        },
        preConfirm: () => {

            // 자산정보 (왼)
            const config_category = Swal.getPopup().querySelector('#config_category').value; // 구성분류
            const asset_id = Swal.getPopup().querySelector('#asset_id').value; // 자산ID
            const m_company = Swal.getPopup().querySelector('#m_company').value; // 제조사
            const operating_department = Swal.getPopup().querySelector('#operating_department').value; // 운영부서
            const primary_operator = Swal.getPopup().querySelector('#primary_operator').value; // 운영담당자(정)
            const secondary_operator = Swal.getPopup().querySelector('#secondary_operator').value; // 운영담당자(부)
            const primary_outsourced_operator = Swal.getPopup().querySelector('#primary_outsourced_operator').value; // 위탁운영사용자(정)
            const secondary_outsourced_operator = Swal.getPopup().querySelector('#secondary_outsourced_operator').value; // 위탁운영사용자(부)
            const maintenance_contract_target = Swal.getPopup().querySelector('#maintenance_contract_target').value; // 유지관리계약대상여부
            const redundancy_config = Swal.getPopup().querySelector('#redundancy_config').value; // 이중화구성여부
            const domestic = Swal.getPopup().querySelector('#domestic').value; // 국산여부

            // 자산정보 (오)
            const asset_category = Swal.getPopup().querySelector('#asset_category').value; // 자산분류
            const config_id = Swal.getPopup().querySelector('#config_id').value; // 구성ID
            const model = Swal.getPopup().querySelector('#model').value; // 모델명
            const operating_status = Swal.getPopup().querySelector('#operating_status').value; // 운영상태
            const asset_acquisition_date = Swal.getPopup().querySelector('#asset_acquisition_date').value; // 자산취득일자
            const asset_disposal_date = Swal.getPopup().querySelector('#asset_disposal_date').value; // 자산폐기일자
            const acquisition_cost = Swal.getPopup().querySelector('#acquisition_cost').value; // 도입금액
            const dbrain_number = Swal.getPopup().querySelector('#dbrain_number').value; // 디브레인번호
            const eol_status = Swal.getPopup().querySelector('#eol_status').value; // 단종상태(EOL)
            const eos_status = Swal.getPopup().querySelector('#eos_status').value; // 단종상태(EOS)


            // 상세정보 (왼)
            const network_operation_type = Swal.getPopup().querySelector('#network_operation_type').value; // 네트워크운영구분
            const hostname = Swal.getPopup().querySelector('#hostname').value; // 호스트명
            const ip_address = Swal.getPopup().querySelector('#ip_address').value; // IP 주소
            const serial_number = Swal.getPopup().querySelector('#serial_number').value; // 시리얼 번호
            const installation_coordinates = Swal.getPopup().querySelector('#installation_coordinates').value; // 설치좌표(좌표)
            const installation_units = Swal.getPopup().querySelector('#installation_units').value; // 설치좌표(유닛수)

            // 상세정보 (오)
            const resource_name = Swal.getPopup().querySelector('#resource_name').value; // 구성자원명
            const os_version = Swal.getPopup().querySelector('#os_version').value; // OS 버전
            const cpu = Swal.getPopup().querySelector('#cpu').value; // CPU
            const mem = Swal.getPopup().querySelector('#mem').value; // MEM
            const disk = Swal.getPopup().querySelector('#disk').value; // DISK
            const equipment_size_units = Swal.getPopup().querySelector('#equipment_size_units').value; // 장비크기(유닛수)

            // if (!config_category || !asset_id) {
            //     Swal.showValidationMessage(`필수 항목을 입력해주세요.`);
            // }

            return {
                // 자산정보(왼)
                config_category : config_category, asset_id : asset_id, m_company : m_company, operating_department : operating_department, primary_operator : primary_operator,
                secondary_operator : secondary_operator, primary_outsourced_operator : primary_outsourced_operator, secondary_outsourced_operator : secondary_outsourced_operator,
                maintenance_contract_target : maintenance_contract_target, redundancy_config : redundancy_config, domestic : domestic,
                // 자산정보(오)
                asset_category: asset_category, config_id: config_id, model: model, operating_status: operating_status, asset_acquisition_date: asset_acquisition_date,
                asset_disposal_date: asset_disposal_date, acquisition_cost: acquisition_cost, dbrain_number: dbrain_number, eol_status: eol_status, eos_status: eos_status,
                // 상세정보(왼)
                network_operation_type: network_operation_type, hostname: hostname, ip_address: ip_address, serial_number: serial_number,
                installation_coordinates: installation_coordinates, installation_units: installation_units,
                // 상세정보(오)
                resource_name: resource_name, os_version: os_version, cpu: cpu, mem: mem, disk: disk, equipment_size_units: equipment_size_units
             };
        }
    }).then((result) => {
         if (result.isConfirmed) {
             console.log(result);
             let data = result.value;
             $.ajax({
                 url : '/eqpManage/insert_eqp',
                 type: 'POST',
                 // data :  JSON.stringify(result),
                 data : data,
                 dataType : 'JSON',
                 success : function(res){
                    console.log(res)
                    if (!res.errorCode){
                        Swal.fire({
                            title: '알림',
                            html: '데이터를 저장하는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.',
                            icon: 'error',
                            confirmButtonText: '확인'
                        });
                    }
                    else{
                        Swal.fire({
                            title: '알림',
                            html: '저장되었습니다.',
                            icon: 'info',
                            confirmButtonText: '확인'
                        });
                    }

                 }
             })

         }
    });
}

function eqp_create(){

}

function eqp_update_popup(id) {
    // let fchk = document.getElementById("updateForm");
    // $('#update_eqp_id').val(id);
    // fchk.submit();

    $.ajax({
        url : '/eqpManage/update?eqp_id='+id,
        type: 'get',
        dataType : 'JSON',
        success : function(res){
            let errorCode = res.errorCode;

            if(!errorCode){
                Swal.fire({
                    title: '알림',
                    html: '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.',
                    icon: 'error',
                    confirmButtonText: '확인'
                });
            }
            else{
                let detailRow = res.rows;

                Swal.fire({
                    title: '장비 수정',
                    html: generateAssetInfoHTML(detailRow),
                    focusConfirm: false,
                    confirmButtonText: '확인',
                    customClass: {
                        popup: 'custom-width'
                    },
                    preConfirm: () => {
                        const config = Swal.getPopup().querySelector('#config').value;
                        const group = Swal.getPopup().querySelector('#group').value;
                        if (!config || !group) {
                            Swal.showValidationMessage(`Please enter both fields`);
                        }
                        return { config: config, group: group };
                    }
                });
            }

        }
    })
};

function eqp_update(){

}

function eqp_delete(id) {
    // let fchk = document.getElementById("deleteForm");
    // $('#del_eqp_id').val(id);
    // fchk.submit();


}

function eqp_deleteAll() {
    /*
    부트스트랩 선택된거 묶어서 delete
    */

}

// 추가, 수정, 상세 모달 생성
// html 연산이 좀 별로긴 한데 좋은 방법이 생각이 안나네.. dom api 쓰면 더 길어지고ㅠ
function generateAssetInfoHTML(detailRow) {
    return `
        <p style="font-size: 25px; font-weight: bold; margin-top: 20px;">자산정보</p>
        <div style="display: flex;">
            <div style="width: 45%;">
                <table class="swal2-table">
                    <tr>
                        <th colspan="2">구성분류</th>
                        <td><input type="text" name="config_category" id="config_category" value="${detailRow.config_category || ''}"/></td>
                    </tr>
                    <tr>
                        <th colspan="2">자산ID</th>
                        <td><input type="text" name="asset_id" id="asset_id" value="${detailRow.asset_id || ''}"/></td>
                    </tr>
                    <tr>
                        <th colspan="2">제조사</th>
                        <td><input type="text" name="m_company" id="m_company" value="${detailRow.m_company || ''}"/></td>
                    </tr>
                    <tr>
                        <th colspan="2">운영부서</th>
                        <td><input type="text" name="operating_department" id="operating_department" value="${detailRow.operating_department || ''}"/></td>
                    </tr>
                    <tr>
                        <th rowspan="2">운영담당자</th>
                        <th>정</th>
                        <td><input type="text" name="primary_operator" id="primary_operator" value="${detailRow.primary_operator || ''}"/></td>
                    </tr>
                    <tr>
                        <th>부</th>
                        <td><input type="text" name="secondary_operator" id="secondary_operator" value="${detailRow.secondary_operator || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" rowspan="2">위탁운영사용자</th>
                        <th class="eqpth2">정</th>
                        <td><input type="text" name="primary_outsourced_operator" id="primary_outsourced_operator" value="${detailRow.primary_outsourced_operator || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">부</th>
                        <td><input type="text" name="secondary_outsourced_operator" id="secondary_outsourced_operator" value="${detailRow.secondary_outsourced_operator || ''}"/></td>
                    </tr>
                    <tr>
                        <th colspan="2">유지관리계약대상여부</th>
                        <td><input type="text" name="maintenance_contract_target" id="maintenance_contract_target" value="${detailRow.maintenance_contract_target || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">이중화구성여부</th>
                        <td><input type="text" name="redundancy_config" id="redundancy_config" value="${detailRow.redundancy_config || ''}"/></td>
                    </tr>
                    <tr>
                        <th colspan="2">국산여부</th>
                        <td><input type="text" name="domestic" id="domestic" value="${detailRow.domestic || ''}"/></td>
                    </tr>

                </table>
            </div>

            <div style="width: 45%; margin-left: 20px;">
                <table class='swal2-table'>
                    <tr>
                        <th class="eqpth" colspan="2">자산분류</th>
                        <td><input type="text" name="asset_category" id="asset_category" value="${detailRow.asset_category || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">구성ID</th>
                        <td><input type="text" name="config_id" id="config_id" value="${detailRow.config_id || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">모델명</th>
                        <td><input type="text" name="model" id="model" value="${detailRow.model || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">운영상태</th>
                        <td><input type="text" name="operating_status" id="operating_status" value="${detailRow.operating_status || ''}"/></td>
                    </tr>
                    <tr>
                        <th colspan="2">자산취득일자</th>
                        <td><input type="text" name="asset_acquisition_date" id="asset_acquisition_date" value="${detailRow.asset_acquisition_date || ''}"/></td>
                    </tr>

                    <tr>
                        <th class="eqpth" colspan="2">자산폐기일자</th>
                        <td><input type="text" name="asset_disposal_date" id="asset_disposal_date" value="${detailRow.asset_disposal_date || ''}"/></td>
                    </tr>
                    <tr>
                        <th colspan="2">도입금액</th>
                        <td><input type="text" name="acquisition_cost" id="acquisition_cost" value="${detailRow.acquisition_cost || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">디브레인번호</th>
                        <td><input type="text" name="dbrain_number" id="dbrain_number" value="${detailRow.dbrain_number || ''}"/></td>
                    </tr>
                    <tr>
                        <th rowspan="2">단종상태</th>
                        <th>EOL</th>
                        <td><input type="text" name="eol_status" id="eol_status" value="${detailRow.eol_status || ''}"/></td>
                    </tr>
                    <tr>
                        <th>EOS</th>
                        <td><input type="text" name="eos_status" id="eos_status" value="${detailRow.eos_status || ''}"/></td>
                    </tr>
                </table>
            </div>
        </div>


        <p style="font-size: 25px; font-weight: bold; margin-top: 20px;">상세정보</p>
        <div style="display: flex;">
            <div style="width: 45%;">
                <table class='swal2-table'>
                    <tr>
                        <th class="eqpth" colspan="2">네트워크운영구분</th>
                        <td><input type="text" name="network_operation_type" id="network_operation_type" value="${detailRow.network_operation_type || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">호스트명</th>
                        <td><input type="text" name="hostname" id="hostname" value="${detailRow.hostname || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">IP Address</th>
                        <td><input type="text" name="ip_address" id="ip_address" value="${detailRow.ip_address || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">시리얼번호</th>
                        <td><input type="text" name="serial_number" id="serial_number" value="${detailRow.serial_number || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" rowspan="2">설치좌표</th>
                        <th class="eqpth2">좌표</th>
                        <td><input type="text" name="installation_coordinates" id="installation_coordinates" value="${detailRow.installation_coordinates || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">유닛수</th>
                        <td><input type="text" name="installation_units" id="installation_units" value="${detailRow.installation_units || ''}"/></td>
                    </tr>

                    <tr>
                        <th class="eqpth" rowspan="12">연결정보</th>
                        <th class="eqpth2">PORT</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">IP</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">HOST</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">PORT</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">IP</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">HOST</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">PORT</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">IP</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">HOST</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">PORT</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">IP</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">HOST</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                </table>
            </div>
            <div style="width: 45%; margin-left: 20px;">
                <table class='swal2-table'>
                    <tr>
                        <th class="eqpth" colspan="2">구성자원명</th>
                        <td><input type="text" name="resource_name" id="resource_name" value="${detailRow.resource_name || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">OS 버전</th>
                        <td><input type="text" name="os_version" id="os_version" value="${detailRow.os_version || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">CPU</th>
                        <td><input type="text" name="cpu" id="cpu" value="${detailRow.cpu || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">MEM</th>
                        <td><input type="text" name="mem" id="mem" value="${detailRow.mem || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">DISK</th>
                        <td><input type="text" name="disk" id="disk" value="${detailRow.disk || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth" colspan="2">장비크기(유닛수)</th>
                        <td><input type="text" name="equipment_size_units" id="equipment_size_units" value="${detailRow.equipment_size_units || ''}"/></td>
                    </tr>

                    <tr>
                        <th class="eqpth" rowspan="12">연결정보</th>
                        <th class="eqpth2">PORT</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">IP</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">HOST</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">PORT</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">IP</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">HOST</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">PORT</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">IP</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">HOST</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">PORT</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">IP</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                    <tr>
                        <th class="eqpth2">HOST</th>
                        <td><input type="text" name="connect_infos" id="connect_infos" value="${detailRow.connect_infos || ''}"/></td>
                    </tr>
                </table>
            </div>
        </div>
    `;
}



// 장비관리 > 장비목록 > 장비 리스트 조회
// ※ 수정필요!
// 일단.. html 연산 다 걷어내기... 부트스트랩으로 어떻게 바꾸지...
/*
function EqpListTable(page){

	// let url = urlPre+'/quipment/list';
	let url = urlPre+'/eqpManage/list';

	let current_page_no = page;
	axios.get(  url	,
	          { params:{ current_page_no : current_page_no , offset:0, limit: 10}
	        })
    .then(function(res) {

        // let eqpList = res.data[0].list;
        let eqpList = res.data.rows;
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

        // eqpList.forEach((element) => {
        eqpList.forEach(element => {

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
        // html += res.data[0].pagination;
        html += res.data.total;
        html += "</div>";
        html += "</div>"

        $(".EqpListDiv").append(html);
    })
}
*/



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



// 체크박스 모두선택/모두해제
function QRChkFunction(ele){
	const chkbox = document.getElementsByName('chkbox');
	chkbox.forEach((box) => {
		box.checked = ele.checked;
	})

}

