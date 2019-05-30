package com.cj.sybaseindex.elasticsearch.service.impl;

import com.cj.sybaseindex.elasticsearch.model.Eaj;
import com.cj.sybaseindex.elasticsearch.repository.EajSearchRepository;
import com.cj.sybaseindex.elasticsearch.service.EajService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.query.SearchQuery;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * elasticsearch　操作EAJ
 * @author 晁建
 * @date 2019-05-29
 */
@Service
public class EajServiceImpl implements EajService {
    @Autowired
    private EajSearchRepository eajSearchRepository;
    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;

    @Override
    public void eajSave(Eaj eaj) {
        eajSearchRepository.save(eaj);
    }

    @Override
    public void eajSaveList(List<Eaj> eajList) {
        eajSearchRepository.saveAll(eajList);
    }

    @Override
    public Iterable<Eaj> searchAll() {
        return eajSearchRepository.findAll();
    }

    @Override
    public Iterable<Eaj> findByDsr(String dsr) {
        return eajSearchRepository.findByDsr(dsr);
    }

    @Override
    public List<Eaj> searchQuery(SearchQuery searchQuery) {
        Page<Eaj> searchPageResults = eajSearchRepository.search(searchQuery);

        if (searchPageResults == null) return null;

        return searchPageResults.getContent();
    }

    @Override
    public List<Eaj> templateSearchQuery(SearchQuery searchQuery) {
        List<Eaj> articles = elasticsearchTemplate.queryForList(searchQuery, Eaj.class);
        if (articles == null) return null;

        return articles;
    }
}
