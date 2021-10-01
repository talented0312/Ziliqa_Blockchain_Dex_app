import { FormControlLabel, FormGroup, Switch, IconButton } from "@material-ui/core";
import DarkIcon from "@material-ui/icons/Brightness2Rounded";
import LightIcon from "@material-ui/icons/Brightness4Rounded";
import { makeStyles } from "@material-ui/styles";
import { actions } from "app/store";
import { RootState } from "app/store/types";
import { AppTheme } from "app/theme/types";
import { hexToRGBA } from "app/utils";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSwitchProps } from "./types";

const THEME_TOGGLE_SELECTED = "light";

interface ToggleSwitchProps extends ThemeSwitchProps {
  singleButton?: boolean;
}

const useStyles = makeStyles((theme: AppTheme) => ({
  root: (props: ThemeSwitchProps) => ({
    "& .MuiSwitch-track": {
      position: "relative",
      ...(props.forceDark && {
        backgroundColor: `rgba${hexToRGBA("#00FFB0", 0.5)}`,
      }),
    },
    "& .Mui-checked+.MuiSwitch-track": {
      backgroundColor: `rgba${hexToRGBA("#003340", 0.5)}`,
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.type === "dark" ? "#00FFB0" : "#003340",
      width: 14,
      height: 14,
    },
    "& .MuiSwitch-switchBase": {
      padding: "12px 12px",
    },
  }),
  label: {
    marginLeft: theme.spacing(1),
    marginRight: 0,
    color:
      theme.palette.type === "dark"
        ? `rgba${hexToRGBA("#DEFFFF", 0.5)}`
        : "#003340",
  },
  icon: {
    fontSize: "1.4rem",
    verticalAlign: "middle",
  },
}));

const ThemeSwitch: React.FC<ToggleSwitchProps> = (props: ToggleSwitchProps) => {
  const { className, forceDark, singleButton, ...rest } = props;
  const classes = useStyles(props);

  const themeType = useSelector<RootState, string>(
    (state) => state.preference.theme
  );
  const dispatch = useDispatch();

  const onToggleTheme = () => {
    const theme = themeType === "light" ? "dark" : "light";
    dispatch(actions.Preference.update({ theme }));
  };

  if (singleButton) return (
    <IconButton onClick={() => onToggleTheme()}>
      {themeType === "dark"
        ?
        <LightIcon className={clsx(classes.label, classes.icon, className)} />
        :
        <DarkIcon className={clsx(classes.label, classes.icon, className)} />}
    </IconButton>
  )

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            color="secondary"
            checked={themeType === THEME_TOGGLE_SELECTED}
            onChange={() => onToggleTheme()}
            {...rest}
            className={clsx(classes.root, className)}
          />
        }
        label={
          themeType === "dark" ? (
            <LightIcon className={classes.icon} />
          ) : (
            <DarkIcon className={classes.icon} />
          )
        }
        labelPlacement="start"
        className={classes.label}
      />
    </FormGroup>
  );
};

export default ThemeSwitch;
