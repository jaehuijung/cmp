package sl.qr.mh.controller.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sl.qr.mh.service.common.commonService;
import sl.qr.mh.service.eqp.hw.hwManageService;

import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/common")
public class commonController {

    private final hwManageService hwManageService;
    private final commonService commonService;

    public commonController(hwManageService hwManageService, commonService commonService){
        this.hwManageService = hwManageService;
        this.commonService = commonService;
    }

    /**
     * 장비분류 데이터 : 구성분류
     *
     * @return 장비분류 구성분류 리스트
     */
    @ResponseBody
    @PostMapping("/selectConfig")
    public Map<String, Object> getSelectConfigData() {
        return hwManageService.getSelectConfigData();
    }

    /**
     * 장비분류 데이터 : 자산분류
     *
     * @return 장비분류 자산분류 리스트
     */

    @ResponseBody
    @PostMapping("/selectAsset")
    public Map<String, Object> getSelectAssetData(@RequestParam Map<String, Object> paramMap) {
        return hwManageService.getSelectAssetData(paramMap);
    }

    /**
     * 장비분류 데이터 : 자산세부분류
     *
     * @return 장비분류 자산세부분류 리스트
     */
    @ResponseBody
    @PostMapping("/selectSub")
    public Map<String, Object> getSelectSubData(@RequestParam Map<String, Object> paramMap) {
        return hwManageService.getSelectSubData(paramMap);
    }

    /**
     * 장비분류 데이터 : 자산상세분류
     *
     * @return 장비분류 자산상세분류 리스트
     */
    @ResponseBody
    @PostMapping("/selectDetail")
    public Map<String, Object> getSelectDetailData(@RequestParam Map<String, Object> paramMap) {
        return hwManageService.getSelectDetailData(paramMap);
    }


    /**
     * 회선정보 데이터 : 회선분류, 회선속도, 회선색상 리스트
     *
     * @return 회선정보
     */
    @ResponseBody
    @PostMapping("/selectLineLinkCategory")
    public Map<String, Object> getLineLinkCategory(@RequestParam Map<String, Object> paramMap) {
        return commonService.getLineLinkList();
    }

}
