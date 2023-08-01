package com.daofab.backend;

import com.daofab.backend.service.ParentService;
import org.json.simple.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;


@SpringBootApplication
@RestController
public class BackendApplication {

    private final ParentService service = new ParentService();

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @GetMapping("/")
    public String hello() {
        return "DAOFAB Backend Test";
    }

    //	http://localhost:8080/parent?id=1
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/parent")
    @ResponseBody
    public JSONObject parent(@RequestParam(value = "id", defaultValue = "1") String id) {
        return this.service.getParent(Integer.parseInt(id));
    }

    //	http://localhost:8080/child?id=1
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/child")
    @ResponseBody
    public JSONObject child(@RequestParam(value = "id", defaultValue = "1") String id) {
        return this.service.getChild(Integer.parseInt(id));
    }

    //	http://localhost:8080/page?currentPage=1&pageSize=2
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/page")
    @ResponseBody
    public JSONObject page(@RequestParam(value = "currentPage", defaultValue = "1") String currentPage,
                           @RequestParam(value = "pageSize", defaultValue = "2") String pageSize) {
        return this.service.getPage(Integer.parseInt(currentPage), Integer.parseInt(pageSize));
    }


}
