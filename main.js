// 카카오맵
var container = document.getElementById("map");
var options = {
  center: new kakao.maps.LatLng(33.450701, 126.570667),
  level: 3,
};

var map = new kakao.maps.Map(container, options);
//마커 포인터
var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
  position: markerPosition,
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);

// 공공api 담을 배열
let campingList = [];
// 공공api의 좌표를 담을 배열
let locateList = [];

let selectList = document.getElementById("show-all-list");
console.log("selectList", selectList);

selectList.addEventListener("change", (event) => {
  console.log(event);
});

// selectList.forEach((item) =>
//   item.addEventListener("change", (event) => {
//     console.log("event", event);
//     console.log("item", item.value);
//     return getListInfo(event);
//   })
// );

// selectList.forEach((item) => {
//   item.addEventListener("change", console.log(item.value));
// });
// { // 그냥 주석할려고 만든 {}
//   // xml 파일을 json으로 변환하는 거
//   function xmlToJson(xml) {
//     // Create the return object
//     var obj = {};
//     if (xml.nodeType == 1) {
//       // element
//       // do attributes
//       if (xml.attributes.length > 0) {
//         obj["@attributes"] = {};
//         for (var j = 0; j < xml.attributes.length; j++) {
//           var attribute = xml.attributes.item(j);
//           obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
//         }
//       }
//     } else if (xml.nodeType == 3) {
//       // text
//       obj = xml.nodeValue;
//     }

//     // do children
//     // If all text nodes inside, get concatenated text from them.
//     var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
//       return node.nodeType === 3;
//     });
//     if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
//       obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
//         return text + node.nodeValue;
//       }, "");
//     } else if (xml.hasChildNodes()) {
//       for (var i = 0; i < xml.childNodes.length; i++) {
//         var item = xml.childNodes.item(i);
//         var nodeName = item.nodeName;
//         if (typeof obj[nodeName] == "undefined") {
//           obj[nodeName] = xmlToJson(item);
//         } else {
//           if (typeof obj[nodeName].push == "undefined") {
//             var old = obj[nodeName];
//             obj[nodeName] = [];
//             obj[nodeName].push(old);
//           }
//           obj[nodeName].push(xmlToJson(item));
//         }
//       }
//     }
//     return obj;
//   }
//   const baseCampAPI = async () => {
//     const url =
//       "https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=10&pageNo=1&MobileOS=etc&MobileApp=test&serviceKey=gBtrW32SeG0AZeOPjc0%2Bn%2F1UjMBufXyvAG%2B64flFVxhcnH5eLBFXjqT%2FAu9BA7cxV3fujI%2Blkhwr%2BzYi4%2BneSw%3D%3D";
//     const reqURL = `${url}`;
//     const response = await fetch(reqURL);
//     const xmlString = await response.text();
//     let XmlNode = new DOMParser().parseFromString(xmlString, "text/xml");
//     campingList = xmlToJson(XmlNode).response.body.items.item;
//     console.log("camping list", campingList);
//     console.log(xmlToJson(XmlNode));
//     render();
//   };
// }

// json 파일 url xml 에서 type으로 변경
// base
//https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=5&pageNo=1&MobileOS=etc&MobileApp=testweb&serviceKey=gBtrW32SeG0AZeOPjc0%2Bn%2F1UjMBufXyvAG%2B64flFVxhcnH5eLBFXjqT%2FAu9BA7cxV3fujI%2Blkhwr%2BzYi4%2BneSw%3D%3D&_type=json
// 위치기반
//https://apis.data.go.kr/B551011/GoCamping/locationBasedList?numOfRows=5&pageNo=1&MobileOS=etc&MobileApp=testweb&serviceKey=gBtrW32SeG0AZeOPjc0%2Bn%2F1UjMBufXyvAG%2B64flFVxhcnH5eLBFXjqT%2FAu9BA7cxV3fujI%2Blkhwr%2BzYi4%2BneSw%3D%3D&mapX=128.6142847&mapY=36.0345423&radius=20000&_type=json

const baseCampAPI = async () => {
  // let url = new URL(
  //   `https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=8&pageNo=1&MobileOS=etc&MobileApp=testweb&serviceKey=gBtrW32SeG0AZeOPjc0%2Bn%2F1UjMBufXyvAG%2B64flFVxhcnH5eLBFXjqT%2FAu9BA7cxV3fujI%2Blkhwr%2BzYi4%2BneSw%3D%3D&_type=json`
  // );
  let url = new URL(
    `https://apis.data.go.kr/B551011/GoCamping/locationBasedList?numOfRows=5&pageNo=1&MobileOS=etc&MobileApp=testweb&serviceKey=gBtrW32SeG0AZeOPjc0%2Bn%2F1UjMBufXyvAG%2B64flFVxhcnH5eLBFXjqT%2FAu9BA7cxV3fujI%2Blkhwr%2BzYi4%2BneSw%3D%3D&mapX=128.6142847&mapY=36.0345423&radius=20000&_type=json`
  );
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  campingList = data.response.body.items.item;
  console.log(campingList);

  render();
};

const render = () => {
  let campingHTML = "";
  campingHTML = campingList
    .map((campingList) => {
      return `<div class="camping-list">
        <div class="camping-img">
            <img class="camping-img-size" src="${campingList.firstImageUrl}" alt="">
        </div>
        <div class="camping-desc">
            <h2>${campingList.facltNm}</h2><span class="point-desc"> 주소: ${campingList.addr1}</span>
            <p><span class="point-desc">내부시설:</span>
                ${campingList.glampInnerFclty}
            </p>
            <p><span class="point-desc">소개글:</span>
                ${campingList.intro}
                </p>
                <span class="point-desc">애견동반:</span>${campingList.animalCmgCl}   
            <div><span class="point-desc">좌표:</span>
                ${campingList.mapX} * ${campingList.mapY}
            </div>
            <p>
            <a href="${campingList.homepage}" target="_blank">홈페이지 바로가기</a>
            <a href="${campingList.resveUrl}" target="_blank">실시간 예약</a>
            </p>
        </div>
    </div>`;
    })
    .join("");

  document.getElementById("camping-board").innerHTML = campingHTML;
};

const getListInfo = async (event) => {
  console.log("클릭됨", event.target.textContent);
  let topic = event.target.textContent;
  console.log("토픽", topic);
  let url = new URL(
    `https://apis.data.go.kr/B551011/GoCamping/locationBasedList?numOfRows=${topic}&pageNo=1&MobileOS=etc&MobileApp=testweb&serviceKey=gBtrW32SeG0AZeOPjc0%2Bn%2F1UjMBufXyvAG%2B64flFVxhcnH5eLBFXjqT%2FAu9BA7cxV3fujI%2Blkhwr%2BzYi4%2BneSw%3D%3D&mapX=128.6142847&mapY=36.0345423&radius=20000&_type=json`
  );
  let response = await fetch(url);
  let data = await response.json();
  console.log("newurl", data);
  campingList = data.hits;
  render();
};
baseCampAPI();
