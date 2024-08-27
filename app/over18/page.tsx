"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { getCookie } from "@/lib/cookies";

const CheckPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState("/");
  const router = useRouter();

  useEffect(() => {
    // var url_ = getCookie("accessUrl");
    // const decodedPath = decodeURIComponent(url_ || "/");
    // setUrl(decodedPath);
    setUrl(decodeURIComponent(getCookie("accessUrl") || "/"));
    // console.log(url_, decodedPath, url);
    const over18 = getCookie("over18");
    if (!over18 || over18 !== "true") {
      setShowModal(true);
    } else {
      router.push(url);
    }
  }, [router]);

  const handleConfirm = () => {
    document.cookie = `over18=true; path=/`;
    setShowModal(false);
    router.push(url);
  };

  return (
    <div>
      <Modal
        backdrop="blur"
        isOpen={showModal}
        placement="center"
        onClose={() => setShowModal(false)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 ml-5">
            Are you over 18? 未满18岁?
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setShowModal(false)}
            >
              未满18岁
            </Button>
            <Button color="primary" onPress={handleConfirm}>
              已满18岁
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CheckPage;
