package sl.qr.mh.vo;

import lombok.Data;

@Data
public class QR {
	private int qr_id;
	private String rack_name;
	private String unit_position;
	private String hostname;
	private String slotnum;
	private String portnum;
	private String qr_image;
	private String qr_encode;
}
