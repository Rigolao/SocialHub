package br.socialhub.api.dtos.blue_sky;

public record CreatePostSimpleRequestDTO(String collection,
                                         String repo,
                                         RecordSimpleDTO record) {
    public CreatePostSimpleRequestDTO(String repo, RecordSimpleDTO record) {
        this("app.bsky.feed.post", repo, record);
    }
}
