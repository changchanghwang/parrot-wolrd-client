import {
  ButtonProps as MuiButtonProps,
  Button as MuiButton,
  CircularProgress,
} from "@mui/material";

function Button(
  props: MuiButtonProps & {
    loading?: boolean;
  }
) {
  // prop destruction
  const { size, color, loading, onClick, children, ...otherProps } = props;
  // lib hooks
  // state, ref hooks
  // form hooks
  // query hooks
  // calculated values
  // effects
  // handlers
  const circularProgressSize = size !== "small" ? 24 : 22;

  return (
    <MuiButton
      size={size}
      color={color}
      onClick={(e) => {
        if (!loading) {
          onClick?.(e);
        }
      }}
      {...otherProps}
    >
      {!loading ? (
        children
      ) : (
        <CircularProgress color="inherit" size={circularProgressSize} />
      )}
    </MuiButton>
  );
}

export { Button };
