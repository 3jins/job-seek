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
            <th>#</th>
            <th>직군</th>
            <th>제목</th>
          </tr>
        </thead>
        <tbody>
          {notices.slice(0, numItemsToShow).map((notice, idx) => {
            const { _id, title, jobGroup } = notice;
            return (
              <tr
                key={`notice-${_id}`}
                className="tbody-tr"
                onClick={(event) => {
                  handleClickEvent(event, `/post/${_id}`);
                }}
              >
                <td className="index-td">{idx + 1}</td>
                <td className="job-group-td">{jobGroup}</td>
                <td className="title-td">{title}</td>
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
              <td colSpan="3">
                {`more (${numItemsToShow} / ${notices.length})`}
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
};
