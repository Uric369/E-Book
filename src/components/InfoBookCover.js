// import { Image } from "antd";
// import React from "react";
// import { useState } from "react";
// import CSAPP from "../assets/CSAPP.jpg";
// import CSAPP2 from "../assets/CSAPP2.jpg";
// import CSAPP3 from "../assets/CSAPP3.jpg";
// const BookCover = () => {
//   const [visible, setVisible] = useState(false);
//   return (
//     <div>
//       <Image
//         preview={{
//           visible: false
//         }}
//         width={200}
//         src={CSAPP}
//         onClick={() => setVisible(true)}
//       />
//       <div
//         style={{
//           display: "none"
//         }}
//       >
//         <Image.PreviewGroup
//           preview={{
//             visible,
//             onVisibleChange: (vis) => setVisible(vis)
//           }}
//         >
//           <Image src={CSAPP} />
//           {/* <Image src={CSAPP2} />
//           <Image src={CSAPP3} /> */}
//         </Image.PreviewGroup>
//       </div>
//     </div>
//   );
// };
// export default BookCover;


import { Image } from "antd";
import React from "react";
import { useState } from "react";


class BookCover extends React.Component{
  

  render(){
  const {book} = this.props;
  console.log(book);
  // const [visible, setVisible] = useState(false);
  let visible = false;
 
  
  
  return (
    <div>
      <Image
        preview={{
          visible: false
        }}
        width={200}
        src={book.cover}
        onClick={() => {visible = true}}
      />
      <div
        style={{
          display: "none"
        }}
      >
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => visible = vis
          }}
        >
          <Image src={book.cover} />
          {/* <Image src={book.cover2} />
          <Image src={book.cover3} /> */}
        </Image.PreviewGroup>
      </div>
    </div>
  );
};
};

export default BookCover;