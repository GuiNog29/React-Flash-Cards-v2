export default function Error({ children: errorMessage }) {
  return (
    <span className="bg-red-400 font-semibold text-red-900 p-2 rounded-md">
      {errorMessage}
    </span>
  );
}
