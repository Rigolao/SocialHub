package br.socialhub.api.converters;

import br.socialhub.api.enums.TokenStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TokenStatusConverter implements AttributeConverter<TokenStatus, String> {

    @Override
    public String convertToDatabaseColumn (TokenStatus attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public TokenStatus convertToEntityAttribute (String dbData) {
        if (dbData == null) {
            return null;
        }

        for (TokenStatus status : TokenStatus.values()) {
            if (status.getValue().equals(dbData)) {
                return status;
            }
        }

        throw new IllegalArgumentException("Unknown database value: " + dbData);
    }
}
