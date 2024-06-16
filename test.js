const express = require ("express");
const app=express();
const mongoose = require('mongoose');
const { ObjectId } = require("mongodb");
function getPrice(stringprice)
{
    const trimmedText = stringprice.trim();
    const numberWithoutCommas = trimmedText.replace(",", "");
    const number = parseInt(numberWithoutCommas);
    return number;
}



const data1=[{
    "_id": {
      "$oid": "663f573c25854428ccbc373e"
    },
    "ProductName": "Perfume",
    "CategoryName": "Clothe",
    "clothId": {
      "$oid": "663f573c25854428ccbc373c"
    },
    "Stock": 1,
    "Price": 30,
    "sales": 49,
    "__v": 0
  },
  {
    "_id": {
      "$oid": "663f57df291fce7e25bc4450"
    },
    "ProductName": "Perfume",
    "CategoryName": "Fragrance",
    "fragranceId": {
      "$oid": "663f57de291fce7e25bc444e"
    },
    "Stock": 46,
    "Price": 30,
    "sales": 4,
    "__v": 0
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a813"
    },
    "ProductName": "WINTER'23 MEN WAISTCOAT FORMAL LIGHT OLIVE",
    "CategoryName": "Clothe",
    "Stock": 23,
    "Price": 6743,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb1f"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a814"
    },
    "ProductName": "WINTER'23 MEN WAISTCOAT FORMAL DARK GREY",
    "CategoryName": "Clothe",
    "Stock": 39,
    "Price": 6743,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb20"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a815"
    },
    "ProductName": "WINTER'23 MEN WAISTCOAT FORMAL CHARCOAL",
    "CategoryName": "Clothe",
    "Stock": 37,
    "Price": 6743,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb21"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a816"
    },
    "ProductName": "WINTER'23 MEN WAISTCOAT FORMAL OLIVE",
    "CategoryName": "Clothe",
    "Stock": 26,
    "Price": 5400,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb22"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a817"
    },
    "ProductName": "WINTER'23 MEN WAISTCOAT FORMAL BLACK",
    "CategoryName": "Clothe",
    "Stock": 10,
    "Price": 5786,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb23"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a818"
    },
    "ProductName": "PRE WINTER'23 MEN WAISTCOAT PLAIN OFF WHITE",
    "CategoryName": "Clothe",
    "Stock": 22,
    "Price": 5400,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb24"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a819"
    },
    "ProductName": "PRE WINTER'23 MEN WAISTCOAT PLAIN ROYAL BLUE",
    "CategoryName": "Clothe",
    "Stock": 27,
    "Price": 5400,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb25"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a81a"
    },
    "ProductName": "PRE WINTER'23 MEN WAISTCOAT PLAIN CHOCOLATE",
    "CategoryName": "Clothe",
    "Stock": 32,
    "Price": 5400,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb26"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a81b"
    },
    "ProductName": "PRE WINTER'23 MEN WAISTCOAT PLAIN RED",
    "CategoryName": "Clothe",
    "Stock": 31,
    "Price": 5786,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb27"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a81c"
    },
    "ProductName": "PRE WINTER'23 MEN WAISTCOAT PLAIN MULTI",
    "CategoryName": "Clothe",
    "Stock": 12,
    "Price": 5786,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb28"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a81d"
    },
    "ProductName": "PRE WINTER'23 MEN WAISTCOAT PLAIN BROWN",
    "CategoryName": "Clothe",
    "Stock": 37,
    "Price": 5786,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb29"
    }
  },
  {
    "_id": {
      "$oid": "6647c4a23d6270f25122a81e"
    },
    "ProductName": "PRE WINTER'23 MEN WAISTCOAT PLAIN DARK GREY",
    "CategoryName": "Clothe",
    "Stock": 24,
    "Price": 5786,
    "sales": 0,
    "clothId": {
      "$oid": "6647c4216df5b859e9e1bb2a"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a821"
    },
    "ProductName": "MEN KURTA RUST",
    "CategoryName": "Clothe",
    "Stock": 45,
    "Price": 7490,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20d6"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a822"
    },
    "ProductName": "MEN KURTA BURGUNDY",
    "CategoryName": "Clothe",
    "Stock": 45,
    "Price": 7490,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20d7"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a823"
    },
    "ProductName": "MEN KURTA BLACK",
    "CategoryName": "Clothe",
    "Stock": 50,
    "Price": 4190,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20d8"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a824"
    },
    "ProductName": "MEN KURTA MEHENDI GREEN",
    "CategoryName": "Clothe",
    "Stock": 13,
    "Price": 4190,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20d9"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a825"
    },
    "ProductName": "MEN KURTA BLACK",
    "CategoryName": "Clothe",
    "Stock": 19,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20da"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a826"
    },
    "ProductName": "MEN KURTA OFF-WHITE",
    "CategoryName": "Clothe",
    "Stock": 10,
    "Price": 4190,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20db"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a827"
    },
    "ProductName": "MEN KURTA PAJAMA BROWN",
    "CategoryName": "Clothe",
    "Stock": 29,
    "Price": 6490,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20dc"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a828"
    },
    "ProductName": "MEN KURTA LEMON",
    "CategoryName": "Clothe",
    "Stock": 28,
    "Price": 4190,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20dd"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a829"
    },
    "ProductName": "MEN KURTA OFF-WHITE",
    "CategoryName": "Clothe",
    "Stock": 44,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20de"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a82a"
    },
    "ProductName": "MEN KURTA LEMON",
    "CategoryName": "Clothe",
    "Stock": 23,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20df"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a82b"
    },
    "ProductName": "MEN KURTA NAVY-BLUE",
    "CategoryName": "Clothe",
    "Stock": 10,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20e0"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a82c"
    },
    "ProductName": "MEN KURTA LEMON",
    "CategoryName": "Clothe",
    "Stock": 10,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20e1"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a82d"
    },
    "ProductName": "MEN KURTA LIGHT-GREEN",
    "CategoryName": "Clothe",
    "Stock": 38,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20e2"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a82e"
    },
    "ProductName": "MEN KURTA LIGHT-BLUE",
    "CategoryName": "Clothe",
    "Stock": 49,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20e3"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a82f"
    },
    "ProductName": "MEN KURTA LIGHT-BLUE",
    "CategoryName": "Clothe",
    "Stock": 21,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20e4"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a830"
    },
    "ProductName": "MEN KURTA BLACK",
    "CategoryName": "Clothe",
    "Stock": 15,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20e5"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a831"
    },
    "ProductName": "MEN KURTA NAVY-BLUE",
    "CategoryName": "Clothe",
    "Stock": 31,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20e6"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a832"
    },
    "ProductName": "MEN KURTA LEMON",
    "CategoryName": "Clothe",
    "Stock": 31,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20e7"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a833"
    },
    "ProductName": "MEN KURTA BURGUNDY",
    "CategoryName": "Clothe",
    "Stock": 15,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20e8"
    }
  },
  {
    "_id": {
      "$oid": "6647c7563d6270f25122a834"
    },
    "ProductName": "MEN KURTA BROWN",
    "CategoryName": "Clothe",
    "Stock": 29,
    "Price": 3690,
    "sales": 0,
    "clothId": {
      "$oid": "6647c6a5876d30dd046a20e9"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a835"
    },
    "ProductName": " 100% COTTON UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 11,
    "Price":  7990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd6d"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a836"
    },
    "ProductName": " 100% COTTON UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 31,
    "Price":  3990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd6e"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a837"
    },
    "ProductName": " 100% COTTON UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 48,
    "Price":  4290,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd6f"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a838"
    },
    "ProductName": " 100% COTTON UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 12,
    "Price":  3990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd70"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a839"
    },
    "ProductName": "Men's Casual Slim Fit Short Sleeve Polo Shirts T-Shirts",
    "CategoryName": "Clothe",
    "Stock": 28,
    "Price": 1999,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd71"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a83a"
    },
    "ProductName": "Men's Relaxed Fit Cotton Crewneck Sweatshirt",
    "CategoryName": "Clothe",
    "Stock": 34,
    "Price": 3999 ,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd72"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a83b"
    },
    "ProductName": "Women's V Neck Striped Roll up Sleeve Button Down Blouses Tops",
    "CategoryName": "Clothe",
    "Stock": 39,
    "Price": 2299,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd73"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a83c"
    },
    "ProductName": " BLENDED UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 46,
    "Price":  5990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd74"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a83d"
    },
    "ProductName": " BLENDED UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 43,
    "Price":  5990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd75"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a83e"
    },
    "ProductName": " BLENDED UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 50,
    "Price":  5990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd76"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a83f"
    },
    "ProductName": " BLENDED UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 21,
    "Price":  5990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd77"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a840"
    },
    "ProductName": " BLENDED UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 35,
    "Price":  5990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd78"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a841"
    },
    "ProductName": " BLENDED UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 13,
    "Price":  5990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd79"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a842"
    },
    "ProductName": " BLENDED UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 48,
    "Price":  5990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd7a"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a843"
    },
    "ProductName": " 100% COTTON UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 36,
    "Price":  5490,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd7b"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a844"
    },
    "ProductName": " 100% COTTON UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 45,
    "Price":  7990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd7c"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a845"
    },
    "ProductName": " 100% COTTON UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 33,
    "Price":  7990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd7d"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a846"
    },
    "ProductName": " 100% COTTON UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 17,
    "Price":  7990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd7e"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a847"
    },
    "ProductName": " 100% COTTON UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 25,
    "Price":  7990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd7f"
    }
  },
  {
    "_id": {
      "$oid": "6647c8293d6270f25122a848"
    },
    "ProductName": " 100% COTTON UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 49,
    "Price":  7990,
    "sales": 0,
    "clothId": {
      "$oid": "6647c7da97e39d4a8e20bd80"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a852"
    },
    "ProductName": "FESTIVE'23 MEN KAMEEZ SHALWAR CASUAL PEACH",
    "CategoryName": "Clothe",
    "Stock": 18,
    "Price":  5014,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c7793"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a853"
    },
    "ProductName": "FESTIVE'23 MEN KAMEEZ SHALWAR CASUAL SKY-BLUE",
    "CategoryName": "Clothe",
    "Stock": 17,
    "Price":  4396,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c7794"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a854"
    },
    "ProductName": "FESTIVE'23 MEN KAMEEZ SHALWAR PLAIN PEACH",
    "CategoryName": "Clothe",
    "Stock": 38,
    "Price":  5014,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c7795"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a855"
    },
    "ProductName": "FESTIVE'23 MEN KAMEEZ SHALWAR SEMI FORMAL OCEAN-BLUE",
    "CategoryName": "Clothe",
    "Stock": 16,
    "Price":  5014,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c7796"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a856"
    },
    "ProductName": "FESTIVE'23 MEN KAMEEZ SHALWAR CASUAL LIGHT-BISCOTTI",
    "CategoryName": "Clothe",
    "Stock": 32,
    "Price":  5014,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c7797"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a857"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR PLAIN TEA-PINK",
    "CategoryName": "Clothe",
    "Stock": 38,
    "Price":  4643,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c7798"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a858"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR CASUAL ICE-GREY",
    "CategoryName": "Clothe",
    "Stock": 31,
    "Price":  5243,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c7799"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a859"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR SEMI FORMAL WOOD-BROWN",
    "CategoryName": "Clothe",
    "Stock": 29,
    "Price":  5018,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c779a"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a85a"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR PLAIN WALNUT",
    "CategoryName": "Clothe",
    "Stock": 42,
    "Price":  4718,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c779b"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a85b"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR CASUAL KHAKI",
    "CategoryName": "Clothe",
    "Stock": 41,
    "Price":  5243,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c779c"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a85c"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR PLAIN TEAL",
    "CategoryName": "Clothe",
    "Stock": 10,
    "Price":  5018,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c779d"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a85d"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR CASUAL FAWN",
    "CategoryName": "Clothe",
    "Stock": 21,
    "Price":  4493,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c779e"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a85e"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR PLAIN BRICK-RED",
    "CategoryName": "Clothe",
    "Stock": 38,
    "Price":  5168,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c779f"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a85f"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR CASUAL GREY",
    "CategoryName": "Clothe",
    "Stock": 46,
    "Price":  4868,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77a0"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a860"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR CASUAL BROWN",
    "CategoryName": "Clothe",
    "Stock": 13,
    "Price":  5243,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77a1"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a861"
    },
    "ProductName": "PRE WINTER'23 MEN KAMEEZ SHALWAR PLAIN SKY-BLUE",
    "CategoryName": "Clothe",
    "Stock": 49,
    "Price":  4643,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77a2"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a862"
    },
    "ProductName": "WINTER'23 MEN KAMEEZ SHALWAR CASUAL OLIVE-GREEN",
    "CategoryName": "Clothe",
    "Stock": 26,
    "Price":  5243,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77a3"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a863"
    },
    "ProductName": "WINTER'23 MEN KAMEEZ SHALWAR CASUAL EGG-WHITE",
    "CategoryName": "Clothe",
    "Stock": 25,
    "Price":  5243,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77a4"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a864"
    },
    "ProductName": "WINTER'23 MEN KAMEEZ SHALWAR CASUAL BLACK",
    "CategoryName": "Clothe",
    "Stock": 15,
    "Price":  5393,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77a5"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a865"
    },
    "ProductName": "WINTER'23 MEN KAMEEZ SHALWAR SEMI FORMAL BURGUNDY",
    "CategoryName": "Clothe",
    "Stock": 50,
    "Price":  4868,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77a6"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a866"
    },
    "ProductName": "WINTER'23 MEN KAMEEZ SHALWAR PLAIN PURPLE",
    "CategoryName": "Clothe",
    "Stock": 13,
    "Price":  4868,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77a7"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a867"
    },
    "ProductName": "WINTER'23 MEN KAMEEZ SHALWAR CASUAL BEIGE",
    "CategoryName": "Clothe",
    "Stock": 35,
    "Price":  5243,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77a8"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a868"
    },
    "ProductName": "WINTER'23 MEN KAMEEZ SHALWAR PLAIN NAVY-BLUE",
    "CategoryName": "Clothe",
    "Stock": 28,
    "Price":  4868,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77a9"
    }
  },
  {
    "_id": {
      "$oid": "6647d8c53d6270f25122a869"
    },
    "ProductName": "WINTER'23 MEN KAMEEZ SHALWAR PLAIN CHOCOLATE",
    "CategoryName": "Clothe",
    "Stock": 10,
    "Price":  4868,
    "sales": 0,
    "clothId": {
      "$oid": "6647d29972f1e655955c77aa"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a87d"
    },
    "ProductName": "FESTIVE'23 SHADOW FLORAL EMBROIDERED STITCHED 2PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 19,
    "Price":  4418,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68973"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a87e"
    },
    "ProductName": "FESTIVE'23 DRAWN FLORA EMBROIDERED STITCHED 2PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 36,
    "Price":  4485,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68974"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a87f"
    },
    "ProductName": "FESTIVE'23 WOMEN STITCHED 3PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 29,
    "Price":  6914,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68975"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a880"
    },
    "ProductName": "FESTIVE'23 WOMEN STITCHED TROUSER",
    "CategoryName": "Clothe",
    "Stock": 27,
    "Price":  1074,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68976"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a881"
    },
    "ProductName": "SUMMER'23 HEAD RUSH STITCHED 2PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 31,
    "Price":  3824,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68977"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a882"
    },
    "ProductName": "FESTIVE'23 PERSIMMON STITCHED 3PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 49,
    "Price":  7177,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68978"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a883"
    },
    "ProductName": "FESTIVE'23 CELESTE STITCHED 3PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 33,
    "Price":  6945,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68979"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a884"
    },
    "ProductName": "FESTIVE'23 WOMEN STITCHED TROUSER",
    "CategoryName": "Clothe",
    "Stock": 18,
    "Price":  1074,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6897a"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a885"
    },
    "ProductName": "SUMMER'23 PRINTED FENCOTT STITCHED 2PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 44,
    "Price":  3701,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6897b"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a886"
    },
    "ProductName": "FESTIVE'23 HANGING PEARLS STITCHED 3PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 49,
    "Price":  7091,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6897c"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a887"
    },
    "ProductName": "FESTIVE'23 EMBROIDERED MOUNTAIN GRAY STITCHED 3PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 44,
    "Price":  5168,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6897d"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a888"
    },
    "ProductName": "SUMMER'23 GREEN FOREST STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 26,
    "Price":  2310,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6897e"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a889"
    },
    "ProductName": "FESTIVE'23 WOMEN STITCHED TROUSER",
    "CategoryName": "Clothe",
    "Stock": 48,
    "Price":  1074,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6897f"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a88a"
    },
    "ProductName": "FESTIVE'23 WOMEN STITCHED 1PC KAMEEZ",
    "CategoryName": "Clothe",
    "Stock": 26,
    "Price":  2924,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68980"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a88b"
    },
    "ProductName": "FESTIVE'23 WOMEN STITCHED TROUSER",
    "CategoryName": "Clothe",
    "Stock": 40,
    "Price":  1074,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68981"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a88c"
    },
    "ProductName": "FESTIVE'23 WOMEN STITCHED 1PC KAMEEZ",
    "CategoryName": "Clothe",
    "Stock": 44,
    "Price":  2851,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68982"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a88d"
    },
    "ProductName": "FESTIVE'23 WOMEN STITCHED 1PC KAMEEZ",
    "CategoryName": "Clothe",
    "Stock": 49,
    "Price":  3314,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68983"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a88e"
    },
    "ProductName": "SUMMER'23 PRINTED TECHNICOLOR STITCHED 2PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 11,
    "Price":  3855,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68984"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a88f"
    },
    "ProductName": "FESTIVE'23 CYBER LIME STITCHED 3PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 42,
    "Price":  6713,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68985"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a890"
    },
    "ProductName": "SUMMER'23 SHEEN STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 38,
    "Price":  3005,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68986"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a891"
    },
    "ProductName": "SUMMER'23 WOMEN STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 38,
    "Price":  2387,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68987"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a892"
    },
    "ProductName": "SPRING SUMMER'23 WOMEN STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 30,
    "Price":  2465,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68988"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a893"
    },
    "ProductName": "SPRING SUMMER'23 CRAFTED FOLK STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 20,
    "Price":  2387,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68989"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a894"
    },
    "ProductName": "SPRING SUMMER'23 TRADITIONAL TRENDS STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 27,
    "Price":  2310,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6898a"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a895"
    },
    "ProductName": "SUMMER'23 GREEN FOREST STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 48,
    "Price":  2310,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6898b"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a896"
    },
    "ProductName": "SPRING SUMMER'23 WOMEN STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 10,
    "Price":  2465,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6898c"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a897"
    },
    "ProductName": "SPRING SUMMER'23 CRAFTED FOLK STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 45,
    "Price":  2387,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6898d"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a898"
    },
    "ProductName": "SPRING SUMMER'23 TRADITIONAL TRENDS STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 22,
    "Price":  2310,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6898e"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a899"
    },
    "ProductName": "SPRING SUMMER'23 BYZANTINE STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 18,
    "Price":  2441,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b6898f"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a89a"
    },
    "ProductName": "SPRING SUMMER'23 DELICATE TULIP STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 34,
    "Price":  2465,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68990"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a89b"
    },
    "ProductName": "SPRING SUMMER'23 WOMEN STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 41,
    "Price":  2465,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68991"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a89c"
    },
    "ProductName": "SUMMER'23 WOMEN STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 24,
    "Price":  2287,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68992"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a89d"
    },
    "ProductName": "SUMMER'23 IKAT DREAMS STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 24,
    "Price":  2310,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68993"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a89e"
    },
    "ProductName": "SUMMER'23 SEASIDE HUT STITCHED 2PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 28,
    "Price":  2851,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68994"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a89f"
    },
    "ProductName": "SUMMER'23 DOODLE MARKS STITCHED 2PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 14,
    "Price":  3083,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68995"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a8a0"
    },
    "ProductName": "SUMMER'23 SCRIBBLED CHAMBRE STITCHED 2PC SUIT",
    "CategoryName": "Clothe",
    "Stock": 18,
    "Price":  3083,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68996"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a8a1"
    },
    "ProductName": "SUMMER'23 MODERN TARTAN STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 39,
    "Price":  2001,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68997"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a8a2"
    },
    "ProductName": "SUMMER'23 HARLEQUIN GEOMETRIC STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 50,
    "Price":  2001,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68998"
    }
  },
  {
    "_id": {
      "$oid": "6647dd083d6270f25122a8a3"
    },
    "ProductName": "SUMMER'23 ADMIRAL CHECKS STITCHED 1PC KURTI",
    "CategoryName": "Clothe",
    "Stock": 16,
    "Price":  2001,
    "sales": 0,
    "clothId": {
      "$oid": "6647dc59e2530b91c7b68999"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8b0"
    },
    "ProductName": "WINTER'23 WOMEN PRINTED KHADDAR 1PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 40,
    "Price":  1118,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55d8"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8b1"
    },
    "ProductName": "WINTER'23 WOMEN PRINTED KHADDAR 2PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 10,
    "Price":  2243,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55d9"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8b2"
    },
    "ProductName": "FESTIVE'23 EMBROIDERED LAWN 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 43,
    "Price":  5014,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55da"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8b3"
    },
    "ProductName": "FESTIVE'23 YARN DYED JACQUARD EMBROIDERED 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 37,
    "Price":  5168,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55db"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8b4"
    },
    "ProductName": "FESTIVE'23 YARN DYED JACQUARD EMBROIDERED 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 40,
    "Price":  5168,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55dc"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8b5"
    },
    "ProductName": "FESTIVE'23 YARN DYED  EMBROIDERED 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 50,
    "Price":  5168,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55dd"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8b6"
    },
    "ProductName": "FESTIVE'23 CHIKANKARI EMBROIDERED LAWN 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 30,
    "Price":  5941,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55de"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8b7"
    },
    "ProductName": "WINTER'22 DIGITAL PRINTED OAK SILK SHIRT 1PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 23,
    "Price":  1229,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55df"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8b8"
    },
    "ProductName": "PRE WINTER'23 WOMEN PRINTED LAWN 2PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 46,
    "Price":  2168,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55e0"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8b9"
    },
    "ProductName": "PRE WINTER'23 WOMEN PRINTED LAWN 2PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 29,
    "Price":  2168,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55e1"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8ba"
    },
    "ProductName": "PRE WINTER'23 PRINTED 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 31,
    "Price":  2918,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55e2"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8bb"
    },
    "ProductName": "EID FESTIVE'22 RADIANT BASIC PRINTED LAWN 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 46,
    "Price":  3855,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55e3"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8bc"
    },
    "ProductName": "WINTER'23 WOMEN EMBROIDERED JACQUARD 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 11,
    "Price":  4268,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55e4"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8bd"
    },
    "ProductName": "WINTER'23 WOMEN PRINTED KHADDAR 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 12,
    "Price":  2993,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55e5"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8be"
    },
    "ProductName": "WINTER'23 WOMEN EMBROIDERY KHADDAR 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 17,
    "Price":  3668,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55e6"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8bf"
    },
    "ProductName": "WINTER'23 WOMEN PRINTED KHADDAR 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 44,
    "Price":  2993,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55e7"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8c0"
    },
    "ProductName": "WINTER'23 WOMEN EMBROIDERED JACQUARD 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 16,
    "Price":  4493,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55e8"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8c1"
    },
    "ProductName": "WINTER'23 WOMEN EMBROIDERED JACQUARD 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 21,
    "Price":  4493,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55e9"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8c2"
    },
    "ProductName": "WINTER'23 WOMEN EMBROIDERED JACQUARD 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 23,
    "Price":  4493,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55ea"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8c3"
    },
    "ProductName": "WINTER'23 WOMEN EMBROIDERY KHADDAR 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 36,
    "Price":  3668,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55eb"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8c4"
    },
    "ProductName": "WINTER'23 WOMEN PRINTED KHADDAR 3PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 17,
    "Price":  2993,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55ec"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8c5"
    },
    "ProductName": "WINTER'23 WOMEN PRINTED KHADDAR 1PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 11,
    "Price":  1118,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55ed"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8c6"
    },
    "ProductName": "WINTER'23 WOMEN PRINTED KHADDAR 2PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 36,
    "Price":  2243,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55ee"
    }
  },
  {
    "_id": {
      "$oid": "6647df763d6270f25122a8c7"
    },
    "ProductName": "WINTER'23 WOMEN PRINTED KHADDAR 1PC UNSTITCHED",
    "CategoryName": "Clothe",
    "Stock": 12,
    "Price":  1118,
    "sales": 0,
    "clothId": {
      "$oid": "6647df17a4442053bd6b55ef"
    }
  }]
  




















app.listen(3000,()=>{
    console.log("server Started");
});







