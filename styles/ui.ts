import { theme } from "./themes";

export const h3style = {
  fontSize: theme.fontSize.header,
  fontWeight: theme.fontWeight.header,
  marginBottom: "10px"
};

export const labelStyle = {
  padding: "0px 10px",
  marginBottom: "5px",
  width: "100%",
  color: theme.colours.text,
  fontSize: theme.fontSize.label,
  fontWeight: theme.fontWeight.label,
};

export const inputStyleFit = {
  padding: "10px",
  marginRight: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
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
  borderRadius: "6px",
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
  backgroundColor: theme.colours.important,
  color: theme.colours.textLight,
  margin: "0px",
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
  padding: "10px 20px",
  backgroundColor: theme.colours.unselected,
  color: theme.colours.textLight,
  marginBottom: "10px"
};

export const tabButton = {
  ...buttonStyle,
  backgroundColor: theme.colours.unselected,
  color: theme.colours.textLight,
  marginBottom: "0px"
};

export const cardStyle = {
  //border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "15px",
  marginBottom: "15px",
  color: theme.colours.text,
  backgroundColor: theme.colours.card,
};

export const dropdownStyle = {
  border: "1px solid #ccc",
  borderRadius: "6px",
  padding: "10px",
  marginRight: "10px",
  marginBottom: "10px",
  color: theme.colours.text,
  backgroundColor: theme.colours.inputBackground,
  minWidth: "200px"
};