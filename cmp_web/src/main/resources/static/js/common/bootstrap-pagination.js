function customPagination(totalPages, pageSize, currentPage) {
    let pageLinks = [];
    let startPage = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
    let endPage = Math.min(startPage + pageSize - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
        pageLinks.push(i);
    }

    return {
        pageLinks: pageLinks,
        startPage: startPage,
        endPage: endPage
    };
}


function customRenderPagination(tbl, totalRows) {
    let totalPages = Math.ceil(totalRows / 10);
    let currentPage = tbl.bootstrapTable('getOptions').pageNumber;
    let pagination = customPagination(totalPages, 10, currentPage);

    // 페이지네이션 요소 확인
    let paginationElement = tbl.closest('.bootstrap-table').find('.fixed-table-pagination ul.pagination');
    paginationElement.empty();

    // 이전 버튼 추가
    if (pagination.startPage > 1) {
        paginationElement.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goToPage(tbl, ${pagination.startPage - 10})">이전</a></li>`);
    }

    // 페이지 링크 추가
    for (let i = 0; i < pagination.pageLinks.length; i++) {
        let activeClass = (pagination.pageLinks[i] === currentPage) ? 'active' : '';
        paginationElement.append(`<li class="${activeClass} page-item"><a class="page-link" href="javascript:void(0)" onclick="goToPage(tbl, ${pagination.pageLinks[i]})">${pagination.pageLinks[i]}</a></li>`);
    }

    // 다음 버튼 추가
    if (pagination.endPage < totalPages) {
        paginationElement.append(`<li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goToPage(tbl, ${pagination.endPage + 1})">다음</a></li>`);
    }
}

function goToPage(tbl, page) {
    tbl.bootstrapTable('selectPage', page);
}