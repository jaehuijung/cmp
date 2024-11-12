<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
      layout:decorate="~{layouts/layout}">

<head>
    <style>

        .contentCard { font-family: Pretendard, sans-serif; font-weight: 500; margin: 10px; padding: 20px; }

        /* Responsive design */
        @media (max-width: 1600px) {
            .custom-width-450 { width: 100%; height: auto; }
        }

        @media (max-width: 1300px) {
            .custom-width-450 { width: 100%; height: auto; }
        }

        @media (max-width: 768px) {
            .contentCard { width: 90%; height: auto; }
            .custom-width-450 { width: 100%; height: auto; }
        }

        /* 사용자 정보 이미지 크기 */
        .user-info-icon { width: 120px; height: 120px; border-radius: 50%; }

        /* 포설 */
        .img-20 { width: 20px; height: 20px; }
        .img-16 { width: 16px; height: 16px; }

        /* Button styles */
        .btn-approve { padding: 5px 10px; border: none; cursor: pointer; background-color: #4CAF50; color: white; }

        /* 달력 섹션 스타일 */
        #calendar {
            width: 350px;
            height: 350px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 10px;  /* padding을 약간 추가해서 여백을 줌 */
            text-align: left;
            box-sizing: border-box;  /* 박스 크기 계산에 테두리 및 패딩 포함 */
        }



        /* 게시판 섹션 스타일 */
        .custom-width-770 { width: 770px; }

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

    </style>
</head>

<body>
<div layout:fragment="content">

    <main id="main" class="dashboard">
        <div class="flex-wrap-center">
            <!--
            <div class="contentCard custom-width-350">
                <div class="flex-column-center custom-margin-tb-20">
                    <img src="/images/icon/page/user.png" alt="User Icon" class="user-info-icon" />
                </div>
                <div class="flex-column-center custom-margin-top-30">
                    <p class="custom-font-size-22" id="userName">홍길동 <span class="custom-font-size-16">(관리자)</span></p>
                    <p class="custom-font-size-18" id="userDept">컨텐츠개발 1팀</p>
                    <p class="custom-font-size-18" id="userEmail">hong@seolimict.co.kr</p>
                </div>
            </div>
            <div class="contentCard custom-width-400">
                <div class="flex-column custom-margin-top-30">
                    <div class="custom-font-size-22 custom-padding-lr-20 custom-margin-bottom-20">케이블 포설 승인 요청</div>
                    <div class="custom-font-size-16 custom-margin-bottom-15 custom-position-relative custom-padding-lr-20">
                        <div class="flex">
                            <img src="/images/icon/page/alarm.svg" alt="Alarm Icon" class="img-20 custom-margin-right-10" />
                                총 "<span class="custom-color-red custom-text-underline">8건</span>" 의 승인 요청이 있습니다.
                        </div>
                    </div>
                    <div class="custom-width-100per custom-text-left custom-margin-top-30">
                        <div class="custom-font-size-14 custom-margin-bottom-5 flex-row-center custom-position-relative">
                            <div class="flex">
                                <img src="/images/icon/page/check.svg" alt="Alarm Icon" class="img-16 custom-margin-right-10" />
                                    "홍길순" 님의 승인 요청이 있습니다.
                            </div>
                            <div class="custom-gap-5">
                                <button class="btn btn-approve custom-font-size-12 custom-border-radius-4">검토</button>
                            </div>
                        </div>
                        <div class="custom-font-size-14 custom-margin-bottom-5 flex-row-center custom-position-relative">
                            <div class="flex">
                                <img src="/images/icon/page/check.svg" alt="Alarm Icon" class="img-16 custom-margin-right-10" />
                                    "순길홍" 님의 승인 요청이 있습니다.
                            </div>
                            <div class="custom-gap-5">
                                <button class="btn btn-approve custom-font-size-12 custom-border-radius-4">검토</button>
                            </div>
                        </div>
                        <div class="custom-font-size-14 custom-margin-bottom-5 flex-row-center custom-position-relative">
                            <div class="flex">
                                <img src="/images/icon/page/check.svg" alt="Alarm Icon" class="img-16 custom-margin-right-10" />
                                    "길홍순" 님의 승인 요청이 있습니다.
                            </div>
                            <div class="custom-gap-5">
                                <button class="btn btn-approve custom-font-size-12 custom-border-radius-4">검토</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contentCard custom-width-400">
                <div id="calendar"></div>
            </div>
            <div class="contentCard custom-width-770">
                <div class="custom-font-size-22 custom-margin-bottom-20">게시글 작성 현황</div>
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
            -->

            <div class="contentCard custom-width-400">
                <div class="custom-font-size-22 custom-margin-bottom-20">케이블 포설 현황</div>
                <canvas id="chartCable"></canvas>
            </div>
            <div class="contentCard custom-width-450">
                <div class="custom-font-size-22 custom-margin-bottom-20">장비 등록 현황</div>
                <canvas id="chartEquipment"></canvas>
            </div>
            <div class="contentCard custom-width-350">
                <div class="custom-font-size-22 custom-margin-bottom-20">장비 누적 금액</div>
                <canvas id="chartAccumulated"></canvas>
            </div>
            <div class="contentCard custom-width-400">
                <div class="custom-font-size-22 custom-margin-bottom-20">HW 등록 상세 현황</div>
                <canvas id="chartHWDetails"></canvas>
            </div>
            <div class="contentCard custom-width-450">
                <div class="custom-font-size-22 custom-margin-bottom-20">SW 등록 상세 현황</div>
                <canvas id="chartSWDetails"></canvas>
            </div>
        </div>
    </main>

    <th:block layout:fragment="script">
        <script th:src="@{/js/main/dashboard/view.js}"></script>
        <script>
            document.addEventListener("DOMContentLoaded", function() {
                // 케이블 포설 현황 차트
                new Chart(document.getElementById('chartCable'), {
                    type: 'pie',
                    data: {
                        labels: ['광', 'UTF'],
                        datasets: [{
                            data: [60, 40],
                            backgroundColor: ['#36a2eb', '#ff6384']
                        }]
                    }
                });

                // 장비 등록 현황 차트
                new Chart(document.getElementById('chartEquipment'), {
                    type: 'bar',
                    data: {
                        labels: ['HW', 'SW'],
                        datasets: [{
                            label: '등록 현황',
                            data: [300, 200],
                            backgroundColor: ['#56ce56', '#ffcf56']
                        }]
                    }
                });

                // 장비 누적 금액 차트
                new Chart(document.getElementById('chartAccumulated'), {
                    type: 'line',
                    data: {
                        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
                        datasets: [{
                            label: 'HW',
                            data: [20, 30, 40, 50, 60, 70],
                            borderColor: '#36a2eb',
                            fill: false
                        }, {
                            label: 'SW',
                            data: [15, 25, 35, 45, 55, 65],
                            borderColor: '#ff6384',
                            fill: false
                        }]
                    }
                });

                // HW 등록 상세 현황 차트
                new Chart(document.getElementById('chartHWDetails'), {
                    type: 'bar',
                    data: {
                        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
                        datasets: [{
                            label: 'HW 등록 상세',
                            data: [50, 30, 70, 90, 60, 100, 40],
                            backgroundColor: '#ff9f40'
                        }]
                    }
                });

                // SW 등록 상세 현황 차트
                new Chart(document.getElementById('chartSWDetails'), {
                    type: 'bar',
                    data: {
                        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
                        datasets: [{
                            label: 'SW 등록 상세',
                            data: [20, 40, 60, 80, 100, 120, 140],
                            backgroundColor: '#4bc0c0'
                        }]
                    }
                });
            });
        </script>
    </th:block>
    <script>

    </script>

</div>
</body>

</html>