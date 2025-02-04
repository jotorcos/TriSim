export function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="text-red-600">Error loading translations: {message}</div>
  );
}
