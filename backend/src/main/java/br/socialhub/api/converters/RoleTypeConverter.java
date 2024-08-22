package br.socialhub.api.converters;

import br.socialhub.api.enums.RoleType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class RoleTypeConverter implements AttributeConverter<RoleType, String> {

    @Override
    public String convertToDatabaseColumn(RoleType attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getDescription();
    }

    @Override
    public RoleType convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        for (RoleType status : RoleType.values()) {
            if (status.getDescription().equals(dbData)) {
                return status;
            }
        }

        throw new IllegalArgumentException("Unknown database value: " + dbData);
    }
}
