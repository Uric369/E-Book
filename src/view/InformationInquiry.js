import React, { useState,useEffect } from "react";
import { Input, Button } from "antd";
import { getAuthorByBookName } from "../services/bookService";
import BookComponent from "../components/useGraphQL";
import MenuBar from "../components/MenuBar";
import MyHeader from "../components/MyHeader";
import {
  Breadcrumb,
  Layout,
  theme,
} from "antd";

const { Search } = Input;

const InformationInquiry = () => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [wordCountMsgByHadoop, setWordCountMsgByHadoop] = useState([]);  // 新增wordCountMsgByHadoop
  const [wordCountMsgBySpark, setWordCountMsgBySpark] = useState([]);  // 新增wordCountMsgByHadoop

  useEffect(() => {
    if (wordCountMsgByHadoop !== null&&wordCountMsgByHadoop.length!==0){
        alert("Hadoop根据关键词检索书籍描述："+JSON.stringify(wordCountMsgByHadoop));  // 使用JSON.stringify将对象转换为字符串
    }

    if (wordCountMsgBySpark !== null&&wordCountMsgBySpark.length!==0){
      alert("Spark根据关键词检索书籍描述："+JSON.stringify(wordCountMsgByHadoop));  // 使用JSON.stringify将对象转换为字符串
  }
}, [wordCountMsgByHadoop]);  // 这里监视wordCountMsg的变化

  const handleSearch = () => {
    getAuthorByBookName(bookName, (response) => {
      // 在回调函数中获取到书籍作者信息
      const author = response.data.author;
      setAuthor(author);
    });
  };

  const handleTagWordCountByHadoop = () => {
    fetch("http://localhost:8020/getBookWordCountHadoop")
        .then(response => response.json())
        .then(data => {
            // if (data["data"] !== null) {
                setWordCountMsgByHadoop(data);  // 更新wordCountMsg
                console.log(data);
            // }
        })
        .catch(error => console.error(error));
};

const handleTagWordCountBySpark = () => {
  fetch("http://localhost:8020/getBookWordCountSpark")
      .then(response => response.json())
      .then(data => {
          // if (data["data"] !== null) {
              setWordCountMsgByHadoop(data);  // 更新wordCountMsg
              console.log(data);
          // }
      })
      .catch(error => console.error(error));
};


  return (

    <Layout>
    <MyHeader/>
    <Layout>
        <MenuBar />
      <Layout
        style={{
          padding: "0 24px 24px"
        }}
      >

<div>
      <Search
        placeholder="输入书名"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        onSearch={handleSearch}
        enterButton
      />
      <div>书籍作者：{author}</div>
      <BookComponent/>
      <Button type="primary" onClick={handleTagWordCountByHadoop}>
        用Hadoop展示书籍描述统计
      </Button>
      <Button type="primary" onClick={handleTagWordCountBySpark}>
        用Spark展示书籍描述统计
      </Button>
    </div>
        
      </Layout>
    </Layout>
  </Layout>



  );
};

export default InformationInquiry;
