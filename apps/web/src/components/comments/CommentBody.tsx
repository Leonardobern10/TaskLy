import { IoPerson } from "react-icons/io5";
import CommentAuthor from "./CommentAuthor";
import CommentText from "./CommentText";

const styles = {
  commentContainer: "flex flex-col gap-y-1 w-full text-sm",
  commentContent: "flex items-center gap-x-1",
  containerIcon: "p-1",
};

type CommentBodyProps = {
  author: string;
  text: string;
};

export default function CommentBody({ author, text }: CommentBodyProps) {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentContent}>
        <div className={styles.containerIcon}>
          <IoPerson />
        </div>
        {author && <CommentAuthor author={author} />}
      </div>
      <CommentText text={text} />
    </div>
  );
}
