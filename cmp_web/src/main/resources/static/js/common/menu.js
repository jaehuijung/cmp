$(function(){
    loadMenu();

    $('#sidebarToggle').on('click', function () {
        $('.side-menu').toggleClass('toggled');
        if ($('.side-menu').hasClass('toggled')) {
            $('body').css('margin-left', '0');
        } else {
            $('body').css('margin-left', '300px');
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
}

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

function getParentMenuId(menuData, currentUrl) {
    const currentMenu = menuData.find(menu => (menu.menu_order ==2 && menu.url === currentUrl));
    return currentMenu ? currentMenu.parent_menu_id : null;
}




