package br.socialhub.api.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class Util {

    public static String getValueByKey(String jsonString, String key) {
        try {
            // Instancia o ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            // Converte o JSON em String para JsonNode
            JsonNode rootNode = objectMapper.readTree(jsonString);

            // Busca o valor da chave especificada
            JsonNode valueNode = rootNode.get(key);

            // Retorna o valor como String (ou null se a chave não existir)
            return valueNode != null ? valueNode.asText() : null;

        } catch (Exception e) {
            System.err.println("Erro ao processar o JSON: " + e.getMessage());
            return null;
        }
    }
}
