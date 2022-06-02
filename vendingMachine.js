const prompt = require('prompt-sync')();
let products = [
  ["Chocorramo", "Gansito", "Galletas"],
  ["Maizitos", "Tostacos", "Yogurt"],
  ["Papas", "Platanitos", "Ponque"]
];
let stock = [
  [5, 5, 5],
  [5, 5, 5],
  [5, 5, 5]
];

function showVendingMachine(arr1, arr2) {
  let result = '';
  let coord, stoc;
  for (let i = 0; i < arr1.length; i++) { //0
    for (let j = 0; j < arr1[i].length; j++) { //2
      result = result + arr1[i][j] + '    ';
      if (j === arr1.length - 1) {
        coord = ('   ' + (i + 1) + '.' + (j - 1) + '       ' + (i + 1) + '.' + (j) + '       ' + (i + 1) + '.' + (j + 1))
          //coord = ((i + 1) + '.' + (j - 1) + (i + 1) + '.' + (j) + (i + 1) + '.' + (j + 1))
        stoc = ('    ' + arr2[i][j - 2] + '         ' + arr2[i][j - 1] + '         ' + arr2[i][j]);
        //stoc = (arr2[i][j] + arr2[i][j + 1] + arr2[i][j + 2]);
        result = result + `\n${coord}\n${stoc}\n`;
      }
    }
  }
  console.log(result);
}

function productStock(arr3, a, b) {
  if (a <= arr3.length & b <= arr3.length) {
    let newStock = arr3[a][b];
    if (newStock !== 0) {
      newStock = newStock - 1;
      arr3[a][b] = newStock;
    } else {
      console.log('El producto ya no se encutra disponible');
    }
  }
}

function productRequest(matrix, arr3) {
  let a, b, code;
  while (1) {
    code = prompt('Ingerese el codigo numerico del producto: ');
    if (code[1] === '.' & code[0] <= matrix.length & code[2] <= matrix.length) {
      a = code[0] - 1, b = code[2] - 1;
      let prod = '';
      prod = matrix[a][b];
      console.log("Disfrute su producto: " + prod);
      productStock(arr3, a, b);
    } else {
      console.log('Codigo incorrecto, intente nuevamente.');
    }
    console.log();
    showVendingMachine(products, stock);

  }

}

function main() {
  showVendingMachine(products, stock);
  productRequest(products, stock);
}

main();
