export default function CommentTime({ createdAt }: { createdAt: Date }) {
  return (
    <p className="text-primary/60 text-sm">
      Criado em: <span>{new Date(createdAt).toLocaleDateString("pt-BR")}</span>
    </p>
  );
}
