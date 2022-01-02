import { TextField } from "@mui/material";
import { styled } from "@mui/styles";

export const InputField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '& .MuiInputBase-input': {
      fontSize: 38,
    },
  },
});
