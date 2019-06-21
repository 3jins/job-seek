import React from 'react';
import notfound from '../../../../images/error/404.jpg';
import serverError from '../../../../images/error/500.jpg';
import './Error.scss';

export default (props) => {
  const renderErrorMeme = (errorCode) => {
    switch (errorCode) {
      case '500':
        return <img src={serverError} alt="500 internal server error meme" />;
      case '404':
      default:
        return <img src={notfound} alt="404 not found meme" />;
    }
  };

  const { errorCode, message } = props;

  return (
    <div className="error">
      {renderErrorMeme(errorCode)}
      {!message ? null : <p>{message}</p>}
    </div>
  );
};
