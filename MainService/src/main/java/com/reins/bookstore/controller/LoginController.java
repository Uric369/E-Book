package com.reins.bookstore.controller;

import com.reins.bookstore.constant.Constant;
import com.reins.bookstore.entity.Log;
import com.reins.bookstore.entity.UserAuth;
import com.reins.bookstore.repository.LogRepository;
import com.reins.bookstore.service.LogService;
import com.reins.bookstore.service.TimeService;
import com.reins.bookstore.service.UserService;
import com.reins.bookstore.utils.msgutils.Msg;
import com.reins.bookstore.utils.msgutils.MsgCode;
import com.reins.bookstore.utils.msgutils.MsgUtil;
import com.reins.bookstore.utils.sessionutils.SessionUtil;
import net.sf.json.JSONObject;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.WebApplicationContext;


import java.time.Duration;
import java.util.List;
import java.util.Map;


@RestController
@Scope(value = "session")
public class LoginController {
    @Autowired
    private TimeService timeService;

    @Autowired
    private LogService logService;

//    @Autowired
//    WebApplicationContext applicationContext;


    @Autowired
    private UserService userService;


    @RequestMapping("/login")
    //public Msg login(@RequestParam(Constant.USERNAME) String username, @RequestParam(Constant.PASSWORD) String password, @RequestParam(Constant.REMEMBER_ME) Boolean remember){
    public Msg login(@RequestBody Map<String, String> params){
//        TimeService timeService = applicationContext.getBean(TimeService.class);
        timeService.startTimer(); // 调用定时器Service开始计时
        System.out.println(this);
        System.out.println(timeService);
        System.out.println("start timer");
        String username = params.get(Constant.USERNAME);
        String password = params.get(Constant.PASSWORD);
        UserAuth auth = userService.checkUser(username, password);
        if(auth != null){
            if(auth.getUserStatus()==1) return MsgUtil.makeMsg(MsgCode.ACCOUNT_DISABLED_ERROR);
            JSONObject obj = new JSONObject();
            obj.put(Constant.USER_ID, auth.getUserId());
            obj.put(Constant.USERNAME, auth.getUsername());
            obj.put(Constant.USER_TYPE, auth.getUserType());
            SessionUtil.setSession(obj);

            JSONObject data = JSONObject.fromObject(auth);
            data.remove(Constant.PASSWORD);

            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, data);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.LOGIN_USER_ERROR);
        }
    }

    @RequestMapping("/logout")
    public Msg logout(){
//        TimeService timeService = applicationContext.getBean(TimeService.class);
        System.out.println(this);
        System.out.println(timeService);
        System.out.println("stop timer");
        Duration sessionDuration = timeService.stopTimer(); // 调用定时器Service停止计时并获取会话保持时间
        Long duration = sessionDuration.getSeconds();
        JSONObject session = SessionUtil.getAuth();
        Boolean status = SessionUtil.removeSession();
        System.out.println("timeeeeeeeeeeeeeeeee");
        System.out.println(sessionDuration);
        System.out.println(duration);

        if (session != null) {
            Integer userId = session.getInt(Constant.USER_ID); // 获取用户ID
            Log log = new Log();
            log.setUserId(userId);
            log.setSessionDuration(duration);
            logService.saveLog(log);
            // 在这里使用获得的用户信息进行处理
        }
        JSONObject data = new JSONObject();
        data.put("duration", sessionDuration);

        if(status){
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGOUT_SUCCESS_MSG,data);
        }
        return MsgUtil.makeMsg(MsgCode.ERROR, MsgUtil.LOGOUT_ERR_MSG);
    }


    @RequestMapping("/checkSession")
    public Msg checkSession(){
        JSONObject auth = SessionUtil.getAuth();

        if(auth == null){
            return MsgUtil.makeMsg(MsgCode.NOT_LOGGED_IN_ERROR);
        }
        else{
            return MsgUtil.makeMsg(MsgCode.SUCCESS, MsgUtil.LOGIN_SUCCESS_MSG, auth);
        }
    }
}
