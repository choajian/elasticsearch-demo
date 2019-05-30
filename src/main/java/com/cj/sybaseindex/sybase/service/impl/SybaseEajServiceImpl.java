package com.cj.sybaseindex.sybase.service.impl;

import com.cj.sybaseindex.sybase.mapper.EajMapper;
import com.cj.sybaseindex.sybase.service.SybaseEajService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SybaseEajServiceImpl implements SybaseEajService {

    @Autowired
    private EajMapper eajMapper;

    @Override
    public Map<String,Object> getEajByAhdm(String ahdm) {

        return eajMapper.getEajByAhdm(ahdm);
    }

    @Override
    public List<Map> getEajConnectionByDay(String sarq){
        return eajMapper.getEajConnectionByDay(sarq);
    }
}
