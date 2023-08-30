const Search = () => {
  return (
    <div className="flex flex-row-reverse p-8 w-full bg-red-700 dark:bg-slate-800 ">
      <button>Search</button>
      <input type="text" className=" mr-4 p-2 font-serif w-96 " placeholder="Ingrese el nombre de vinilo" />
    </div>
  );
};

export default Search;
