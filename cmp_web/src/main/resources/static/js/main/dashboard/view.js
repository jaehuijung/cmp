let fiberCableChart, utpCableChart, equipmentChart, softwareChart;

// 최대 데이터값 계산 함수
function getMaxDataValue(data) {
    return Math.max(...data);
}

// 동적으로 stepSize를 설정하는 함수
function calculateStepSize(maxValue) {
    const stepBase = Math.pow(10, Math.floor(Math.log10(maxValue / 10)));
    return stepBase;
}

// 공통 옵션 함수
function createChartOptions(data) {
    const maxDataValue = getMaxDataValue(data);
    const stepSize = calculateStepSize(maxDataValue);
    const maxTicksValue = Math.ceil(maxDataValue / stepSize) * stepSize + (stepSize * 3);

    return {
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
                color: 'rgba(0, 0, 0, 0.7)',
                font: {
                    weight: 'bold'
                },
            },
            legend: { // 라벨 제거
                display: false
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: maxTicksValue,
                ticks: {
                    stepSize: stepSize
                }
            }
        }
    };
}

// 차트 생성 함수
function createCharts() {
    // 기존 차트가 있다면 모두 제거
    if (fiberCableChart) fiberCableChart.destroy();
    if (utpCableChart) utpCableChart.destroy();
    if (equipmentChart) equipmentChart.destroy();
    if (softwareChart) softwareChart.destroy();

    // fiberCableChart 생성
    fiberCableChart = new Chart(document.getElementById('fiberCableChart').getContext('2d'), {
        type: 'bar', // 막대그래프 타입 지정
        data: {
            labels: fiberDetailLabels,
            datasets: [{
                data: fiberDetailValues,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Cyan color
                    'rgba(153, 102, 255, 0.2)', // Purple color
                    'rgba(255, 159, 64, 0.2)'   // Orange color
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: createChartOptions(fiberDetailValues),
        plugins: [ChartDataLabels]
    });

    // utpCableChart 생성
    utpCableChart = new Chart(document.getElementById('utpCableChart').getContext('2d'), {
        type: 'bar', // 막대그래프 타입 지정
        data: {
            labels: utpDetailLabels,
            datasets: [{
                data: utpDetailValues,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Cyan color
                    'rgba(153, 102, 255, 0.2)', // Purple color
                    'rgba(255, 159, 64, 0.2)'   // Orange color
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: createChartOptions(utpDetailValues),
        plugins: [ChartDataLabels]
    });

    // equipmentChart 생성
    equipmentChart = new Chart(document.getElementById('equipmentChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: hwDetailLabels,
            datasets: [{
                data: hwDetailValues,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Cyan color
                    'rgba(153, 102, 255, 0.2)', // Purple color
                    'rgba(255, 159, 64, 0.2)'   // Orange color
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: createChartOptions(hwDetailValues),
        plugins: [ChartDataLabels]
    });

    // softwareChart 생성
    softwareChart = new Chart(document.getElementById('softwareChart').getContext('2d'), {
        type: 'bar',
        data: {
            labels: swDetailLabels,
            datasets: [{
                data: swDetailValues,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)', // Cyan color
                    'rgba(153, 102, 255, 0.2)', // Purple color
                    'rgba(255, 159, 64, 0.2)'   // Orange color
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: createChartOptions(swDetailValues),
        plugins: [ChartDataLabels]
    });
}

$(function(){
    // 최초 차트 생성
    createCharts();

    // 창 크기 변경 시 차트 재생성
    $(window).resize(function() {
        createCharts();
    });
});