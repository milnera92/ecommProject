import styled from "styled-components";

const Form = ({ setForm, confirmation, form }) => {

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  }
  return (
    <StyledForm onSubmit={confirmation}>
      <input
        id="firstName"
        type="text"
        placeholder="Jane"
        required
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      ></input>
      <input
        id="lastName"
        type="text"
        placeholder="Doe"
        required
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      ></input>
      <input
        id="creditCard"
        type="ccn"
        placeholder="**** **** **** ****"
        required
        onChange={(e) => handleChange(e.target.id, e.target.value)}
      ></input>
      <button>Confirm Purchase</button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
display: flex;
flex-direction: column;
`

export default Form;