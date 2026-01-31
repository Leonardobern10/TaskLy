const styles = {
  commentTimeText: "text-primary/60 text-sm",
};

type CommentTimeProps = {
  createdAt: Date;
};

export default function CommentTime({ createdAt }: CommentTimeProps) {
  const renderDate = new Date(createdAt).toLocaleDateString("pt-BR");
  return (
    <p className={styles.commentTimeText}>
      Criado em: <span>{renderDate}</span>
    </p>
  );
}
