import { makeStyles, createStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    controller: {
      backgroundColor: "#dad873",
      textAlign: "center",
      height: '815px'
    },
    header: {
      fontSize: "2rem",
      fontWeight: 800,
      margin: 0,
      paddingTop: theme.spacing(2),
    },
    grid: {
      display: "block",
      padding: theme.spacing(2),
    },
    paperForm: {
      display: "block",
      alignItems: "left",
      justifyContent: "left",
      padding: theme.spacing(2),
      backgroundColor: "#454d66",
      overflow: "auto",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "left",
      textAlign: "left",
    },
    items: {
      display: "flex",
      flexDirection: "column",
      alignItems: "left",
      justifyContent: "left",
      padding: theme.spacing(2),
    },
    formText: {
      padding: "3px 0",
      color: "#efeeb4",
    },
    paperContent: {
      color: "#efeeb4",
      textAlign: "left",
      margin: 10,
      "& h3": {
        textAlign: "center",
      },
      "& span": {
        fontWeight: "bold",
      },
    },
  })
);

export default useStyles;
