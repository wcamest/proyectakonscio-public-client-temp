export interface VideoPlaylistItemData {
    name: string;
    url: string;
    thumbnail: string;
}

export interface VideoPlaylistCategoryData {
    name: string,
    videos: VideoPlaylistItemData[]
}