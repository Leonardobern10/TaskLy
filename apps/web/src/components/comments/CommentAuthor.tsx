const styles = {
  commentAuthorContainer: "font-bold",
};

type CommentAuthorProps = {
  author: string;
};

export default function CommentAuthor({ author }: CommentAuthorProps) {
  return (
    <p>
      <span className={styles.commentAuthorContainer}>{author}</span>
    </p>
  );
}
