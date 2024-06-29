import { Button, Popover } from "flowbite-react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import CustomButton from "../components/CustomButton";

const CustomModal = ({
  title,
  bClass,
  heading = "",
  popoverform,
  onsubmit,
  submitbtn = "",
  isdisabled,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      aria-labelledby="form-popover"
      open={open}
      arrow={false}
      placement="auto"
      onOpenChange={setOpen}
      className="z-50 rounded-md border-0 bg-dashboard-bg-light shadow-lg outline-none dark:bg-dashboard-bg-dark"
      content={
        <div className=" flex w-72 flex-col gap-4 p-4 text-sm text-text-color-light dark:text-text-color-dark">
          <div className="flex justify-end">
            <span
              onClick={() => setOpen(false)}
              className="cursor-pointer text-lg text-text-color-light hover:text-button-hover-light dark:text-text-color-dark dark:hover:text-button-hover-dark"
            >
              <IoClose />
            </span>
          </div>
          <h4 className="text-lg font-semibold ">{heading}</h4>
          <form className="flex flex-col gap-7" onSubmit={onsubmit}>
            {popoverform}
            <CustomButton
              title={submitbtn}
              isdisabled={isdisabled}
              classname="text-center"
            />
          </form>
        </div>
      }
    >
      <Button
        className={`border-0 text-button-text-light dark:text-button-text-dark ${bClass}`}
      >
        <p className="text-lg">{title}</p>
      </Button>
    </Popover>
  );
};

export default CustomModal;
