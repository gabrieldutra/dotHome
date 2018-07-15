package io.github.gabrieldutra.dothome.service.mapper;

import io.github.gabrieldutra.dothome.domain.*;
import io.github.gabrieldutra.dothome.service.dto.DataDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Data and its DTO DataDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DataMapper extends EntityMapper<DataDTO, Data> {



    default Data fromId(Long id) {
        if (id == null) {
            return null;
        }
        Data data = new Data();
        data.setId(id);
        return data;
    }
}
