package com.linkcos.object.aop.login;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * 
 * ClassName: NeedAouth2 <br/>
 * Function: 在需要Aouth2的方法前加上这个注解,并将对应的sUser和sFace传入到注解中的参数中
 * date: 2014年12月22日 上午10:06:53 <br/>
 *
 * @author 李国煜
 * @version 
 * @since JDK 1.7
 */
@Target({ElementType.PARAMETER, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface OAuth2 {
    String sUser() default "sUser";
    String sFace() default "sFace";
    OAuth2Scope scope() default OAuth2Scope.USERINFO;
    boolean UnionDiners() default false;
    boolean UnionCards() default false;
    boolean CardsForceCheck() default false;
}
