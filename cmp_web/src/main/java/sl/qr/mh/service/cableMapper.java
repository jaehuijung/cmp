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
	
	public List<Cable> selectCableList(Cable vo);
	public List<QR> selectQRList();
	public void updateQR(QR qr);
	public List<Equipment> selectEqpList(Equipment vo);
	public List<Equipment> selectSearchEqp(Equipment vo);
	public List<Group> selectBizList();
	public List<Rack> selectRackList();
	public String checkHostname(String hostname);
	public int selectCableListTotalCount(Cable vo);
	public int selectQRid();
	public void insertQR(QR qr);
	public void insertCable(Cable vo);
	public int selectEqpListTotalCount(Equipment vo);
	public void insertEqp(Equipment vo);
	public Equipment selectupdateEqp(Equipment vo);
	public void updateEqp(Equipment vo);
	public void deleteEqp(Equipment vo);
	//public List<Cable> ExcelEqpList
}
