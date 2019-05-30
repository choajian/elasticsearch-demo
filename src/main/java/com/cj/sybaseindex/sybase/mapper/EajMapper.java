package com.cj.sybaseindex.sybase.mapper;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface EajMapper {

    Map<String,Object> getEajByAhdm(@Param("AHDM") String ahdm);

    List<Map> getEajConnectionByDay(@Param("SARQ") String sarq);
}
