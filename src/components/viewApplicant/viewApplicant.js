import './viewApplicant.css';
import React, { useState } from 'react';

export default function () {
  const [data, setData] = useState([]);

  return (
    <>
      <div className="wrap">
        <h1 className="name">{data.name}</h1>
        <div className="date_loc">
          <span className="date">{data.start_date}</span>
          <span className="date"> ~ {data.end_date}</span>
          <span className="date"> / {data.location}</span>
        </div>
        <div className="teamPart">
          <span className="teamBox11">기획자 : {data.pm}명</span>
          <span className="teamBox21">개발자 : {data.developer}명</span>
          <span className="teamBox31">디자이너 : {data.designer}명</span>
        </div>
      </div>
      <div className="horizon"></div>

      <div className="wrap2">
        <div className="detail_content">
          <h3>{data.content}</h3>
        </div>
      </div>

      <div className="applicationStatusWrap">
        <p className="viewApplicant_p">신청 현황</p>
        <div className="applicationStatus">
          <button className="teamBox11">기획자 : {data.pm}명</button>
          <button className="teamBox21">개발자 : {data.developer}명</button>
          <button className="teamBox31">디자이너 : {data.designer}명</button>
        </div>
        <div className="status">
          <label className="viewApplicant_label">
            홍민기 / 22세 / 동국대학교
          </label>
          <label className="viewApplicant_label">
            홍민기 / 22세 / 동국대학교
          </label>
          <label className="viewApplicant_label">
            홍민기 / 22세 / 동국대학교
          </label>
        </div>
        <div className="buttonWrap">
          <button className="button1">저장</button>
          <button className="button2">해커톤 시작</button>
        </div>
      </div>
    </>
  );
}
