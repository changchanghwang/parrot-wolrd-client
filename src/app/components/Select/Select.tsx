import {
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";

function Select(props: {
  value: string;
  variant?: "standard" | "outlined" | "filled";
  onChange: (event: SelectChangeEvent) => void;
  options: { label: ReactNode; value: string }[];
}) {
  // prop destruction
  const { options, onChange, value, variant = "outlined" } = props;
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects`
  // handlers
  return (
    <MuiSelect value={value} onChange={onChange} variant={variant}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
}

export { Select };
