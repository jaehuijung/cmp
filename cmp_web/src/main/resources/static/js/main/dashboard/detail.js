<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
      layout:decorate="~{layouts/layout}">

<head>
    <style>
        .contentCard {
            font-family: Pretendard, sans-serif;
            font-weight: 500;
            margin: 10px;
            padding: 20px;
        }

        /* Custom width and height classes */
        .custom-width-350 {
            width: 350px;
            height: 350px;
        }

        .custom-width-400 {
            width: 400px;
            height: 400px;
        }

        .custom-width-450 {
            width: 450px;
            height: 450px;
        }

        /* Custom margin and font-size classes */
        .custom-margin-lr-20 {
            margin: 20px 0px;
        }

        .custom-margin-t-30 {
            margin-top: 30px;
        }

        .custom-font-size-16 {
            font-size: 16px;
        }

        .custom-font-size-18 {
            font-size: 18px;
        }

        .custom-font-size-22 {
            font-size: 22px;
        }

        /* Flexbox utility classes */
        .flex-column {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        .flex-wrap-center {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        /* Responsive design */
        @media (max-width: 1200px) {
            .contentCard {
                width: 45%;
                height: auto;
            }

            .custom-width-350,
            .custom-width-400,
            .custom-width-450 {
                width: 100%;
                height: auto;
            }
        }

        @media (max-width: 768px) {
            .contentCard {
                width: 90%;
                height: auto;
            }

            .custom-width-350,
            .custom-width-400,
            .custom-width-450 {
                width: 100%;
                height: auto;
            }
        }

        /* 사용자 정보 이미지 크기 */
        .user-info-icon {
            width: 120px;
            height: 120px;
            border-radius: 50%;
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
    </style>
</head>

<body>
<div layout:fragment="content">

    <main id="main" class="dashboard">
        <div class="flex-wrap-center">
            <div class="contentCard custom-width-350">
                <div class="flex-column custom-margin-lr-20">
                    <img src="/images/icon/page/user.png" alt="User Icon" class="user-info-icon" />
                </div>
                <div class="flex-column custom-margin-t-30">
                    <p class="custom-font-size-22" id="userName">홍길동</p>
                    <p class="custom-font-size-16" id="userDept">컨텐츠개발 1팀</p>
                    <p class="custom-font-size-16" id="userEmail">hong@seolimict.co.kr</p>
                </div>
            </div>
            <div class="contentCard custom-width-350">
                <!-- 포설 승인 알림 섹션 -->
                <div id="approvalNotificationSection">
                    <div class="notification-header">케이블 포설 승인 알림</div>
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
            </div>
            <div class="contentCard custom-width-450">세번째</div>
            <div class="contentCard custom-width-350">네번째</div>
            <div class="contentCard custom-width-400">다섯번째</div>
            <div class="contentCard custom-width-450">여섯번째</div>
            <div class="contentCard custom-width-350">일곱번째</div>
            <div class="contentCard custom-width-400">여덟번째</div>
            <div class="contentCard custom-width-450">아홉번째</div>
            <div class="contentCard custom-width-350">열번째</div>
        </div>
    </main>

</div>
</body>

</html>