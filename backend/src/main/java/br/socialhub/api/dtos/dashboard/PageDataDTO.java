package br.socialhub.api.dtos.dashboard;

import java.util.List;

public record PageDataDTO(int postsMonth, int postsWeek, List<PostsByWeekDTO> postsByWeek) {
}
