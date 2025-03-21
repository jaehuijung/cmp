
function createColumn(field, checkbox = false, title, type = '', formatter = '') {
    let column = {
        title: title,
        field: field,
        align: 'center',
        valign: 'middle',
        checkbox: checkbox
    };

    if (type === 'underline') {
        column.class = 'nowrap underline';
    } else {
        column.class = 'nowrap';
    }

    return column;
}

let eqpHardwareColumn = [
    [
        { title: '출발지(Start)', align: 'center', valign: 'middle', colspan: 1 },
        { title: '목적지(End)', align: 'center', valign: 'middle', colspan: 9 }
    ],
    [
        createColumn('eqp_port', false, '포트번호', ''),
        createColumn('asset_category', false, '자산분류'),
        createColumn('installation_coordinates', false, '설치좌표'),
        createColumn('eqp_manage_id', false, '관리ID'),
        createColumn('m_company', false, '제조사'),
        createColumn('model_name', false, '모델명'),
        createColumn('eqp_name', false, '구성자원명'),
        createColumn('host_name', false, '호스트명'),
        createColumn('primary_outsourced_operator', false, '운영사용자'),
        createColumn('eqp_link_port', false, '포트번호', '')
    ]
];

let eqpSoftwareColumn = [
    createColumn('asset_category',              false, '자산분류'),
    createColumn('eqp_manage_id',               false, '관리ID'),
    createColumn('m_company',                   false, '제조사'),
    createColumn('model_name',                  false, '모델명'),
    createColumn('host_name',                   false, '호스트명'),
    createColumn('eqp_name',                    false, '구성자원명'),
    createColumn('dependent_config',            false, '종속 SW 여부'),
    createColumn('primary_outsourced_operator', false, '운영사용자'),
];

$(function(){

    addComma(document.getElementById("acquisition_cost")); // 도입금액 콤마처리

    $('#eqpHardwareSelectTable').bootstrapTable({
        url: '/eqp/hw/equipmentDetailHardwareList',
        method: 'post',
        queryParams: function(params) {
            let eqp_manage_id = $("#eqp_manage_id").val();
            params.searchData = {
                eqp_manage_id
            }
            return params;
        },
        pageSize: 5, columns: eqpHardwareColumn, cache: false, undefinedText: "",
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
            if (!errorCode){
                alert2('알림', '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                return;
            }

            $("#eqpHardwareSelectTotalCnt").text("총 " + res.total + "건")
        },
    });


    $('#eqpSoftwareSelectTable').bootstrapTable({
        url: '/eqp/hw/equipmentDetailSoftwareList',
        method: 'post',
        queryParams: function(params) {
            let eqp_manage_id = $("#eqp_manage_id").val();
            params.searchData = {
                eqp_manage_id
            }
            return params;
        },
        pageSize: 5, columns: eqpSoftwareColumn, cache: false, undefinedText: "",
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
            if (!errorCode){
                alert2('알림', '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
            }

            $("#eqpSoftwareSelectTotalCnt").text("총 " + res.total + "건")
        },
    });
});



/**
 * 장비관리 > 장비목록 > 장비상세 > 수정버튼
 * 수정 버튼을 클릭했을 때 호출되는 함수입니다.
 * 사용자가 수정 페이지로 이동하도록 합니다.
 */
function updateData(){
    let id = $("#eqp_manage_id").val();
    const url = `/eqp/hw/update/${id}`;
    window.location.href = url;
}

/**
 * 장비관리 > 장비목록 > 장비상세 > 삭제버튼
 * 삭제 버튼을 클릭했을 때 호출되는 함수입니다.
 * 사용자가 선택한 장비를 삭제합니다
 */
function deleteData(){
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
            alert3("delete");
            let data = [{"eqp_manage_id": $("#eqp_manage_id").val()}];
            $.ajax({
                url : '/eqp/hw/delete',
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
                        let errorTarget = res.errorTarget;
                        if(errorTarget.length == 0){
                            alert2('알림', '삭제되었습니다.', 'info', '확인', back);
                        }
                        else{
                            alert2('알림', '선번장에 등록되어 있는 장비는 삭제할 수 없습니다.', 'info', '확인');                        }
                    }
               }
            });
        }
    });
}

let ipData = [{'ip_address': "", "" : ""}];

function ipAddressFormatter(value, row, index) {
    return `<input type="text" class="form-control ip-input custom-font-space" maxlength="15"
            data-row-index="${index}" data-field="ip_address"
            value="${value}">`;
}

function ipAddressManage(){
    Swal.fire({
        html: generateEquipmentIpAddressRowHTML(),
        focusConfirm: false,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCancelButton: true,
        allowOutsideClick: false,
        heightAuto: false,
        customClass: {
            popup: 'custom-width'
        },
        didOpen: () => {

            let eqpIpAddressColumn = [
                createColumn('', true, ''),
                createColumn('ip', false, 'IP Address', '', (value, row, index) => ipAddressFormatter(value, row, index)),
            ];

            $('#eqpIpAddressTable').bootstrapTable({
                url: '/eqp/hw/equipmentDetailIpAddressList',
                method: 'post',
                queryParams: function(params) {
                    let eqp_manage_id = $("#eqp_manage_id").val();
                    params.searchData = {
                        eqp_manage_id
                    }

                    return params;
                },
                pageSize: 5, columns: eqpIpAddressColumn, cache: false, undefinedText: "",
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
                    if (!errorCode){
                        alert2('알림', '데이터를 불러오는 데 문제가 발생하였습니다. </br>관리자에게 문의해주세요.', 'error', '확인');
                        return;
                    }

                    $("#eqpIpAddressTotalCnt").text("총 " + res.total + "건")
                },
            });

        },
    })
}

function generateEquipmentIpAddressRowHTML(){
     return `
         <div class="contentCard custom-width-550 custom-height-min-510 custom-height-max-550">
             <div class="contentCardWrap">
                 <div class="contentCardTitle flex-column-left">
                     <h2>IP Address 정보</h2>
                     <p class="custom-font-size-12 custom-font-color-red">* 대표 IP는 첫 번째로 등록된 IP가 표시됩니다.</p>
                 </div>
                 <div class="flex-row-between custom-margin-bottom-10">
                     <div>
                         <p class="totalCnt" id="eqpIpAddressTotalCnt">총 ${ipData.length}건</p>
                    </div>
                 </div>
                 <div class="tbl-bootstrap-wrap">
                     <table id="eqpIpAddressTable"></table>
                 </div>
             </div>
         </div>
     `;
}
