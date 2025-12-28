const styles = {
  commentTimeText: "text-primary/60 text-sm",
};

type CommentTimeProps = {
  createdAt: Date;
};

export default function CommentTime({ createdAt }: CommentTimeProps) {
  return (
    <p className={styles.commentTimeText}>
      Criado em: <span>{new Date(createdAt).toLocaleDateString("pt-BR")}</span>
    </p>
  );
}
