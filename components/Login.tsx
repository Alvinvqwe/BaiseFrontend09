"use client";
import React, { useState, useEffect } from "react";
import { Input, modal } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
// import { useRouter } from "next/navigation";
import { Social } from "./social";
import { Link } from "@nextui-org/link";
import { EyeFilledIcon, EyeSlashFilledIcon } from "./icons";
import { loginReq, registerReq } from "@/api/auth";
import toast, { Toaster } from "react-hot-toast";
// import { getSession, signIn } from "next-auth/react";
import { isValidEmail, isValidPassword, isValidRepassword } from "@/lib/utils";
import { MailIcon } from "./icons";
import { getSession, signIn, signOut } from "next-auth/react";

export const UserAvatar = () => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      // console.log("UserAvatar checkLogin");
      const session = await getSession();
      console.log("UserAvatar session", session, session?.user);
      if (session?.user) {
        setUser(session.user);
      }
      // console.log("session", session);
    };
    checkLogin();
  }, []);

  const handleSignOut = async () => {
    // console.log("logout");
    const reqUserToken = async () => {
      await signOut({ redirect: true, callbackUrl: "/" });
    };
    reqUserToken();
  };

  return (
    <Dropdown placement="bottom-end" backdrop="blur">
      <DropdownTrigger>
        <User
          name=""
          avatarProps={{
            src:
              user?.image || "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            size: "sm",
          }}
          className="transition-transform font-bold base"
          as={"button"}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="username"
          textValue={user?.email || "username"}
          as={"p"}
        >
          {/* {(user?.email).split("@")[0] || user?.email} */}
          {user?.email}
        </DropdownItem>
        <DropdownItem
          key="user"
          href={`/user/${user?.userToken}`}
          textValue={user?.userToken || "user"}
        >
          我的主页
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onPress={handleSignOut}
          textValue={"logout"}
        >
          退出登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [repassword, setRepassword] = useState("");
  const [repasswordErrorMsg, setRepasswordErrorMsg] = useState("");
  const [isPasswordVisible, setIsPasswordIsVisible] = React.useState(false);
  const [isRepasswordVisible, setIsRepasswordVisible] = React.useState(false);
  const [register, setRegister] = useState(false);

  const isValidForm = () => {
    var isValid = {
      username: false,
      password: false,
      repassword: false,
    };
    if (username && usernameErrorMsg === "") {
      isValid.username = true;
    }
    if (password && passwordErrorMsg === "") {
      isValid.password = true;
    }
    if (repassword && repasswordErrorMsg === "") {
      isValid.repassword = true;
    }
    if (register) {
      return Object.values(isValid).every((value) => value);
    } else {
      return isValid.username && isValid.password;
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const session = await getSession();
      if (session && session.user) {
        setIsLogin(true);
      }
    };
    checkLogin();
  }, []);

  const submitForm = async () => {
    console.log("username", username, "password", password);
    if (register) {
      const response = await registerReq(username, password);
      if (!response.success) {
        if (response.message) {
          toast.error(response.message, {
            position: "top-center",
            duration: 800,
          });
        }
      } else {
        await signIn("credentials", {
          userToken: response.data.userToken || "",
        });
        if (response.message) {
          toast.success(response.message, {
            position: "top-center",
            duration: 800,
          });
        }
        onOpenChange();
      }
    } else {
      const response = await loginReq(username, password);
      if (!response.success || !response.data.userToken) {
        if (response.message) {
          toast.error(response.message, {
            position: "top-center",
            duration: 800,
          });
        }
      } else {
        await signIn("credentials", {
          userToken: response.data.userToken || "",
          email: response.data.email,
        });
        if (response.message) {
          toast.success(response.message, {
            position: "top-center",
            duration: 800,
          });
        }
        onOpenChange();
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {isLogin ? (
        <UserAvatar />
      ) : (
        <Button
          as={Link}
          onPress={onOpen}
          color="primary"
          // href="#"
          variant="flat"
        >
          注册/登录
        </Button>
      )}

      {/* 登录模态框 */}
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={() => {
          onOpenChange();
          // console.log(isOpen);
        }}
      >
        <ModalContent>
          {(closeModal) => (
            <div>
              <ModalHeader className="flex flex-col gap-1 text-center">
                BaiseHub.com
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  type="email"
                  label="Email"
                  radius="md"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameErrorMsg(isValidEmail(e.target.value));
                  }}
                  errorMessage={usernameErrorMsg}
                  defaultValue=""
                  isInvalid={usernameErrorMsg !== ""}
                  description={
                    usernameErrorMsg === ""
                      ? "We'll never share your email with anyone else."
                      : ""
                  }
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
                <Input
                  isRequired
                  type={isPasswordVisible ? "text" : "password"}
                  label="password"
                  radius="md"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordErrorMsg(isValidPassword(e.target.value));
                  }}
                  defaultValue=""
                  errorMessage={passwordErrorMsg}
                  isInvalid={passwordErrorMsg !== ""}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={() => setIsPasswordIsVisible(!isPasswordVisible)}
                      aria-label="toggle password visibility"
                    >
                      {isPasswordVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
                {register ? (
                  <Input
                    isRequired
                    type={isRepasswordVisible ? "text" : "password"}
                    label="password"
                    radius="md"
                    defaultValue=""
                    onChange={(e) => {
                      setRepassword(e.target.value);
                      setRepasswordErrorMsg(
                        isValidRepassword(e.target.value, password)
                      );
                    }}
                    errorMessage={repasswordErrorMsg}
                    isInvalid={repasswordErrorMsg !== ""}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() =>
                          setIsRepasswordVisible(!isRepasswordVisible)
                        }
                        aria-label="toggle password visibility"
                      >
                        {isRepasswordVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                ) : null}
                {register ? (
                  <div className="flex py-2 px-1 justify-between">
                    <Link
                      className="underline w-fit text-sm disabled:cursor-none"
                      href="#"
                      onPress={() => setRegister(true)}
                      isDisabled
                    >
                      还没有账户？注册
                    </Link>
                    <Link
                      className="underline w-fit text-sm"
                      href="#"
                      onPress={() => setRegister(false)}
                    >
                      已有账号？登录
                    </Link>
                  </div>
                ) : (
                  <Link
                    className="underline w-fit text-sm"
                    href="#"
                    onPress={() => setRegister(true)}
                  >
                    还没有账户？注册
                  </Link>
                )}
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    记住我
                  </Checkbox>
                  <Link
                    color="primary"
                    // href="#"
                    size="sm"
                    className="hover:underline hover:text-blue-600"
                  >
                    忘记密码?
                  </Link>
                </div>
                <div className="flex pt-2 px-1 justify-start text-md font-bold">
                  快捷登录:
                </div>
                <Social />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={closeModal}>
                  关闭
                </Button>
                <Button
                  color="primary"
                  isDisabled={!isValidForm()}
                  onPress={() => {
                    if (isValidForm()) {
                      submitForm();
                    }
                  }}
                >
                  {register ? "注册" : "登录"}
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
