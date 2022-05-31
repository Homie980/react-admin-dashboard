import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../data/avatar.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";

interface Props {
  title: string;
  customFunction: () => void;
  icon: JSX.Element;
  color: string;
  dotColor: string;
}

const NavButton: React.FC<Props> = ({
  title,
  customFunction,
  icon,
  color,
  dotColor,
}) => {
  return (
    <TooltipComponent content={title} position="BottomCenter">
      <button type="button" onClick={customFunction} style={{ color }} className="relative text-xl rounded-full p-3 hover:bg-light-gray">
        <span style={{ background: dotColor }} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2" />
        {icon}
      </button>
    </TooltipComponent>
  );
};

const Navbar: React.FC = () => {
  const { activeMenu, setActiveMenu, isClicked, setisClicked, handleClick, screenSize, setScreenSize } = useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (typeof screenSize === 'number') {
      if (screenSize <= 900) {
        setActiveMenu(false)
      } else {
        setActiveMenu(true)
      }
    }
  }, [screenSize])

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunction={() => setActiveMenu((prevState) => !prevState)}
        color="blue"
        icon={<AiOutlineMenu />}
        dotColor=""
      />
      <div className="flex">
        <NavButton
          title="Cart"
          customFunction={() => handleClick('cart')}
          color="blue"
          icon={<FiShoppingCart />}
          dotColor=""
        />
        <NavButton
          title="Chat"
          customFunction={() => handleClick('chat')}
          color="blue"
          icon={<BsChatLeft />}
          dotColor="#03C9D7"
        />
        <NavButton
          title="Notifications"
          customFunction={() => handleClick('notification')}
          color="blue"
          icon={<RiNotification3Line />}
          dotColor="#03C9D7"
        />
        <TooltipComponent
          content="Profile" position="BottomCenter"
        >
          <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img src={avatar} className="rounded-full w-8 h-8" />
            <p>
              <span className="text-gray-400 text-14">Hi, </span> {' '}
              <span className="text-gray-400 font-bold ml-1 text-14">Abood</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
