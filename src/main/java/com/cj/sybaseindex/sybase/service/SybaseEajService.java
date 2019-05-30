package com.cj.sybaseindex.sybase.service;

import java.util.List;
import java.util.Map;

public interface SybaseEajService {
    Map<String,Object> getEajByAhdm(String ahdm);

    List<Map> getEajConnectionByDay(String sarq);
}
