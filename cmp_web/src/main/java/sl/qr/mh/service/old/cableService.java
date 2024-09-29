package sl.qr.mh.service.old;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
		
		public void insertEqp(Equipment vo) {
			cableMapper.insertEqp(vo);
		}
		
		public void updateEqp(Equipment vo) {
			cableMapper.updateEqp(vo);
		}
		
		public void deleteEqp(Equipment vo) {
			cableMapper.deleteEqp(vo);
		}

		// 장비관리 > 장비목록 > 수정 리스트
		public Equipment selectupdateEqp(Equipment vo) {
			return cableMapper.selectupdateEqp(vo);
		}

		public Equipment selectDetailEqp(Equipment vo) {
			return cableMapper.selectDetailEqp(vo);
		}


		// 장비관리 > 장비목록 > 리스트
	public List<HashMap<String, Object>> selectEqpList(Equipment vo) {

		int totalcnt = cableMapper.selectEqpListTotalCount(vo);
		PagingUtil pagingutil = new PagingUtil();
		CommonForm commonForm = new CommonForm();

		if (totalcnt != 0) {
			commonForm.setCurrent_page_no(vo.getCurrent_page_no());
			commonForm.setCount_per_page(10);
			commonForm.setCount_per_list(10);
			commonForm.setTatal_list_count(totalcnt);
			commonForm.setFunction_name("EqpListTable");
			commonForm = pagingutil.Paginginfo(commonForm);
		}

		vo.setLimit(commonForm.getLimit());
		vo.setOffset(commonForm.getOffset());

		List<HashMap<String, Object>> listMap = new ArrayList<HashMap<String, Object>>();

		List<Equipment> list = cableMapper.selectEqpList(vo);

		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("list", list);
		resultMap.put("totalCount", totalcnt);
		resultMap.put("pagination", commonForm.getPagination());

		listMap.add(resultMap);

		return listMap;
	}
		
		public List<Equipment> selectSearchEqp(Equipment vo) {
			List<Equipment> list = cableMapper.selectSearchEqp(vo);
		return list;
		}
		
		
		public int selectCableListTotalCount(Cable vo) {
			int totalcnt = cableMapper.selectCableListTotalCount(vo);
			return totalcnt;
		}
		
		public int selectEqpListTotalCount(Equipment vo) {
			int totalcnt = cableMapper.selectEqpListTotalCount(vo);
			return totalcnt;
			
		}
		
		
		public List<QR> selectQRList() {
			List<QR> list = cableMapper.selectQRList();
		return list;
		}
		
		
		public void updateQR(QR qr) {
			cableMapper.updateQR(qr);
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
			String hm = cableMapper.checkHostname(hostname);
			if(hm == null) {
				return true;
			}else {
				return false;
			}
		}
		
		
		public void insertCable(Cable vo) {
			//cableMapper.insertEqp(vo);
			
			//int qrid;
			String targetSep = "$";
			String QR_img_path = "/qrImg/";
			String startTarget = vo.getS_rack_name() + targetSep + vo.getS_unit_position()
			+ targetSep + vo.getS_hostname() + targetSep + vo.getS_portnum();
			String endTarget = vo.getE_rack_name() + targetSep + vo.getE_unit_position()
			+ targetSep + vo.getE_hostname() + targetSep + vo.getE_portnum();
	        
			QR s_qr = new QR();
			QR e_qr = new QR();
			
			s_qr.setQr_id(cableMapper.selectQRid());
			s_qr.setHostname(vo.getS_hostname());
			s_qr.setPortnum(vo.getS_portnum());
			s_qr.setSlotnum(vo.getS_slotnum());
			s_qr.setQr_encode(startTarget);
			s_qr.setQr_image(QR_img_path+startTarget+".jpg");
			
			e_qr.setHostname(vo.getE_hostname());
			e_qr.setPortnum(vo.getE_portnum());
			e_qr.setSlotnum(vo.getE_slotnum());
			e_qr.setQr_encode(endTarget);
			e_qr.setQr_image(QR_img_path+endTarget+".jpg");
			
			//log.info("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk insert kkkkkkkkkkkkkkkkkkkkkkkkkkkkk  "+s_qr);
			cableMapper.insertQR(s_qr);
			e_qr.setQr_id(cableMapper.selectQRid());
			cableMapper.insertQR(e_qr);
			
			vo.setS_qr_id(s_qr.getQr_id());
			vo.setE_qr_id(e_qr.getQr_id());
			
			cableMapper.insertCable(vo);
			
			
		}
}
