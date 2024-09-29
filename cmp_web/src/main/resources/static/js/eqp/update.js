

$(function(){

    addComma(document.getElementById("acquisition_cost")); // 도입금액 콤마처리

    // 장비분류 선택 시 선택박스 세팅
    $(document).ready(function() {
        $('#config_id').change(function(){
            const configValue = $(this).val();
            getSelectAsset(configValue);
        })

        $('#asset_id').change(function(){
            const assetValue = $(this).val();
            getSelectSub(assetValue);
        })

        $('#sub_id').change(function(){
            const subValue = $(this).val();
            getSelectDetail(subValue);
        })
    })

});


/**
 * 구성분류 리스트
 */
function getSelectConfig(){
    $.ajax({
        url: "/eqpManage/selectConfig",
        type: "GET",
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

/**
 * 자산분류 리스트
 */
function getSelectAsset(configValue){
    $.ajax({
        url: "/eqpManage/selectAsset",
        type: "GET",
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

/**
 * 자산세부 리스트
 */
function getSelectSub(assetValue){
    $.ajax({
        url: "/eqpManage/selectSub",
        type: "GET",
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

/**
 * 자산상세 리스트
 */
function getSelectDetail(subValue){
    $.ajax({
        url: "/eqpManage/selectDetail",
        type: "GET",
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


/**
 * 장비관리 > 장비목록 > 장비수정 > 저장버튼
 * 저장 버튼을 클릭했을 때 호출되는 함수입니다.
 */
function updateData(){

}

