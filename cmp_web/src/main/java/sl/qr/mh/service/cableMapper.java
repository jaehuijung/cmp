package sl.qr.mh.service;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import sl.qr.mh.vo.Cable;
import sl.qr.mh.vo.Equipment;
import sl.qr.mh.vo.Group;
import sl.qr.mh.vo.QR;
import sl.qr.mh.vo.Rack;

@Mapper
public interface cableMapper {
	
	//public List<HashMap<String, String>> systemUserParam(String userId);
	
	public List<Cable> selectCableList();
	public List<QR> selectQRList();
	public void updateQR(QR qr);
	public List<Equipment> selectEqpList();
	public List<Group> selectBizList();
	public List<Rack> selectRackList();
	public String checkHostname(String hostname);
}
