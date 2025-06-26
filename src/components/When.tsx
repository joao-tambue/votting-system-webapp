import React, { Fragment } from "react";
import { ElseProps, WhenProps } from "../models/when.model";

const Else = ({ children }: ElseProps) => (
  <>{typeof children === "function" ? children() : children}</>
);

const When = (props: WhenProps) => {
  const { expr, children } = props;

  const condition = typeof expr === "function" ? expr() : expr;

  if (Array.isArray(children)) {
    const whenContent = children.filter(
      (child) => React.isValidElement(child) && child.type !== Else
    );
    const elseContent = children.find(
      (child) => React.isValidElement(child) && child.type === Else
    );

    return condition ? <>{whenContent}</> : <>{elseContent}</>;
  }

  return condition ? (
    <>{typeof children === "function" ? children() : children}</>
  ) : (
    <Fragment />
  );
};

When.Else = Else;

export default When;
