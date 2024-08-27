"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { CardFooter, CardHeader, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { fetchTags, fetchVideoLs } from "@/api/video";
import { useEffect, useState } from "react";
import { FiEye, FiUser, FiHeart, FiThumbsUp } from "react-icons/fi";
import { Button, Avatar } from "@nextui-org/react";
// import { HeartFilledIcon } from "@/components/icons";
import {
  FaHeart,
  FaRegHeart,
  FaThumbsUp,
  FaRegThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown,
} from "react-icons/fa";
import type { Tag } from "@/types/api-types";
import { User } from "@nextui-org/react";

const VideoCard = (video_: any) => {
  const video = video_.video;
  const [imageUrl, setImageUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (video) {
      setImageUrl(video.thumbnailUrl);
      setPreviewUrl(video.previewUrl);
    }
  }, [video]);
  return (
    <Card
      shadow="sm"
      key={video?.id}
      isPressable
      onPress={() => console.log("item pressed")}
      className="w-full"
    >
      <CardBody className="p-0 w-full aspect-[8/3] rounded-sm">
        {imageUrl ? (
          <Link
            href={`/video/${video?.id}`}
            className="w-full h-full flex flex-row gap-2 justify-between"
          >
            <div className="w-1/2 aspect-[4/3] relative">
              <Image
                src={isHovered ? previewUrl : imageUrl}
                alt={"Video thumbnail"}
                width={0}
                height={0}
                style={{ objectFit: "cover" }}
                fill
                unoptimized
                priority
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <div className="text-medium break-all flex items-center justify-start hover:text-red-500 h-3/5 pt-3">
                {video?.title}
              </div>
              <div className="flex text-sm justify-between gap-2 flex-grow px-2">
                <div className="flex gap-1 items-center">
                  <FiEye />
                  {video.views}
                </div>
                <div className="flex gap-1 items-center">
                  <FiThumbsUp />
                  {video.likes}
                </div>
                <div className="flex gap-1 items-center">
                  <FiHeart />
                  {video.hearts}
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <>加载中...</>
        )}
      </CardBody>
    </Card>
  );
};

const CommentCard = (comment_: any) => {
  const comment = comment_.comment;
  return (
    <Card shadow="sm" key={comment?.id} className="w-full h-fit">
      <CardHeader className="justify-between">
        <Link
          href={`/user/${comment?.user?.id}`}
          className="transition-transform hover:scale-105 font-bold"
        >
          <User
            name="Jane Doe"
            description="2个小时前"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            className="hover:text-red-500 "
          />
        </Link>
      </CardHeader>
      <CardBody className="p-0 w-full rounded-sm">
        <div className="text-medium break-all flex items-center justify-start py-3 pl-5">
          {comment?.content || "加载中...真不错"}
        </div>
      </CardBody>
      <CardFooter className="pt-0 flex flex-row gap-1 justify-start items-center">
        <Button
          variant="light"
          className="flex gap-1 hover:text-red-500 hover:scale-105"
          size="sm"
        >
          {true ? <FaThumbsUp /> : <FaRegThumbsUp />}
          <p>43</p>
        </Button>
        <Button
          variant="light"
          className="flex gap-1 hover:text-red-500 hover:scale-105"
          size="sm"
        >
          {true ? <FaThumbsDown /> : <FaRegThumbsDown />}
          <p>12</p>
        </Button>
        <Button
          variant="light"
          className="hover:text-red-500 hover:scale-105 hover:underline"
          size="sm"
        >
          回复
        </Button>
      </CardFooter>
    </Card>
  );
};

const VideoPage = () => {
  const { vid } = useParams();
  const iframeSrc = `https://iframe.mediadelivery.net/embed/291309/${vid}?autoplay=true&loop=false&muted=false&preload=true&responsive=true`;
  console.log(iframeSrc);
  const [recommandList, setRecommandList] = React.useState<any>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const response = await fetchVideoLs();
      if (response.success) {
        setRecommandList(response.data);
        console.log(response.data);
      }
    };
    fetchVideos();
  }, []);

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
    <div className="flex flex-row justify-between gap-5 w-full min-h-screen">
      <div className="w-full relative pt-[56.25%] lg:w-3/4 flex flex-col gap-10">
        <iframe
          src={iframeSrc}
          loading="lazy"
          className="absolute top-0 left-0 w-full border-0 aspect-[4/3] bg-black"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        <div className="w-full text-lg font-bold mt-5">神奇偷拍视角..</div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-3 justify-start items-center font-bold">
            <div className="flex flex-row gap-1 justify-start items-center ">
              <FiEye />
              321 观看
            </div>
            |
            <div className="flex flex-row gap-1 justify-start items-center ">
              两个月前
            </div>
          </div>
          <div className="flex flex-row gap-3 justify-end items-center">
            <Button
              color="primary"
              variant="bordered"
              startContent={false ? <FaThumbsUp /> : <FaRegThumbsUp />}
              className="transition-transform hover:text-red-500 hover:border-red-500 hover:scale-105"
            >
              点赞
            </Button>
            <Button
              color="primary"
              variant="bordered"
              startContent={false ? <FaHeart /> : <FaRegHeart />}
              className="transition-transform hover:text-red-500 hover:border-red-500 hover:scale-105"
            >
              收藏
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center border-y-1 py-5">
          <Link
            href={`/user/user?.id`}
            className="flex flex-row gap-3 justify-start items-center hover:scale-105 transition-transform font-bold"
          >
            <User
              name="Jane Doe"
              description="发布 103 个视频 | 33 粉丝"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
              className="hover:text-red-500"
            />
          </Link>
          <Button
            color="primary"
            variant="bordered"
            className="sm:w-[300px] hover:text-red-500 hover:border-red-500 hover:scale-105"
          >
            {true ? "关注" : "已关注"}
          </Button>
        </div>
        <div>
          <div className="font-bold">相关标签</div>
          <div className="flex flex-row justify-start gap-2 mt-2 overflow-y-scroll py-3">
            {tags?.length > 0 ? (
              tags.map((tag) => (
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  key={tag.id}
                  className="hover:underline hover:scale-105"
                >
                  {tag.name}
                </Button>
              ))
            ) : (
              <>暂无标签...</>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/* <div className="font-bold mb-2">评论区</div>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard comment={comment} key={comment.id} />
            ))
          ) : (
            <>暂无评论...</>
          )} */}
          <div className="font-bold mb-2">评论区</div>
          <CommentCard comment={null} />
          <CommentCard comment={null} />
        </div>
      </div>
      {recommandList.length > 0 && (
        <div className="hidden lg:flex lg:flex-col w-1/4 gap-5 justify-start">
          {recommandList.map((item: any) => (
            <VideoCard video={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
};
export default VideoPage;
