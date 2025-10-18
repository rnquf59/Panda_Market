interface ErrorMessageProps {
  error: string | null;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
      <p className="text-red-600 text-sm">{error}</p>
    </div>
  );
}
