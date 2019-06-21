import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import Error from './common/Error';
import './Post.scss';

export default (props) => {
  const { match: { params: { postId } } } = props;
  const apiMethodBase = 'hiring-notice-detail';
  const [post, setPost] = useState('');
  const [isServerError, setIsServerError] = useState(false);

  useEffect(() => {
    axios
      .get(`/${apiMethodBase}/${postId}`)
      .then((response) => {
        setPost(response.data[0].content);
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
  return (
    <div className="post">
      {ReactHtmlParser(post)}
    </div>
  );
};
