import { Stack } from "@mui/material";
import { useEffect, Dispatch } from "react";

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * 일단은 초단위로만 카운트한다.
 */
function Timer(props: {
  milliseconds: number;
  onChange: Dispatch<number>;
  className?: string;
  timeOutText?: string;
}) {
  // prop destruction
  const { milliseconds, onChange, className, timeOutText } = props;
  // lib hooks
  // state, ref hooks
  // query hooks
  // calculated values
  // effects
  useEffect(() => {
    if (milliseconds > 0) {
      const timer = setInterval(() => {
        //@ts-expect-error
        onChange((prev) => prev - 1000);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [milliseconds]);
  // handlers
  return (
    <Stack direction="row" className={className} css={{ alignItems: "center" }}>
      <span
        css={{
          fontWeight: 400,
          fontFamily: "Noto Sans",
          fontSize: "14px",
          color: "#b04060",
        }}
      >
        {milliseconds > 0
          ? formatTime(Math.floor(milliseconds / 1000))
          : timeOutText}
      </span>
    </Stack>
  );
}

export { Timer };
