package sl.qr.mh.controller.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import sl.qr.mh.service.user.userService;

import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
@RequestMapping("/settings/user")
public class userController {

    private final userService userService;

    public userController(userService userService) {
        this.userService = userService;
    }

    /**
     * 사용자관리 > 사용자목록
     *
     * @return 사용자 목록 뷰 페이지
     */
    @GetMapping("/view")
    public String getusrList() {
        return "views/user/view";
    }

    /**
     * 사용자 정보 조회
     * 시스템에 등록된 사용자 정보를 조회한다.
     *
     * @return 사용자 정보 리스트
     */
    @ResponseBody
    @PostMapping("/list")
    public Map<String, Object> list(@RequestBody Map<String, Object> paramMap) {
        return userService.getAllUserList(paramMap);
    }

    /**
     * 사용자 정보 등록
     * 시스템에 사용자 정보를 등록한다.
     *
     * @return 사용자 정보 등록 결과
     */
    @ResponseBody
    @PostMapping("/save")
    public Map<String, Object> saveUserInfo(@RequestBody Map<String, Object> paramMap) {
        return userService.saveUserInfo(paramMap);
    }

    /**
     * 선택된 사용자 정보 조회
     * 시스템에 등록된 사용자 정보를 조회한다.
     *
     * @return 사용자 정보 리스트
     */
    @ResponseBody
    @PostMapping("/selectUserInfo")
    public Map<String, Object> selectUserInfo(@RequestBody Map<String, Object> paramMap) {
        return userService.detailUserInfo(paramMap);
    }


    /**
     * 사용자 정보 수정
     * 시스템에 등록된 사용자 정보를 수정한다.
     *
     * @return 사용자 정보 수정 결과
     */
    @ResponseBody
    @PostMapping("/update")
    public Map<String, Object> updateUserInfo(@RequestBody Map<String, Object> paramMap) {
        return userService.updateUserInfo(paramMap);
    }

    /**
     * 사용자 정보 삭제
     * 시스템에 등록된 사용자 정보를 삭제한다.
     *
     * @return 사용자 정보 삭제 결과
     */
    @ResponseBody
    @PostMapping("/delete")
    public Map<String, Object> deleteUserInfo(@RequestBody List<Map<String, Object>> deleteList) {
        return userService.deleteUserInfo(deleteList);
    }

    @ResponseBody
    @PostMapping("/selectList")
    public Map<String, Object> getUserSelectList(){
        return userService.getUserSelectList();
    }

}
