import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import './Post.scss';

export default (props) => {
  const { match: { params: { postId } } } = props;
  const apiMethodBase = 'hiring-notice-detail';
  const [post, setPost] = useState('');
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`/${apiMethodBase}/${postId}`)
      .then((response) => {
        if (_.isEmpty(response.data)) {
          setIsNotFound(true);
        } else {
          setPost(response.data[0].content);
        }
      });
  }, []);

  if (isNotFound) {

  } else {
    // return (
    //   <div className="post" dangerouslySetInnerHTML={{ __html: post }}>
    //   </div>
    // );
    return (
      <div className="post">
        {ReactHtmlParser(post)}
      </div>
    );
  }
};
