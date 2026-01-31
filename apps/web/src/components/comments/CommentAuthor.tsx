const styles = {
  commentAuthorContainer: "font-bold",
};

type CommentAuthorProps = {
  author: string;
};

export default function CommentAuthor({ author }: CommentAuthorProps) {
  return <p className={styles.commentAuthorContainer}>{author}</p>;
}
