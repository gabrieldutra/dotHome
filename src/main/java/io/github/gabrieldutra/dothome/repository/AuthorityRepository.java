package io.github.gabrieldutra.dothome.repository;

import io.github.gabrieldutra.dothome.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
