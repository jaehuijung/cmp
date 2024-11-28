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
            <div class="contentCard custom-width-550 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">케이블 포설 현황</div>
                <div class="flex-even">
                    <div>
                        <canvas id="chartCable" width="250" height="250"></canvas>
                    </div>
                    <div class="flex-column-end custom-margin-left-30 margin-bottom-10">
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 광</div>
                            <div class="custom-font-size-18">35개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ UTF</div>
                            <div class="custom-font-size-18">21개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 계</div>
                            <div class="custom-font-size-18">56개</div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="contentCard custom-width-550 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">장비 등록 현황</div>
                <div class="flex-even">
                    <div>
                        <canvas id="chartEquipment" width="250" height="250"></canvas>
                    </div>
                    <div class="flex-column-end custom-margin-left-30 margin-bottom-10">
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ H/W</div>
                            <div class="custom-font-size-18">1,937개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ S/W</div>
                            <div class="custom-font-size-18">123개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 계</div>
                            <div class="custom-font-size-18">2,060개</div>
                        </div>
                    </div>
                </div>
            </div>

            <!--
            <div class="contentCard custom-width-550 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">장비 누적 금액</div>
                <div class="flex-even">
                    <div>
                        <canvas id="chartEquipmentMoney" width="250" height="250"></canvas>
                    </div>
                    <div class="flex-column-end custom-margin-left-30 margin-bottom-10">
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ H/W</div>
                            <div class="custom-font-size-18">1,100,309천원</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ S/W</div>
                            <div class="custom-font-size-18">337,000천원</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 계</div>
                            <div class="custom-font-size-18">1,437,309천원</div>
                        </div>
                    </div>
                </div>
            </div>
            -->

            <div class="contentCard custom-width-550 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">케이블 등록 상세 현황</div>
                <div class="flex-even">
                    <div>
                        <canvas id="chartCableDetail" width="250" height="250"></canvas>
                    </div>
                    <div class="flex-column-end custom-margin-left-30 margin-bottom-10">
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 1G</div>
                            <div class="custom-font-size-18">47개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 10G</div>
                            <div class="custom-font-size-18">23개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 100G</div>
                            <div class="custom-font-size-18">15개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 계</div>
                            <div class="custom-font-size-18">95개</div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="contentCard custom-width-550 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">HW 등록 상세 현황</div>
                <div class="flex-even">
                    <div>
                        <canvas id="chartHardwareDetail" width="250" height="250"></canvas>
                    </div>
                    <div class="flex-column-end custom-margin-left-30 margin-bottom-10">
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 광</div>
                            <div class="custom-font-size-18">35개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ UTF</div>
                            <div class="custom-font-size-18">21개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 계</div>
                            <div class="custom-font-size-18">56개</div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="contentCard custom-width-550 custom-margin-10 custom-padding-20">
                <div class="custom-font-size-22 custom-font-weight-500 custom-margin-bottom-20">SW 등록 상세 현황</div>
                <div class="flex-even">
                    <div>
                        <canvas id="chartSoftwareDetail" width="250" height="250"></canvas>
                    </div>
                    <div class="flex-column-end custom-margin-left-30 margin-bottom-10">
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 광</div>
                            <div class="custom-font-size-18">35개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ UTF</div>
                            <div class="custom-font-size-18">21개</div>
                        </div>
                        <div class="flex-row-between custom-width-200 custom-underline">
                            <div class="custom-font-size-18">▪️ 계</div>
                            <div class="custom-font-size-18">56개</div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </main>

    <th:block layout:fragment="script">
        <script th:src="@{/js/main/dashboard/view.js}"></script>
        <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
        <script>
            $(function(){
                // 쿼리 결과를 위한 예시 데이터
                const cableData = {
                    광: 35,
                    UTF: 21,
                    TOTAL: 56
                };

                // 백분율 계산 함수
                function calculatePercentage(value, total) {
                    return ((value / total) * 100).toFixed(1) + '%';
                }

                // 케이블 포설 현황 차트
                new Chart(document.getElementById('chartCable'), {
                    type: 'pie',
                    data: {
                        labels: ['광', 'UTF'],
                        datasets: [{
                            data: [cableData.광, cableData.UTF],
                            backgroundColor: ['#4CAF50', '#FFC107'],   // 색상 변경
                        }]
                    },
                    options: {
                        plugins: {
                            datalabels: {
                                color: '#fff',
                                font: { weight: 'bold', size: 22 },
                                formatter: function(value, context) { return context.chart.data.labels[context.dataIndex] + '\n' + calculatePercentage(value, cableData.TOTAL); }
                            },
                            legend: { // 라벨 제거
                                display: false
                            },
                        },
                        interaction: { // 마우스 호버 비활성화
                            mode: null
                        }
                    },
                    plugins: [ChartDataLabels] // 내부 라벨을 표시하기 위해 플러그인 추가
                });


                // 쿼리 결과를 위한 예시 데이터
                const equipmentData = {
                    HW: 1937,
                    SW: 123,
                    TOTAL: 2060
                };

                // 케이블 포설 현황 차트
                new Chart(document.getElementById('chartEquipment'), {
                    type: 'pie',
                    data: {
                        labels: ['HW', 'SW'],
                        datasets: [{
                            data: [equipmentData.HW, equipmentData.SW],
                            backgroundColor: ['#4CAF50', '#FFC107'],   // 색상 변경
                        }]
                    },
                    options: {
                        plugins: {
                            datalabels: {
                                color: '#fff',
                                font: { weight: 'bold', size: 22 },
                                formatter: function(value, context) { return context.chart.data.labels[context.dataIndex] + '\n' + calculatePercentage(value, equipmentData.TOTAL); }
                            },
                            legend: { // 라벨 제거
                                display: false
                            },
                        },
                        interaction: { // 마우스 호버 비활성화
                            mode: null
                        }
                    },
                    plugins: [ChartDataLabels] // 내부 라벨을 표시하기 위해 플러그인 추가
                });


                // 쿼리 결과를 위한 예시 데이터
                const equipmentMoneyData = {
                    HW:   1100309000,
                    SW:   337000000,
                    TOTAL:1437309000
                };

                // 케이블 포설 현황 차트
                new Chart(document.getElementById('chartEquipmentMoney'), {
                    type: 'pie',
                    data: {
                        labels: ['HW', 'SW'],
                        datasets: [{
                            data: [equipmentMoneyData.HW, equipmentMoneyData.SW],
                            backgroundColor: ['#4CAF50', '#FFC107'],   // 색상 변경
                        }]
                    },
                    options: {
                        plugins: {
                            datalabels: {
                                color: '#fff',
                                font: { weight: 'bold', size: 22 },
                                formatter: function(value, context) { return context.chart.data.labels[context.dataIndex] + '\n' + calculatePercentage(value, equipmentMoneyData.TOTAL); }
                            },
                            legend: { // 라벨 제거
                                display: false
                            },
                        },
                        interaction: { // 마우스 호버 비활성화
                            mode: null
                        }
                    },
                    plugins: [ChartDataLabels] // 내부 라벨을 표시하기 위해 플러그인 추가
                });

            });


            // const ctx = document.getElementById('chartCableDetail').getContext('2d');
            // const chart = new Chart(ctx, {
            new Chart(document.getElementById('chartCableDetail'), {
                type: 'bar',
                data: {
                    labels: ['1G', '10G', '100G'],
                    datasets: [
                        {
                            label: '광',
                            data: [10, 15, 10],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'UTF',
                            data: [8, 7, 6],
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    }
                }
            });

            // const ctx = document.getElementById('chartHardwareDetail').getContext('2d');
            // const chart = new Chart(ctx, {
            new Chart(document.getElementById('chartHardwareDetail'), {
                type: 'doughnut', // 'pie'로 변경하면 원형 차트로 표현됩니다
                data: {
                    labels: ['서버장비', '보안장비', '네트워크', '스토리지', '백업장비', '기타장비', '전산기반'],
                    datasets: [{
                        label: 'HW 등록 상세 현황',
                        data: [10, 20, 30, 15, 10, 5, 10], // 데이터 값은 필요에 따라 조정하세요
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(199, 199, 199, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(128, 128, 128, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    }
                }
            });
        </script>
    </th:block>

</div>
</body>

</html>