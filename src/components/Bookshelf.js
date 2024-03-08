import React, { useEffect, useState } from "react";
import { Row, Col,Input,Select} from "antd";
import BookCard from "./bookCard";
import { getBooks } from "../services/bookService";
import { getBooksByName } from "../services/bookService";
import { fuzzySearchByTag } from "../services/bookService";
const { Search } = Input;
const { Option } = Select;

const BookShelf = () => {
  const [books, setBooks] = useState([]);
  const [subString, setSubString] = useState(null);
  const [searchType, setSearchType] = useState('title'); // 'title' or 'tag'
  const userData = JSON.parse(localStorage.getItem("user"));
  

  useEffect(() => {
    getBooks({ search: null }, (data) => {
      const filteredBooks = data.filter((book) => book.condition === 0);
      setBooks([...filteredBooks]);
    });
  }, []);

  const SearchBookName=(subString)=>{
    console.log("SearchBookName");
    console.log(subString);
    if (searchType === 'title') {
      getBooksByName(subString, (data) => {
        setBooks(data);
        console.log(data);
      });
    } else if (searchType === 'tag') {
      fuzzySearchByTag(subString, (data) => {
        setBooks(data);
        console.log(data);
      });
    }
  };

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
    getBooks({ search: null }, (data) => {
      const filteredBooks = data.filter((book) => book.condition === 0);
      setBooks([...filteredBooks]);
    });
  };




  return (
    <div>
       <Select defaultValue="title" style={{ width: 120, marginTop:"30px" }} onChange={handleSearchTypeChange}>
        <Option value="title">Title</Option>
        <Option value="tag">Tag</Option>
      </Select>
    <Search
  placeholder="input search text"
  onSearch={SearchBookName}
  onChange={(e) => {
    SearchBookName(e.target.value);
  }}
  enterButton
  style={{ width: '400px', margin: '32px 0' }}
/>
    <Row gutter={[16, 16]}>
      {books.map((book, index) => {
        if (index % 3 === 0) {
          // 开始新的一行
          return (
            <React.Fragment key={book.id}>
              {index !== 0 && <div style={{ clear: "both" }} />}
              <Col span={8}>
                <BookCard book={book} />
              </Col>
            </React.Fragment>
          );
        } else {
          // 继续当前行
          return (
            <Col span={8} key={book.id}>
              <BookCard book={book} />
            </Col>
          );
        }
      })}
    </Row>
    </div>
  );
};

export default BookShelf;
