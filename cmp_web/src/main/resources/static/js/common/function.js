
/**
    프로젝트 공통
*/
// 날짜 형식 검증 함수
function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateString.match(regex)) return false;

    const date = new Date(dateString);

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) return false;

    // 주어진 날짜 문자열이 실제로 유효한지 확인
    const [year, month, day] = dateString.split('-').map(Number);
    return date.getFullYear() === year && (date.getMonth() + 1) === month && date.getDate() === day;
}


// 사용자가 데이터 입력 시 콤마 추가
function formatCurrency(input) {
    let value = input.value.replace(/,/g, '');
    if (value !== '' && !isNaN(value)) {
        input.value = Number(value).toLocaleString();
    }
}

// 서버에서 받아온 데이터에 콤마 추가
function addComma(input) {
    let value = input.value.replace(/,/g, '');
    if (value !== '' && !isNaN(value)) {
        input.value = Number(value).toLocaleString();
    }
}

// 콤마 제거
function removeComma(input) {
    return input.replace(/,/g, '');
}

// 글자 길이 체크
function checkLength(input, maxLength) {
    if (input.value.length > maxLength) {
        input.value = input.value.slice(0, maxLength);
    }
}

// 이전 페이지로 돌아감
function back() {
    window.history.back();
}


/**
    선번장관리 메뉴 공통
*/

// 선번장목록 > 추가/상세/수정 > 회선 > 회선구분, 회선속도, 회선색상 리스트
function getSelectLink(){
    $.ajax({
        url: "/rack/line/selectLink",
        type: "post",
        success: function (res) {
            const categorySelect = $("#cable_category");
            const category = res.category;
            category.forEach(function(item) {
                categorySelect.append(new Option(item.line_value, item.line_id));
            });

            const speedSelect = $("#cable_speed");
            const speed    = res.speed;
            speed.forEach(function(item) {
                speedSelect.append(new Option(item.line_value, item.line_id));
            });

            const colorSelect = $("#cable_color");
            const color    = res.color;
            color.forEach(function(item) {
                colorSelect.append(new Option(item.line_value, item.line_id));
            });
        },
    });
}



/**
    장비관리 메뉴 공통
*/

// 장비목록 > 추가/상세/수정 > 장비분류 > 구성분류 리스트
function getSelectConfig(){
    $.ajax({
        url: "/eqp/hw/selectConfig",
        type: "post",
        success: function (res) {
            const categorySelect = $("#config_id");
            categorySelect.empty();
            categorySelect.append(new Option("선택", ""));

            const assetSelect = $("#asset_id");
            assetSelect.empty();
            assetSelect.append(new Option("선택", ""));

            const subSelect = $("#sub_id");
            subSelect.empty();
            subSelect.append(new Option("선택", ""));

            const detailSelect = $("#detail_id");
            detailSelect.empty();
            detailSelect.append(new Option("선택", ""));

            $("#categories").val("");

            let data = res.selectData;
            data.forEach(function(item) {
                categorySelect.append(new Option(item.name, item.id));
            });
        },
    });
}

// 장비목록 > 추가/상세/수정 > 장비분류 > 자산분류 리스트
function getSelectAsset(configValue){
    $.ajax({
        url: "/eqp/hw/selectAsset",
        type: "post",
        data: {config_id: configValue},
        success: function (res) {
            const assetSelect = $("#asset_id");
            assetSelect.empty();
            assetSelect.append(new Option("선택", ""));

            const subSelect = $("#sub_id");
            subSelect.empty();
            subSelect.append(new Option("선택", ""));

            const detailSelect = $("#detail_id");
            detailSelect.empty();
            detailSelect.append(new Option("선택", ""));

            let data = res.selectData;
            data.forEach(function(item) {
                assetSelect.append(new Option(item.name, item.id));
            });

            $("#categories").val("");
        },
    });
}

// 장비목록 > 추가/상세/수정 > 장비분류 > 자산세부 리스트
function getSelectSub(assetValue){
    $.ajax({
        url: "/eqp/hw/selectSub",
        type: "post",
        data: {asset_id: assetValue},
        success: function (res) {

            let data = res.selectData;
            if(data.length != 0){
                const subSelect = $("#sub_id");
                subSelect.empty();
                subSelect.append(new Option("선택", ""));

                const detailSelect = $("#detail_id");
                detailSelect.empty();
                detailSelect.append(new Option("선택", ""));


                data.forEach(function(item) {
                    subSelect.append(new Option(item.name, item.id));
                });

                $("#categories").val(data[0].categories);
            }
            else{
                $("#categories").val("");
            }
        },
    });
}

// 장비목록 > 추가/상세/수정 > 장비분류 > 자산상세 리스트
function getSelectDetail(subValue){
    $.ajax({
        url: "/eqp/hw/selectDetail",
        type: "post",
        data: {sub_id: subValue},
        success: function (res) {

            let data = res.selectData;
            if(data.length != 0){
                const detailSelect = $("#detail_id");

                if (res.selectData[0].id === ''){
                    detailSelect.empty();
                    detailSelect.append(new Option("없음", ""));
                }
                else{
                    detailSelect.empty();
                    detailSelect.append(new Option("선택", ""));

                    data.forEach(function(item) {
                        detailSelect.append(new Option(item.name, item.id));
                    });
                }
            }
        },
    });
}

// 장비목록 > 추가/상세/수정 > 장비상세정보 > ip 주소 검증 함수
function checkIPBlock(input) {
    if (input.value.length === 0) {
        input.value = '';
        return;
    }

    if (!/^\d+$/.test(input.value)) {
        alert2("알림", "ip주소는 숫자로만 구성되어야 합니다.", "info", "확인");
        input.value = '';
        return;
    }

    if (parseInt(input.value) > 255) {
        alert2("알림", "IP 블록의 값은 0에서 255 사이여야 합니다.", "info", "확인");
        input.value = '';
    }
}

// 장비목록 > 추가/상세/수정 > 장비상세정보 > ip 주소 저장용 함수
function combineIP() {
    let block1 = document.getElementById('ip_block1').value;
    let block2 = document.getElementById('ip_block2').value;
    let block3 = document.getElementById('ip_block3').value;
    let block4 = document.getElementById('ip_block4').value;

    if (block1 === "") block1 = 0
    if (block2 === "") block2 = 0
    if (block3 === "") block3 = 0
    if (block4 === "") block4 = 0

    return `${block1}.${block2}.${block3}.${block4}`;
}

// 장비목록 > 추가/상세/수정 > 장비연결정보 > 컬럼 formater
function inputEqpLinkFormatter(value, row, index, field) {
    if (field === 'ip_address') {
        if (!value) value = '';

        let ipBlocks = value.split('.');
        while (ipBlocks.length < 4) {
            ipBlocks.push('');
        }

        return `
            <div class="ip-address">
                <input type="text" class="form-control d-inline-block" id="ip_block_${index}_1" maxlength="3" size="3" value="${ipBlocks[0]}" oninput="updateEqpLinkInputData(this, ${index}, '${field}')" /> .
                <input type="text" class="form-control d-inline-block" id="ip_block_${index}_2" maxlength="3" size="3" value="${ipBlocks[1]}" oninput="updateEqpLinkInputData(this, ${index}, '${field}')" /> .
                <input type="text" class="form-control d-inline-block" id="ip_block_${index}_3" maxlength="3" size="3" value="${ipBlocks[2]}" oninput="updateEqpLinkInputData(this, ${index}, '${field}')" /> .
                <input type="text" class="form-control d-inline-block" id="ip_block_${index}_4" maxlength="3" size="3" value="${ipBlocks[3]}" oninput="updateEqpLinkInputData(this, ${index}, '${field}')" />
            </div>`;
    } else if (field === 'port') {
        return `<input type="text" class="form-control" name="${field}" value="${value}" maxlength="10" size="10" oninput="updateEqpLinkInputData(this, ${index}, '${field}')">`;
    } else {
        return `<input type="text" class="form-control" name="${field}" value="${value}" oninput="updateEqpLinkInputData(this, ${index}, '${field}')">`;
    }
}

// 장비목록 > 추가/상세/수정 > 장비연결정보 > 사용자가 컬럼 입력 시 검증
function updateEqpLinkInputData(input, index, field) {
    let $table = $('#eqpLinkTable');
    let data = $table.bootstrapTable('getData');

    if (field === 'ip_address') {
        if (input.value.length === 0) {
            input.value = '';
        }
        else{
            if (!/^\d+$/.test(input.value)) {
                alert2("알림", "ip는 숫자로만 구성되어야 합니다.", "info", "확인");
                input.value = '';
                return;
            }

            if (parseInt(input.value) > 255) {
                alert2("알림", "IP 블록의 값은 0에서 255 사이여야 합니다.", "info", "확인");
                input.value = '';
                return;
            }
        }

        let block1 = document.getElementById(`ip_block_${index}_1`).value;
        let block2 = document.getElementById(`ip_block_${index}_2`).value;
        let block3 = document.getElementById(`ip_block_${index}_3`).value;
        let block4 = document.getElementById(`ip_block_${index}_4`).value;

        if (block1 === "") block1 = 0
        if (block2 === "") block2 = 0
        if (block3 === "") block3 = 0
        if (block4 === "") block4 = 0

        let ipBlocks = [
            block1,
            block2,
            block3,
            block4
        ];

        data[index][field] = ipBlocks.join('.');
    } else {
        if(field === 'port'){
            // 숫자 검증로직 제거
            // if (!/^\d+$/.test(input.value)) {
            //     alert2("알림", "port는 숫자로만 구성되어야 합니다.", "info", "확인");
            //     input.value = '';
            // }
        }

        data[index][field] = input.value;
    }
}

// 장비목록 > 추가/상세/수정 > 장비연결정보 > row 추가
function addEqpLinkRow() {
    let $table = $('#eqpLinkTable');
    let data = $table.bootstrapTable('getData');
    data.push({
        host: '',
        ip_address: '',
        port: ''
    });
    $table.bootstrapTable('load', data);
}

// 장비목록 > 추가/상세/수정 > 장비연결정보 > row 삭제
function deleteEqpLinkRow() {
    let $table = $('#eqpLinkTable');
    let selections = $table.bootstrapTable('getSelections');

    if (selections.length === 0) {
        alert2('알림', '삭제할 행을 선택해주세요.', 'info', '확인');
        return;
    }

    let data = $table.bootstrapTable('getData');
    for (let i = selections.length - 1; i >= 0; i--) {
        let index = data.indexOf(selections[i]);
        if (index !== -1) {
            data.splice(index, 1);
        }
    }

    $table.bootstrapTable('load', data);
}

//  장비관리 > 장비목록 > 추가 / 수정 > 저장하기 전 검증 실패시 에러메세지에 보여줄 항목 이름 조회
function getLabelForInput(input) {
    const id = input.id;
    if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label) {
            return label.textContent;
        }
    }
    return input.name; // label이 없으면 name 사용
}


///////
function usrlogout() {
    let fchk = document.getElementById("logoutform");
    fchk.submit();
}
