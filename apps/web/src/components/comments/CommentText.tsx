export default function CommentText({ text }: { text: string }) {
  return (
    <p className="text-sm">
      <em>"{text}"</em>
    </p>
  );
}
