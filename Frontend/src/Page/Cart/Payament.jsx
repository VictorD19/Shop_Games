import { Formik } from "formik";
import { useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { NewButton } from "../../Components/Button";
import { NewInputForm } from "../../Components/Input";
import { NewTitle } from "../../Components/Title";
import { FormPayment, SelectCard } from "./payament.styled";
import { useAlert } from "../../Context/alertContext";

const validation = Yup.object().shape({
  number_card: Yup.string().matches(/^(3[47][0-9]{13}|(6541|6556)[0-9]{12}|389[0-9]{11}|3(?:0[0-5]|[68][0-9])[0-9]{11}|65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})|63[7-9][0-9]{13}|(?:2131|1800|35\d{3})\d{11}|9[0-9]{15}|(6304|6706|6709|6771)[0-9]{12,15}|(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}|(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))|(6334|6767)[0-9]{12}|(6334|6767)[0-9]{14}|(6334|6767)[0-9]{15}|(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}|(62[0-9]{14,17})|4[0-9]{12}(?:[0-9]{3})?|(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}))$/,'Invalid formatted card').required("Number card is required"),
  card: Yup.string().required("Type card is required"),
  cvc: Yup.string().length(3,'Invalid cvc code').required("Code cvc is required"),
  exp: Yup.string().matches(/^(0[1-9]|1[012])[ -\/]\d\d$/,'Invalid expiration date').required("Expiration date is required"),
  name: Yup.string().required("Full name is required"),
});

const initialValues = {
  number_card: "",
  card: "",
  cvc: "",
  exp: "",
  name: "",
};

export const Payament = ({ setCart, setActive }) => {
  const [dataPayment, setData] = useState(initialValues);
  const [cards, setCards] = useState([]);
  const { handleCreateToast } = useAlert();
  const selectCardRef = useRef(null);

  const handleSubmit = (values) => {
    try {
      const { number_card } = values;
      const [findCard] = cards.filter(
        (cardItem) => cardItem.number_card === number_card
      );
      if (findCard) throw new Error("Card exists");

      setCards((prev) => [...prev, { ...values, number_card: number_card }]);
      handleCreateToast("success", "Card Added");
    } catch (error) {
      handleCreateToast("error", error.message);
    }
  };
  const handleSelectCard = () => {
    const value = selectCardRef.current.value;
    if (value === "Open this select menu") {
      setActive(true);
      return;
    }
    if (value === "") return;

    setCart(value);
    setActive(false);
  };
  return (
    <div>
      <Formik
        initialValues={dataPayment}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {({ handleSubmit, handleChange, resetForm, errors, values }) => (
          <FormPayment>
            <NewTitle>Payment details </NewTitle>
            <Form.Check
              type="radio"
              inline
              name="card"
              onChange={handleChange}
              value="cc"
              isInvalid={errors?.card}
              label="Credit card"
            />
            <Form.Check
              type="radio"
              inline
              name="card"
              onChange={handleChange}
              value="dc"
              isInvalid={errors?.card}
              label="Debit card"
            />

            <NewInputForm
              name="name"
              label="Full name"
              onChange={handleChange}
              error={errors.name}
              value={values.name}
            />
            <NewInputForm
              name="number_card"
              label="Number card"
              type="number"
              onChange={handleChange}
              error={errors.number_card}
              value={values.number_card}
            />
            <Row>
              <Col>
                <NewInputForm
                  name="exp"
                  label="Expiration date"
                  onChange={handleChange}
                  error={errors.exp}
                  value={values.exp}
                />
              </Col>
              <Col>
                <NewInputForm
                  name="cvc"
                  label="CVC"
                  type="number"
                  onChange={handleChange}
                  error={errors.cvv}
                  value={values.cvv}
                />
              </Col>
            </Row>
            <NewButton onClick={handleSubmit} type="submit">
              ADD CARD
            </NewButton>
          </FormPayment>
        )}
      </Formik>

      <SelectCard>
        <Form.Select
          aria-label="Default select example"
          ref={selectCardRef}
          onChange={handleSelectCard}
        >
          <option>Open this select menu</option>
          {cards.length >= 0 &&
            cards?.map((card, key) => (
              <option key={key}>
                {card?.number_card} - {card?.exp} - {card?.cvv}{" "}
              </option>
            ))}
        </Form.Select>
      </SelectCard>
    </div>
  );
};
