

$(function(){
    loadMenu();

    // 왼쪽 사이드바 펼치고 접기 이벤트 핸들러
    $('#sidebarToggle').on('click', function () {
        const icon = document.getElementById('sidebarToggleIcon');

        $('.side-menu').toggleClass('toggled');
        if ($('.side-menu').hasClass('toggled')) {
            $('#left-logo').css('width', '100px');
            $('#left-logo-img').css('display', 'none');
            $('#left-logo-toggle-img').css('display', 'flex');
            $('#menu-items').css('display', 'none');
            $('#menu-toggle-items').css('display', 'flex');
            $('.content').css('margin-left', '100px');
            $('.bottom-section').css('display', 'none');
            icon.src = '/images/icon/after_toggle.png';
        } else {
            $('#left-logo').css('width', '300px');
            $('#left-logo-img').css('display', 'flex');
            $('#left-logo-toggle-img').css('display', 'none');
            $('#menu-items').css('display', 'flex');
            $('#menu-toggle-items').css('display', 'none');
            $('.content').css('margin-left', '300px');
            $('.bottom-section').css('display', 'block');
            icon.src = '/images/icon/before_toggle.png';
        }
    });
});


function loadMenu() {
    $.ajax({
        url: '/common/menuList',
        type: 'GET',
        contentType: 'application/json',
        success: function(data) {
            if (data.errorCode) {
                buildMenus(data.menuList);
            } else {

            }
        },
        error: function(error) {

        }
    });
}

function buildMenus(menuData) {
    const currentUrl = window.location.pathname;

    buildTopMenu(menuData, currentUrl);
    buildSideMenu(menuData, currentUrl);
    buildPageNavigation(menuData, currentUrl);
}

// 상단 메뉴 구성
function buildTopMenu(menuData, currentUrl) {
    const topMenuContainer = $('#top-menu');
    const currentMenu = getParentMenuId(menuData, currentUrl);
    const filteredMenu = menuData.filter(menu => menu.parent_menu_id === '00000000');

    const topMenuHtml = filteredMenu
        .map(menu => {
            const isActive = menu.menu_id === currentMenu.parent_menu_id ? ' active' : '';
            return `<a href="${menu.url}" class="top-menu-item${isActive}">${menu.menu_name}</a>`;
        })
        .join('');

    if (topMenuContainer.length > 0) {
        topMenuContainer.html(topMenuHtml);
    }
}

// 왼쪽 사이드메뉴 구성
function buildSideMenu(menuData, currentUrl) {
    const currentMenu = getParentMenuId(menuData, currentUrl);

    if (!currentMenu) {
        alert2("알림", "메뉴를 찾을 수 없는 오류가 발생했습니다. <br> 새로고침 후 문제가 지속되면 관리자에게 문의하세요.", "info", "확인");
        return;
    }

    const sideMenuContainer = $('#menu-items');
    const sideMenuToggleContainer = $('#menu-toggle-items');
    const filteredMenu = menuData.filter(menu => menu.parent_menu_id == currentMenu.parent_menu_id);

    const sideMenuHtml = filteredMenu
        .map(menu => {
            const isActive = menu.menu_id === currentMenu.menu_id ? ' active' : '';
            return `<a href="${menu.url}" class="side-menu-item${isActive}"><img src="/images/icon/folder.png" alt="icon" class="menu-icon" />${menu.menu_name}</a>`;
        })
        .join('');

    const sideToggleMenuHtml = filteredMenu
        .map(menu => {
            const isActive = menu.menu_id === currentMenu.menu_id ? ' active' : '';
            return `<a href="${menu.url}" class="side-menu-item${isActive}"><img src="/images/icon/folder.png" alt="icon" class="menu-icon" /></a>`;
        })
        .join('');

    if (sideMenuContainer.length > 0) {
        sideMenuContainer.html(sideMenuHtml);
    }

    if (sideMenuToggleContainer.length > 0) {
        sideMenuToggleContainer.html(sideToggleMenuHtml);
    }
}

// 페이지 네비게이션 구성
function buildPageNavigation(menuData, currentUrl) {
    // 중메뉴 찾기
    const currentMenu = getParentMenuId(menuData, currentUrl);
    if (!currentMenu) {
        alert2("알림","메뉴를 찾을 수 없는 오류가 발생했습니다. <br> 새로고침 후 문제가 지속되면 관리자에게 문의하세요.", "info", "확인");
        return;
    }

    // 대메뉴 찾기
    const parentMenu = menuData.find(menu => menu.menu_id === currentMenu.parent_menu_id);
    if (!parentMenu) {
        alert2("알림","메뉴를 찾을 수 없는 오류가 발생했습니다. <br> 새로고침 후 문제가 지속되면 관리자에게 문의하세요.", "info", "확인");
        return;
    }

    // 페이지 구성
    const h1Element = document.querySelector('.pageTitle h1');
    if (h1Element) {
        let subTitle = "";
        if(currentUrl.includes("create")){
            subTitle = " (추가)"
        }
        else if(currentUrl.includes("update")){
            subTitle = " (수정)"
        }
        else if(currentUrl.includes("detail")){
            subTitle = " (상세)"
        }

        h1Element.textContent = currentMenu.menu_name + subTitle;
    }

    const breadcrumbElement = document.querySelector('.breadcrumb');

    // home 링크는 만약 대시보드 만들면 거기로 이동하도록 수정!
    if (breadcrumbElement) {
        breadcrumbElement.innerHTML = `
            <li class="breadcrumb-item"><a href="/cable/rack/view">Home</a></li>
            <li class="breadcrumb-item"><a href="${parentMenu.url}">${parentMenu.menu_name}</a></li>
            <li class="breadcrumb-item active"><a href="${currentMenu.url}">${currentMenu.menu_name}</a></li>
        `;
    }
}

// 사용자가 접근한 상위 메뉴 id 찾기
function getParentMenuId(menuData, currentUrl) {
    const currentMenu = menuData.find(menu => (menu.menu_order ==2 && currentUrl.includes(menu.menu_role)));

    return currentMenu ? currentMenu : null;
}


