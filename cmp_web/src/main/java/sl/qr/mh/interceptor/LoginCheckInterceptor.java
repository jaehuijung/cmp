package sl.qr.mh.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class LoginCheckInterceptor implements HandlerInterceptor {
	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    
       HttpSession session = request.getSession();
       if(session == null || session.getAttribute("id") == null || session.getAttribute("id").equals("")) {
    	    response.sendRedirect("/sl/user/login");
    	
       }

		
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }


}
