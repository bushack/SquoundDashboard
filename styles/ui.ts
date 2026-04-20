import { theme } from "./themes";

export const header = {
  flexShrink: 0,
  //display: "flex",
  //alignItems: "center",
  //justifyContent: "space-between",
  minHeight: "20px",
  padding: "3px",
  textAlign: "center",
  fontSize: theme.fontSize.small,
  fontWeight: theme.fontWeight.small,
  color: "white",
  backgroundColor: theme.colours.header,
};

export const footer = {
  flexShrink: 0,
  minHeight: "20px",
  padding: "3px",
  textAlign: "center",
  fontSize: theme.fontSize.small,
  fontWeight: theme.fontWeight.small,
  color: "white",
  backgroundColor: theme.colours.footer,
};

// Main page titles (<h1>).
export const title = {
  color: theme.colours.text,
  fontSize: theme.fontSize.title,
  fontWeight: theme.fontWeight.title,
  marginBottom: "10px",
};

// Main subheadings (<h3>).
export const heading = {
  color: theme.colours.text,
  fontSize: theme.fontSize.heading,
  fontWeight: theme.fontWeight.heading,
  marginBottom: "10px",
};

// Minor subheadings and labels.
export const labelStyle = {
  padding: "0px 10px",
  marginBottom: "5px",
  width: "100%",
  color: theme.colours.text,
  fontSize: theme.fontSize.label,
  fontWeight: theme.fontWeight.label,
};

// General text, including paragraphs, comments, etc. (<p>).
export const textStyle = {
  color: theme.colours.text,
  fontSize: theme.fontSize.regular,
  fontWeight: theme.fontWeight.regular,
  marginBottom: "20px",
};

export const inputStyleFit = {
  padding: "10px",
  marginRight: "10px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: `1px solid ${theme.colours.inputBorder}`,
  color: theme.colours.inputText,
  backgroundColor: theme.colours.inputBackground,
  fontSize: theme.fontSize.regular,
  fontWeight: theme.fontWeight.regular,
};

export const inputStyleStretch = {
  ...inputStyleFit,
  width: "100%"
};

export const inputStyle200 = {
  ...inputStyleFit,
  minWidth: "200px"
};

export const buttonStyle = {
  padding: "10px 30px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  marginRight: "10px",
  marginBottom: "10px",
  backgroundColor: theme.colours.unselected,
  color: theme.colours.textLight,
  fontSize: theme.fontSize.regular,
  fontWeight: theme.fontWeight.regular,
};

export const primaryButton = {
  ...buttonStyle,
  backgroundColor: theme.colours.primary,
  color: theme.colours.textLight,
};

export const dangerButton = {
  ...buttonStyle,
  backgroundColor: theme.colours.danger,
  color: theme.colours.textLight,
};

export const importantButton = {
  ...buttonStyle,
  padding: "10px 20px",
  backgroundColor: theme.colours.important,
  color: theme.colours.textLight,
  marginBottom: "0px",
};

export const primaryButton200 = {
  ...primaryButton,
  minWidth: "200px"
};

export const dangerButton200 = {
  ...dangerButton,
  minWidth: "200px"
};

export const sidebarButton = {
  ...buttonStyle,
  borderRadius: "10px",
  padding: "10px 20px",
  backgroundColor: theme.colours.unselected,
  color: theme.colours.textLight,
  marginBottom: "10px"
};

export const tabButton = {
  ...buttonStyle,
  marginRight: "6px",
  padding: "8px 30px",
  backgroundColor: theme.colours.unselectedTab,
  color: theme.colours.text,
  marginBottom: "0px",
  borderTopLeftRadius: "10px",
  borderTopRightRadius: "10px",
  borderBottomLeftRadius: "0px",
  borderBottomRightRadius: "0px",
};

export const untabbedCard = {
  //border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "15px",
  marginBottom: theme.margin.vspacing,
  color: theme.colours.text,
  backgroundColor: theme.colours.card,
};

export const tabbedCard = {
  ...untabbedCard,
  borderTopLeftRadius: "0px",
};

export const table = {
  width: "100%",
  fontSize: theme.fontSize.regular,
  border: "1px solid #aaa",
  marginBottom: theme.margin.vspacing,
  color: theme.colours.text,
  backgroundColor: theme.colours.card,
};

export const tableHeader = {
  textAlign: "left",
  padding: "10px 10px",
  color: theme.colours.textLight,
  backgroundColor: theme.colours.important,
};

export const tableRow = {
  padding: "4px 10px",
  border: "1px solid #bbb",
  cursor: "pointer"
};

export const dropdownStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "10px",
  marginRight: "10px",
  marginBottom: "10px",
  color: theme.colours.text,
  fontSize: theme.fontSize.regular,
  fontWeight: theme.fontWeight.regular,
  backgroundColor: theme.colours.inputBackground,
  minWidth: "200px"
};