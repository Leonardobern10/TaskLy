const style = {
  containerCommentText: "text-sm",
};

type CommentTextProps = {
  text: string;
};

export default function CommentText({ text }: CommentTextProps) {
  return (
    <p className={style.containerCommentText}>
      <em>"{text}"</em>
    </p>
  );
}
