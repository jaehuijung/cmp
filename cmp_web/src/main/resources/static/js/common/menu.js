

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
    const filteredMenu = menuData.filter(menu => menu.parent_menu_id === '00000000');

    const topMenuHtml = filteredMenu
        .map(menu => `<a href="${menu.url}" class="top-menu-item">${menu.menu_name}</a>`)
        .join('');

    if (topMenuContainer.length > 0) {
        topMenuContainer.html(topMenuHtml);
    }
}

// 왼쪽 사이드메뉴 구성
function buildSideMenu(menuData) {

    const currentUrl = window.location.pathname;
    const parentMenuId = getParentMenuId(menuData, currentUrl);

    const sideMenuContainer = $('#menu-items');
    const filteredMenu = menuData.filter(menu => menu.parent_menu_id == parentMenuId);

    const sideMenuHtml = filteredMenu
        .map(menu => `<a href="${menu.url}">${menu.menu_name}</a>`)
        .join('');

    if (sideMenuContainer.length > 0) {
        sideMenuContainer.html(sideMenuHtml);
    }
}

// 사용자가 접근한 상위 메뉴 id 찾기
function getParentMenuId(menuData, currentUrl) {
    const currentMenu = menuData.find(menu => (menu.menu_order ==2 && menu.url === currentUrl));
    return currentMenu ? currentMenu.parent_menu_id : null;
}

// 페이지 네비게이션 구성
function buildPageNavigation(menuData) {
    const currentUrl = window.location.pathname;
    const currentMenu = menuData.find(menu => (menu.menu_order === 2 && menu.url === currentUrl));

    if (!currentMenu) {
        console.error("Cannot find the current menu");
        return;
    }

    const parentMenu = menuData.find(menu => menu.menu_id === currentMenu.parent_menu_id);

    if (!parentMenu) {
        console.error("Cannot find the parent menu");
        return;
    }

    const h1Element = document.querySelector('.pagetitle h1');
    if (h1Element) {
        h1Element.textContent = currentMenu.menu_name;
    }

    const breadcrumbElement = document.querySelector('.breadcrumb');
    if (breadcrumbElement) {
        breadcrumbElement.innerHTML = `
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item">${parentMenu.menu_name}</li>
            <li class="breadcrumb-item active">${currentMenu.menu_name}</li>
        `;
    }
}


