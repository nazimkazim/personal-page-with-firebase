import React from 'react';

const FormField = ({ id, formdata, change }) => {
  const showError = () => {
    let errorMessage = (
      <p class="help is-danger">
        {formdata.validation && !formdata.valid
          ? formdata.validationMessage
          : null}
      </p>
    );

    return errorMessage;
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <React.Fragment>
            <input
              {...formdata.config}
              value={formdata.value}
              onChange={event => change({ event, id })}
              className="input"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope" />
            </span>
            <span class="icon is-small is-right">
              <i class="fas fa-check" />
            </span>
            {showError()}
          </React.Fragment>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };
  return <div>{renderTemplate()}</div>;
};

export default FormField;
