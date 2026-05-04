import ModalWithForm from "./ModalWithForm.jsx";
import React from "react";
import RegisterModal from "./RegisterModal.jsx";

export default function LoginModal({
  submit,
  submitB,
  closeModal,
  isLoading,
  clickPass,
  mouseDownPass,
}) {
  const [stateA, setStateA] = React.useState(true);

  const [value, setValue] = React.useState({
    email: "",
    password: "",
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

  const switchForms = () => {
    setStateA(!stateA);
  };

  const formData = {
    state: stateA,
    stateSwitch: switchForms,
    values: ["email", "password"],
    objectValues: value,
    class: "loginModal",
    submit: handleSubmit,
    submitText: "Sign in",
    title: "Sign in",
    name: "sign-in",
    close: closeModal,
    loadingText: "Signing in...",
    contraText: "Sign up",
  };

  return (
    <>
      {stateA ? (
        <div className="modal" onMouseDown={mouseDownPass}>
          <div className="loginModal__main">
            <ModalWithForm
              content={formData}
              isLoading={isLoading}
              clickPass={clickPass}
              mouseDownPass={mouseDownPass}
            >
              <label className="modalWithForm__label loginModal__form-label loginModal__form-label_type_email">
                Email
                <input
                  className="modalWithForm__label loginModal__input loginModal__input_type_email"
                  type="email"
                  placeholder="Enter email"
                  onInput={handleEmailInput}
                  value={value.email}
                  name="email"
                  required
                />
              </label>
              <label className="modalWithForm__label loginModal__form-label loginModal__form-label_type_password">
                Password
                <input
                  className="modalWithForm__label loginModal__input loginModal__input_type_password"
                  type="password"
                  placeholder="Enter password"
                  onInput={handlePasswordInput}
                  value={value.password}
                  name="password"
                  required
                />
              </label>
            </ModalWithForm>
          </div>
        </div>
      ) : (
        <RegisterModal
          submit={submitB}
          switchState={switchForms}
          closeModal={closeModal}
          isLoading={isLoading}
          clickPass={clickPass}
          mouseDownPass={mouseDownPass}
        />
      )}
    </>
  );
}
