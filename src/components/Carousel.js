import React from "react";
import { Carousel } from "antd";
import { CaretDownFilled } from "@ant-design/icons";

const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  marginTop: 40
};

//随机图片api网址
// https://picsum.photos/1600/300
const CarouselBox = () => (
  <Carousel autoplay>
    <div>
      <img
        style={contentStyle}
        src="https://fastly.picsum.photos/id/17/1600/300.jpg?hmac=TUa4a54BqUpAvtEffoOdhw1KajBZN2DHJ_CO_5D7FDc"
      />
    </div>
    <div>
      <img
        style={contentStyle}
        src="https://fastly.picsum.photos/id/1050/1600/300.jpg?hmac=TDCRM3Ek7BMbgqmiMGbx9dbRNggccSYSOc2LALBH3jM"
      />
    </div>
    <div>
      <img
        style={contentStyle}
        src="https://fastly.picsum.photos/id/828/1600/300.jpg?hmac=xKoURRr7RCnUYDUOz-HLAcLJ0QhKG_NlqEwlDNR0P2U"
      />
    </div>
    <div>
      <img
        style={contentStyle}
        src="https://fastly.picsum.photos/id/1049/1600/300.jpg?hmac=zkPKBBPNnQe2mQYD9NPMaWnRO3Xovm3C2gBiqkcS1Rk"
      />
    </div>
  </Carousel>
);

export default CarouselBox;



// const CarouselBox = () => (
//   <Carousel autoplay>
//     <div>
//       <h3 style={contentStyle}>1</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>2</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>3</h3>
//     </div>
//     <div>
//       <h3 style={contentStyle}>4</h3>
//     </div>
//   </Carousel>
// );
// export default CarouselBox;