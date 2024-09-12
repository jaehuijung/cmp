package sl.qr.mh.controller.cable;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sl.qr.mh.service.cable.cableManageService;
import sl.qr.mh.vo.Cable;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping(value = "/cableManage")
public class cableManageController {

    private final cableManageService cableManageService;

    public cableManageController(cableManageService cableManageService) {
        this.cableManageService = cableManageService;
    }

    /*************/
    // 새로 작성한놈들

    // 선번장관리 > 선번장목록 페이지
    @GetMapping("/view")
    public String view(HttpSession session, HttpServletRequest request) {
        return "views/cable/view";

    }

    // 선번장관리 > 선번장목록 > 리스트
    // post test 완료되면 지우기
    @GetMapping(value = "/list")
    @ResponseBody
    public List<HashMap<String, Object>> getCableListData(Cable vo) {
        List<HashMap<String, Object>> selectCableList = cableManageService.selectCableList(vo);

        return selectCableList;
    }

    // 선번장관리 > 선번장목록 > 리스트
    @PostMapping("/list")
    @ResponseBody
    public Map<String, Object> list(@RequestBody Map<String, Object> paramMap) {
        return cableManageService.getCableList(paramMap);
    }


    // 선번장관리 > 선번장추가
    @GetMapping("/register")
    public String register(HttpSession session, HttpServletRequest request) {
        return "views/cable/register";
    }

    // 선번장관리 > 선번장추가 > 저장
    @PostMapping("/insert")
    public String insert(Cable vo, HttpServletRequest request) {
        // cableservice.insertCable(vo);

        return "views/cable/view";
    }


    /************************************/
    // 아직 변경 안한놈들

    /*****************/
    // 과거 리스트... 나중에 지우기

}