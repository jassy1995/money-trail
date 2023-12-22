import { FaUsers, FaUserFriends } from "react-icons/fa";
import { GrAppleAppStore } from "react-icons/gr";
import { GiCloverSpiked } from "react-icons/gi"
import { BsPlusLg } from "react-icons/bs"


export const summary_items = [
  {
    title: "APPLICATIONS",
    icon: <GrAppleAppStore className="font-semibold text-white text-[20px]" />,
    count: 0,
    description: "all applications",
    bg: "#EF4444",
    path: "/apps",
  },
  {
    title: "USERS",
    icon: <FaUserFriends className="font-semibold text-white text-[20px]" />,
    count: 0,
    description: "all users",
    bg: "#F87315",
    path: "/users",
  },
  {
    title: "NEW APP",
    icon: <BsPlusLg className="font-semibold text-white text-[20px]" />,
    count: 0,
    description: "add new application",
    bg: "#EC4899",
    path: '',
  },
  {
    title: "NEW USER",
    icon: <BsPlusLg className="font-semibold text-white text-[20px]" />,
    count: 0,
    description: "add new user",
    bg: "#0BA5E9",
    path: '',
  },
];



export const routes = [
  {
    path: "/",
    name: "OVERVIEW",
    icon: <GiCloverSpiked className="text-2xl font-semibold " />,
  },
  {
    path: "/apps",
    name: "APPLICATION",
    icon: <GrAppleAppStore className="text-2xl font-semibold " />,
  },
  {
    path: "/users",
    name: "USERS(ALL)",
    icon: <FaUsers className="text-2xl font-semibold " />,
  },
  {
    path: "/users-active",
    name: "USERS(ACTIVE)",
    icon: <FaUsers className="text-2xl font-semibold " />,
  },
  {
    path: "/merchant-signup",
    name: "MERCHANT SIGNUP",
    icon: <FaUsers className="text-2xl font-semibold " />,
  },
];