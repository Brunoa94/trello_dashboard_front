import { TaskCard } from "@/models/task-card";
import React, { useContext, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AiOutlineOpenAI } from "react-icons/ai";
import Service from "@/core/service";
import { Button } from "../ui/button";
import { GlobalContext } from "@/context/global-context";
import { status } from "@/data/global";
import { motion } from "framer-motion";

interface Props {
  status: string;
}

const ResumeButton = (props: Props) => {
  const [resumeMessage, setResumeMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { cards } = useContext(GlobalContext);

  function returnContent() {
    const allContent = cards
      .filter((card: TaskCard) => {
        return card.status !== props.status;
      })
      .map((card: TaskCard) => {
        return card.title_id;
      })
      .toString();

    return allContent;
  }

  async function getColumnResume() {
    const contentMessage = `Give a resume of this text: ${returnContent()}`;
    const response = await Service.getChapGPTResume(contentMessage);

    setResumeMessage(response.response);
  }

  const pIndex = 1;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        onClick={() => getColumnResume()}
        className=" hover:bg-slate-100 p-2 rounded-md flex items-center gap-2"
      >
        <AiOutlineOpenAI className="text-sky-600" />
        <span className="text-xs text-sky-600 font-roboto">ChatGPT Resume</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {status[props.status]} Column Resume
          </AlertDialogTitle>
          <AlertDialogDescription>
            {resumeMessage.split("").map((char, index) => (
              <motion.span
                className="text-green-500 font-reddit text-justify"
                key={`framer-motion-span`}
                initial={{ opacity: 0 }}
                animate={{ opacity: resumeMessage.length > 0 ? 1 : 0 }}
                transition={{
                  delay: 0.1 + index * 0.01,
                  duration: 0.01,
                  ease: "easeOut",
                }}
              >
                {char}
              </motion.span>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResumeButton;
