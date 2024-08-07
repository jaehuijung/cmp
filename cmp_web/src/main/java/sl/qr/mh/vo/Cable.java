package sl.qr.mh.vo;

import lombok.Data;
import sl.qr.mh.paging.CommonForm;

@Data
public class Cable extends CommonForm{
	private int rownum;
	private int s_qr_id;
	private int e_qr_id;
	private String c_velocity;
	private String c_type;
	private String c_color;
	private String s_group_name;
	private String s_eqp_name;
	private String s_eqp_direct;
	private String s_rack_name;
	private String s_unit_position;
	private String s_hostname;
	private String s_slotnum;
	private String s_portnum;
	private String s_qr_image;
	private String s_qr_encode;
	private String e_group_name;
	private String e_eqp_name;
	private String e_rack_name;
	private String e_unit_position;
	private String e_hostname;
	private String e_slotnum;
	private String e_portnum;
	private String e_qr_image;
	private String e_qr_encode;

}
