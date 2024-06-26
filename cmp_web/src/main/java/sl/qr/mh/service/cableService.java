package sl.qr.mh.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import sl.qr.mh.controller.cableManageController;
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
		
		public List<Cable> selectCableList() {
			List<Cable> list = cableMapper.selectCableList();
		return list;
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
