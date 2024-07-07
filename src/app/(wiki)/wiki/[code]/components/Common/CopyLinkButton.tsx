import React from "react";
import { motion } from "framer-motion";
import LinkIcon from "@/assets/icons/link.svg";
import { CopyLink } from "../../_constants/toast";
import ToastSelect from "./ToastSelect";

interface CopyLinkButtonProps {
  url: string;
}

const LinkContainer = "inline-flex gap-2 rounded-[10px] px-3 py-2 sm:h-6.5 cursor-pointer";
const LinkText = "text-md-regular2 text-primary-green-200 ";

function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    ToastSelect({ type: "check", message: CopyLink });
  };

  return (
    <motion.button
      className={`${LinkContainer} bg-primary-green-100`}
      onClick={handleCopyToClipboard}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      <div className="inline-flex items-center gap-2">
        <div>
          <LinkIcon />
        </div>
        <span className={`${LinkText} hover:underline`}>{url}</span>
      </div>
    </motion.button>
  );
}

export default CopyLinkButton;
