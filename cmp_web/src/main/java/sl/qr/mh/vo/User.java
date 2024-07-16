package sl.qr.mh.vo;

import lombok.Data;

@Data
public class User {
	int idx;
	String id;
	String password;
	String name;
	String email;
	String phone;	
}
