package sl.qr.mh.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class cableController {
	
	@GetMapping("/test")
	public String test(HttpSession session,
			HttpServletRequest request) {
		return "new/table";
		        
	}
	
	@GetMapping("/cablelist")
	public String getcableList(HttpSession session,
			HttpServletRequest request) {
		return "/cablelist";
		        
	}
	
	@GetMapping("/eqplist")
	public String geteqpList(HttpSession session,
			HttpServletRequest request) {
		return "new/eqplist";
		        
	}
	
	@GetMapping("/eqpinsert")
	public String geteqpInsert(HttpSession session,
			HttpServletRequest request) {
		return "/eqpinsert";
		        
	}

}
