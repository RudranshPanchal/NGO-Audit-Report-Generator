export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      <p className="text-gray-700 mt-3 font-medium">Generating report, please wait...</p>
    </div>
  );
}
