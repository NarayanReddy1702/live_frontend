const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img className="w-50" src="./logo.png" alt="" />

      <div className="h-8 w-8 border-2 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
