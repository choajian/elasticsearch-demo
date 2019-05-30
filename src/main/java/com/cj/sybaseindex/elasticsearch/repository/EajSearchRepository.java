package com.cj.sybaseindex.elasticsearch.repository;

import com.cj.sybaseindex.elasticsearch.model.Eaj;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

/**
 * EAJ操作模板
 * @author 晁建
 * @date 2019-05-28
 */
public interface EajSearchRepository extends ElasticsearchRepository<Eaj, Long> {
    /**
     * 按照当事人精确查找
     * @param dsr 当事人
     * @return
     */
    List<Eaj> findByDsr(String dsr);

}
