"use server";
import createAxiosInstance from "@/lib/AxiosInstance";
export const fetchVideos = async (page: number) => {
  const axiosInstance = await createAxiosInstance();
  const response = await axiosInstance.post("/video", {
    limit: 20,
    page,
  });
  if (!response.data) {
    throw new Error("Failed to fetch videos");
  }
  const data = response.data;
  console.log(data);
  return {
    data: data.data,
    totalRecords: 0,
    totalPages: 0,
    currentPage: 0,
  };
};

export const fetchTags = async () => {
  const axiosInstance = await createAxiosInstance();
  const response = await axiosInstance.get("/video/tags");
  if (!response.data) {
    throw new Error("Failed to fetch tags");
  }
  const data = response.data;
  console.log(data);
  return data;
};

export const fetchVideo = async (id: string) => {
  const axiosInstance = await createAxiosInstance();
  console.log("id", id);
  const response = await axiosInstance.get("/video/" + id);
  if (!response.data) {
    throw new Error("Failed to fetch tags");
  }
  const data = response.data;
  console.log(data);
  return data;
};

const videoLs = [
  {
    id: "330eba8d-af7b-4220-bbda-30ed509a0359",
    thumbnailUrl:
      "https://vz-94b25891-918.b-cdn.net/330eba8d-af7b-4220-bbda-30ed509a0359/thumbnail.jpg",
    videoPlaylistUrl:
      "https://vz-94b25891-918.b-cdn.net/330eba8d-af7b-4220-bbda-30ed509a0359/playlist.m3u8",
    previewUrl:
      "https://vz-94b25891-918.b-cdn.net/330eba8d-af7b-4220-bbda-30ed509a0359/preview.webp",
    uploader_id: "Alvin",
    views: 523,
    likes: 32,
    hearts: 80,
    title: "小姨子周末来找我.",
  },
  {
    id: "68eaac66-8563-4248-925c-13c3a11a61ec",
    thumbnailUrl:
      "https://vz-94b25891-918.b-cdn.net/68eaac66-8563-4248-925c-13c3a11a61ec/thumbnail.jpg",
    videoPlaylistUrl:
      "https://vz-94b25891-918.b-cdn.net/68eaac66-8563-4248-925c-13c3a11a61ec/playlist.m3u8",
    previewUrl:
      "https://vz-94b25891-918.b-cdn.net/68eaac66-8563-4248-925c-13c3a11a61ec/preview.webp",
    uploader_id: "Alvin",
    views: 142,
    likes: 55,
    hearts: 31,
    title: "偷拍视角..随手拍拍",
  },
  {
    id: "05303481-961a-400c-ac6c-a25f9300044d",
    thumbnailUrl:
      "https://vz-94b25891-918.b-cdn.net/05303481-961a-400c-ac6c-a25f9300044d/thumbnail.jpg",
    videoPlaylistUrl:
      "https://vz-94b25891-918.b-cdn.net/05303481-961a-400c-ac6c-a25f9300044d/playlist.m3u8",
    previewUrl:
      "https://vz-94b25891-918.b-cdn.net/05303481-961a-400c-ac6c-a25f9300044d/preview.webp",
    uploader_id: "Alvin",
    views: 63,
    likes: 12,
    hearts: 10,
    title: "KTV偷拍小姐姐, 今天小姐姐喝醉了,是打发打发。",
  },
  {
    id: "ea7666be-0e71-4aed-bb97-d2a5ed84257d",
    thumbnailUrl:
      "https://vz-94b25891-918.b-cdn.net/ea7666be-0e71-4aed-bb97-d2a5ed84257d/thumbnail.jpg",
    videoPlaylistUrl:
      "https://vz-94b25891-918.b-cdn.net/ea7666be-0e71-4aed-bb97-d2a5ed84257d/playlist.m3u8",
    previewUrl:
      "https://vz-94b25891-918.b-cdn.net/ea7666be-0e71-4aed-bb97-d2a5ed84257d/preview.webp",
    uploader_id: "Alvin",
    views: 123,
    likes: 12,
    hearts: 98,
    title: "今天表哥不在家...",
  },
  {
    id: "73d26217-1353-474b-9ae2-fe66cb436473",
    thumbnailUrl:
      "https://vz-94b25891-918.b-cdn.net/73d26217-1353-474b-9ae2-fe66cb436473/thumbnail.jpg",
    videoPlaylistUrl:
      "https://vz-94b25891-918.b-cdn.net/73d26217-1353-474b-9ae2-fe66cb436473/playlist.m3u8",
    previewUrl:
      "https://vz-94b25891-918.b-cdn.net/73d26217-1353-474b-9ae2-fe66cb436473/preview.webp",
    uploader_id: "Alvin",
    views: 88,
    likes: 31,
    hearts: 66,
    title: "聚会..",
  },
];

export const fetchVideoLs = async () => {
  return {
    success: true,
    message: "",
    data: videoLs,
  };
};
