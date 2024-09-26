package sl.qr.mh.service.eqp;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface eqpMapper {

	public List<Map<String, Object>> getEqpTotalList(Map<String, Object> paramMap); // 장비관리 > 장비목록 > 리스트 목록
	public int getEqpTotalListCnt(Map<String, Object> paramMap); // 장비관리 > 장비목록 > 리스트 개수

	public Map<String, Object> getEqpDetailList(String param); // 장비관리 > 장비목록 > 장비 상세 리스트

	public void insertEqpList(Map<String, Object> paramMap); // 장비관리 > 장비목록 > 추가
	public void updateEqpList(Map<String, Object> paramMap); // 장비관리 > 장비목록 > 수정
	public void deleteEqpList(String deleteEqpTarget); // 장비관리 > 장비목록 > 삭제


	public List<Map<String, Object>> getSelectConfigData();
	public List<Map<String, Object>> getSelectAssetData(Map<String, Object> paramMap);
	public List<Map<String, Object>> getSelectSubData(Map<String, Object> paramMap);
	public List<Map<String, Object>> getSelectDetailData(Map<String, Object> paramMap);



}
