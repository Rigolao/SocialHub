package br.socialhub.api.converters;

import br.socialhub.api.enums.PlanType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PlanTypeConverter implements AttributeConverter<PlanType, String> {
    @Override
    public String convertToDatabaseColumn(PlanType attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getDescription();
    }

    @Override
    public PlanType convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        for (PlanType status : PlanType.values()) {
            if (status.getDescription().equals(dbData)) {
                return status;
            }
        }

        throw new IllegalArgumentException("Unknown database value: " + dbData);
    }
}
