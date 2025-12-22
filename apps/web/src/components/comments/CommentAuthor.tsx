export default function CommentAuthor({ author }: { author: string }) {
  return (
    <p>
      <span className="font-bold">{author}</span>
    </p>
  );
}
