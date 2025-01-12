import { useCallback, useEffect, useState } from "react";
import getComment, { ICommentList } from "@/apis/comment/getComment";
import { IUser } from "@/types/user.type";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface ICommentSection {
  id: number;
  user: IUser | null;
}

const COMMENT_LIMIT = 10;

function CommentSection({ id, user }: ICommentSection) {
  const [commentList, setCommentList] = useState<ICommentList[] | null>(null);

  const fetchArticleComment = useCallback(async () => {
    try {
      const data = await getComment({ articleId: id, limit: COMMENT_LIMIT });
      setCommentList(data?.list);
    } catch (error) {
      console.error("Failed to fetch Article Comment: ", error);
    }
  }, [id]);

  useEffect(() => {
    fetchArticleComment();
  }, [fetchArticleComment]);

  return (
    <section>
      <div className="font-semibold leading-[1.7] text-primary-gray-500 sm:text-lg sm:leading-[1.4]">
        댓글 <span className="text-primary-green-200">{commentList?.length}</span>
      </div>
      <CommentForm articleId={id} onCommentSubmitted={fetchArticleComment} myId={user?.id} />
      <ul className="grid gap-[14px] sm:gap-4 lg:gap-6">
        {commentList?.map(comment => (
          <CommentList list={comment} key={comment.id} myId={user?.id} onChangeApi={fetchArticleComment} />
        ))}
      </ul>
    </section>
  );
}

export default CommentSection;
