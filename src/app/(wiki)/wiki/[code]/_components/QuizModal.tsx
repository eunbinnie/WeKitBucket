import Lock from "public/icons/lock.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import postProfilesCodePing from "@/apis/profile/postProfilesCodePing";
import { useToast } from "@/context/ToastContext";
import Input from "./Input";
import Label from "./Label";
import ErrorText from "./ErrorText";
import Button from "./Button";

interface SecurityData {
  code: string;
  securityQuestion: string;
  handleActiveEdit: () => void;
  handleActiveModal: () => void;
  handleTimeout: (value: ReturnType<typeof setTimeout> | undefined) => void;
  clearTime: ReturnType<typeof setTimeout> | undefined;
  handleChangeData: (key: string, value: string) => void;
}

interface QuizInput {
  securityAnswer: string;
}

function QuizModal({
  code,
  securityQuestion,
  handleActiveEdit,
  handleActiveModal,
  handleTimeout,
  clearTime,
  handleChangeData,
}: SecurityData) {
  const { popupToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<QuizInput>({ mode: "onChange" });

  const onSubmit: SubmitHandler<QuizInput> = async data => {
    const responseData = await postProfilesCodePing(code, data);
    if (responseData) {
      handleActiveModal();
      handleActiveEdit();
      handleTimeout(clearTime);
      handleChangeData("securityAnswer", data.securityAnswer);
    } else {
      popupToast({ color: "red", pos: "top", message: "Api 처리 에러!!", width: 320 });
    }
  };

  return (
    <div className="grid gap-6">
      <div className="align-center grid justify-center gap-[10px]">
        <div className="bg-primary-gray-50 align-center grid h-[42px]">
          <Lock width="100%" height="100%" />
        </div>
        <p className="text-center text-sm-regular-14 text-primary-gray-400">
          다음 퀴즈를 맞추고
          <br />
          위키를 작성해 보세요.
        </p>
      </div>
      <div className="grid gap-[10px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="grid gap-[10px]">
              <Label htmlFor="securityAnswer" className="text-md-bold-18 text-primary-gray-500">
                {securityQuestion}
              </Label>
              <Input
                id="securityAnswer"
                placeholder="답안을 입력해 주세요"
                {...register("securityAnswer", {
                  required: true,
                })}
                validationCheck={!!errors.securityAnswer}
              />
              {errors?.securityAnswer && <ErrorText>{errors.securityAnswer?.message}</ErrorText>}
            </div>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              가입하기
            </Button>
          </div>
        </form>
        <p className="text-center text-sm-regular-14 text-primary-gray-400">
          위키드는 지인들과 함께하는 즐거운 공간입니다.
          <br />
          지인에게 상처를 주지 않도록 작성해 주세요.
        </p>
      </div>
    </div>
  );
}
export default QuizModal;
