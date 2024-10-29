
document.addEventListener('DOMContentLoaded', function() {
    var ctx1 = document.getElementById('cableChart').getContext('2d');

    var cableChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['1G-흰색', '1G-파란색', '1G-노란색', '1G-주황색', '1G-갈색',
                     '10G-흰색', '10G-파란색', '10G-노란색', '10G-주황색', '10G-갈색',
                     '100G-흰색', '100G-파란색', '100G-노란색', '100G-주황색', '100G-갈색'],
            datasets: [{
                label: '케이블 수량',
                data: [15, 10, 5, 7, 8, 12, 9, 6, 11, 4, 3, 8, 5, 2, 1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
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