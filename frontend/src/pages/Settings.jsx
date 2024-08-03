import InputField from "../components/InputField";

const Settings = () => {
  return (
    <div className="flex h-[100vh] w-full justify-center text-home-text-light dark:text-home-text-dark">
      <div className="w-56 border">
        <h3 className="px-3 text-lg font-semibold">Settings</h3>
      </div>
      <div className="w-full border"></div>
      {/* <form className="h-full w-full ">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border-0 bg-gray-400 bg-opacity-30 px-4 py-3 text-base font-medium text-home-text-light outline-none dark:bg-black dark:bg-opacity-30 dark:text-home-text-dark sm:w-1/3"
          />
        </div>
      </form> */}
    </div>
  );
};

export default Settings;
