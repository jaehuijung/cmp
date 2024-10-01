

$(function(){
    loadMenu();

    // 왼쪽 사이드바 펼치고 접기 이벤트 핸들러
    $('#sidebarToggle').on('click', function () {
        $('.side-menu').toggleClass('toggled');
        if ($('.side-menu').hasClass('toggled')) {
            $('header').css('margin-left', '0');
            $('.content').css('margin-left', '0');
        } else {
            $('header').css('margin-left', '300px');
            $('.content').css('margin-left', '300px');
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
    buildTopMenu(menuData);
    buildSideMenu(menuData);
    buildPageNavigation(menuData);
}

// 상단 메뉴 구성
function buildTopMenu(menuData) {
    const topMenuContainer = $('#top-menu');

    const currentMenu = getParentMenuId(menuData);
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
function buildSideMenu(menuData) {
    const currentMenu = getParentMenuId(menuData);

    if (!currentMenu) {
        alert2("알림", "메뉴를 찾을 수 없는 오류가 발생했습니다. <br> 새로고침 후 문제가 지속되면 관리자에게 문의하세요.", "info", "확인");
        return;
    }

    const sideMenuContainer = $('#menu-items');
    const filteredMenu = menuData.filter(menu => menu.parent_menu_id == currentMenu.parent_menu_id);

    const sideMenuHtml = filteredMenu
        .map(menu => {
            const isActive = menu.menu_id === currentMenu.menu_id ? ' active' : '';
            return `<a href="${menu.url}" class="side-menu-item${isActive}"><img src="/images/icon/folder.png" alt="icon" class="menu-icon" />${menu.menu_name}</a>`;
        })
        .join('');

    if (sideMenuContainer.length > 0) {
        sideMenuContainer.html(sideMenuHtml);
    }
}

// 페이지 네비게이션 구성
function buildPageNavigation(menuData) {

    // 중메뉴 찾기
    const currentMenu = getParentMenuId(menuData);
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
    const h1Element = document.querySelector('.pagetitle h1');
    if (h1Element) {
        h1Element.textContent = currentMenu.menu_name;
    }

    const breadcrumbElement = document.querySelector('.breadcrumb');

    // home 링크는 만약 대시보드 만들면 거기로 이동하도록 수정!
    if (breadcrumbElement) {
        breadcrumbElement.innerHTML = `
            <li class="breadcrumb-item"><a href="/cable/rack/view">Home</a></li>
            <li class="breadcrumb-item"><a href="${parentMenu.url}">${parentMenu.menu_name}</a></li>
            <li class="breadcrumb-item active"><a href="${parentMenu.url}">${currentMenu.menu_name}</a></li>
        `;
    }
}

// 사용자가 접근한 상위 메뉴 id 찾기
function getParentMenuId(menuData) {
    const currentUrl = window.location.pathname;
    const currentMenu = menuData.find(menu => (menu.menu_order ==2 && currentUrl.includes(menu.menu_role)));

    return currentMenu ? currentMenu : null;
}


