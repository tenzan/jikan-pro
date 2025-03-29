import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const AuthButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        className={cn("w-full", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
AuthButton.displayName = "AuthButton";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const AuthInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        className={cn("w-full", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
AuthInput.displayName = "AuthInput";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const AuthLabel = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Label
        className={cn("", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
AuthLabel.displayName = "AuthLabel";

export { AuthButton, AuthInput, AuthLabel };
