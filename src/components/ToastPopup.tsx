import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import AlertIcon from "public/icons/snackbar_alert.svg";
import InfoIcon from "public/icons/snackbar_info.svg";
import CheckIcon from "public/icons/snackbar_check.svg";

export default function ToastPopup({
  message,
  position,
  color,
  width,
}: {
  message: string;
  position: "top" | "bottom";
  color: "red" | "green" | "gray";
  width: number;
}) {
  return createPortal(
    <AnimatePresence>
      <motion.aside
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="absolute top-10 flex h-[99dvh] w-[99dvw] justify-center py-[30px] xl:py-[50px]"
      >
        <div
          className={`absolute flex h-[42px] w-[${width}px] max-w-[860px] items-center justify-start gap-x-[15px] rounded-[1rem] px-[15px] py-[12px] md:h-[50px] md:px-[20px] md:py-[13px] ${`bg-primary-${color}-100`} shadow-[0px_2px_8px_rgba(0,0,0,0.25)] backdrop-opacity-5 ${
            position === "top" ? "animate-toast-top" : "animate-toast-bottom"
          }`}
        >
          {color === "red" && <AlertIcon width={20} height={20} />}
          {color === "green" && <CheckIcon width={20} height={20} />}
          {color === "gray" && <InfoIcon width={20} height={20} />}
          <p className={`text-body text-sm font-normal leading-6 text-primary-${color}-300`}>{message}</p>
        </div>
      </motion.aside>
    </AnimatePresence>,
    document.body,
  );
}
