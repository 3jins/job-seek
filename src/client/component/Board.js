import React, { useState } from 'react';
import './Board.scss';
import handleClickEvent from '../util/handleClickEvent';

export default (props) => {
  const { companyName, notices } = props;
  const showingNumberUnit = 10;
  const [numItemsToShow, setNumItemsToShow] = useState(showingNumberUnit);

  return (
    <div className="board">
      <h1>{companyName.toUpperCase()}</h1>
      <table>
        <thead>
          <tr className="thead-tr">
            <th className="index-td">#</th>
            <th className="job-group-td">직군</th>
            <th className="title-td">제목</th>
            <th className="category-td">분류</th>
          </tr>
        </thead>
        <tbody>
          {notices.slice(0, numItemsToShow).map((notice, idx) => {
            const {
              _id,
              jobGroup,
              title,
              categories,
            } = notice;
            return (
              <tr
                key={`notice-${_id}`}
                className="tbody-tr"
                onClick={(event) => {
                  handleClickEvent(event, `/post/${_id}`);
                }}
              >
                <td thdata="#" className="index-td">{idx + 1}</td>
                <td thdata="직군" className="job-group-td">{jobGroup}</td>
                <td thdata="제목" className="title-td">{title}</td>
                <td thdsata="분류" className="category-td">
                  {categories.length > 0 ? categories.join(', ') : 'none'}
                </td>
              </tr>
            );
          })}
        </tbody>
        {numItemsToShow < notices.length ? (
          <tfoot>
            <tr
              className="tfoot-tr"
              onClick={() => setNumItemsToShow(
                Math.min(notices.length, numItemsToShow + showingNumberUnit),
              )}
            >
              <td colSpan="4">
                {`more (${numItemsToShow} / ${notices.length})`}
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
};
