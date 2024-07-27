const InputField = ({
  label = "",
  type = "",
  name = "",
  autocomplete = "",
  placeholder = "",
  onchange,
  value,
  disable,
  error,
}) => {
  return (
    <div className="w-full">
      <div className="w-full space-y-2">
        <label
          htmlFor={label}
          className="block w-full text-base font-semibold text-home-text-light dark:text-home-text-dark"
        >
          {label}
        </label>
        <input
          type={type}
          id={label}
          name={name}
          className={`bg-input outline-primary w-full rounded-lg border-2 px-4 py-3 text-base font-medium text-black outline-1 ${
            error ? "border-error" : "border-border"
          }`}
          required=""
          aria-describedby={label}
          autoComplete={autocomplete}
          placeholder={placeholder}
          disabled={disable}
          onChange={onchange}
          value={value}
        />
      </div>
      {error && <p className="text-error mt-1 text-base">{error}</p>}
    </div>
  );
};

export default InputField;
