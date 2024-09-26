/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable func-names */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import LinkImage from "public/icons/link.svg";
import getProfilesCode from "@/apis/profile/getProfilesCode";
import getProfilesCodePing from "@/apis/profile/getProfilesCodePing";
import patchProfilesCode from "@/apis/profile/patchProfilesCode";
import getUsersMe from "@/apis/user/getUsersMe";
import CommonModal from "@/components/CommonModal";
import { useToast } from "@/context/ToastContext";
import WikitBucketEditor from "./_components/WikitBucketEditor";
import QuizModal from "./_components/QuizModal";
import { WIKI_FULL_DATA, INFO_DATA } from "./_components/defalutValue";
import { InfoType } from "./_components/TypeList";
import Button from "./_components/Button";
import EditInfo from "./_components/EditInfo";
import Info from "./_components/Info";

function Wiki({ params }: { params: { code: string } }) {
  const { code } = params;
  const { popupToast } = useToast();

  const [wikiData, setWikiData] = useState(WIKI_FULL_DATA);
  const [userData, setUserData] = useState<InfoType>(INFO_DATA);
  const [formData, setFormData] = useState({});
  const [opened, closeModal] = useState(false);
  const [myWiki, setMyWiKi] = useState(false);
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editing, setEditing] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [clearTime, setClearTime] = useState<ReturnType<typeof setTimeout> | undefined>();

  const handleActiveModal = () => {
    if (clearTime) {
      clearTimeout(clearTime);
      setClearTime(undefined);
    }
    closeModal(!opened);
  };

  const handleActiveEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    const getWikiDataByCode = async () => {
      try {
        const users = await getUsersMe();

        const myWikiPage = code === users.profile.code;
        setMyWiKi(myWikiPage);

        const selectPageCode = code;
        const returnData = await getProfilesCode(selectPageCode);
        setWikiData(returnData);

        const { city, mbti, job, sns, birthday, nickname, bloodType, nationality } = returnData;
        const infoTemplateData: InfoType = {
          city,
          mbti,
          job,
          sns,
          birthday,
          nickname,
          bloodType,
          nationality,
        };
        setUserData(infoTemplateData);

        const pageUrl: string = window.location.href;
        setUrl(pageUrl);

        const FormData = {
          securityAnswer: "",
          securityQuestion: returnData.securityQuestion,
          nationality: returnData.nationality,
          family: returnData.family,
          bloodType: returnData.bloodType,
          nickname: returnData.nickname,
          birthday: returnData.birthday,
          sns: returnData.sns,
          job: returnData.job,
          mbti: returnData.mbti,
          city: returnData.city,
          image: returnData.image,
          content: returnData.content,
        };
        setFormData(FormData);
      } catch (e) {
        console.error("failed to fetch", e);
      }
    };
    getWikiDataByCode();
  }, [code]);

  const toggleActive = () => {
    setIsToggleActive(!isToggleActive);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeData = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);

    const responseData = await patchProfilesCode(code, formData);
    if (responseData) {
      popupToast({ color: "red", pos: "top", message: "데이터 반영이 실패하였습니다.", width: 320 });
      setEdit(false);
    }
  };

  const handleUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    popupToast({ color: "green", pos: "top", message: "위키 링크가 복사되었습니다.", width: 320 });
  };

  // 5분 타임 아웃시 자동 에디터 종료...
  const handleTimeout = (clearId: ReturnType<typeof setTimeout> | undefined) => {
    const TIME_OUT_LIMIT = 5 * 60 * 1000;
    if (clearId) {
      clearTimeout(clearId);
      setClearTime(undefined);
    }

    const id: ReturnType<typeof setTimeout> | undefined = setTimeout(function () {
      popupToast({
        color: "red",
        pos: "top",
        message: "5분 이상 글을 쓰지 않아 수정 권한이 만료되었어요!!",
        width: 500,
      });
      setEdit(false);
      setClearTime(id);
      setEditing(false);
    }, TIME_OUT_LIMIT);
  };

  // 다른 유저가 수정중인지 확인..
  const handleEditingCheck = async (editWikiCode: string) => {
    const editingCheck = await getProfilesCodePing(editWikiCode);
    if (editingCheck) {
      popupToast({
        color: "red",
        pos: "top",
        message: "누군가가 글을 수정하고 있네요? 잠시 기다려 주실래요..",
        width: 500,
      });
      setEditing(true);
    }
  };

  const handleActive = () => {
    handleEditingCheck(code);
    if (!editing) {
      closeModal(!opened);
    }
  };

  const handleEditEnd = () => {
    console.log(formData);
    setEditing(false);
    if (clearTime) {
      clearTimeout(clearTime);
      setClearTime(undefined);
    }
  };

  return (
    <>
      <main className="mx-auto h-full max-w-[744px] md:max-w-[1200px] xl:max-w-[1520px]">
        <section className="mx-5 mt-8 flex flex-col justify-between gap-3 md:mx-20 md:gap-6">
          <div className="flex flex-col justify-between gap-6 md:gap-8 xl:mr-[450px] xl:max-w-[860px]">
            <div className="px-auto flex h-[43px] justify-between">
              <span className="text-[32px] font-semibold leading-none text-gray-800 md:text-[48px]">
                {wikiData.name}
              </span>
              {wikiData?.content.length > 0 && (
                <Button onClick={handleActive}>{`${editing ? "편집중.." : "위키 참여하기"}`}</Button>
              )}
            </div>

            {!edit && (
              <button
                className="flex h-[34px] max-w-[240px] items-center gap-1 rounded-[10px] bg-green-100 px-[10px] text-green-500 hover:brightness-95"
                onClick={handleUrl}
              >
                <LinkImage width={35} height={35} alt="링크" />
                <div className="truncate text-sm font-normal">{url}</div>
              </button>
            )}
          </div>

          {edit ? (
            <form
              className="flex min-h-[1100px] flex-col gap-[15px] xl:mx-auto xl:max-w-[1700px]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-[15px] md:gap-[10px] xl:fixed xl:left-[70%] xl:top-[120px] xl:flex-col-reverse">
                <div className="flex h-10 items-center justify-end md:mb-[10px]">
                  <div className="flex gap-[10px] xl:mt-3">
                    <Button onClick={handleEditEnd}>취소</Button>
                    <Button type="submit" onClick={handleEditEnd}>
                      저장
                    </Button>
                  </div>
                </div>

                {myWiki ? (
                  <EditInfo handleChangeData={handleChangeData} image={wikiData.image} handleChange={handleChange} />
                ) : (
                  <Info
                    userData={userData}
                    image={wikiData.image}
                    toggleActive={toggleActive}
                    isToggleActive={isToggleActive}
                  />
                )}
              </div>
              <div className="flex flex-col gap-4 md:mt-[30px] xl:mr-[650px] xl:mt-0 xl:min-w-[700px] xl:max-w-[1120px]">
                <WikitBucketEditor initialData={wikiData.content} handleChangeData={handleChangeData} />
              </div>
            </form>
          ) : (
            <>
              <div className="xl:fixed xl:left-[70%] xl:top-[120px]">
                <Info
                  userData={userData}
                  image={wikiData.image}
                  toggleActive={toggleActive}
                  isToggleActive={isToggleActive}
                />
              </div>

              {wikiData?.content.length > 0 && (
                <div className="yu" style={{ maxWidth: "70%" }}>
                  <ReactMarkdown children={wikiData.content} rehypePlugins={[rehypeRaw]} />
                </div>
              )}

              {wikiData?.content.length === 0 && (
                <div className="mt-8 flex h-auto flex-col items-center justify-center rounded-[10px] bg-gray-100 p-12 xl:mr-[400px] xl:max-w-[860px]">
                  <span className="text-16 text-gray-400">작성된 내용이 없어요!!</span>
                  <span className="text-16 mb-5 text-gray-400">위키 한번 해보실까요?</span>
                  <Button onClick={handleActive}>시작하기</Button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <CommonModal active={opened} close={handleActiveModal}>
        <QuizModal
          code={code}
          securityQuestion={wikiData.securityQuestion}
          handleActiveEdit={handleActiveEdit}
          handleActiveModal={handleActiveModal}
          handleTimeout={handleTimeout}
          clearTime={clearTime}
          handleChangeData={handleChangeData}
        />
      </CommonModal>
    </>
  );
}

export default Wiki;
