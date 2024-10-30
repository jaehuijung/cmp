$(function(){

    let picker = new Pikaday({
        field: document.getElementById('calendar'),
        bound: false,  // 상시 표시되도록 설정
        container: document.getElementById('calendar'),
        format: 'YYYY-MM-DD',
        defaultDate: new Date(),  // 현재 날짜를 기본으로 설정
        setDefaultDate: true
    });

});


function openBoard(evt, boardName) {
    let i, boardlist, tablinks;
    boardlist = document.getElementsByClassName("board-list");
    for (i = 0; i < boardlist.length; i++) {
        boardlist[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(boardName).style.display = "block";
    evt.currentTarget.className += " active";
}

