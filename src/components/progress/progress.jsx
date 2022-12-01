import { Line, Circle } from 'rc-progress';

export default () => (
    <>
        <div>
            <div>
                <p>해커톤 진행률</p>
            </div>
            <div>
                <p>전체 진행도</p>
                <Line percent={80} strokeWidth={5} strokeColor="#FF008C" trailColor="#000000" />
            </div>
            <div>
                <p>각 팀별 진행도</p>
                <p>1팀</p>
                <Line percent={50} strokeWidth={5} strokeColor="#FF008C" trailColor="#000000" />
                <p>2팀</p>
                <Line percent={60} strokeWidth={5} strokeColor="#FF008C" trailColor="#000000" />
                <p>3팀</p>
                <Line percent={40} strokeWidth={5} strokeColor="#FF008C" trailColor="#000000" />
                <p>4팀</p>
                <Line percent={50} strokeWidth={5} strokeColor="#FF008C" trailColor="#000000" />
                <p>5팀</p>
                <Line percent={50} strokeWidth={5} strokeColor="#FF008C" trailColor="#000000" />
            </div >
        </div >
    </>
);