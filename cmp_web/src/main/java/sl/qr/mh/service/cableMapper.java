package sl.qr.mh.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import sl.qr.mh.vo.Cable;
import sl.qr.mh.vo.Equipment;
import sl.qr.mh.vo.Group;
import sl.qr.mh.vo.QR;
import sl.qr.mh.vo.Rack;

@Mapper
public interface cableMapper {

	/*************/
	// 새로 작성한놈들
	// 추가로... 다 되면 매퍼 메뉴별로 이동시키기!

	public List<Map<String, Object>> getCableTotalList(Map<String, Object> paramMap);  // 선번장관리 > 선번장목록 > 리스트 목록
	public int getCableTotalListCnt(Map<String, Object> paramMap); // 선번장관리 > 선번장목록 > 리스트 개수


	public List<Map<String, Object>> getEqpTotalList(Map<String, Object> paramMap); // 장비관리 > 장비목록 > 리스트 목록
	public int getEqpTotalListCnt(Map<String, Object> paramMap); // 장비관리 > 장비목록 > 리스트 개수

	public Map<String, Object> getEqpDetailList(String param); // 장비관리 > 장비목록 > 장비 상세 리스트

	// public Map<String, Object> getEqpUpdateList(String param); // 장비관리 > 장비목록 > 장비수정 리스트

	public void insertEqpList(Map<String, Object> paramMap); // 장비관리 > 장비목록 > 추가
	public void updateEqpList(Map<String, Object> paramMap); // 장비관리 > 장비목록 > 수정
	public void deleteEqpList(String deleteEqpTarget); // 장비관리 > 장비목록 > 삭제

	/************************************/
	// 아직 변경 안한놈들

	//public List<HashMap<String, String>> systemUserParam(String userId);

	public List<QR> selectQRList();
	public void updateQR(QR qr);

	public List<Equipment> selectSearchEqp(Equipment vo);
	public List<Group> selectBizList();
	public List<Rack> selectRackList();
	public String checkHostname(String hostname);
	public int selectQRid();
	public void insertQR(QR qr);
	public void insertCable(Cable vo);

	//public List<Cable> ExcelEqpList




	/*****************/
	// 과거 리스트... 나중에 지우기
	public List<Cable> selectCableList(Cable vo); // 선번장관리 > 선번장목록 > 리스트 목록
	public int selectCableListTotalCount(Cable vo); // 선번장관리 > 선번장목록 > 리스트 개수


	public List<Equipment> selectEqpList(Equipment vo); // 장비관리 > 장비목록 > 리스트 목록
	public int selectEqpListTotalCount(Equipment vo); // 장비관리 > 장비목록 > 리스트 개수

	public Equipment selectDetailEqp(Equipment vo); // 장비관리 > 장비목록 > 장비상세 리스트
	public Equipment selectupdateEqp(Equipment vo); // 장비관리 > 장비목록 > 장비수정 리스트

	public void insertEqp(Equipment vo); // 장비관리 > 장비추가 > 추가
	public void updateEqp(Equipment vo); // 장비관리 > 장비추가 > 수정
	public void deleteEqp(Equipment vo); // 장비관리 > 장비목록 > 삭제
}
