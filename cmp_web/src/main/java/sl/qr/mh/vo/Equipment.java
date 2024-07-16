package sl.qr.mh.vo;

import lombok.Data;
import sl.qr.mh.paging.CommonForm;

@Data
public class Equipment extends CommonForm{
	private int rownum;
	private int eqp_id;
	private String group_name;
	private String eqp_name;
	private String eqp_direct;
	private String rack_name;
	private String unit_position;
	private String hostname;
	private String m_company;
	private String yearofintroduct;
	private String model;
	private String search_keyword;
	private String search_value;
	
}

