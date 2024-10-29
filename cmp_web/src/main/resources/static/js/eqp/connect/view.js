
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
      layout:decorate="~{layouts/layout}">

<head>
    <style>
        /* 기본 스타일 및 레이아웃 */
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
        }

        #main.dashboard {
            padding: 20px;
        }

        .contentCard {
            background: #fff;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            font-size: 24px;
            margin-bottom: 20px;
        }

        .section {
            margin-bottom: 40px;
        }

        .section h3 {
            font-size: 20px;
            margin-bottom: 10px;
        }

        /* 사용자 정보 섹션 */
        #userInfoSection {
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
        }

        /* 공지사항 및 승인 알림 섹션 */
        #noticeSection, #approvalNotificationsSection {
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
        }

        #noticeSection ul, #approvalNotificationsSection ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

        #noticeSection li, #approvalNotificationsSection li {
            padding: 5px 0;
        }

        /* 달력 섹션 */
        #calendarSection {
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
        }

        #calendar {
            max-width: 100%;
            margin: 0 auto;
        }

        /* 장비 그룹별 통계 섹션 */
        #equipmentGroupStatsSection {
            border: 1px solid #ddd;
            padding: 10px;
            border-radius: 4px;
        }

        #equipmentGroupStatsSection .table {
            width: 100%;
            margin-top: 20px;
            border-collapse: collapse;
        }

        #equipmentGroupStatsSection .table thead th {
            border-bottom: 2px solid #ddd;
            padding: 10px;
            text-align: left;
        }

        #equipmentGroupStatsSection .table tbody td {
            border-bottom: 1px solid #ddd;
            padding: 10px;
        }
    </style>
</head>

<div layout:fragment="content">

    <main id="main" class="dashboard">


            <!-- 현재 로그인 한 사용자의 정보 섹션 -->
            <div id="userInfoSection" class="section">
                <h3>사용자 정보</h3>
                <p>사용자 이름: <span id="userName">홍길동</span></p>
                <p>이메일: <span id="userEmail">hong@gmail.com</span></p>
            </div>

            <!-- 공지사항 섹션 -->
            <div id="noticeSection" class="section">
                <h3>공지사항</h3>
                <ul>
                    <li>공지사항 1</li>
                    <li>공지사항 2</li>
                    <li>공지사항 3</li>
                </ul>
            </div>

            <!-- 승인 알림 섹션 -->
            <div id="approvalNotificationsSection" class="section">
                <h3>승인 알림</h3>
                <ul>
                    <li>승인 요청 1</li>
                    <li>승인 요청 2</li>
                    <li>승인 요청 3</li>
                </ul>
            </div>

            <!-- 달력 섹션 -->
            <div id="calendarSection" class="section">
                <h3>달력</h3>
                <div id="calendar"></div>
            </div>

            <!-- 등록되어 있는 장비 그룹별 개수 통계 -->
            <div id="equipmentGroupStatsSection" class="section">
                <h3>장비 그룹별 개수 통계</h3>
                <canvas id="equipmentGroupChart"></canvas>
                <div id="equipmentGroupTableContainer">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>장비 그룹</th>
                            <th>개수</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>서버</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>네트워크</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>보안</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td>스토리지</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>백업</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>기타</td>
                            <td>10</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

    <th:block layout:fragment="script">
        <script th:src="@{/js/main/dashboard/view.js}"></script>
    </th:block>
</div>

</html>