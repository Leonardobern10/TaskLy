const styles = {
  containerCommentText: "text-sm",
};

type CommentTextProps = {
  text: string;
};

export default function CommentText({ text }: CommentTextProps) {
  return (
    <p className={styles.containerCommentText}>
      <em>"{text}"</em>
    </p>
  );
}
