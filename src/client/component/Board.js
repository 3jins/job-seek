import React, { useState } from 'react';

export default (props) => {
  const { companyName, notices } = props;
  const showingNumberUnit = 10;
  const [numItemsToShow, setNumItemsToShow] = useState(showingNumberUnit);

  return (
    <div className="company-board">
      <h1>{companyName.toUpperCase()}</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>직군</th>
            <th>제목</th>
          </tr>
        </thead>
        <tbody>
          {notices.slice(0, numItemsToShow).map((notice, idx) => {
            const { _id, title, jobGroup } = notice;
            return (
              <tr key={`notice-${_id}`}>
                <td>{idx + 1}</td>
                <td>{jobGroup}</td>
                <td>
                  <a href={`/hiring-notice-detail/${_id}`}>{title}</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {numItemsToShow < notices.length ? (
        <div className="more">
          <button
            onClick={() => setNumItemsToShow(
              Math.min(notices.length, numItemsToShow + showingNumberUnit),
            )}
          >
            {`more (${numItemsToShow} / ${notices.length})`}
          </button>
        </div>
      ) : null}
    </div>
  );
};
