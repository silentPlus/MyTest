package com.linkcos.object.aop.login;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import com.linkcos.object.aop.BaseAspect;

@Aspect
@Order(1)
@Component
public class OAuth2Aspect extends BaseAspect {


//    @Resource(name = "o2oJdbcBaseDao")
//    private JdbcBaseDao<WeChatUser> o2oDao;
//    @Autowired
//    private O2OJdbcBaseDao<WeChatUser> o2oDao;

    @Pointcut("@annotation(com.wuuxiang.i5xwxplus.aop.oauth2.OAuth2)")
    private void pointCut() {}
    /**
     *
     * doBefore:在加了<strong>NeedAouth2</strong>标签的方法前执行网页授权方法，将用户信息加入到session中(
     * 暂时限定返回值为ModelAndView的方法). <br/>
     * Date: 2014年12月23日 上午9:47:38 <br/>
     *
     * @author 李国煜
     * @param pjp
     * @return
     * @throws Throwable
     */
    @Around(value = "pointCut()")
    public Object doAround(ProceedingJoinPoint point) throws Throwable {
    	//sUser +　sFace    {'sUser':'tcsl','sFace':'center'} //scope
		Method method = ((MethodSignature) point.getSignature()).getMethod();
	  	//Class<?>[] parameterTypes =  ((MethodSignature) pjp.getSignature()).getParameterTypes();
    	//Method method = pjp.getTarget().getClass().getMethod(pjp.getSignature().getName(), parameterTypes);
        // 获取OAuth2标签上的sUser和sFace名称
    	//OAuth2 oAuth2 = method.getAnnotation(OAuth2.class);
    	OAuth2 oAuth2 = AnnotationUtils.getAnnotation(method, OAuth2.class);
    	String sUserValue = "";
    	String sFaceValue = "";
        Annotation[][] annotationss = method.getParameterAnnotations();
        Object[] args = point.getArgs(); //当前的请求参数值
		for (int i = 0; i < annotationss.length; i++) {
			Annotation[] annotations = annotationss[i];
			if (annotations.length == 0) continue;
			for (Annotation annotation : annotations) {
				if (!(annotation instanceof PathVariable)) continue;
				String annotationValue = ((PathVariable) annotation).value();
				if (oAuth2.sUser().equals(annotationValue)) {
					sUserValue = args[i].toString(); break;
				}
				if (oAuth2.sFace().equals(annotationValue)) {
					sFaceValue = args[i].toString(); break;
				}
			}
		}
		// 执行业务功能代码
        Object retVal = point.proceed();
        return retVal;
    }
}
