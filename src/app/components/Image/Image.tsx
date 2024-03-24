import { css } from "@emotion/react";
import { Asset } from "@assets/images";

type ImageSource = {
  uri: Asset;
  width?: string;
  height?: string;
};

// NOTE: https://reactnative.dev/docs/image 인터페이스를 따를 것
function Image(
  props: { source: ImageSource; className?: string } & Pick<
    React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >,
    "alt"
  >
) {
  // prop destruction
  const {
    source: { uri, width = "100%", height = "100%" },
    className,
    alt,
    ...imageProps
  } = props;

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers

  return (() => {
    const ext = uri.split(".")[1]!;

    switch (ext) {
      case "svg":
        return (
          <div
            css={css({
              width,
              height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            })}
            className={className}
            dangerouslySetInnerHTML={{
              __html: require(`@assets/images/${uri}?source`),
            }}
          />
        );
      case "jpg":
      case "jpeg":
      case "png":
      case "webp":
      case "gif":
        return (
          <img
            {...imageProps}
            className={className}
            src={require(`@assets/images/${uri}`)}
            css={css({ width, height, objectFit: "contain" })}
            alt={alt || ""}
          />
        );
    }

    return null;
  })();
}

export { Image };
