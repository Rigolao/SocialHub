package br.socialhub.api.dtos.blue_sky;

import com.fasterxml.jackson.annotation.JsonProperty;

public record BlobDTO(@JsonProperty("$type") String type, BlobRefDTO ref, String mimeType, Integer size) {
}
