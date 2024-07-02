package sl.qr.mh.controller;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.zxing.WriterException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import sl.qr.mh.service.databaseService;
import sl.qr.mh.service.qrService;



@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@RestController
public class QRApiController {
	
	private final qrService qrService;
    // DB service
    private final databaseService databaseService;

    public QRApiController(
            qrService qrService,
            databaseService databaseService) {
        this.qrService = qrService;
        this.databaseService = databaseService;
        
      
    }
    
    //private final String sep = File.separator;
    private final String sep = "/";
    @GetMapping(value = "/api/qr/printqr")
    public void printQRData(
            HttpSession session,
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestParam Map<String, String> qrList) throws NumberFormatException, IOException {
        //log.info("qr print!");
    	
        Workbook wb = qrService.QRPrint(qrList);
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=test.xlsx");

        wb.write(response.getOutputStream());
        wb.close();
    }
    
    /**
     * @brief QR 정보 검색
     * @details 검색조건을 통해 데이터베이스에 등록되어 있는 QR 정보 조회
     * @param searchInfo sRackNumber, sRackLocation, sServerName,
     *                   sPortNumber, eRackNumber, eRackLocation,
     *                   eServerName, ePortNumber, auth를 가짐
     * @param session    사용자 정보를 담은 세션 객체
     * @param request    SERVLET REQUEST
     * @return List >
     *         idx, sRackNumber, sRackLocation, sServerName, sPortNumber,
     *         eRackNumber, eRackLocation, eServerName, ePortNumber,
     *         qrStart, qrEnd, qrStartImage, qrEndImage,
     *         auth, request
     */
    @GetMapping(value = "/api/qr/searchqrdetail")
    public List<HashMap<String, Object>> searchQRDetailData(
            @RequestParam Map<String, String> searchInfo,
            HttpSession session,
            HttpServletRequest request) {
        //log.info("qr detail search!");

        searchInfo.put("auth", (String) session.getAttribute("auth"));
        List<HashMap<String, Object>> searchQRAllParam = databaseService.searchQR2(searchInfo);

        return searchQRAllParam;
    }

    /**
     * @brief QR 정보 조회
     * @details 데이터베이스에 등록되어 있는 QR 정보 조회
     * @param session 사용자 정보를 담은 세션 객체
     * @param request SERVLET REQUEST
     * @return List >
     *         idx, sRackNumber, sRackLocation, sServerName, sPortNumber,
     *         eRackNumber, eRackLocation, eServerName, ePortNumber,
     *         qrStart, qrEnd, qrStartImage, qrEndImage,
     *         auth, request
     */
    @GetMapping(value = "/api/qr/searchqr")
    public List<HashMap<String, Object>> searchQRData(
            HttpSession session,
            HttpServletRequest request) {
        //log.info("qr search!");

        String auth = (String) session.getAttribute("auth");
        List<HashMap<String, Object>> searchQRAllParam = databaseService.searchQR(auth);

        return searchQRAllParam;
    }
    
    
    @GetMapping(value = "/api/qr/insertqr")
    public void insertQRData(
            HttpSession session,
            HttpServletResponse response,
            @RequestParam Map<String, String> qrMap) throws WriterException, IOException {
        //log.info("qr insert!");


        String targetSep = "$";
        String startTarget = qrMap.get("sRackNumber") + targetSep
                + qrMap.get("sRackLocation") + targetSep
                + qrMap.get("sServerName") + targetSep
                + qrMap.get("sPortNumber");
        String endTarget = qrMap.get("eRackNumber") + targetSep
                + qrMap.get("eRackLocation") + targetSep
                + qrMap.get("eServerName") + targetSep
                + qrMap.get("ePortNumber");

        qrMap.put("auth", (String) session.getAttribute("auth"));
        qrMap.put("qrStart", startTarget);
        qrMap.put("qrEnd", endTarget);
        qrMap.put("qrStartImage", sep + "qrImg" + sep + startTarget + ".jpg");
        qrMap.put("qrEndImage", sep + "qrImg" + sep + endTarget + ".jpg");

        // qr image 생성 > start와 end 1쌍 생성
        qrService.QRMake(startTarget);
        qrService.QRMake(endTarget);
    
        databaseService.insertQR(qrMap);
       
    }

    /**
     * @brief QR 삭제
     * @details 사용자가 제거 요청한 QR 데이터를 삭제
     * @param session 사용자 정보를 담은 세션 객체
     * @param request SERVLET REQUEST
     * @param idx     데이터베이스에 등록된 QR의 idx
     * @return void
     */
    @GetMapping(value = "/api/qr/qrdelete")
    public void deleteQR(
            HttpSession session,
            HttpServletRequest request,
            @RequestParam(value = "idx", required = false) String idx) {
        //log.info("qr delete!");
        databaseService.deleteQR(idx);
    }

    /**
     * @brief QR 변경
     * @details 사용자가 변경 요청한 QR 데이터를 변경
     * @param session 사용자 정보를 담은 세션 객체
     * @param request SERVLET REQUEST
     * @param qrMap   변경 요청한 QR정보
     * @return void
     */
    @GetMapping(value = "/api/qr/qrupdate")
    public void updateQR(
            HttpSession session,
            HttpServletRequest request,
            @RequestParam Map<String, String> qrMap) {
        //log.info("qr update!");
        databaseService.updateQR(qrMap);
    }

}
