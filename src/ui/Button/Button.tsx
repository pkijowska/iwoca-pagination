import React from "react";
import cn from "classnames";
import styles from "./Button.module.css";

export const Button = ({ className, ...buttonProps }: {
  className?: string;
  [x: string]: any;
}) => {
  return <button className={cn(styles.button, className)} {...buttonProps} />;
};