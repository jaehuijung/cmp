function tableRefresh(id){
    $(id).bootstrapTable('refresh');
}

function customRenderPagination(tbl, res, containerId="") {
    let pageSize = res.pageSize;
    let pageNumber = res.pageNumber;
    let totalPages = Math.ceil(res.total / pageSize);

    let $pagination = $('<div class="custom-pagination"></div>');

    // 현재 페이지 그룹의 시작과 종료 페이지 번호 계산
    let startPage = Math.floor((pageNumber - 1) / pageSize) * pageSize + 1;
    let endPage = Math.min(startPage + pageSize - 1, totalPages);

    // 이전 버튼 추가
    if (startPage > 1) {
        let $prevButton = $('<a href="#" class="page-num">이전</a>');
        $pagination.append($prevButton);

        $prevButton.on('click', function(e) {
            e.preventDefault();
            $(tbl).bootstrapTable('selectPage', startPage - 1);
        });
    }

    // 페이지 번호 버튼 추가
    for (let i = startPage; i <= endPage; i++) {
        let $pageLink = $('<a href="#" class="page-num">' + i + '</a>');
        if (i === pageNumber) {
            $pageLink.addClass('active');
        }
        $pagination.append($pageLink);

        $pageLink.on('click', function(e) {
            e.preventDefault();
            $(tbl).bootstrapTable('selectPage', i);
        });
    }

    // 다음 버튼 추가
    if (endPage < totalPages) {
        let $nextButton = $('<a href="#" class="page-num">다음</a>');
        $pagination.append($nextButton);

        $nextButton.on('click', function(e) {
            e.preventDefault();
            $(tbl).bootstrapTable('selectPage', endPage + 1);
        });
    }

    // 테이블의 부모 요소에서 fixed-table-pagination 요소를 찾습니다.
    let $wrap = $(tbl).closest('.tbl-bootstrap-wrap');
    let $paginationContainer = $wrap.find('.fixed-table-pagination');

    // 기존 페이지네이션에 커스터마이즈된 페이지네이션을 삽입합니다.
    $paginationContainer.html($pagination);
}
