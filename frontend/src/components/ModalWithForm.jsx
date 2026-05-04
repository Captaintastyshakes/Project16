import close from "../assets/Union (1).svg";

export default function ModalWithForm({
  content,
  isLoading,
  children,
  clickPass,
}) {
  return (
    <>
      <div className="modalWithForm__main modal__box" onClick={clickPass}>
        <button
          className="modalWithForm__button modalWithForm__button_type_close"
          type="button"
          onClick={content.close}
        >
          <img
            className="modalWithForm__close-icon"
            src={close}
            alt="close icon"
          />
        </button>
        <form
          className={`modalWithForm__form modalWithForm_type_${content.name}`}
          onSubmit={content.submit}
          name={content.name}
        >
          <h2 className="modalWithForm__title">{content.title}</h2>
          {children}
          <div className="modalWithForm__submit-button-wrapper">
            <button
              className="modalWithForm__button modalWithForm__button_type_submit"
              type="submit"
            >
              {isLoading ? content.loadingText : content.submitText}
            </button>
          </div>
        </form>
        <div className="modalWithForm__switch-button-wrapper">
          or
          <button
            className="modalWithForm__button modalWithForm__button_type_switch-forms"
            type="button"
            onClick={content.stateSwitch}
          >
            {content.contraText}
          </button>
        </div>
      </div>
    </>
  );
}
