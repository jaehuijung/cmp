<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml"
      xmlns:th="http://www.thymeleaf.org"
      xmlns:layout="http://www.ultraq.net.nz/thymeleaf/layout"
      layout:decorate="~{layouts/layout}">

<div layout:fragment="content">

    <main id="main" class="statistics">

        <div class="contentCard">
            <h2>통계 페이지</h2>

            <!-- 케이블 정보 (테이블 및 바 차트) -->
            <div id="chartContainer1" style="height: 400px; width: 100%;">
                <h3>케이블 정보</h3>
                <canvas id="cableChart"></canvas>
            </div>

            <div id="tableContainer1">
                <table class="table">
                    <thead>
                    <tr>
                        <th>케이블 구분</th>
                        <th>색상</th>
                        <th>개수</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1G</td>
                        <td>흰색</td>
                        <td>15</td>
                    </tr>
                    <tr>
                        <td>1G</td>
                        <td>파란색</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>1G</td>
                        <td>노란색</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>1G</td>
                        <td>주황색</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1G</td>
                        <td>갈색</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>10G</td>
                        <td>흰색</td>
                        <td>12</td>
                    </tr>
                    <tr>
                        <td>10G</td>
                        <td>파란색</td>
                        <td>9</td>
                    </tr>
                    <tr>
                        <td>10G</td>
                        <td>노란색</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>10G</td>
                        <td>주황색</td>
                        <td>11</td>
                    </tr>
                    <tr>
                        <td>10G</td>
                        <td>갈색</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>100G</td>
                        <td>흰색</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>100G</td>
                        <td>파란색</td>
                        <td>8</td>
                    </tr>
                    <tr>
                        <td>100G</td>
                        <td>노란색</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>100G</td>
                        <td>주황색</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>100G</td>
                        <td>갈색</td>
                        <td>1</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- 장비 분류 그룹별 개수 (파이 차트) -->
            <div id="chartContainer4" style="height: 400px; width: 100%;">
                <h3>장비 분류 그룹별 개수</h3>
                <canvas id="equipmentCategoryChart"></canvas>
            </div>

            <div id="tableContainer4">
                <table class="table">
                    <thead>
                    <tr>
                        <th>장비 분류</th>
                        <th>개수</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>하드웨어</td>
                        <td>70</td>
                    </tr>
                    <tr>
                        <td>소프트웨어</td>
                        <td>30</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <!-- 장비 자산 그룹별 개수 (바 차트) -->
            <div id="chartContainer5" style="height: 400px; width: 100%;">
                <h3>장비 자산 그룹별 개수</h3>
                <canvas id="equipmentAssetChart"></canvas>
            </div>

            <div id="tableContainer5">
                <table class="table">
                    <thead>
                    <tr>
                        <th>장비 자산</th>
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

    </main>

    <th:block layout:fragment="script">
        <script th:src="@{/js/main/statistics/view.js}"></script>
    </th:block>
</div>

</html>