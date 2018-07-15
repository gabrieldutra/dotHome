package io.github.gabrieldutra.dothome.repository;

import io.github.gabrieldutra.dothome.domain.Data;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Data entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataRepository extends JpaRepository<Data, Long> {

}
