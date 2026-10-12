import type { Portfolio } from "@jeamxn/contract";
import { Icon } from "@jeamxn/icon";
import { Link } from "react-router";
import { Portrait } from "~/shared/widget/portrait";

export function AboutPage({ data }: { data: Portfolio }) {
  return (
    <div className="container about-page">
      <header className="page-heading">
        <p>소개</p>
        <h1>
          필요한 것을 배우고,
          <br />
          좋아하는 것을 만듭니다.
        </h1>
      </header>
      <div className="about-layout">
        <Portrait src={data.profile.portrait} className="about-portrait" priority />
        <div className="about-story">
          {data.profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link to="/resume" className="text-link">
            이력 자세히 보기 <Icon name="arrow-right" size={20} />
          </Link>
        </div>
      </div>
      <section className="about-learning">
        <h2>배움의 기록</h2>
        <div>
          {data.education.map((item) => (
            <div className="about-education" key={item.school}>
              <h3>{item.school}</h3>
              <p>
                {item.major} / {item.period} / {item.note}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="interests">
        <div>
          <h2>화면 밖에서는</h2>
          <p>
            빠르게 달리는 경주, 함께 응원하는 경기,
            <br />
            그리고 작은 공연장의 음악을 좋아합니다.
          </p>
        </div>
        <ul>
          {data.profile.interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
