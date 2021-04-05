import { FC } from "react";
import { Select, InputLabel } from "@material-ui/core";
import useStyles from "../styles/ControllerStyles";

const Selector: FC<{
  name: string;
  value: number | string;
  changeOptions: Function;
  children?: any;
}> = ({ name, value, changeOptions, children }) => {
  const styles = useStyles();
  return (
    <div className={styles.items}>
      <InputLabel className={styles.formText} id={`${name}-label`}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </InputLabel>
      <Select
        id={name}
        name={name}
        labelId={`${name}-label`}
        value={value}
        onChange={(ev) => changeOptions(ev.target.name, ev.target.value)}
        displayEmpty
        className={styles.formText}
      >
        {children}
      </Select>
    </div>
  );
};

export default Selector;
