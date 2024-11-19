package br.socialhub.api.dtos.blue_sky;

import java.util.List;

public record EmbedDTO(String $type, List<ImageEmbedDTO> images) {
}
