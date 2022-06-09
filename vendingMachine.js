const prompt = require('prompt-sync')();
const productsMachine = [
  ["Chocorramo", "Gansito", "Galletas"],
  ["Maizitos", "Tostacos", "Yogurt"],
  ["Papas", "Platanitos", "Ponque"]
];
const productStock = [
  ["20", "5", "20"],
  ["5", "1000", "5"],
  ["100", "5", "5"]
];

function showVendingMachine(matrixProducts, matrixStock, matrixCode) {
  const SPACES = " ";
  const supline = "-";
  const topLine = supline.repeat(122);
  const spaceTable = 40; //40 size of spaces for word container in table
  const codeProduct = 3; //3 size of the spaces used by a product code. 
  let itemTable = '';
  let coord, stock, spaceLeft, spaceLeft1, spaceLeft2, spaceLeft3;
  let spaceRight, spaceRight1, spaceRight2, spaceRight3;
  console.log(topLine);
  //"for" block that prints the matrix of products, code and vending machine stock.
  for (let i = 0; i < matrixProducts.length; i++) {
    for (let j = 0; j < matrixProducts[i].length; j++) {
      let imparLengthItem = 0;
      let leftSpaceTable, rightSpaceTable, squareItemTable;
      leftSpaceTable = SPACES.repeat(Math.round((spaceTable - (matrixProducts[i][j].length)) / 2));
      //If the length of the product string is odd, the value of the variabe changes.
      if (matrixProducts[i][j].length % 2 === 1) {
        imparLengthItem = 1;
      }
      rightSpaceTable = SPACES.repeat(Math.round((spaceTable - (matrixProducts[i][j].length)) / 2) - imparLengthItem);
      squareItemTable = `|${leftSpaceTable}${matrixProducts[i][j]}${rightSpaceTable}`;
      //When the product stock is equal to zero, change the product name to ----.
      if (matrixStock[i][j] <= 1) {
        matrixProducts[i][j] = `${supline.repeat(4)}`;
      }
      itemTable = itemTable + `${squareItemTable}`;
      //When the end of the row is identified, add the product code and stock data.
      if (j === matrixProducts.length - 1) {
        let imparsubtraction = 1;
        //Calculate the required spaces on the left and right to organize the codes.
        spaceLeft = SPACES.repeat(Math.round((spaceTable - (codeProduct)) / 2));
        spaceRight = SPACES.repeat(Math.round((spaceTable - (codeProduct)) / 2) - imparsubtraction);
        //Calculate the spaces required on the left and right to organize the stock of the product in column 1.
        spaceLeft1 = SPACES.repeat(Math.round((spaceTable - (("Stock:" + productStock[i][j - 2]).length)) / 2))
        spaceRight1 = SPACES.repeat((productStock[i][j - 2].length % 2 != 1) ? spaceLeft1.length : spaceLeft1.length - imparsubtraction); // We use a ternary operator to find out whether the length of the product stock is even or odd.
        //Calculate the spaces required on the left and right to organize the stock of the product in column 2.
        spaceLeft2 = SPACES.repeat(Math.round((spaceTable - (("Stock:" + productStock[i][j - 1]).length)) / 2))
        spaceRight2 = SPACES.repeat((productStock[i][j - 1].length % 2 != 1) ? spaceLeft2.length : spaceLeft2.length - imparsubtraction);
        //Calculate the spaces required on the left and right to organize the stock of the product in column 2.
        spaceLeft3 = SPACES.repeat(Math.round((spaceTable - (("Stock:" + productStock[i][j]).length)) / 2))
        spaceRight3 = SPACES.repeat((productStock[i][j].length % 2 != 1) ? spaceLeft3.length : spaceLeft3.length - imparsubtraction);
        //Organize the results in the coordinates and stock variables, to add it to the itemTable variable and print the final shade.
        coord = `|${spaceLeft}${(i + 1)}.${(j - 1)}${spaceRight}|${spaceLeft}${(i + 1)}.${(j )}${spaceRight}|${spaceLeft}${(i + 1)}.${(j + 1)}${spaceRight}|`;
        stock = `|${spaceLeft1}Stock:${matrixStock[i][j - 2]}${spaceRight1}|${spaceLeft2}Stock:${matrixStock[i][j - 1]}${spaceRight2}|${spaceLeft3}Stock:${matrixStock[i][j]}${spaceRight3}|`;
        itemTable = itemTable + `|\n${stock}\n${coord}\n|${topLine}\n`;
      }
    }
  }
  console.log(itemTable);
}

function showStock(matrixStock, row, column) {
  if (row <= matrixStock.length & column <= matrixStock.length) {
    let newStock = matrixStock[row][column];
    //When the product stock is different from 0, it shows the quantity by subtracting, otherwise it prints a message.
    if (newStock != 0) {
      newStock = newStock - 1;
      matrixStock[row][column] = String(newStock);
    } else {
      console.log('The product is no longer available');
    }
  }
}

function requestProduct(matrixProducts, matrixStock) {
  let rowPosition, columnPosition, codeProduct;
  let showProduct = '';
  while (1) {
    codeProduct = prompt('Enter the product code number: ');
    //If it is a valid code, it prints on console the corresponding product, otherwise it prints an invalid code message.
    if (codeProduct[1] === '.' & codeProduct[0] <= matrixProducts.length & codeProduct[2] <= matrixProducts.length) {
      rowPosition = codeProduct[0] - 1;
      columnPosition = codeProduct[2] - 1;
      showProduct = matrixProducts[rowPosition][columnPosition];
      console.log("Enjoy your product: " + showProduct);
      showStock(matrixStock, rowPosition, columnPosition);
    } else {
      console.log('Wrong code, please try again.');
    }
    showVendingMachine(productsMachine, productStock);
  }
}

function main() {
  showVendingMachine(productsMachine, productStock);
  requestProduct(productsMachine, productStock);
}
main();
