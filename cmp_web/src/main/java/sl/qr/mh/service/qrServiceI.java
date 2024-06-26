package sl.qr.mh.service;

import java.io.IOException;
import java.util.Map;

import org.apache.poi.ss.usermodel.Workbook;

import com.google.zxing.WriterException;

public interface qrServiceI {
	
	/**
     * @brief 엑셀 다운로드
     * @details 시스템에서 요청한 QR 리스트를 엑셀로 생성
     * @param qrList QR 일련번호가 담긴 맵 객체
     * @return Workbook
     */
    public abstract Workbook QRPrint(Map<String, String> target) throws IOException;

    /**
     * @brief QR 이미지 생성
     * @details 요청받은 QR 일련번호에 대한 QR 이미지 생성
     * @param target QR 일련번호
     * @return void
     */
    public abstract void QRMake(String target) throws WriterException, IOException;

}
