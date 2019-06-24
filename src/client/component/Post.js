import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import Error from './common/Error';
import './Post.scss';
import handleClickEvent from "../util/handleClickEvent";

export default (props) => {
  const { match: { params: { postId } } } = props;
  const apiMethodBase = 'hiring-notice-detail';
  const [post, setPost] = useState('');
  const [isServerError, setIsServerError] = useState(false);

  useEffect(() => {
    axios
      .get(`/${apiMethodBase}/${postId}`)
      .then((response) => {
        setPost(response.data[0]);
      })
      .catch(() => setIsServerError(true));
  }, []);

  if (isServerError) {
    return (
      <div className="post">
        <Error errorCode="500" message="The URL might be wrong I guess." />
      </div>
    );
  }

  const { title, content, originUrl } = post;
  return (
    <div className="post">
      <h1>{title}</h1>
      {ReactHtmlParser(content)}
      <section className="origin-url-section">
        <button onClick={event => handleClickEvent(event, originUrl)}>
          원글 보러 가기
        </button>
      </section>
    </div>
  );
};
