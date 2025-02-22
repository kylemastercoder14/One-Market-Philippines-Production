/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import {
  ArrowDownCircle,
  FilePenLine,
  Loader2,
  MessageCircle,
  RefreshCcw,
  Send,
  Square,
  X,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import FeedbackForm from '@/components/forms/feedback-form';

const Chatbot = ({userId}: {userId: string | null;}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const [showFeedbackIcon, setShowFeedbackIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const feedbackIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
        setShowFeedbackIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
        setShowFeedbackIcon(false);
        setIsFeedbackOpen(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleFeedback = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
  } = useChat({
    api: "/api/gemini",
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bg-white py-3 rounded-md shadow border bottom-6 right-6 z-50"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <Button
                ref={chatIconRef}
                onClick={toggleChat}
                size="sm"
                className="h-14"
                variant="ghost"
              >
                {!isChatOpen ? (
                  <div className="flex items-center flex-col">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">Ask AI</span>
                  </div>
                ) : (
                  <div className="flex items-center flex-col">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs">Close</span>
                  </div>
                )}
              </Button>
              <Button
                ref={feedbackIconRef}
                onClick={toggleFeedback}
                size="sm"
                variant="ghost"
                className="h-14"
              >
                {!isFeedbackOpen ? (
                  <div className="flex items-center flex-col gap-1">
                    <FilePenLine className="w-4 h-4" />
                    <span className="text-xs">Feedback</span>
                  </div>
                ) : (
                  <div className="flex items-center flex-col">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs">Close</span>
                  </div>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-44 right-4 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-lg font-bold">
                  Chat with 1 Market Philippines AI
                </CardTitle>
                <Button
                  onClick={toggleChat}
                  size="sm"
                  variant="ghost"
                  className="px-2 py-0"
                >
                  <X className="size-4" />
                  <span className="sr-only">Close Chat</span>
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="pr-4 h-[300px]">
                  {messages?.length === 0 && (
                    <div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3">
                      No message yet.
                    </div>
                  )}
                  {messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                    >
                      <div
                        className={`inline-block p-2.5 rounded-lg ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <ReactMarkdown
                          children={message.content}
                          remarkPlugins={[remarkGfm]}
                          components={{
                            code({
                              node,
                              className,
                              children,
                              inlist,
                              ...props
                            }) {
                              return inlist ? (
                                <code
                                  {...props}
                                  className="bg-gray-200 px-1 rounded"
                                >
                                  {children}
                                </code>
                              ) : (
                                <pre
                                  {...props}
                                  className="bg-gray-200 p-2 rounded"
                                  ref={props.ref as React.Ref<HTMLPreElement>}
                                >
                                  <code>{children}</code>
                                </pre>
                              );
                            },
                            ul: ({ children }) => (
                              <ul className="list-disc ml-4">{children}</ul>
                            ),
                            ol: ({ children }) => (
                              <li className="list-decimal ml-4">{children}</li>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="w-full items-center justify-center flex gap-3">
                      <Loader2 className="animate-spin size-6" />
                    </div>
                  )}
                  <div ref={scrollRef}></div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-5"
                >
                  {error && (
                    <div className="w-full items-center justify-center flex-col flex gap-2">
                      <div className="text-sm">
                        There was an error generating a response.
                      </div>
                      <Button type="button" size="sm" onClick={() => reload()}>
                        <RefreshCcw className="w-4 h-4" />
                        Regenerate response
                      </Button>
                    </div>
                  )}
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      className="flex-1"
                      placeholder="Chat with AI..."
                    />
                    {isLoading ? (
                      <Button
                        className="h-8 w-8"
                        type="button"
                        size="icon"
                        aria-label="Stop generating"
                        onClick={() => stop()}
                      >
                        <Square
                          className="h-3 w-3 animate-pulse"
                          fill="currentColor"
                        />
                      </Button>
                    ) : (
                      <Button
                        className="h-8 w-8 transition-opacity"
                        type="submit"
                        size="icon"
                        disabled={isLoading || input === ""}
                        aria-label="Send message"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isFeedbackOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-44 right-4 z-50 w-[95%] md:w-[500px]"
          >
            <Card className="border-2">
              <CardHeader>
                <div className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg font-bold">
                    We are here to improve your experience!
                  </CardTitle>
                  <Button
                    onClick={toggleFeedback}
                    size="sm"
                    variant="ghost"
                    className="px-2 py-0"
                  >
                    <X className="size-4" />
                    <span className="sr-only">Close Chat</span>
                  </Button>
                </div>
                <CardDescription>Your feedback matters! Please tell us what you think of our website below.</CardDescription>
              </CardHeader>
              <CardContent>
                <FeedbackForm userId={userId} />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
