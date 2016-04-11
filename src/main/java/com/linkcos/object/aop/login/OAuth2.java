package com.linkcos.object.aop.login;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


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
