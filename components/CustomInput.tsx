import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute } from "react";

type CustomInputParams = {
  control: any;
  name: any;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  maxLength?: number;
};

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  maxLength,
}: CustomInputParams) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-col w-full">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={type}
                maxLength={maxLength}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
