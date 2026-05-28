import React, { type ComponentProps } from "react";

type Props = ComponentProps<"div">;

export const Container: React.FC<Props> = ({ ...props }) => {
  return (
    <div {...props} className={`w-[90%] max-w-275 mx-auto ${props.className}`}>
      {props.children}
    </div>
  );
};
