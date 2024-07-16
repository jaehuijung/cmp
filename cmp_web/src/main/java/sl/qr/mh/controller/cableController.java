package sl.qr.mh.controller;

import java.io.IOException;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import sl.qr.mh.service.cableService;
import sl.qr.mh.service.qrService;
import sl.qr.mh.vo.Cable;
import sl.qr.mh.vo.Equipment;

@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*") /* CORS 어노테이션 */
@Controller
public class cableController {
	
	private final cableService cableservice;
	private final qrService qrService;
	
	public cableController(
			 qrService qrService,
			cableService cableservice) {
		this.cableservice = cableservice;
		 this.qrService = qrService;
		//this.bcrypt = bcrypt;
	}
	
	
	@GetMapping("/test")
	public String test(HttpSession session,
			HttpServletRequest request) {
		return "/new/table";
		        
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
	
	@GetMapping("/eqpregister")
	public String geteqpRegister(HttpSession session,
			HttpServletRequest request) {
		return "new/eqpregister";
		        
	}
	
	@GetMapping("/cableregister")
	public String getcableRegister(HttpSession session,
			HttpServletRequest request) {
		return "new/cableregister";
		        
	}
	
	@GetMapping("/eqp/update") 
	public String geteqpUpateform(Equipment vo,HttpSession session,
			HttpServletRequest request,Model model) {
		
		
		vo = cableservice.selectupdateEqp(vo);
		log.info("kkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkk id"+vo.getEqp_id());
	    model.addAttribute("Equipment",vo);
		return "new/eqpupdate";
		        
	}
	
	@PostMapping("/eqp/update") 
	public String geteqpUpate(Equipment vo,HttpSession session,
			HttpServletRequest request,Model model) {
		
		//log.info("kkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkk id"+vo.getEqp_id());
		cableservice.updateEqp(vo);
	
	   
		return "new/eqplist";
		        
	}
	
	@PostMapping("/eqp/delete")
	public String eqpDelete(Equipment vo,HttpSession session,
		HttpServletRequest request,Model model) {
				
				
		cableservice.deleteEqp(vo);
				return "new/eqplist";
				        
			}
	
	
	@GetMapping("/eqpinsert")
	public String geteqpInsert(HttpSession session,
			HttpServletRequest request) {
		return "/eqpinsert";
		        
	}
	
	@PostMapping("/eqp/insert")
	public String eqpinsert(Equipment vo,
			HttpServletRequest request) {
		
		cableservice.insertEqp(vo);
		
		return "new/eqplist";
	}
	
	
	  @GetMapping(value = "/eqp/exceldown") public void exceldown ( HttpSession session, 
			  HttpServletRequest request,  HttpServletResponse response,Equipment vo) throws NumberFormatException, IOException { //log.info("qr print!");
	  
	  //Workbook wb = qrService.QRPrint(qrList);
		  List<Equipment> list = cableservice.selectSearchEqp(vo);
		  Workbook wb = qrService.EqpExcel(list);
	  response.setContentType("ms-vnd/excel");
	  response.setHeader("Content-Disposition", "attachment;filename=exceldown.xlsx");
	  
	  wb.write(response.getOutputStream()); 
	  wb.close(); 
	  }
	 
	
	
	
	@PostMapping("/cable/insert")
	public String cableinsert(Cable vo,
			HttpServletRequest request) {
		log.info("cable insert~~~~~ start hostname~~ : "+vo.getS_hostname());
		log.info("cable insert~~~~~ end hostname~~ : "+vo.getE_hostname());
		
		//cableservice.insertEqp(vo);
		
		cableservice.insertCable(vo);
		
		return "/new/table";
	}

}
