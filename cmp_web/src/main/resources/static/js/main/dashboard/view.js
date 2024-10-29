
document.addEventListener("DOMContentLoaded", function() {
    // Chart.js를 사용하여 장비 그룹별 개수 차트 생성
    var ctx = document.getElementById('equipmentGroupChart').getContext('2d');
    var equipmentGroupChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['서버', '네트워크', '보안', '스토리지', '백업', '기타'],
            datasets: [{
                label: '장비 개수',
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

    // FullCalendar.js를 사용하여 달력 생성
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();
});