package io.github.gabrieldutra.dothome.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.gabrieldutra.dothome.domain.Data;

import io.github.gabrieldutra.dothome.repository.DataRepository;
import io.github.gabrieldutra.dothome.web.rest.errors.BadRequestAlertException;
import io.github.gabrieldutra.dothome.web.rest.util.HeaderUtil;
import io.github.gabrieldutra.dothome.web.rest.util.PaginationUtil;
import io.github.gabrieldutra.dothome.service.dto.DataDTO;
import io.github.gabrieldutra.dothome.service.mapper.DataMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Data.
 */
@RestController
@RequestMapping("/api")
public class DataResource {

    private final Logger log = LoggerFactory.getLogger(DataResource.class);

    private static final String ENTITY_NAME = "data";

    private final DataRepository dataRepository;

    private final DataMapper dataMapper;

    public DataResource(DataRepository dataRepository, DataMapper dataMapper) {
        this.dataRepository = dataRepository;
        this.dataMapper = dataMapper;
    }

    /**
     * POST  /data : Create a new data.
     *
     * @param dataDTO the dataDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataDTO, or with status 400 (Bad Request) if the data has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data")
    @Timed
    public ResponseEntity<DataDTO> createData(@Valid @RequestBody DataDTO dataDTO) throws URISyntaxException {
        log.debug("REST request to save Data : {}", dataDTO);
        if (dataDTO.getId() != null) {
            throw new BadRequestAlertException("A new data cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Data data = dataMapper.toEntity(dataDTO);
        data = dataRepository.save(data);
        DataDTO result = dataMapper.toDto(data);
        return ResponseEntity.created(new URI("/api/data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data : Updates an existing data.
     *
     * @param dataDTO the dataDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataDTO,
     * or with status 400 (Bad Request) if the dataDTO is not valid,
     * or with status 500 (Internal Server Error) if the dataDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data")
    @Timed
    public ResponseEntity<DataDTO> updateData(@Valid @RequestBody DataDTO dataDTO) throws URISyntaxException {
        log.debug("REST request to update Data : {}", dataDTO);
        if (dataDTO.getId() == null) {
            return createData(dataDTO);
        }
        Data data = dataMapper.toEntity(dataDTO);
        data = dataRepository.save(data);
        DataDTO result = dataMapper.toDto(data);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data : get all the data.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of data in body
     */
    @GetMapping("/data")
    @Timed
    public ResponseEntity<List<DataDTO>> getAllData(Pageable pageable) {
        log.debug("REST request to get a page of Data");
        Page<Data> page = dataRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/data");
        return new ResponseEntity<>(dataMapper.toDto(page.getContent()), headers, HttpStatus.OK);
    }

    /**
     * GET  /data/:id : get the "id" data.
     *
     * @param id the id of the dataDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataDTO, or with status 404 (Not Found)
     */
    @GetMapping("/data/{id}")
    @Timed
    public ResponseEntity<DataDTO> getData(@PathVariable Long id) {
        log.debug("REST request to get Data : {}", id);
        Data data = dataRepository.findOne(id);
        DataDTO dataDTO = dataMapper.toDto(data);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(dataDTO));
    }

    /**
     * DELETE  /data/:id : delete the "id" data.
     *
     * @param id the id of the dataDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data/{id}")
    @Timed
    public ResponseEntity<Void> deleteData(@PathVariable Long id) {
        log.debug("REST request to delete Data : {}", id);
        dataRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
