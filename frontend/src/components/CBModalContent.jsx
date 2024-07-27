import React from "react";
import InputField from "./InputField";
import { CirclePicker } from "react-color";
import Button1 from "./Button1";

const CBModalContent = ({
  value,
  disable,
  error,
  onchange,
  color,
  onchangecomplete,
  buttonTitle,
  onsubmit
}) => {
  return (
    <form className="space-y-6" onSubmit={onsubmit}>
      <div className="flex flex-col items-center justify-center gap-5">
        <h3 className="text-base font-semibold">Create Board</h3>

        <InputField
          label="Board Title"
          type="text"
          name="boardtitle"
          placeholder="Board Title"
          onchange={onchange}
          value={value}
          disable={disable}
          error={error}
          autocomplete="title"
        />

        <div className="flex w-full flex-col items-center justify-center gap-4">
          <label className="w-full text-base font-semibold">Background</label>
          <CirclePicker
            color={color}
            onChangeComplete={onchangecomplete}
            className="w-full"
          />
        </div>

        <Button1 title={buttonTitle} classname="mt-5 w-full" />
      </div>
    </form>
  );
};

export default CBModalContent;
