
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
      layout:decorate="~{layouts/layout}">

<head>
    <style>




    </style>
</head>

<body>
<div layout:fragment="content">

    <main id="main" class="dashboard">
        <div class="flex-wrap-center">
            <div class="contentCard custom-width-400 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">케이블 포설 현황</div>
                <canvas id="chartCable"></canvas>
            </div>
            <div class="contentCard custom-width-450 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">장비 등록 현황</div>
                <canvas id="chartEquipment"></canvas>
            </div>
            <div class="contentCard custom-width-350 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">장비 누적 금액</div>
                <canvas id="chartAccumulated"></canvas>
            </div>
            <div class="contentCard custom-width-400 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">HW 등록 상세 현황</div>
                <canvas id="chartHWDetails"></canvas>
            </div>
            <div class="contentCard custom-width-450 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">SW 등록 상세 현황</div>
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