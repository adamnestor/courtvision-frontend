import React from "react";
import { AlertCircle } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, type, error, ...props }: InputProps) => (
  <div className="space-y-2">
    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </label>
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
        error
          ? "border-error focus:ring-error"
          : "border-gray-200 focus:ring-gray-400"
      }`}
      {...props}
    />
    {error && (
      <div className="flex items-center text-sm text-error">
        <AlertCircle className="mr-2 h-4 w-4" />
        {error}
      </div>
    )}
  </div>
);
