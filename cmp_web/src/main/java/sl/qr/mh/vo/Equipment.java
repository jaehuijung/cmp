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




	private String config_category;
	private String asset_category;
	private String asset_id;
	private String config_id;
	private String resource_name;
	private String ip_address;
	private String os_version;
	private String operating_department;
	private String primary_operator;
	private String secondary_operator;
	private String primary_outsourced_operator;
	private String secondary_outsourced_operator;
	private String operating_status;
	private String eol_status;
	private String eos_status;
	private String redundancy_config;
	private String network_operation_type;
	private String maintenance_contract_target;
	private String asset_acquisition_date;
	private String asset_disposal_date;
	private Long acquisition_cost;
	private String dbrain_number;
	private String domestic;
	private String installation_coordinates;
	private int installation_units;
	private int equipment_size_units;
	private String remarks;

}

