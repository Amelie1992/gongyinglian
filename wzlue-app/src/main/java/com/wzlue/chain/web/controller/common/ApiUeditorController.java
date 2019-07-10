package com.wzlue.chain.web.controller.common;

import com.wzlue.chain.common.ueditor.ActionEnter;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
//@CrossOrigin
@RequestMapping("/api/ueditor")
public class ApiUeditorController {
    @RequestMapping(value = "/exec")
    public String exec(HttpServletRequest request) throws Exception {
        request.setCharacterEncoding("utf-8");
        String rootPath = request.getRealPath("/");
        return new ActionEnter( request, rootPath ).exec();
    }
}
