package br.socialhub.api.dtos.blue_sky;

import com.fasterxml.jackson.annotation.JsonProperty;

public record BlobRefDTO(@JsonProperty("$link") String link) {
}
