package sl.qr.mh.controller.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import sl.qr.mh.service.databaseService;
import sl.qr.mh.vo.User;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
public class userController {
	
	 private final databaseService databaseService;
	 private BCryptPasswordEncoder bcrypt;

	 
	 public userController(databaseService databaseService,BCryptPasswordEncoder bcrypt) {
				this.databaseService = databaseService;
				this.bcrypt = bcrypt;
	    }
	
	@GetMapping("/usr/list")
	public String getusrList(HttpSession session,
			HttpServletRequest request) {
		return "views/user/view";
		        
	}
	
	@GetMapping("/usr/regster")
	public String getusrregster(HttpSession session,
			HttpServletRequest request) {
		// return "new/userregster";
		return "views/old/userregster";
		        
	}
	
	@PostMapping("/usr/updateform")
	public String userupdateForm(User vo,HttpSession session,
			HttpServletRequest request,Model model) {
		User usr = new User();
		usr = databaseService.selectUser(vo);
		log.info("kkkkkkddddkkkkkkkkkkkkkkkkkk"+usr.getPassword());
		model.addAttribute("User",usr);
		return "views/old/usrupdate";
		        
	}
	
	@PostMapping("/usr/update")
	public String userupdate(User vo,HttpSession session,
			HttpServletRequest request) {
		String pass = vo.getPassword();
		if(pass != null || !pass.isEmpty()) {
			vo.setPassword(bcrypt.encode(pass));
		}
		databaseService.updateUser(vo);
	return "views/old/usrlist";
		        
	}
	
	
	@PostMapping("/usr/delete")
	public String userdelete(User vo,HttpSession session,
			HttpServletRequest request) {
		
		databaseService.deleteUser(vo);
		return "views/old/usrlist";
		        
	}

}
