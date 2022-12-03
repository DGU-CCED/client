import { Line } from 'rc-progress';
import './progress.scss';
import { useState, useMemo } from 'react';
import React from 'react';

export default function () {
  const [team] = useState([
    {
      id: 1,
      percent: 50,
    },
    {
      id: 2,
      percent: 60,
    },
    {
      id: 3,
      percent: 40,
    },
    {
      id: 4,
      percent: 50,
    },
    {
      id: 5,
      percent: 50,
    },
  ]);

  return (
    <div className="progress_background">
      <div className="progress_wrapper">
        <div>
          <p className="title">해커톤 진행률</p>
        </div>
        <div>
          <p className="subTitle">전체 진행도</p>
          <div className="progress_progressWrapper">
            <div className="progress">
              <Line percent="50"></Line>
            </div>
            <p>50%</p>
          </div>
        </div>
        <div>
          <p className="subTitle">각 팀별 진행도</p>
          {team.map((section) => (
            <div>
              <p className="p">{section.id}팀</p>
              <div className="progress_progressWrapper">
                <div className="progress">
                  <Line percent={section.percent}>
                    <p>asdf</p>
                  </Line>
                </div>
                <p>{section.percent}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
