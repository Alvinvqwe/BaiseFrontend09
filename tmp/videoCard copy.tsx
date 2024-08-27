// "use client";

// import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
// import HoverVideoPlayer from "react-hover-video-player";
// import { Skeleton } from "@nextui-org/react";
// import Image from "next/image";
// import Link from "next/link";
// import { Suspense } from "react";
// import { FiEye, FiUser, FiHeart, FiThumbsUp } from "react-icons/fi";
// // import { getCdnResourceUrl } from "@/api/cdn";

// import { useEffect, useState } from "react";

// const HoverImage = ({ webp, img }: { webp: string; img: string }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   return (
//     <div
//       className="relative w-full h-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Image
//         src={img}
//         alt={"alt"}
//         width={300}
//         height={400}
//         className={`absolute top-0 left-0 transition-opacity duration-300 ${
//           isHovered ? "opacity-0" : "opacity-100"
//         }`}
//         priority
//       />
//       <Image
//         src={webp}
//         alt={"alt"}
//         width={300}
//         height={400}
//         className={`absolute top-0 left-0 transition-opacity duration-300 ${
//           isHovered ? "opacity-100" : "opacity-0"
//         }`}
//         priority
//       />
//     </div>
//   );
// };

// export function VideoCard(video_: any, index: number) {
//   const video = video_.video;
//   const [imageUrl, setImageUrl] = useState<string>("");
//   const [previewUrl, setPreviewUrl] = useState<string>("");
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     if (video) {
//       setImageUrl(video.thumbnailUrl);
//       setPreviewUrl(video.previewUrl);
//     }
//   }, [video_]);

//   return (
//     <Card
//       shadow="sm"
//       key={index}
//       isPressable
//       onPress={() => console.log("item pressed")}
//       className="w-[300px] h-[250px]"
//     >
//       <CardBody className="p-0 h-[200px]">
//         {imageUrl ? (
//           //   <HoverVideoPlayer
//           //     videoSrc={videoUrl}
//           //     pausedOverlay={
//           //       <Image
//           //         src={imageUrl}
//           //         alt={"alt"}
//           //         width={0}
//           //         height={0}
//           //         fill
//           //         priority
//           //         unoptimized
//           //       />
//           //     }
//           //     loadingOverlay={
//           //       <Skeleton className="w-full h-full">Loading...</Skeleton>
//           //     }
//           //     preload="metadata"
//           //     muted={true}
//           //     loop={true}
//           //     volume={0.8}
//           //     className=" bg-black w-full h-full"
//           //     restartOnPaused
//           //     sizingMode="container"
//           //   />
//           <Image
//             src={isHovered ? previewUrl : imageUrl}
//             alt={"alt"}
//             width={0}
//             height={0}
//             fill
//             unoptimized
//             loading="lazy"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           />
//         ) : (
//           //   <HoverImage webp={imageUrl} img={imageUrl} />
//           <Skeleton className="w-full h-full" />
//         )}
//       </CardBody>
//       <CardFooter className="text-small h-[50px] justify-between">
//         <Link
//           href="#"
//           className="flex text-center ml-0 w-full gap-1 text-sm text-gray-700 items-center"
//         >
//           {/* <IconUserSquareRounded
//               stroke={2}
//               width={15}
//               height={20}
//               color="black"
//             /> */}
//           <FiUser />
//           {video.uploader_id}
//         </Link>
//         <div className="text-sm font-medium text-gray-900 flex justify-between gap-2 w-[200px] h-[20px]">
//           <div className="flex gap-[2px] items-center">
//             {/* <IconEye stroke={2} width={15} height={20} color="black" /> */}
//             <FiEye />
//             {video.views}
//           </div>
//           <div className="flex gap-[2px] items-center">
//             {/* <IconThumbUp stroke={2} width={15} height={20} color="black" /> */}
//             <FiThumbsUp />
//             {video.likes}
//           </div>
//           <div className="flex gap-[2px] items-center">
//             {/* <IconHeart stroke={2} width={15} height={20} color="black" /> */}
//             <FiHeart />
//             {video.hearts}
//           </div>
//         </div>
//         {/* <span className="mt-0 w-full text-sm text-gray-500 leading-tight line-clamp-2">
//           {video.title}
//         </span> */}
//       </CardFooter>
//     </Card>
//   );
// }
