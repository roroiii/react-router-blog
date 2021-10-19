import React, { useState } from "react";
import styled from "styled-components";
import { newPost } from "../../api/WebAPI";
import { useHistory } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

const Banner = styled.div`
  position: relative;
  background-image: url("https://picsum.photos/id/1012/1200");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
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

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 30px;
  text-align: center;
`;

const PostContent = styled.form`
  max-width: 800px;
  margin: 80px auto 120px;
  line-height: 1.5;
  font-size: 18px;
  color: #5d5d5d;
  padding: 20px;
  background-color: #faf7f3;
  p {
    margin: 6px;
  }
`;

const PostText = styled.h3`
  margin-bottom: 16px;
`;

const PostInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 0;
  margin-bottom: 32px;
`;

const PostButton = styled.button`
  margin-top: 32px;
  width: 100%;
  background-color: #f35f70;
  border: 0;
  color: #ffffff;
  padding: 16px 0;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
`;

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const data = await newPost(title, post).catch((err) => {
      if (err.ok === 0) {
        return setErrorMessage(err.message);
      }
    });
    if (data.id) {
      history.push(`/article/${data.id}`);
    }
  };

  return (
    <>
      <Banner>
        <Title>New Post</Title>
      </Banner>
      <PostContent onSubmit={handleSubmit}>
        <PostText>Title</PostText>
        <PostInput
          value={title}
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <PostText>Post</PostText>
        <MDEditor
          value={post}
          type="text"
          placeholder="post"
          onChange={setPost}
        />
        <MDEditor.Markdown
          source={post}
          style={{ whiteSpace: "break-spaces" }}
        />
        <PostButton>Submit</PostButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </PostContent>
    </>
  );
}
