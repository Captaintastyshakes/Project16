import React from "react";
import ModalWithForm from "./ModalWithForm";

export default function RegisterModal({
  submit,
  switchState,
  closeModal,
  isLoading,
  clickPass,
  mouseDownPass,
}) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submit(value);
  };

  const handleEmailInput = (evt) => {
    setValue({ ...value, email: evt.target.value });
  };

  const handlePasswordInput = (evt) => {
    setValue({ ...value, password: evt.target.value });
  };

  const handleNameInput = (evt) => {
    setValue({ ...value, username: evt.target.value });
  };

  const formData = {
    state: false,
    stateSwitch: switchState,
    values: ["email", "password", "username"],
    objectValues: value,
    class: "registerModal",
    submit: handleSubmit,
    submitText: "Sign up",
    title: "Sign up",
    name: "sign-up",
    close: closeModal,
    loadingText: "Signing up...",
    contraText: "Sign in",
  };

  return (
    <>
      <div className="registerModal__main modal" onMouseDown={mouseDownPass}>
        <ModalWithForm
          content={formData}
          isLoading={isLoading}
          clickpass={clickPass}
          mouseDownPass={mouseDownPass}
          submitButtonLoadingText={"Signing up..."}
        >
          <label className="modalWithForm__label registerModal__form-label_type_email">
            Email
            <input
              className="modalWithForm__input registerModal__input_type_email"
              type="email"
              placeholder="Enter email"
              onInput={handleEmailInput}
              value={value.email}
              name="email"
              required
            />
          </label>
          <label className="modalWithForm__label registerModal__form-label_type_password">
            Password
            <input
              className="modalWithForm__input registerModal__input_type_password"
              type="password"
              placeholder="Enter password"
              onInput={handlePasswordInput}
              value={value.password}
              name="password"
              minLength={5}
              required
            />
          </label>
          <label className="modalWithForm__label registerModal__form-label_type_username">
            Username
            <input
              className="modalWithForm__input registerModal__input_type_username"
              type="text"
              placeholder="Enter your username"
              onInput={handleNameInput}
              value={value.username}
              name="name"
              required
            />
          </label>
        </ModalWithForm>
      </div>
    </>
  );
}
