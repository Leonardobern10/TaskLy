import type { Comments } from "@/types/CommentsType";
import { Separator } from "../ui/separator";
import CommentTime from "./CommentTime";
import CommentBody from "./CommentBody";

export default function CommentsComponent({
  id,
  author,
  createdAt,
  text,
}: Comments) {
  return (
    <div key={id} className="flex w-full flex-col justify-between px-2">
      <CommentBody text={text} author={author!} />
      <CommentTime createdAt={createdAt} />
      <Separator />
    </div>
  );
}
