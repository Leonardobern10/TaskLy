import { IoPerson } from "react-icons/io5";
import CommentAuthor from "./CommentAuthor";
import CommentText from "./CommentText";

export default function CommentBody({
  author,
  text,
}: {
  author: string;
  text: string;
}) {
  return (
    <div className="flex flex-col gap-y-4 w-full text-sm">
      <div className="flex items-center gap-x-1">
        <div className="p-1">
          <IoPerson />
        </div>
        {author && <CommentAuthor author={author} />}
      </div>
      <CommentText text={text} />
    </div>
  );
}
