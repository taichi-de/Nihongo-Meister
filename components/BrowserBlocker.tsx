export default function BrowserBlocker() {
  return (
    <div className="w-[375px] fixed top-0 left-0 h-[8%] bg-gray-300 shadow-sm shadow-gray-400 mx-auto">
      <div className="flex items-center w-full h-full">
        <div className="font-bold font-mono text-sky-500 mx-4">Google</div>
        <input
          type="text"
          placeholder="suchen"
          className="border-1 border-black rounded-md w-50 px-2"
        />
      </div>
    </div>
  );
}
