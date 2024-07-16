package sl.qr.mh.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import sl.qr.mh.service.cableService;
import sl.qr.mh.vo.Cable;
import sl.qr.mh.vo.Equipment;
import sl.qr.mh.vo.Group;
import sl.qr.mh.vo.Rack;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@RestController
public class cableManageController {
	
	private final cableService cableservice;
	private BCryptPasswordEncoder bcrypt;
	
	
	public cableManageController(
			cableService cableservice,
			BCryptPasswordEncoder bcrypt) {
		this.cableservice = cableservice;
		this.bcrypt = bcrypt;
	}
	
		@GetMapping(value = "/test/cable/list")
	public List<HashMap<String, Object>> getCableListData(Cable vo,
			  HttpSession session,
	            HttpServletRequest request) {

			//System.out.println("---------------------------------");
			//System.out.println("---------------------------------"+vo.getE_hostname());
	 
			List<HashMap<String, Object>> selectCableList = cableservice.selectCableList(vo);

	       return selectCableList;
    }
	
	
	@GetMapping(value = "/test/quipment/list")
    public List<HashMap<String, Object>> getEquipmentListData(Equipment vo,
            HttpSession session,
            HttpServletRequest request) {
        //vo.setCurrent_page_no(1);
		List<HashMap<String, Object>> selectEquipmentList = cableservice.selectEqpList(vo);
        
		/*
		 * Iterator<Equipment> it = selectEquipmentList.iterator(); while(it.hasNext())
		 * {
		 * 
		 * 
		 * Equipment eqp = it.next();
		 * 
		 * String test = eqp.getEqp_name(); log.info(test);
		 * 
		 * }
		 */
        return selectEquipmentList;
}
	
@GetMapping(value = "/test/quipment/search")
public List<Equipment> getEqpSearchData(Equipment vo, HttpSession session,
		HttpServletRequest request) {
	
	List<Equipment> list = cableservice.selectSearchEqp(vo);
	
	return list;
}
	
	@GetMapping(value = "/test/group/list")
    public List<Group> getGroupListData(
            HttpSession session,
            HttpServletRequest request) {
     
        List<Group> selectGroupList = cableservice.selectBizList();
        
		
		/*
		 * Iterator<Group> it = selectGroupList.iterator(); while(it.hasNext()) {
		 * 
		 * 
		 * Group g = it.next();
		 * 
		 * String test = g.getGroup_name(); log.info(test);
		 * 
		 * }
		 */
		 

        return selectGroupList;
	}
	

	
	
	@GetMapping(value = "/test/rack/list")
    public List<Rack> getRackListData(
            HttpSession session,
            HttpServletRequest request) {
     
        List<Rack> selectRackList = cableservice.selectRackList();
        
		
		/*
		 * Iterator<Group> it = selectGroupList.iterator(); while(it.hasNext()) {
		 * 
		 * 
		 * Group g = it.next();
		 * 
		 * String test = g.getGroup_name(); log.info(test);
		 * 
		 * }
		 */
		 

        return selectRackList;
	}
	
	/*
	 * @GetMapping(value = "/test/cable/list") public List<Cable> getCableListData(
	 * HttpSession session, HttpServletRequest request) { //log.info("qr search!");
	 * List<Cable> selectCableList = cableservice.selectCableList();
	 * 
	 * return selectCableList; }
	 */
	
	@GetMapping("/check/hostname/{hostname}")
	public String checkhostnameExist(@PathVariable("hostname") String hostname) {
		boolean check = cableservice.checkHostname(hostname);
		return check + "";
	}
}
