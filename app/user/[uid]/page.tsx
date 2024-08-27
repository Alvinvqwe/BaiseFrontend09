"use client";
import { User } from "@nextui-org/react";
import { Button, Tabs, Tab } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { fetchVideoLs } from "@/api/video";
import VideoCard from "@/components/videoCard";
import { Pagination } from "@nextui-org/react";

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

const UserPage = () => {
  return (
    <div className="flex flex-col">
      <div className="h-[150px] sm:h-[200px]">
        <User
          name="Jane Doe"
          description="普通用户"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          className="transition-transform font-bold flex items-center justify-start pl-5 h-2/3"
        />
        <div className="flex flex-row items-center justify-between pb-5 px-5 ">
          <div className="flex flex-row gap-5 items-center justify-start h-1/3 text-center ">
            <div className="flex flex-col">
              <div className="text-sm font-bold">123</div>
              获赞
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-bold">532</div>
              关注
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-bold">12</div>
              粉丝
            </div>
          </div>
          <Button
            color="primary"
            variant="bordered"
            className="hover:text-red-500 hover:border-red-500 hover:scale-105"
          >
            编辑资料
          </Button>
        </div>
      </div>
      <div className="my-5 text-center">
        <Tabs variant="underlined">
          <Tab key="1" title="我的作品">
            <VideoGrid />
          </Tab>
          <Tab key="2" title="我的喜欢">
            <VideoGrid />
          </Tab>
          <Tab key="3" title="我的收藏">
            <VideoGrid />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};
export default UserPage;
