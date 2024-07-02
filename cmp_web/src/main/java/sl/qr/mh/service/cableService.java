package sl.qr.mh.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import sl.qr.mh.paging.CommonForm;
import sl.qr.mh.paging.PagingUtil;
import sl.qr.mh.vo.Cable;
import sl.qr.mh.vo.Equipment;
import sl.qr.mh.vo.Group;
import sl.qr.mh.vo.QR;
import sl.qr.mh.vo.Rack;

@Slf4j
@Service
public class cableService {

	 
		private final cableMapper cableMapper;

		public cableService(cableMapper cableMapper) {
			this.cableMapper = cableMapper;
		}
		
		public List<HashMap<String, Object>> selectCableList(Cable vo) {
			
	
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
		
		public int selectCableListTotalCount(Cable vo) {
			int totalcnt = cableMapper.selectCableListTotalCount(vo);
			return totalcnt;
		}
		
		public List<QR> selectQRList() {
			List<QR> list = cableMapper.selectQRList();
		return list;
		}
		
		
		public void updateQR(QR qr) {
			cableMapper.updateQR(qr);
		}
		
		
		public List<Equipment> selectEqpList() {
			List<Equipment> list = cableMapper.selectEqpList();
			return list;	
		}
		
		public List<Group> selectBizList() {
			List<Group> list = cableMapper.selectBizList();
			return list;	
		}
		
		public List<Rack> selectRackList() {
			List<Rack> list = cableMapper.selectRackList();
			return list;	
			
		}
		
		public boolean checkHostname(String hostname) {
			log.info("ddddddddddddddddddddddddd "+hostname);
			String hm = cableMapper.checkHostname(hostname);
			log.info("kkkkkkkkkkkkkkkkkkkkkk "+hm);
			if(hm == null) {
				return true;
			}else {
				return false;
			}
		}
}
