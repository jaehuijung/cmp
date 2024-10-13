package sl.qr.mh.service.common;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.EnumMap;
import java.util.Map;

@Service
public class qrMakeService {

    private final String sep = File.separator;
    private final String staticPath = System.getProperty("user.dir") + sep + "src" + sep + "main" + sep + "resources" + sep + "static" + sep;

    /**
     * QR 이미지 생성
     * 요청받은 QR 일련번호에 대한 QR 이미지 생성
     *
     * @param paramMap QR 일련번호
     */
    public void QRMake(Map<String, Object> paramMap) throws Exception {
        String target = paramMap.get("encryptedTarget").toString();

        String crunchifyFileType = "jpg";
        String filePath = staticPath + "images" + sep + "qr" + sep + target + ".jpg";

        File crunchifyFile = new File(filePath);
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
    }

}
