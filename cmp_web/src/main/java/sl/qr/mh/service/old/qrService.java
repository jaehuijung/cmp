package sl.qr.mh.service.old;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import sl.qr.mh.vo.Equipment;

@Service
public class qrService implements qrServiceI {
	// Linux & windows 경로 설정
    //private final String sep = File.separator;
	 private final String sep = "/";
    private final String staticPath = System.getProperty("user.dir") + sep + "src" + sep + "main" + sep + "resources"
            + sep + "static" + sep;

    /**
     * @brief 엑셀 다운로드
     * @details 시스템에서 요청한 QR 리스트를 엑셀로 생성
     * @param qrList QR 일련번호가 담긴 맵 객체
     * @return Workbook
     */
   public Workbook EqpExcel(List<Equipment> list) throws IOException {
	   String templatesPath = staticPath + "excelTemplate" + sep + "Eqplistemplate.xlsx";
       FileInputStream file = new FileInputStream(templatesPath);
       Workbook wb = new XSSFWorkbook(file);
		
		  Sheet sheet = wb.getSheetAt(0); Row row; 
		  int cnt =1; 
		  for (Equipment vo : list) { 
			  row = sheet.createRow(cnt);
			  row.createCell(0).setCellValue(vo.getGroup_name());
		  row.createCell(1).setCellValue(vo.getEqp_name());
		  row.createCell(2).setCellValue(vo.getEqp_direct());
		  row.createCell(3).setCellValue(vo.getRack_name());
		  row.createCell(4).setCellValue(vo.getUnit_position());
		  row.createCell(5).setCellValue(vo.getHostname());
		  row.createCell(6).setCellValue(vo.getM_company());
		  row.createCell(7).setCellValue(vo.getModel());
		  row.createCell(8).setCellValue(vo.getYearofintroduct());
		  cnt++;
		  
		  }
		 
       
       return wb;
       
       
       /*
		 * 
		 * 
		 * UserVO newTechAdmin = new UserVO();
			newTechAdmin.setSearchCode(Constant.NEW_TECH_ADMIN_CODE);
			List<UserVO> newTechAdminList = userService.getList(newTechAdmin);
		 * 
		 * for (UserVO userVO : newTechAdminList) { AnnounceVO announceVO = new
		 * AnnounceVO(); announceVO.setSenderId(userId);
		 * announceVO.setSenderName(userNm); announceVO.setTargetId(userVO.getUserId());
		 * announceVO.setTargetName(userVO.getUserNm());
		 * announceVO.setSubject(Constant.NEW_TECH_SUBJECT);
		 * announceVO.setContent(userNm+"님이 [" + resultVO.getMainCateNm() + "] [" +
		 * resultVO.getTechNo() + "] [" + resultVO.getArea() + "] 설계(변경) 반영을 제출하였습니다.");
		 * announceService.announceInsert(announceVO); }
		 */
    	
   }
    public Workbook QRPrint(Map<String, String> qrList) throws IOException {
        //log.info("qr print ...");

        String templatesPath = staticPath + "excelTemplate" + sep + "autoCarTemplate.xlsx";
        FileInputStream file = new FileInputStream(templatesPath);
        Workbook wb = new XSSFWorkbook(file);
        Sheet sheet = wb.getSheetAt(1);

        if (!qrList.get("qrChk").equals("0")) {
            Row row;
            int qrRow = 1;
            int qrLength = Integer.valueOf(qrList.get("qrChk"));

            String[] qrStart = ((String) qrList.get("qrStart")).split(",");
            String[] qrEnd = ((String) qrList.get("qrEnd")).split(",");
            String[] qrStartImage = ((String) qrList.get("qrStartImage")).split(",");
            String[] qrEndImage = ((String) qrList.get("qrEndImage")).split(",");

            for (int cnt = 0; cnt < qrLength; cnt++) {
                row = sheet.createRow(qrRow);
                row.createCell(0).setCellValue(qrRow); // 번호
                row.createCell(1).setCellValue(qrStart[cnt]); // [시작 QR]
                row.createCell(2).setCellValue(staticPath + qrStartImage[cnt]); // [시작 이미지]
                row.createCell(3).setCellValue(qrEnd[cnt]); // [끝 QR]
                row.createCell(4).setCellValue(staticPath + qrEndImage[cnt]); // [끝 이미지]
                row.createCell(5).setCellValue("S"); // 시작 S
                row.createCell(6).setCellValue("E"); // 끝 E
                row.createCell(7).setCellValue("<->"); // <->

                qrRow++;
            }
        }

        //log.info("print fin!");
        return wb;
    }

    /**
     * @brief QR 이미지 생성
     * @details 요청받은 QR 일련번호에 대한 QR 이미지 생성
     * @param target QR 일련번호
     * @return void
     */
    public void QRMake(String target) throws WriterException, IOException {
        // https://stackoverflow.com/questions/10142748/reduce-border-width-on-qr-codes-generated-by-zxing
        //log.info("connect qr make!");

        String crunchifyFileType = "jpg";
        String filePath = System.getProperty("user.dir") + sep + "src"
                + sep + "main" + sep + "resources" + sep + "static" + sep + "qrImg" + sep + target + ".jpg";

        File crunchifyFile = new File(filePath); // qr 저장 경로... 안씀
        Map<EncodeHintType, Object> crunchifyHintType = new EnumMap<>(EncodeHintType.class);
        crunchifyHintType.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        crunchifyHintType.put(EncodeHintType.MARGIN, 1); /* default = 4 */

        int size = 256;
        QRCodeWriter mYQRCodeWriter = new QRCodeWriter(); // throws com.google.zxing.WriterException
        BitMatrix crunchifyBitMatrix = mYQRCodeWriter.encode(target, BarcodeFormat.QR_CODE, size, size,
                crunchifyHintType);
        int CrunchifyWidth = crunchifyBitMatrix.getWidth();
        int CrunchifyHeight = crunchifyBitMatrix.getWidth();

        BufferedImage crunchifyImage = new BufferedImage(CrunchifyWidth, CrunchifyHeight, BufferedImage.TYPE_INT_RGB);
        crunchifyImage.createGraphics();
        Graphics2D crunchifyGraphics = (Graphics2D) crunchifyImage.getGraphics();

        // 흰 배경 + 검은 코드
        crunchifyGraphics.setColor(Color.white);
        crunchifyGraphics.fillRect(0, 0, CrunchifyWidth, CrunchifyHeight);
        crunchifyGraphics.setColor(Color.BLACK);

        for (int i = 0; i < CrunchifyWidth; i++) {
            for (int j = 0; j < CrunchifyWidth; j++) {
                if (crunchifyBitMatrix.get(i, j)) {
                    crunchifyGraphics.fillRect(i, j, 1, 1);
                }
            }
        }

        ImageIO.write(crunchifyImage, crunchifyFileType, crunchifyFile);
        //log.info("\nCongratulation.. You have successfully created QR Code.. \n" + "Check your code here: " + filePath);
    }

}
