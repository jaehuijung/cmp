
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
      layout:decorate="~{layouts/layout}">

<head>
    <style>
        /* 기본 스타일 및 레이아웃 */
        body {
            font-family: Pretendard, sans-serif;
            font-weight: 500;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
        }

        #main.dashboard {
            padding: 20px;
        }

        .section-container {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 20px;
            flex-wrap: wrap; /* 이 속성 추가로 작은 화면에서 섹션이 줄 바꿈됩니다 */
        }

        .section {
            background: #fff;
            padding: 30px 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 350px;
            height: 350px;
            min-width: 350px; /* 이 속성 추가로 최소 너비를 설정함 */
            box-sizing: border-box;
            position: relative; /* 금액 텍스트 절대 위치를 위해 추가 */
        }

        /* 반응형 레이아웃을 위해 추가적인 스타일링 */
        @media (max-width: 1200px) {
            .section {
                flex: 1 1 300px; /* 최소 너비 설정 */
            }

        }

        @media (max-width: 768px) {
            .section {
                flex: 1 1 100%;
                width: 90%;
                min-width: 280px; /* 작은 화면에서도 최소 너비 설정 */
            }
        }

        /* 사용자 정보 섹션 스타일 */
        #userInfoSection {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            gap: 15px;
        }

        .user-icon-container,
        .user-info-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .user-icon-container {
            margin-bottom: 20px;
        }

        .user-icon {
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }

        .user-info-container p {
            margin: 5px 0;
            font-size: 16px;
        }

        /* 승인 알림 섹션 스타일 */
        #approvalNotificationSection {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
        }

        .notification-header {
            font-size: 18px;
            margin-bottom: 20px;
        }

        .notification-count {
            font-size: 16px;
            margin-bottom: 15px;
            position: relative;
            padding-left: 25px; /* 이미지 크기에 맞게 조정 */
        }

        .notification-count img {
            width: 20px; /* 이미지 크기를 텍스트 크기에 맞춰 조정 */
            height: 20px;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        .notification-count span {
            color: red;
            text-decoration: underline;
        }

        .notification-list {
            width: 100%;
            text-align: left;
        }

        .notification-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 5px 0;
            font-size: 14px;
            position: relative;
        }

        .notification-item img {
            width: 16px; /* 이미지 크기를 텍스트 크기에 맞춰 조정 */
            height: 16px;
            margin-right: 10px;
        }

        .notification-buttons {
            display: flex;
            gap: 5px;
        }

        .btn {
            padding: 5px 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
        }

        .btn-approve {
            background-color: #4CAF50;
            color: white;
        }

        .btn-reject {
            background-color: #f44336;
            color: white;
        }

        /* 달력 섹션 스타일 */
        #calendarSection {
            width: 350px;
            height: 350px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 10px;  /* padding을 약간 추가해서 여백을 줌 */
            text-align: left;
            box-sizing: border-box;  /* 박스 크기 계산에 테두리 및 패딩 포함 */
        }

        /* Pikaday 달력 크기 조정 */
        .pika-single {
            border: none !important;
            width: 100% !important;  /* 달력 너비를 부모 요소에 맞춤 */
            height: 100% !important;  /* 달력 높이를 부모 요소에 맞춤 */
            max-width: none;
        }

        /* Pikaday 내부 스타일 조정 */
        .pika-lendar {
            width: 320px !important; /* 정확한 너비 설정 */
            height: 310px !important; /* 정확한 높이 설정 */
            box-sizing: border-box;   /* 박스 크기 계산에 테두리 포함 */
        }

        /* 달력의 각 행 높이를 조정 */
        .pika-table tr {
            height: 45px;  /* 행 높이 설정 */
        }

        /* 달력의 각 셀 높이를 조정 */
        .pika-table td, .pika-table th {
            height: 45px;  /* 셀 높이 설정 */
            line-height: 45px;  /* 텍스트 세로 정렬 */
        }

        /* hover시 행 전체에 배경색 제거 */
        .pika-table tbody tr:hover {
            background: none !important;   /* 행 전체에 배경색 제거 */
        }

        /* 게시판 섹션 스타일 */
        #boardSection {
            width: 700px;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            text-align: left; /* 왼쪽 정렬 */
        }

        .board-header {
            font-size: 20px;
            margin-bottom: 20px;
        }

        .tab {
            display: flex;
            gap: 20px;
            margin-bottom: 20px;
        }

        .tab button {
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            background-color: #e0e0e0;
            color: #555;
            text-align: left; /* 왼쪽 정렬 */
        }

        .tab button.active {
            background-color: #4caf50;
            color: white;
        }

        .board-list {
            text-align: left;
            width: 100%;
        }

        .board-item {
            margin: 5px 0;
            padding: 10px;
            border-bottom: 1px solid #e0e0e0;
            font-size: 16px;
            display: flex;
            justify-content: space-between;
        }

        .board-item span {
            color: #888;
        }

        /* 금액 섹션 */
        #amountSection {
            width: 350px; /* 섹션의 너비와 동일하게 설정 */
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            text-align: center;
            display: inline-block;
            vertical-align: top;
        }

        .chart-container {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .amount-header {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 18px;
            color: #4caf50;
        }

        .amount-value {
            position: absolute;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            font-weight: bold;
            color: #4caf50;
        }

        /* 통계 표 스타일 */
        .stats-width {
            min-width: 700px;
        }
        .stats-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            overflow-y: auto;
            max-height: 230px;
        }

        .stats-table th, .stats-table td {
            border: 1px solid #e0e0e0;
            padding: 8px;
            text-align: center;
            white-space: nowrap;
        }

        .stats-table th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
    </style>

    <!-- Pikaday CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css">
</head>

<body>
<div layout:fragment="content">

    <main id="main" class="dashboard">
        <div class="section-container">
            <!-- 사용자 정보 -->
            <div id="userInfoSection" class="section">
                <div class="user-icon-container">
                    <img src="/images/icon/menu_user.png" alt="User Icon" class="user-icon" />
                </div>
                <div class="user-info-container">
                    <p><span id="userName">구명회</span></p>
                    <p><span id="userDept">기술지원 1팀</span></p>
                    <p><span id="userEmail">gumh@seolimict.co.kr</span></p>
                </div>
            </div>

            <!-- 승인 알림 섹션 -->
            <div id="approvalNotificationSection" class="section">
                <div class="notification-header">포설 승인 알림</div>
                <div class="notification-count">
                    <img src="/images/icon/page/alarm.svg" alt="Alarm Icon" />
                    총 <span>3건</span>의 승인 요청이 있습니다.
                </div>
                <div class="notification-list">
                    <div class="notification-item">
                        <img src="/images/icon/page/check.svg" alt="Alarm Icon" />
                        "엄태건" 님의 승인 요청
                        <div class="notification-buttons">
                            <button class="btn btn-approve">승인</button>
                            <button class="btn btn-reject">반려</button>
                        </div>
                    </div>
                    <div class="notification-item">
                        <img src="/images/icon/page/check.svg" alt="Alarm Icon" />
                        "김강현" 님의 승인 요청
                        <div class="notification-buttons">
                            <button class="btn btn-approve">승인</button>
                            <button class="btn btn-reject">반려</button>
                        </div>
                    </div>
                    <div class="notification-item">
                        <img src="/images/icon/page/check.svg" alt="Alarm Icon" />
                        "박준호" 님의 승인 요청
                        <div class="notification-buttons">
                            <button class="btn btn-approve">승인</button>
                            <button class="btn btn-reject">반려</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 달력 섹션 -->
            <div id="calendarSection" class="section">
                <div id="calendar"></div>
            </div>

            <!-- 게시판 섹션 -->
            <div id="boardSection" class="section">
                <div class="board-header">게시글 작성 현황</div>
                <div class="tab">
                    <button class="tablinks active" onmouseover="openBoard(event, 'noticeBoard')">공지사항</button>
                    <button class="tablinks" onmouseover="openBoard(event, 'freeBoard')">자유게시판</button>
                </div>
                <div id="noticeBoard" class="board-list" style="display: block;">
                    <div class="board-item">[공지사항] 충격! cms 이대로 괜찮은가? <span>[5]</span></div>
                    <div class="board-item">[공지사항] cms 퍼블리싱 건에 대하여... <span>[2]</span></div>
                    <div class="board-item">[일반] 저녁으로 무엇을 먹을지 고민하는 글 <span>[8]</span></div>
                </div>
                <div id="freeBoard" class="board-list" style="display: none;">
                    <div class="board-item">[질문] 선번장 정의에 대해 알려주시면 감사하겠습니다. <span>[4]</span></div>
                    <div class="board-item">[지식] 장비관리 등록 팁 공유드립니다. <span>[111]</span></div>
                    <div class="board-item">[일반] cms 시스템 진짜 좋은데요? 와 이거 뭐임? <span>[6]</span></div>
                </div>
            </div>

            <!-- 금액 표시 섹션 -->
            <div id="amountSection" class="section">
                <div class="chart-container">
                    <canvas id="amountChart"></canvas>
                    <div class="amount-header">장비구매 누적</div>
                    <div class="amount-value">₩1,000,000,000,000</div>
                </div>
            </div>
        </div>

        <div class="section-container">
            <!-- 회선 그룹별 개수 통계 표 -->
            <div id="lineStatsSection" class="section">
                <h3>회선 그룹별 개수</h3>
                <table class="stats-table">
                    <thead>
                    <tr>
                        <th>그룹</th>
                        <th>1G</th>
                        <th>10G</th>
                        <th>100G</th>
                        <th>계</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>광</td>
                        <td>10</td>
                        <td>5</td>
                        <td>2</td>
                        <td>17</td>
                    </tr>
                    <tr>
                        <td>UTF</td>
                        <td>8</td>
                        <td>7</td>
                        <td>1</td>
                        <td>16</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div id="hardwareStatsSection" class="section stats-width">
                <h3>하드웨어 그룹별 개수</h3>
                <table class="stats-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>서버</th>
                        <th>보안</th>
                        <th>네트워크</th>
                        <th>백업</th>
                        <th>스토리지</th>
                        <th>기타</th>
                        <th>계</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>하드웨어</td>
                        <td>10</td>
                        <td>5</td>
                        <td>8</td>
                        <td>2</td>
                        <td>1</td>
                        <td>4</td>
                        <td>30</td>
                    </tr>
                    </tbody>
                </table>

                <h3>소프트웨어 그룹별 개수</h3>
                <table class="stats-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>시스템SW</th>
                        <th>미들웨어</th>
                        <th>DB관리</th>
                        <th>백업관리</th>
                        <th>정보보호</th>
                        <th>관제</th>
                        <th>가상화SW</th>
                        <th>계</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>소프트웨어</td>
                        <td>6</td>
                        <td>7</td>
                        <td>4</td>
                        <td>3</td>
                        <td>5</td>
                        <td>2</td>
                        <td>3</td>
                        <td>30</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>

    <!-- Pikaday JS -->
    <script src="https://cdn.jsdelivr.net/npm/pikaday/pikaday.js"></script>
    <script>
        var picker = new Pikaday({
            field: document.getElementById('calendar'),
            bound: false,  // 상시 표시되도록 설정
            container: document.getElementById('calendar'),
            format: 'YYYY-MM-DD',
            defaultDate: new Date(),  // 현재 날짜를 기본으로 설정
            setDefaultDate: true
        });

        function openBoard(evt, boardName) {
            var i, boardlist, tablinks;
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

        // 도넛 차트 그리기
        var ctx = document.getElementById('amountChart').getContext('2d');
        var amountChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['사용된 금액', '남은 금액'],
                datasets: [{
                    data: [300000, 500000], // 사용된 금액과 남은 금액 데이터
                    backgroundColor: ['#eee', '#e0e0e0'], // 각각의 색상
                    hoverBackgroundColor: ['#45a049', '#d4d4d4']
                }]
            },
            options: {
                maintainAspectRatio: false, // 차트의 정사각형 비율 비활성화
                cutout: '70%', // 도넛 차트의 가운데 비율 (내부 공간 설정)
                plugins: {
                    legend: {
                        display: false // 레전드 비활성화
                    }
                }
            }
        });
    </script>
</div>
</body>

</html>