package sl.qr.mh;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.EnumMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import lombok.extern.slf4j.Slf4j;
import sl.qr.mh.service.old.cableService;
import sl.qr.mh.vo.QR;

@Slf4j
@SpringBootTest
class CmpWebApplicationTests {
	
	@Autowired
	private cableService cableservice;
	private final String sep = "/";
	
	@Test
	void contextLoads() {
		
		 List<QR> list = cableservice.selectQRList();
		 Iterator<QR> it = list.iterator();
		 while(it.hasNext()) {
			 
			 
			 QR qr = it.next();
			 //String id = Integer.toString(qr.getQr_id());
			 String targetSep = "$";
		     String startTarget = qr.getRack_name() + targetSep
		                + qr.getUnit_position() + targetSep
		                + qr.getHostname() + targetSep
		                + qr.getPortnum();
		  
		     //qr.setQr_encode(startTarget);
		     qr.setQr_image("/qrImg/"+startTarget+".jpg");
		     cableservice.updateQR(qr);     
		     
		    // log.info(startTarget);
		     
			/*
			 * try { QRMake(startTarget); } catch(Exception e) { e.printStackTrace(); }
			 */
		     
		
		 }
	}
	
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
