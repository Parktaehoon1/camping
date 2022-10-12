let campingList = []
// let locateList = []
function xmlToJson(xml) {
    // Create the return object
    var obj = {};
  
    if (xml.nodeType == 1) {
      // element
      // do attributes
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      // text
      obj = xml.nodeValue;
    }
  
    // do children
    // If all text nodes inside, get concatenated text from them.
    var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
      return node.nodeType === 3;
    });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
      obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
        return text + node.nodeValue;
      }, "");
    } else if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof obj[nodeName] == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  }

const baseCampAPI = async () => {
	const url = "https://apis.data.go.kr/B551011/GoCamping/basedList?numOfRows=10&pageNo=1&MobileOS=etc&MobileApp=test&serviceKey=gBtrW32SeG0AZeOPjc0%2Bn%2F1UjMBufXyvAG%2B64flFVxhcnH5eLBFXjqT%2FAu9BA7cxV3fujI%2Blkhwr%2BzYi4%2BneSw%3D%3D";
	const reqURL = `${url}`;
    const response = await fetch(reqURL);
    const xmlString = await response.text();
    let XmlNode = new DOMParser().parseFromString(xmlString, "text/xml");
    campingList = xmlToJson(XmlNode).response.body.items.item;
    console.log("camping list", campingList)
    console.log(xmlToJson(XmlNode));
    render()
  };
  

  const render = () => {
    let campingHTML = '';
    campingHTML = campingList
    .map((campingList)=> {
        return `<div class="camping-list">
        <div class="camping-img">
            <img class="camping-img-size" src="${campingList.firstImageUrl}" alt="">
        </div>
        <div class="camping-desc">
            <h2>${campingList.facltNm}</h2><span>${campingList.addr1}</span>
            <p>
                ${campingList.caravInnerFclty}
            </p>
            <p>
                ${campingList.intro}
            </p>
            <div>
                ${campingList.rights} * ${campingList.published_date}
            </div>
        </div>
    </div>`;
    }).join('');


    document.getElementById("camping-board").innerHTML = campingHTML
}

baseCampAPI()