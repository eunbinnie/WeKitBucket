import SearchIcon from "public/icons/search.svg";

function Input() {
  return (
    <form className="flex h-11 w-full items-center justify-center gap-4 rounded-xl bg-primary-gray-100 px-5 py-2">
      <SearchIcon width={23} height={22} />
      <input
        name="keyword"
        placeholder="이름을 입력해주세요"
        className="w-full bg-primary-gray-100 text-md-medium text-primary-gray-500"
      />
    </form>
  );
}

export default Input;
