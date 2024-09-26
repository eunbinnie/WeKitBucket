"use client";

import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import postArticles, { ArticleInput } from "@/apis/article/postArticles";
import patchArticlesId from "@/apis/article/patchArticlesId";
import getArticlesId from "@/apis/article/getArticlesId";
import getUsersMe from "@/apis/user/getUsersMe";
import Modal from "@/components/modal/Modal";
import CustomButton from "./CustomButton";
import MantineEditor from "./mantineEditor";

const titleMaxLength = 30;
const storageKey = "draftArticle";

interface AddBoardClientProps {
  articleId?: number;
  initialTitle?: string;
  initialImageUrl?: string;
}

interface ContentLength {
  withSpaces: number;
  withoutSpaces: number;
}

function AddBoardComponent({ articleId, initialTitle = "", initialImageUrl }: AddBoardClientProps) {
  const [title, setTitle] = useState(initialTitle);
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);
  const [contentLength, setContentLength] = useState<ContentLength>({ withSpaces: 0, withoutSpaces: 0 });
  const [isValid, setIsValid] = useState(false);
  const [authorName, setAuthorName] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [isModalActive, setIsModalActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const editorRef = useRef<{ getHTML: () => string; loadContent: (content: string) => void }>(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      if (articleId) {
        try {
          const article = await getArticlesId(articleId);
          if (article) {
            setTitle(article.title);
            setImageUrl(article.image);
            setAuthorName(article.writer?.name || "Unknown");
            setCurrentDate(dayjs(article.createdAt).format("YYYY.MM.DD."));
            if (editorRef.current) {
              editorRef.current.loadContent(article.content || "");
            }
          } else {
            console.error("Article not found");
          }
        } catch (error) {
          console.error("Failed to fetch article data:", error);
        }
      } else {
        const fetchAuthorName = async () => {
          try {
            const userData = await getUsersMe();
            setAuthorName(userData?.name || "Unknown");
          } catch (error) {
            console.error("Failed to fetch author name:", error);
            setAuthorName("Unknown");
          }
        };

        fetchAuthorName();
        setCurrentDate(`${dayjs().format("YYYY.MM.DD")}.`);
        const savedDraft = localStorage.getItem(storageKey);
        if (savedDraft) {
          setIsModalActive(true);
        }
      }
    };

    fetchArticleData();
  }, [articleId]);

  const handleLoadDraft = () => {
    const savedDraft = localStorage.getItem(storageKey);
    if (savedDraft) {
      const { savedTitle, savedContent, savedImageUrl } = JSON.parse(savedDraft);
      setTitle(savedTitle);
      setImageUrl(savedImageUrl);
      localStorage.removeItem(storageKey);
      if (editorRef.current) {
        editorRef.current.loadContent(savedContent);
      }
    }
    setIsModalActive(false);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(storageKey);
    setIsModalActive(false);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const editorContent = editorRef.current?.getHTML() || "";
      const articleInput: ArticleInput = {
        title,
        content: editorContent,
        image: imageUrl,
      };

      if (articleId) {
        await patchArticlesId(articleInput, articleId);
        router.push(`/boards/${articleId}`);
      } else {
        const response = await postArticles(articleInput);
        router.push(`/boards/${response.id}`);
      }

      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("게시물 등록 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditorChange = (editorContent: string, length: ContentLength) => {
    if (!isSubmitting) {
      setContentLength(length);
      localStorage.setItem(
        storageKey,
        JSON.stringify({ savedTitle: title, savedContent: editorContent, savedImageUrl: imageUrl }),
      );
    }
  };

  useEffect(() => {
    const editorContent = editorRef.current?.getHTML() || "";
    const parser = new DOMParser();
    const doc = parser.parseFromString(editorContent, "text/html");
    const textContent = doc.body.textContent || "";
    setIsValid(title.trim().length > 0 && textContent.trim().length > 0);
  }, [title]);

  return (
    <div>
      <div className="flex items-center justify-between md:mb-[25px]">
        <h2 className="sm-bold text-gray-500 md:text-md-semibold xl:text-lg-semibold">
          {articleId ? "게시물 수정하기" : "게시물 등록하기"}
        </h2>
        <div className="flex gap-[8px]">
          <CustomButton
            isActive={isValid}
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit}
            variant="secondary"
          >
            {articleId ? "수정하기" : "등록하기"}
          </CustomButton>
        </div>
      </div>
      <span className="mt-[23px] text-sm-regular-12 text-gray-400 md:text-sm-regular">
        {authorName} {currentDate}
      </span>
      <div className="mt-[18px] flex w-full items-center justify-between gap-2 border-y border-b border-gray-200 py-3 text-sm-regular md:mt-[25px]">
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
          className="md:text-xl-medium flex flex-1 items-center justify-between gap-2 text-gray-600 outline-none md:text-md-medium"
          placeholder="제목을 입력해주세요"
          maxLength={titleMaxLength}
        />
        <span className="text-sm-regular text-gray-500 md:text-md-medium">
          {title.length}/<span className="text-green-500">{titleMaxLength}</span>
        </span>
      </div>
      <p className="mt-4 text-sm-regular-14 text-gray-700 md:text-sm-regular">
        공백포함 : 총<span className="text-gray-500"> {contentLength.withSpaces}</span>자 | 공백제외: 총
        <span className="text-gray-500"> {contentLength.withoutSpaces}</span>자
      </p>
      <div className="relative">
        <div className="w-full">
          <MantineEditor ref={editorRef} setContent={handleEditorChange} initialContent="" setImageUrl={setImageUrl} />
        </div>
      </div>
      <Modal active={isModalActive} close={() => setIsModalActive(false)}>
        <div className="w-[600px] rounded-lg bg-white p-4 shadow-lg">
          <h3 className="text-xl-medium">임시 저장된 게시글이 있습니다. 불러오시겠습니까?</h3>
          <div className="mt-4 flex justify-end gap-4">
            <button className="rounded bg-primary-green-200 px-4 py-2 text-white" onClick={handleLoadDraft}>
              예
            </button>
            <button className="rounded bg-primary-gray-500 px-4 py-2 text-white" onClick={handleDiscardDraft}>
              아니오
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddBoardComponent;
