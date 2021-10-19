import { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getArticle } from "../../api/WebAPI";
import MDEditor from "@uiw/react-md-editor";

const Banner = styled.div`
  position: relative;
  background-image: url("https://picsum.photos/1200");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  width: 100%;
  height: 350px;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
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

const ArticleText = styled.div`
  max-width: 800px;
  margin: 40px auto;
  line-height: 1.5;
  font-size: 18px;
  color: #5d5d5d;
  padding: 20px;
  white-space: break-spaces;
  background-color: #faf7f3;
  p {
    margin: 6px;
  }
`;

const Time = styled.div`
  text-align: right;
  margin-bottom: 16px;
`;

const Error = styled.div`
  color: red;
`;

export default function ArticlePage() {
  let { id } = useParams();
  const [article, setArticle] = useState([]);
  const [articleError, setArticleError] = useState(null);

  useEffect(() => {
    getArticle(id)
      .then((data) => {
        setArticle(data);
      })
      .catch((err) => {
        setArticleError(err.message);
      });
  }, [id]);
  return (
    <>
      {articleError && <Error>{articleError.toString()}</Error>}
      {article.map((content) => (
        <Fragment key={id}>
          <Banner>
            <Title>{content.title}</Title>
          </Banner>
          <ArticleText>
            <Time>{new Date(content.createdAt).toLocaleDateString()}</Time>
            <MDEditor.Markdown source={content.body} />
          </ArticleText>
        </Fragment>
      ))}
    </>
  );
}
