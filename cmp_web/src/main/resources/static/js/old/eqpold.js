
// eqp table column
var columns = [
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
        class: 'nowrap'
    },
    {
        title: '호스트명',
        field: 'hostname',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '제조사',
        field: 'm_company',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '모델',
        field: 'model',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    /*
    {
        title: '유닛번호',
        field: 'unit_position',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '도입년도',
        field: 'yearofintroduct',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '생성일',
        field: 'created_at',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    */
    {
        title: '구성분류',
        field: 'config_category',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '자산분류',
        field: 'asset_category',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '자산ID',
        field: 'asset_id',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '구성ID',
        field: 'config_id',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: 'IP',
        field: 'ip_address',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: 'OS',
        field: 'os_version',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '운영부서',
        field: 'operating_department',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '운영담당자(정)',
        field: 'primary_operator',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '운영담당자(부)',
        field: 'unit_position',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '위탁운영사용자(정)',
        field: 'primary_outsourced_operator',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '위탁운영사용자(부)',
        field: 'secondary_outsourced_operator',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '운영상태',
        field: 'operating_status',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    /*
    {
        title: '단종상태(EOL)',
        field: 'eol_status',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '단종상태(EOS)',
        field: 'eos_status',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '이중화구성여부',
        field: 'redundancy_config',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '네트워크운영구분',
        field: 'network_operation_type',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '자산취득일자',
        field: 'asset_acquisition_date',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '자산폐기일자',
        field: 'asset_disposal_date',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '도입금액',
        field: 'acquisition_cost',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '디브레인번호',
        field: 'dbrain_number',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '국산여부',
        field: 'domestic',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '설치 좌표(좌표)',
        field: 'installation_coordinates',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '설치 좌표(유닛수)',
        field: 'installation_units',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '장비 크기(유닛수)',
        field: 'equipment_size_units',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '비고',
        field: 'remarks',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '구성자원명',
        field: 'resource_name',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '유지관리 계약대상여부',
        field: 'maintenance_contract_target',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: 'CPU',
        field: 'cpu',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: 'MEM',
        field: 'mem',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: 'DISK',
        field: 'disk',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    },
    {
        title: '시리얼번호',
        field: 'serial_number',
        align: 'center',
        valign: 'middle',
        class: 'nowrap'
    }
    */
];


$(function(){

    $('#eqpTable').bootstrapTable({
        url: '/eqpManage/list',
        method: 'post',
        queryParams: function(params) {
            let searchEqpSearchInput = $("#searchEqpSearchInput").val().trim();
            params.searchData = {
                searchEqpSearchInput
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
                alert2('알림', '데이터를 저장하는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
            }

            $("#eqpTotalCnt").text("총 " + res.total + "건")
        },
        onClickCell: function (field, value, row, $element){
            if(!$element.hasClass("bs-checkbox")){
                eqp_detail_popup(row.eqp_id);
            }
        },
    });

    $('#searchEqpSearchInput').keyup(function(e){
        if(e.which == 13){
            tableRefresh();
        }
    })

});

// 컬럼 활성화/비활성화
function searchState(type, isChecked){
    if(isChecked){
        if(type === "all"){
            // 컬럼 많아지면 느려질 것 같긴한데 음... 뭐...... 언젠가는 누군가 하겠지 ^^...
            columns = columns.filter(column => column.field !== 'unit_position');
            columns = columns.filter(column => column.field !== 'hostname');
            columns = columns.filter(column => column.field !== 'm_company');
            columns = columns.filter(column => column.field !== 'model');
            columns = columns.filter(column => column.field !== 'yearofintroduct');

            columns.splice(2, 0, {title: '유닛번호',field: 'unit_position',align: 'center',valign: 'middle',});
            columns.splice(3, 0, {title: '호스트명',field: 'hostname',align: 'center',valign: 'middle',});
            columns.splice(4, 0, {title: '제조사',field: 'm_company',align: 'center',valign: 'middle',});
            columns.splice(5, 0, {title: '모델',field: 'model',align: 'center',valign: 'middle',});
            columns.splice(6, 0, {title: '도입년도',field: 'yearofintroduct',align: 'center',valign: 'middle',});

            let chkArr = document.querySelectorAll(".selectStateChk");
            chkArr.forEach(ele => {
                ele.checked = true;
            })
        }
        else{
            let chkArr = document.querySelectorAll(".selectStateChk");
            let state = true;
            chkArr.forEach(ele => {
                if (!ele.checked){
                    state = false;
                }
            })

            if (state){
                let chkArr = document.querySelector(".selectStateChkAll");
                chkArr.checked = true;
            }

            if(type === "unitNumber"){
                columns.splice(2, 0, {title: '유닛번호',field: 'unit_position',align: 'center',valign: 'middle',});
            }
            else if(type === "hostname"){
                columns.splice(3, 0, {title: '호스트명',field: 'hostname',align: 'center',valign: 'middle',});
            }
            else if(type === "mCompany"){
                columns.splice(4, 0, {title: '제조사',field: 'm_company',align: 'center',valign: 'middle',});
            }
            else if(type === "model"){
                columns.splice(5, 0, {title: '모델',field: 'model',align: 'center',valign: 'middle',});
            }
            else if(type === "year"){
                columns.splice(6, 0, {title: '도입년도',field: 'yearofintroduct',align: 'center',valign: 'middle',});
            }
        }
    }
    else{
        if(type === "all"){
            columns = columns.filter(column => column.field !== 'unit_position');
            columns = columns.filter(column => column.field !== 'hostname');
            columns = columns.filter(column => column.field !== 'm_company');
            columns = columns.filter(column => column.field !== 'model');
            columns = columns.filter(column => column.field !== 'yearofintroduct');

            let chkArr = document.querySelectorAll(".selectStateChk");
            chkArr.forEach(ele => {
                ele.checked = false;
            })
        }
        else{
            let chkArr = document.querySelector(".selectStateChkAll");
            chkArr.checked = false;

            if(type === "unitNumber"){
                columns = columns.filter(column => column.field !== 'unit_position');
            }
            else if(type === "hostname"){
                columns = columns.filter(column => column.field !== 'hostname');
            }
            else if(type === "mCompany"){
                columns = columns.filter(column => column.field !== 'm_company');
            }
            else if(type === "model"){
                columns = columns.filter(column => column.field !== 'model');
            }
            else if(type === "year"){
                columns = columns.filter(column => column.field !== 'yearofintroduct');
            }
        }
    }

    $('#eqpTable').bootstrapTable('refreshOptions', { columns: columns });
}



// 장비관리 > 장비목록 > 장비추가 모달
function eqp_create_popup(){
    Swal.fire({
        title: '장비 등록',
        html: generateAssetInfoHTML(""),
        focusConfirm: false,
        confirmButtonText: '등록',
        cancelButtonText: '취소',
        showCancelButton: true,
        customClass: {
            popup: 'custom-width'
        },
        preConfirm: () => {
            // 자산정보 (왼)
            const eqp_name = Swal.getPopup().querySelector('#eqp_name').value; // 장비명
            if (!eqp_name) {
                Swal.showValidationMessage(`장비명은 필수 항목입니다.`);
            }

            const config_category = Swal.getPopup().querySelector('#config_category').value; // 구성분류
            if (!eqp_name) {
                Swal.showValidationMessage(`장비명은 필수 항목입니다.`);
            }

            const asset_id = Swal.getPopup().querySelector('#asset_id').value; // 자산ID
            if (!eqp_name) {
                Swal.showValidationMessage(`장비명은 필수 항목입니다.`);
            }

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
            const yearofintroduct = Swal.getPopup().querySelector('#yearofintroduct').value; // 도입년도
            const acquisition_cost = Swal.getPopup().querySelector('#acquisition_cost').value; // 도입금액
            const unit_position = Swal.getPopup().querySelector('#unit_position').value; // 유닛번호
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

            return {
                // 자산정보(왼)
                eqp_name : eqp_name, config_category : config_category, asset_id : asset_id, m_company : m_company, operating_department : operating_department,
                primary_operator : primary_operator, secondary_operator : secondary_operator, primary_outsourced_operator : primary_outsourced_operator,
                secondary_outsourced_operator : secondary_outsourced_operator, maintenance_contract_target : maintenance_contract_target,
                redundancy_config : redundancy_config, domestic : domestic,

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
        // 등록 버튼 클릭 후 발생할 이벤트
        if (result.isConfirmed) {
            let data = result.value;
            $.ajax({
                url : '/eqpManage/insertEqp',
                type: 'post',
                data : data,
                dataType : 'JSON',
                success : function(res){
                    if (!res.errorCode){
                        alert2('알림', '데이터를 저장하는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                    }
                    else{
                        alert2('알림', '저장되었습니다.', 'info', '확인', tableRefresh());
                    }
                }
            })
        }
    });
}

// 장비관리 > 장비목록 > 장비상세 모달
function eqp_detail_popup(id){
    $.ajax({
        url : '/eqpManage/update?eqp_id='+id,
        type: 'get',
        dataType : 'JSON',
        success : function(res){
            let errorCode = res.errorCode;

            if(!errorCode){
                alert2('알림', '데이터를 저장하는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
            }
            else{
                let detailRow = res.rows;

                Swal.fire({
                    title: '장비 상세',
                    html: generateAssetInfoHTML(detailRow),
                    focusConfirm: false,
                    confirmButtonText: '수정',
                    cancelButtonText: '취소',
                    showCancelButton: true,
                    customClass: {
                        popup: 'custom-width'
                    },
                    didOpen: () => {
                        let inputs = document.querySelectorAll(".modalWrap input")
                        inputs.forEach(input =>{
                            input.readOnly = true;
                        })
                    },
                    preConfirm: () => {
                        // 자산정보 (왼)
                        const eqp_name = Swal.getPopup().querySelector('#eqp_name').value; // 장비명
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
                        const yearofintroduct = Swal.getPopup().querySelector('#yearofintroduct').value; // 도입년도
                        const acquisition_cost = Swal.getPopup().querySelector('#acquisition_cost').value; // 도입금액
                        const unit_position = Swal.getPopup().querySelector('#unit_position').value; // 유닛번호
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

                        if (!eqp_name) {
                            Swal.showValidationMessage(`장비명은 필수 항목입니다.`);
                        }

                        return {
                            // 자산 id
                            eqp_id : id,

                            // 자산정보(왼)
                            eqp_name : eqp_name, config_category : config_category, asset_id : asset_id, m_company : m_company, operating_department : operating_department,
                            primary_operator : primary_operator, secondary_operator : secondary_operator, primary_outsourced_operator : primary_outsourced_operator,
                            secondary_outsourced_operator : secondary_outsourced_operator, maintenance_contract_target : maintenance_contract_target,
                            redundancy_config : redundancy_config, domestic : domestic,
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
                    // 수정 버튼 클릭 시 띄워줄 수정 팝업
                    if (result.isConfirmed) {
                        eqp_update_popup(id);
                    }
                });
            }
        }
    })
}

// 장비관리 > 장비목록 > 장비수정 모달
function eqp_update_popup(id) {
    let target = $("#eqpTable").bootstrapTable('getSelections');
    if(target.length > 1){
        alert2('알림', '수정은 단건만 가능합니다.', 'info', '확인');
    }
    else if(id== "" && target.length == 0 ){
        alert2('알림', '수정할 항목을 선택해주세요.', 'info', '확인');
    }
    else{
        if(id == ""){
            // 상세정보에서 수정할 때는 함수 파라미터 id 사용
            // 테이블에서 선택해서 수정할 때는 테이블 데이터 사용
            id = target[0].eqp_id;
        }
        $.ajax({
            url : '/eqpManage/update?eqp_id='+id,
            type: 'get',
            dataType : 'JSON',
            success : function(res){
                let errorCode = res.errorCode;

                if(!errorCode){
                    alert2('알림', '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                }
                else{
                    let detailRow = res.rows;

                    Swal.fire({
                        title: '장비 수정',
                        html: generateAssetInfoHTML(detailRow),
                        focusConfirm: false,
                        confirmButtonText: '저장',
                        cancelButtonText: '취소',
                        showCancelButton: true,
                        customClass: {
                            popup: 'custom-width'
                        },
                        preConfirm: () => {
                            // 자산정보 (왼)
                            const eqp_name = Swal.getPopup().querySelector('#eqp_name').value; // 장비명
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
                            const yearofintroduct = Swal.getPopup().querySelector('#yearofintroduct').value; // 도입년도
                            const acquisition_cost = Swal.getPopup().querySelector('#acquisition_cost').value; // 도입금액
                            const unit_position = Swal.getPopup().querySelector('#unit_position').value; // 유닛번호
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










































                            if (!eqp_name) {
                                Swal.showValidationMessage(`장비명은 필수 항목입니다.`);
                            }

                            return {
                                // 자산 id
                                eqp_id : id,

                                // 자산정보(왼)
                                eqp_name : eqp_name, config_category : config_category, asset_id : asset_id, m_company : m_company, operating_department : operating_department,
                                primary_operator : primary_operator, secondary_operator : secondary_operator, primary_outsourced_operator : primary_outsourced_operator,
                                secondary_outsourced_operator : secondary_outsourced_operator, maintenance_contract_target : maintenance_contract_target,
                                redundancy_config : redundancy_config, domestic : domestic,
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
                             let data = result.value;
                             $.ajax({
                                 url : '/eqpManage/updateEqp',
                                 type: 'post',
                                 data : data,
                                 dataType : 'JSON',
                                 success : function(res){
                                    if (!res.errorCode){
                                        alert2('알림', '데이터를 수정하는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                                    }
                                    else{
                                        alert2('알림', '수정되었습니다.', 'info', '확인', tableRefresh());
                                    }
                                 }
                             })
                         }
                    });
                }
            }
        })
    }
};

// 장비관리 > 장비목록 > 삭제
function eqp_delete() {
    let data = $("#eqpTable").bootstrapTable('getSelections');

    $.ajax({
        url : '/eqpManage/delete',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType : 'JSON',
        success : function(res){
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

// 장비관리 > 장비목록 > 장비 업로드 버튼
function excel_upload(){
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
            let data = $("#excelFile")[0].files[0];
            if(data != undefined){
                Swal.fire({
                    title: '알림',
                    html: '반드시 선택된 파일이 검증파일인지 확인하세요. 장비 목록을 저장하시겠습니까?',
                    icon: 'info',
                    confirmButtonText: '저장',
                    cancelButtonText: '취소',
                    showCancelButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        let formData = new FormData();
                        formData.append("file", data);

                        $.ajax({
                            url : '/eqpManage/excelSave',
                            type: 'post',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success : function(res){
                                Swal.fire({
                                    title: '알림',
                                    html: '데이터 저장 내역</br>성공 : '+ res.successList.length +'건</br>실패 : '+ res.failList.length +'건',
                                    icon: 'info',
                                    confirmButtonText: '확인'
                                })
                                .then((result) => {
                                    $.ajax({
                                        url : '/eqpManage/excelResponse',
                                        type: 'post',
                                        data: JSON.stringify(res),
                                        contentType: 'application/json',
                                        processData: false,
                                        xhrFields: {
                                            responseType: 'blob'
                                        },
                                        success : function(res){
                                            downloadFile(res, 'equipmentResultTemplate.xlsx');
                                            alert2('알림', '저장되었습니다. 결과 파일을 확인하세요.', 'info', '확인', tableRefresh());
                                        }
                                    });
                                });
                            }
                        })
                    }

                    if(result.isDismissed){
                        excel_upload();
                    }
                })
            }
            else{
                alert2('알림', '엑셀 파일을 먼저 업로드하세요!.', 'error', '확인', excel_upload());
            }
        }
    })
}

// 장비목록 추가용 엑셀 템플릿 다운로드
function downloadExcelTemplate(){
    $.ajax({
        url: "/eqpManage/excelTemplate",
        method: "GET",
        xhrFields: {
            responseType: 'blob'
        },
        success: function(res) {
            downloadFile(res, 'equipmentUploadTemplate.xlsx');
        },
        error: function() {
            alert2('알림', '엑셀 파일을 다운로드하는 중 오류가 발생했습니다.', 'error', '확인', excel_upload());
        }
    });
}

// 파일 다운로드
function downloadFile(res, fileName){
    const url = window.URL.createObjectURL(res);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}

// 업로드된 장비목록 검증
function validExcelEquipmentList() {

    let data = $("#excelFile")[0].files[0];
    if(data != undefined){
        let formData = new FormData();
        formData.append("file", data);

        $.ajax({
            url : '/eqpManage/excelValid',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            xhrFields: {
                responseType: 'blob'
            },
            success : function(res){
                downloadFile(res, 'validEquipmentUploadTemplate.xlsx');
                alert2('알림', '반드시 검증파일 확인 후 검증파일을 저장하세요.', 'info', '확인', excel_upload);
            },
            error: function (err) {
                alert2('알림', '업로드 중 오류가 발생했습니다.', 'error', '확인', excel_upload);
            }
        });
    } else {
        alert2('알림', '엑셀 파일을 먼저 업로드하세요.', 'error', '확인', excel_upload);
    }
}


// 장비관리 > 장비목록 > 엑셀 업로드 html
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

// 장비추가, 장비수정, 장비상세 모달 생성 html
function generateAssetInfoHTML(detailRow) {
    return `
        <p style="font-size: 25px; font-weight: bold; margin-top: 20px; text-align: left;">자산정보</p>
        <div class="modalWrap" style="display: flex;">
            <div style="width: 45%;">
                <table class="swal2-table">
                    <tr>
                        <th colspan="2">장비명</th>
                        <td><input type="text" name="eqp_name" id="eqp_name" value="${detailRow.eqp_name || ''}"/></td>
                    </tr>
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
                        <th colspan="2">도입년도</th>
                        <td><input type="text" name="yearofintroduct" id="yearofintroduct" value="${detailRow.yearofintroduct || ''}"/></td>
                    </tr>
                    <tr>
                        <th colspan="2">도입금액</th>
                        <td><input type="text" name="acquisition_cost" id="acquisition_cost" value="${detailRow.acquisition_cost || ''}"/></td>
                    </tr>
                    <tr>
                        <th colspan="2">유닛번호</th>
                        <td><input type="text" name="unit_position" id="unit_position" value="${detailRow.unit_position || ''}"/></td>
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

        <p style="font-size: 25px; font-weight: bold; margin-top: 20px; text-align: left;">상세정보</p>
        <div class="modalWrap" style="display: flex;">
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

function tableRefresh(){
    $("#eqpTable").bootstrapTable('refresh');
}

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