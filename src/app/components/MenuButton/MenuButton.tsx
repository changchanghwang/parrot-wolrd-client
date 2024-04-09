import React, { useRef, useState } from "react";
import {
  Stack,
  styled,
  SvgIconProps,
  SvgIcon,
  MenuItem,
  Typography,
  menuClasses,
} from "@mui/material";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";
import MuiHoverMenu from "material-ui-popup-state/HoverMenu";
import { Link, LinkProps } from "react-router-dom";

const MenuLink = styled((props: LinkProps) => (
  <Link {...props}>{props.children}</Link>
))({
  height: "100%",
  textDecoration: "none",
  color: "#000",
  boxSizing: "border-box",
  fontSize: "16px",
  fontWeight: "bold",
  transition: ".4s",
  "&.active": {
    color: "#5555ff",
    "& path:nth-of-type(2)": { fill: "#5555ff" },
  },
  "&:hover": {
    color: "#5555ff",
    "& .MuiTouchRipple-root": { backgroundColor: "rgba(1,93,238,0.05)" },
  },
});

const DownArrow = styled((props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <g fill="none" fillRule="evenodd">
        <path opacity=".87" d="M24 24H0V0h24z" />
        <path
          fillOpacity=".87"
          fill="#000"
          d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
        />
      </g>
    </SvgIcon>
  );
})({
  margin: "0 0 0 4px",
});

const UpArrow = styled((props: SvgIconProps) => {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <g fill="none" fillRule="evenodd">
        <path opacity=".87" d="M0 0h24v24H0z" />
        <path
          fill="#5555ff"
          d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"
        />
      </g>
    </SvgIcon>
  );
})({
  margin: "0 0 0 4px",
});

const HoverMenu = styled(MuiHoverMenu)({
  "& ul": {
    padding: "0",
  },
  "& li:hover": { backgroundColor: "#fff" },
});

export const headerDropdownMenuClasses = {
  content: "dropdown-content",
} as const;

function MenuButton(props: {
  className?: string;
  items: { to: string; title: React.ReactNode }[];
  children: React.ReactNode;
}) {
  // prop destruction
  const { items, children, className } = props;

  // lib hooks
  const popupState = usePopupState({
    variant: "popover",
    popupId: `${children}`,
  });

  // state, ref, querystring hooks
  const ref = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers

  return (
    <>
      <Stack
        direction="column"
        className={className}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        ref={ref}
      >
        <MenuLink to={items[0].to} {...bindHover(popupState)}>
          <Stack
            direction="row"
            className={headerDropdownMenuClasses.content}
            css={{ padding: "12px 16px", fontWeight: 600 }}
          >
            {children}
            {isHover ? <UpArrow /> : <DownArrow />}
          </Stack>
        </MenuLink>
      </Stack>
      <HoverMenu
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        css={{
          [`& .${menuClasses.paper}`]: {
            width: ref.current?.clientWidth,
            borderRadius: "0px",
            boxShadow: "none",
          },
          marginTop: "2px",
        }}
      >
        {items.map((item, i) => {
          return (
            <MenuLink key={item.to} to={item.to}>
              <MenuItem
                css={{
                  border: "3px solid #AFAFFF",
                  borderBottom: items.length - 1 !== i ? "0" : undefined,
                  width: "100%",
                }}
                onClick={popupState.close}
              >
                <Typography component="span">{item.title}</Typography>
              </MenuItem>
            </MenuLink>
          );
        })}
      </HoverMenu>
    </>
  );
}

export { MenuButton };
