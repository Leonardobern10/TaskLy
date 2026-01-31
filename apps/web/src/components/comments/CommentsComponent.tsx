import type { Comments } from "@/types/CommentsType";
import { Separator } from "../ui/separator";
import CommentTime from "./CommentTime";
import CommentBody from "./CommentBody";

const styles = {
  containerComment: "flex w-full flex-col justify-between px-2",
};

export default function CommentsComponent({
  id,
  author,
  createdAt,
  text,
}: Comments) {
  return (
    <>
      <div key={id} className={styles.containerComment}>
        <CommentBody text={text} author={author!} />
        <CommentTime createdAt={createdAt} />
      </div>
      <Separator />
    </>
  );
}
