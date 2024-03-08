import React, { useState } from 'react';
import {Input,Button} from "antd";


const useGraphQL = () => {
  const [bookData, setBookData] = useState(null);

  const fetchBookByName = async (name) => {
    const graphqlQuery = {
      query: `
        query($name: String!) {
          bookByName(name: $name) {
            id
            name
            publisher
            author
            summary
            description
            likes
            favorablerate
            price
            cover
            isbn
            tagId
            tagContent
            stock
            status
            condition
          }
        }
      `,
      variables: {
        name: name,
      },
    };

    try {
      const response = await fetch('http://localhost:8020/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(graphqlQuery),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const responseData = await response.json();
      setBookData(responseData.data.bookByName);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return { bookData, fetchBookByName };
};

const BookComponent = () => {
  const { bookData, fetchBookByName } = useGraphQL();
  const [inputValue, setInputValue] = React.useState(''); // State to hold the input value

  const handleFetchBook = () => {
    fetchBookByName(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <Input
        placeholder="Enter book name"
        value={inputValue}
        onChange={handleInputChange}
        onPressEnter={handleFetchBook} // Fetches book data when Enter key is pressed
      />
      <Button onClick={handleFetchBook} type="primary" style={{ marginTop: '10px' }}>
        Fetch Book By Graphql
      </Button>
      {bookData && (
        <div>
          <h2>{bookData.name}</h2>
          <p>Author: {bookData.author}</p>
          <p>Publisher: {bookData.publisher}</p>
          <p>Summary: {bookData.Summary}</p>
          <p>Description: {bookData.description}</p>
          {/* Render other book details as needed */}
        </div>
      )}
    </div>
  );
};
export default BookComponent;
