package sl.qr.mh.service.cable;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import sl.qr.mh.paging.CommonForm;
import sl.qr.mh.paging.PagingUtil;
import sl.qr.mh.service.cableMapper;
import sl.qr.mh.vo.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import sl.qr.mh.service.cableMapper;

@Slf4j
@Service
public class cableManageService {


		private final cableMapper cableMapper;

		public cableManageService(cableMapper cableMapper) {
			this.cableMapper = cableMapper;
		}

		/*************/
		// 새로 작성

		public Map<String, Object> getCableList(Map<String, Object> paramMap){

			Map<String, Object> returnMap = new HashMap<>();

			try {

				List<Map<String, Object>> rows = cableMapper.getCableTotalList(paramMap);
				int total = cableMapper.getCableTotalListCnt(paramMap);

				returnMap.put("rows", rows);
				returnMap.put("total", total);


			} catch (Exception e) {
				log.error(e.getMessage());
			}

			return returnMap;
		}

		/************************************/

		public void insertEqp(Equipment vo) {
			cableMapper.insertEqp(vo);
		}
		
		public void updateEqp(Equipment vo) {
			cableMapper.updateEqp(vo);
		}
		
		public void deleteEqp(Equipment vo) {
			cableMapper.deleteEqp(vo);
		}
		
		public Equipment selectupdateEqp(Equipment vo) {
			return cableMapper.selectupdateEqp(vo);
		}

		public Equipment selectDetailEqp(Equipment vo) {
			return cableMapper.selectDetailEqp(vo);
		}


		/*****************/
		// 과거 리스트...
		// 지우기
		public List<HashMap<String, Object>> selectCableList(Cable vo) {

	       // vo.g
			int totalcnt = cableMapper.selectCableListTotalCount(vo);
			PagingUtil pagingutil = new PagingUtil();
			CommonForm commonForm = new CommonForm();

	        if (totalcnt != 0) {
	            commonForm.setCurrent_page_no(vo.getCurrent_page_no());
	            commonForm.setCount_per_page(10);
	            commonForm.setCount_per_list(10);
	            commonForm.setTatal_list_count(totalcnt);
	            commonForm.setFunction_name("SearchCableList");
	            commonForm = pagingutil.Paginginfo(commonForm);
	        }

	        vo.setLimit(commonForm.getLimit());
	        vo.setOffset(commonForm.getOffset());

	        List<HashMap<String, Object>> listMap = new ArrayList<HashMap<String, Object>>();

			List<Cable> list = cableMapper.selectCableList(vo);


			HashMap<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("list", list);
			resultMap.put("totalCount", totalcnt);
			resultMap.put("pagination", commonForm.getPagination());

			listMap.add(resultMap);


			return listMap;
		}
}
