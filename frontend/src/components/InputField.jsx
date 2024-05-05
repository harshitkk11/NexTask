import React, { useState } from "react";

const InputField = ({
  label,
  type,
  name,
  autocomplete,
  placeholder,
  onchange,
  value,
  disable,
  error,
}) => {
  return (
    <div>
      <div className="max-w-sm space-y-4">
        <label
          htmlFor={label}
          className="mb-2 block text-sm font-medium text-text-color-light dark:text-text-color-dark"
        >
          {label}
        </label>
        <input
          type={type}
          id={label}
          name={name}
          className={`block w-full rounded-lg border border-input-text-light bg-input-background-light px-4 py-3 text-sm text-input-text-light outline-1 outline-button-hover-light dark:border-input-text-dark dark:bg-input-background-dark dark:text-input-text-dark dark:outline-button-hover-dark ${error && "border-error-light dark:border-error-dark"}`}
          required=""
          aria-describedby={label}
          autoComplete={autocomplete}
          placeholder={placeholder}
          disabled={disable}
          onChange={onchange}
          value={value}
        />
      </div>
      {error && (
        <p className={`mt-1 text-base text-error-light dark:text-error-dark`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
