/*
* 此文件存储初始状态的棋子
*/

// 枚举棋子的所有类型
const enumPiece = {
  JIANG: "jiang",
  BING: "bing",
  JU: "ju",
  PAO: "pao",
  MA: "ma",
  SHI: "shi",
  XIANG: "xiang",
  properties: {
    jiang: { red: '帥', black: '將' },
    bing: { red: '兵', black: '卒' },
    ju: { red: '車', black: '車' },
    pao: { red: '炮', black: '炮' },
    ma: { red: '馬', black: '馬' },
    shi: { red: '仕', black: '士' },
    xiang: { red: '相', black: '象' }
  }
};

const initPiece = [
  { id: 0, type: enumPiece.JU, red: true, row: 0, col: 0, dead: false },
  { id: 1, type: enumPiece.MA, red: true, row: 0, col: 1, dead: false },
  { id: 2, type: enumPiece.XIANG, red: true, row: 0, col: 2, dead: false },
  { id: 3, type: enumPiece.SHI, red: true, row: 0, col: 3, dead: false },
  { id: 4, type: enumPiece.JIANG, red: true, row: 0, col: 4, dead: false },
  { id: 5, type: enumPiece.SHI, red: true, row: 0, col: 5, dead: false },
  { id: 6, type: enumPiece.XIANG, red: true, row: 0, col: 6, dead: false },
  { id: 7, type: enumPiece.MA, red: true, row: 0, col: 7, dead: false },
  { id: 8, type: enumPiece.JU, red: true, row: 0, col: 8, dead: false },
  { id: 9, type: enumPiece.PAO, red: true, row: 2, col: 1, dead: false },
  { id: 10, type: enumPiece.PAO, red: true, row: 2, col: 7, dead: false },
  { id: 11, type: enumPiece.BING, red: true, row: 3, col: 0, dead: false },
  { id: 12, type: enumPiece.BING, red: true, row: 3, col: 2, dead: false },
  { id: 13, type: enumPiece.BING, red: true, row: 3, col: 4, dead: false },
  { id: 14, type: enumPiece.BING, red: true, row: 3, col: 6, dead: false },
  { id: 15, type: enumPiece.BING, red: true, row: 3, col: 8, dead: false },

  { id: 16, type: enumPiece.JU, red: false, row: 9, col: 0, dead: false },
  { id: 17, type: enumPiece.MA, red: false, row: 9, col: 1, dead: false },
  { id: 18, type: enumPiece.XIANG, red: false, row: 9, col: 2, dead: false },
  { id: 19, type: enumPiece.SHI, red: false, row: 9, col: 3, dead: false },
  { id: 20, type: enumPiece.JIANG, red: false, row: 9, col: 4, dead: false },
  { id: 21, type: enumPiece.SHI, red: false, row: 9, col: 5, dead: false },
  { id: 22, type: enumPiece.XIANG, red: false, row: 9, col: 6, dead: false },
  { id: 23, type: enumPiece.MA, red: false, row: 9, col: 7, dead: false },
  { id: 24, type: enumPiece.JU, red: false, row: 9, col: 8, dead: false },
  { id: 25, type: enumPiece.PAO, red: false, row: 7, col: 1, dead: false },
  { id: 26, type: enumPiece.PAO, red: false, row: 7, col: 7, dead: false },
  { id: 27, type: enumPiece.BING, red: false, row: 6, col: 0, dead: false },
  { id: 28, type: enumPiece.BING, red: false, row: 6, col: 2, dead: false },
  { id: 29, type: enumPiece.BING, red: false, row: 6, col: 4, dead: false },
  { id: 30, type: enumPiece.BING, red: false, row: 6, col: 6, dead: false },
  { id: 31, type: enumPiece.BING, red: false, row: 6, col: 8, dead: false },
];

export { enumPiece, initPiece }