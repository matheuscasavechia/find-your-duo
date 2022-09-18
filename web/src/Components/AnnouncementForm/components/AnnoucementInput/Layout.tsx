import { IInputProps } from "./types";

export const Layout = (props: IInputProps): JSX.Element => {
  return (
    <input
      {...props}
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
    />
  );
};
