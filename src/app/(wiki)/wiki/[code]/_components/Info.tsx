import Image from "next/image";
import UserDafalutImage from "public/icons/defaultProfile.svg";
import ArrowdownImage from "public/icons/arrowdown.svg";
import { InfoType } from "./TypeList";

type ProfileCardProps = {
  userData: InfoType;
  image: string | null;
  toggleActive: () => void;
  isToggleActive: boolean;
};

const labels: Record<keyof InfoType, string> = {
  city: "거주 도시",
  mbti: "MBTI",
  job: "직업",
  sns: "SNS 계정",
  birthday: "생일",
  nickname: "별명",
  bloodType: "혈액형",
  nationality: "국적",
};

function Info({ userData, image, toggleActive, isToggleActive }: ProfileCardProps) {
  return (
    <section
      className={`flex flex-col rounded-xl border-none px-5 py-3 shadow-lg shadow-gray-300 transition-all duration-300 ease-in-out md:px-5 md:py-6 xl:h-[671px] xl:max-w-[320px] xl:p-[30px] ${isToggleActive ? "h-[300px] md:h-[320px]" : "h-[120px] md:h-[145px]"}`}
    >
      <article className="flex gap-5 md:gap-8 xl:flex-col xl:gap-[30px]">
        <div className="relative h-[62px] w-[62px] overflow-hidden rounded-full md:h-[71px] md:w-[71px] xl:m-[30px] xl:h-[200px] xl:w-[200px]">
          {image ? (
            <Image layout="fill" className="object-cover" src={image} alt="프로필" />
          ) : (
            <UserDafalutImage layout="fill" className="object-cover" />
          )}
        </div>

        <div
          className={`flex flex-col gap-2 truncate transition-all duration-300 ease-in-out xl:h-[304px] xl:gap-4 ${isToggleActive ? "h-[250px] md:h-[255px]" : "h-[85px] md:h-[90px]"}`}
        >
          {Object.entries(userData).map(([key, value]) => (
            <div key={key} className="flex gap-5">
              <div className="text-12 md:text-14 w-20 text-gray-400">{labels[key as keyof InfoType]}</div>
              <div className="text-12 md:text-14 truncate text-gray-800">{value.length > 0 ? value : "???"}</div>
            </div>
          ))}
        </div>
      </article>
      <button className="mx-auto xl:hidden" type="button" onClick={toggleActive}>
        <ArrowdownImage
          width={24}
          height={24}
          className={`transform transition-transform duration-300 ease-in-out ${isToggleActive ? "rotate-180" : ""}`}
          alt={`${isToggleActive ? "접기" : "펼치기"}`}
        />
      </button>
    </section>
  );
}

export default Info;
