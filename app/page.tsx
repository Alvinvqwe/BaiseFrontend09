"use client";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useState, useEffect } from "react";
import { fetchTags, fetchVideoLs } from "@/api/video";
import VideoCard from "@/components/videoCard";
// import HoverVideoPlayer from "react-hover-video-player";
import { Skeleton, Pagination } from "@nextui-org/react";
import type { Tag } from "@/types/api-types";

const VideoGrid = () => {
  const [videoLs, setVideoLs] = useState<any[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetchVideoLs();
      if (response.success) {
        setVideoLs(response.data);
      }
    };
    fetchVideos();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-start">推荐视频</h1>
      <div className="items-center grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
        {videoLs.map((video) => (
          <VideoCard video={video} key={video.id} />
        ))}
      </div>
      <Pagination
        showControls
        total={10}
        initialPage={1}
        className="flex items-center justify-center my-3 py-3"
      />
    </>
  );
};

export default function Home() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await fetchTags();
        if (!res.success) {
          alert(res.message);
        } else {
          setTags(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTags();
  }, []);

  return (
    <div className="w-full h-fit h-min-screen flex-col">
      <div className="w-full h-fit flex justify-start items-center overflow-scroll  gap-1 my-3 pb-3">
        {tags?.length > 0 ? (
          tags.map((tag) => (
            <Button
              color="primary"
              variant="flat"
              size="sm"
              key={tag.id}
              className="hover:underline"
            >
              {tag.name}
            </Button>
          ))
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>
      <VideoGrid />
    </div>
  );
}
