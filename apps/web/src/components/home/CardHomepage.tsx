export default function CardHomePage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="card-homepage">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  );
}
