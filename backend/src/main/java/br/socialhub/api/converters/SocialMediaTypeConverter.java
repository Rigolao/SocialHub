package br.socialhub.api.converters;

import br.socialhub.api.enums.PlanType;
import br.socialhub.api.enums.SocialMediaType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class SocialMediaTypeConverter implements AttributeConverter<SocialMediaType, String> {
    @Override
    public String convertToDatabaseColumn(SocialMediaType attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getDescription();
    }

    @Override
    public SocialMediaType convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        for (SocialMediaType status : SocialMediaType.values()) {
            if (status.getDescription().equals(dbData)) {
                return status;
            }
        }

        throw new IllegalArgumentException("Unknown database value: " + dbData);
    }
}
