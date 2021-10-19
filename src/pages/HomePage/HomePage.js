import React, { useState, useEffect } from "react";
import styled from "styled-components";
import background from "../../background.jpeg";
import { Link } from "react-router-dom";
import { getArticles } from "../../api/WebAPI";
import PropTypes from "prop-types";

const Banner = styled.div`
  position: relative;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 450px;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const SubTitle = styled.div`
  background: #f35f70;
  color: #fff;
  padding: 12px;
  text-align: center;
  letter-spacing: 4px;
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 30px;
  text-align: center;
`;

const ArticleList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media all and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ArticleContainer = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 33.3333%;
  height: 360px;
  line-height: 1.2;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      rgb(0 0 0 / 25%),
      rgb(0 0 0 / 68%)
    );
  }

  @media all and (max-width: 768px) {
    width: 100%;
  }
`;

const ArticleTitle = styled(Link)`
  font-size: 20px;
  border-bottom: 3px #fff solid;
  padding-bottom: 6px;
  color: #fff;
  text-decoration: none;
`;

const ArticleInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: #ddd;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
`;
const Time = styled.div`
  margin-top: 6px;
  width: 100%;
`;
const Error = styled.div`
  color: red;
`;

const Article = ({ title, time, id }) => {
  return (
    <ArticleContainer
      style={{
        backgroundImage: `url("https://picsum.photos/600")`,
      }}
    >
      <ArticleInfo>
        <ArticleTitle to={`/article/${id}`}>{title}</ArticleTitle>
        <Time>{time}</Time>
      </ArticleInfo>
    </ArticleContainer>
  );
};

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [articlesError, setArticlesError] = useState(null);

  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => {
        setArticlesError(err.message);
      });
  }, []);

  return (
    <>
      <Banner>
        <Title>We Are Taste of Summer</Title>
      </Banner>
      <SubTitle>LATEST STORIES</SubTitle>
      {articlesError && <Error>{articlesError.toString()}</Error>}
      <ArticleList>
        {articles.map((article) => (
          <Article
            key={article.id}
            title={article.title}
            time={new Date(article.createdAt).toLocaleDateString()}
            id={article.id}
          />
        ))}
      </ArticleList>
    </>
  );
}

Article.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.number,
};
