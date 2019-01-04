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

  const tagMargin = {
    marginTop: '10px',
    marginBottom: '10px',
    fontSize: '14px'
  };

  const renderTemplate = () => {
    let formTemplate = null;

    switch (formdata.element) {
      case 'input':
        formTemplate = (
          <React.Fragment>
            {formdata.showLabel ? (
              <span className="tag is-info" style={tagMargin}>
                {formdata.config.label}
              </span>
            ) : null}
            <div className="field">
              <div className="control">
                <input
                  {...formdata.config}
                  value={formdata.value}
                  onChange={event => change({ event, id })}
                  className="input"
                  placeholder={formdata.config.placeholder}
                />
                {showError()}
              </div>
            </div>
          </React.Fragment>
        );
        break;
      case 'textarea':
        formTemplate = (
          <React.Fragment>
            {formdata.showLabel ? (
              <span className="tag is-info" style={tagMargin}>
                {formdata.config.label}
              </span>
            ) : null}
            <div className="field">
              <div className="control">
                <textarea
                  className="textarea is-primary"
                  {...formdata.config}
                  value={formdata.value}
                  onChange={event => change({ event, id })}
                  placeholder={formdata.config.placeholder}
                />
              </div>
            </div>
            {showError()}
          </React.Fragment>
        );
        break;
      default:
        formTemplate = null;
    }

    return formTemplate;
  };
  return <React.Fragment>{renderTemplate()}</React.Fragment>;
};

export default FormField;
