package sl.qr.mh.service.eqp.sw;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sl.qr.mh.service.eqp.hw.hwMapper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * S/W관리 > S/W목록
 */
@Slf4j
@Service
public class swManageService {

    private final hwMapper hwMapper;
    private final swMapper swMapper;

    public swManageService(hwMapper hwMapper, swMapper swMapper) {
        this.hwMapper = hwMapper;
        this.swMapper = swMapper;
    }

    /**
     * S/W관리 > 장비목록 > 장비 목록 데이터
     *
     * @param paramMap 요청 파라미터 맵
     * @return 장비 목록 데이터
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getEquipmentTotalList(Map<String, Object> paramMap) {

        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {

            if (paramMap.containsKey("searchData")) {
                paramMap.putAll((Map<String, Object>) paramMap.get("searchData"));
            }

            List<Map<String, Object>> rows = swMapper.getEquipmentTotalList(paramMap);
            int total = swMapper.getEquipmentTotalListCnt(paramMap);

            returnMap.put("rows", rows);
            returnMap.put("total", total);
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * S/W관리 > 장비목록 > 추가 > 장비 저장 : 기본정보, 세부정보
     *
     * @param paramMap 저장할 장비 데이터
     * @return 저장 결과
     */
    @SuppressWarnings("unchecked")
    @Transactional
    public Map<String, Object> insertEqpList(Map<String, Object> paramMap) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            String eqp_manage_id = swMapper.generateEquipmentManageId(paramMap);
            paramMap.put("eqp_manage_id", eqp_manage_id); // 장비 관리번호 생성

            swMapper.insertEquipmentBasic(paramMap);  // 장비 기본정보 저장
            swMapper.insertEquipmentDetail(paramMap); // 장비 세부정보 저장
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
            throw e;
        }

        return returnMap;
    }



    /**
     * S/W관리 > 장비목록 > 상세 > 선택한 장비 정보 : 기본정보, 세부정보
     *
     * @param eqp_manage_id 장비 관리번호
     * @return 장비 정보 리스트
     */
    public Map<String, Object> getEquipmentDetailTotalList(String eqp_manage_id){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            Map<String, Object> selectData = swMapper.getEquipmentDetailTotalList(eqp_manage_id); // 장비 정보
            selectData.putAll(swMapper.getEquipmentDetailAssetList(selectData)); // 선택한 장비 분류 카테고리(구성분류, 자산분류, 자산세부분류, 자산상세분류)

            returnMap.put("selectData", selectData);
            returnMap.put("errorCode",true);
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }

    /**
     * S/W관리 > 장비목록 > 수정 > 선택한 장비 정보 : 기본정보, 세부정보
     *
     * @param eqp_manage_id 장비 관리번호
     * @return 장비 정보 리스트
     */
    public Map<String, Object> getEquipmentUpdateTotalList(String eqp_manage_id){
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try{
            Map<String, Object> selectData = swMapper.getEquipmentDetailTotalList(eqp_manage_id); // 장비 정보
            List<Map<String, Object>> config_category = hwMapper.getSelectConfigData();           // 장비분류 : 구성분류
            List<Map<String, Object>> asset_category  = hwMapper.getSelectAssetData(selectData);  // 장비분류 : 자산분류
            List<Map<String, Object>> sub_category    = hwMapper.getSelectSubData(selectData);    // 장비분류 : 자산세부분류
            List<Map<String, Object>> detail_category = hwMapper.getSelectDetailData(selectData); // 장비분류 : 자산상세분류

            returnMap.put("selectData", selectData);
            returnMap.put("config_category", config_category);
            returnMap.put("asset_category",  asset_category);
            returnMap.put("sub_category",    sub_category);
            returnMap.put("detail_category", detail_category);

            returnMap.put("errorCode",true);
        }
        catch (Exception e){
            log.error(e.getMessage());
        }

        return returnMap;
    }


    /**
     * S/W관리 > 장비목록 > 수정 > 선택한 장비 정보 수정 : 기본정보, 세부정보
     *
     * @param paramMap 수정할 장비 데이터
     * @return 수정 결과
     */
    @SuppressWarnings("unchecked")
    @Transactional
    public Map<String, Object> updateEqpList(Map<String, Object> paramMap) {
        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            swMapper.updateBasicEqpList(paramMap);
            swMapper.updateDetailEqpList(paramMap);

            returnMap.put("errorCode",true);
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }


    /**
     * S/W관리 > 장비목록 > 삭제 > 선택한 장비 정보 삭제 : 기본정보, 세부정보
     *
     * @param deleteList 삭제할 장비 데이터
     * @return 삭제 결과
     */
    @Transactional
    public Map<String, Object> deleteEqpList(List<Map<String, Object>> deleteList) {

        Map<String, Object> returnMap = new HashMap<>();
        returnMap.put("errorCode",false);

        try {
            List<String> errorTarget = new ArrayList<>();
            for(Map<String, Object> ele : deleteList){
                String deleteEqpTarget = ele.get("eqp_manage_id").toString();
                swMapper.deleteEqpList(deleteEqpTarget);

                //int isContain = swMapper.checkLineIsContainEqpList(deleteEqpTarget);
                //if(isContain == 0){
                //    swMapper.deleteEqpList(deleteEqpTarget);
                //}
                //else{
                //    errorTarget.add(deleteEqpTarget);
                //}
            }

            returnMap.put("errorTarget", errorTarget);
            returnMap.put("errorCode",true);

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        return returnMap;
    }
}
