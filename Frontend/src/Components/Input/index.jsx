import { Form } from "react-bootstrap";
import { FormMain } from "./input.styled";
export const NewInputForm = ({
  label,
  type,
  name,
  text,
  placeholder,
  error,
  onChange,
  value,
  isValid,
  disabled,
  size,
}) => {
  return (
    <FormMain.Group>
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control
        className="Control"
        type={type ? type : "text"}
        name={name}
        onChange={onChange}
        value={value}
        size={size}
        min="1"
        isValid={!!isValid}
        placeholder={placeholder}
        isInvalid={error}
        disabled={disabled}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Text>{text}</Form.Text>
    </FormMain.Group>
  );
};
