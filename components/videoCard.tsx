"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import { FiEye, FiUser, FiHeart, FiThumbsUp } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";

export default function VideoCard(video_: any, index: number) {
  const video = video_.video;
  const [imageUrl, setImageUrl] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: false,
  });

  useEffect(() => {
    if (video) {
      setImageUrl(video.thumbnailUrl);
      setPreviewUrl(video.previewUrl);
    }

    // 检测设备类型
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setIsMobile(mobile);
  }, [video]);

  const displayImage =
    (isMobile && inView) || (!isMobile && isHovered) ? previewUrl : imageUrl;

  return (
    <Card
      shadow="sm"
      key={index}
      isPressable
      onPress={() => console.log("item pressed")}
      className="w-full sm:w-[300px] h-[250px]"
    >
      <CardBody className="p-0 w-full h-[200px] relative">
        {imageUrl ? (
          <Link
            href={`video/${video.id}`}
            className="w-full h-full relative"
            ref={isMobile ? ref : undefined}
          >
            <Image
              src={displayImage}
              alt={"Video thumbnail"}
              width={0}
              height={0}
              style={{ objectFit: "cover" }}
              fill
              unoptimized
              priority
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
            />
          </Link>
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </CardBody>
      <CardFooter className="text-small h-[50px] flex-col p-1">
        <div className="w-full flex text-sm justify-between">
          <Link
            href={`user/${video.uploader_id}`}
            className="flex text-center ml-0 w-full gap-1 text-sm items-center hover:underline"
          >
            <FiUser />
            {video.uploader_id}
          </Link>
          <div className="flex text-sm justify-between gap-2 flex-grow">
            <div className="flex gap-[2px] items-center">
              <FiEye />
              {video.views}
            </div>
            <div className="flex gap-[2px] items-center">
              <FiThumbsUp />
              {video.likes}
            </div>
            <div className="flex gap-[2px] items-center">
              <FiHeart />
              {video.hearts}
            </div>
          </div>
        </div>
        <Link
          href={`video/${video.id}`}
          className="mt-0 w-full text-md leading-tight line-clamp-2 flex justify-start hover:underline"
        >
          {video.title}
        </Link>
      </CardFooter>
    </Card>
  );
}
