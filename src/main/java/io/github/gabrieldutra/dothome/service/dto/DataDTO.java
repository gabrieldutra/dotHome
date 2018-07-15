package io.github.gabrieldutra.dothome.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Data entity.
 */
public class DataDTO implements Serializable {

    private Long id;

    @NotNull
    private String description;

    @NotNull
    private Double value;

    private ZonedDateTime createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DataDTO dataDTO = (DataDTO) o;
        if(dataDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", value=" + getValue() +
            ", createdAt='" + getCreatedAt() + "'" +
            "}";
    }
}
