package sl.qr.mh.paging;

import lombok.extern.slf4j.Slf4j;
import sl.qr.mh.controller.cableManageController;

@Slf4j
public class PagingUtil {
	
	public CommonForm Paginginfo(CommonForm commonForm) {


		String pagination = ""; // 페이징 결과 값
		String functionName = commonForm.getFunction_name(); // 페이징 목록을 요청하는 자바스크립트 함수명
		int currentPage = commonForm.getCurrent_page_no(); // 현재 페이지 번호
		int countPerList = commonForm.getCount_per_list(); // 한 화면에 출력될 게시물 수
		int countPerPage = commonForm.getCount_per_page(); // 한 화면에 출력될 페이지 수
		
		
		int totalListCount = commonForm.getTatal_list_count(); // 총 게시물 수
		int totalPageCount = totalListCount / countPerList; // 총 페이지 수
		if (totalListCount % countPerList > 0) { // 총 페이수를 구할 때 int형으로 계산하면 나머지가 있는 경우 게시물이 존재하기 때문에 총 페이지의 수를 수정
			totalPageCount = totalPageCount + 1;
		}

		
		
		int viewFirstPage = (((currentPage - 1) / countPerPage) * countPerPage) + 1; // 한 화면에 첫 페이지 번호
		int ViewLastPage = viewFirstPage + countPerPage - 1; // 한 화면에 마지막 페이지 번호
		if (ViewLastPage > totalPageCount) { // 마지막 페이지의 수가 총 페이지의 수보다 큰 경우는 게시물이 존재하지 않기 때문에 마지막 페이지의 수를 수정
			ViewLastPage = totalPageCount;
		}
	
		int totalFirstPage = 1; // 전체 페이지 중에 처음 페이지
		int totalLastPage = totalPageCount; // 전체 페이지 중에 마지막 페이지
		int prePerPage = 0; // 이전 화면에 첫번째 번호
		if (viewFirstPage - countPerPage > 0) {
			prePerPage = viewFirstPage - countPerPage;
		} else {
			prePerPage = totalFirstPage;
		}
		int nextPerPage = 0; // 이후 화면에 첫번째 번호
		if (viewFirstPage + countPerPage < totalPageCount) {
			nextPerPage = viewFirstPage + countPerPage;
		} else {
			nextPerPage = totalPageCount;
		}
		
		

		

	  
		pagination += "<div style='width:30px;height:30px;text-align:center;padding-top:3px;'>";
		pagination += "<a href='javascript:" + functionName + "(\"" + totalFirstPage + "\");'><p style='color:black;'><<</p></a></div>";
		pagination += "<div class='page-item'  style='width:30px;height:30px;text-align:center;padding-top:3px;'>";
		pagination += "<a href='javascript:" + functionName + "(" + prePerPage + ");'><p style='color:black;'><</p></a></div>";
		for (int a = viewFirstPage; a <= ViewLastPage; a++) {
			if (a == currentPage) {
				pagination += "<div style='width:30px;height:30px;text-align:center;background-color: #D9D9D9;padding-top:3px;'>";
				pagination += "<a href='javascript:" + functionName + "(\"" + a + "\");' style='color:white;'>" + a + "</a></div>";
			} else {
				pagination += "<div style='width:30px;height:30px;text-align:center;padding-top:3px;'>";
				pagination += "<a href='javascript:" + functionName + "(\"" + a + "\");'><p style='color:black;'>" + a + "</p></a></div>";
			}
		}
		pagination += "<div class='page-item' style='width:30px;height:30px;text-align:center;padding-top:3px;'>";
		pagination += "<a href='javascript:" + functionName + "(" + nextPerPage + ");'><p style='color:black;'>></p></a></div>";
		pagination += "<div class='page-item'  style='width:30px;height:30px;text-align:center;padding-top:3px;'>";
		pagination += "<a href='javascript:" + functionName + "(" + totalLastPage + ");'><p style='color:black;'>>></p></a></div>";
		

		int offset = ((currentPage - 1) * countPerList); // 한 화면의 표출되는 게시물의 시작 번호 (쿼리 조건절)
		
		// LIMIT는 가져올 row의 수, OFFSET은 몇 번째 row부터 가져올지를 결정
		commonForm.setLimit(countPerList);
		commonForm.setOffset(offset);
		commonForm.setPagination(pagination);

		return commonForm;
	}

}
