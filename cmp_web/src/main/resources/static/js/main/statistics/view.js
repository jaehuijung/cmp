
document.addEventListener('DOMContentLoaded', function() {
    var cableTypeCtx = document.getElementById('cableTypeChart').getContext('2d');
    new Chart(cableTypeCtx, {
        type: 'doughnut',
        data: {
            labels: ['광', 'UTP'],
            datasets: [{
                label: '케이블 종류',
                data: [50, 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });

    var cableSpeedCtx = document.getElementById('cableSpeedChart').getContext('2d');
    new Chart(cableSpeedCtx, {
        type: 'line',
        data: {
            labels: ['100mb', '1gb', '10gb', '100gb'],
            datasets: [{
                label: '케이블 속도',
                data: [20, 40, 30, 10],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var cableColorCtx = document.getElementById('cableColorChart').getContext('2d');
    new Chart(cableColorCtx, {
        type: 'radar',
        data: {
            labels: ['흰색', '주황색', '파란색', '초록색', '갈색'],
            datasets: [{
                label: '케이블 색상',
                data: [50, 20, 30, 25, 10],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true
                }
            }
        }
    });

    var equipmentCategoryCtx = document.getElementById('equipmentCategoryChart').getContext('2d');
    new Chart(equipmentCategoryCtx, {
        type: 'pie',
        data: {
            labels: ['하드웨어', '소프트웨어'],
            datasets: [{
                label: '장비 분류',
                data: [70, 30],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });

    var equipmentAssetCtx = document.getElementById('equipmentAssetChart').getContext('2d');
    new Chart(equipmentAssetCtx, {
        type: 'bar',
        data: {
            labels: ['서버', '네트워크', '보안', '스토리지', '백업', '기타'],
            datasets: [{
                label: '장비 자산',
                data: [20, 25, 15, 10, 5, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});