// 型推論　　※基本こっちを使う
// Typescriptが型を予測する
let boo = true;
let num = 10;
let str = 'hello';

// 型注釈 ※型推論できない時に使用する
// 型を宣言する
// 例：let hasvalue;のように初期化しない時などに使用

// boolean型
let hasValue: boolean = true;

// number型
let count: number = 10;
let float: number = 3.14;
let negative: number = -0.12;

// string型
let single: string = 'hello';
let back: string = `hello`;

// object型
// ※キーにアクセスできなくなるから、const person:objectのようには使わない
// Objectメソッド（第一引数がobject）で使うことはある
const person: {
  name: {
    first: string;
    last: string;
  };
  age: number;
} = {
  name: {
    first: 'Jack',
    last: 'Smith',
  },
  age: 21,
};

// Array（配列）型
const fruits: string[] = ['Apple', 'Banana', 'Grape'];

// tuple型
// 配列に入る値の型を固定する
const book: [string, number, boolean] = ['business', 1500, false];
book.push(21); //←初期値には厳格やけど、後から入る物には緩い
console.log(book[2]); //ただ参照しようとする(indexに3を入れる)とちゃんとエラーがでる

// enum型
// objectと特定の型を同時に宣言できる
// enum宣言内の値を固定できる
// 型は統一した方が良い、string,number等
// 宣言は大文字始まり、object内は全て大文字が直良し
enum CaffeeSize {
  SHORT = 'SHORT',
  TALL = 'TALL',
  GRANDE = 'GRANDE',
  VENTI = 'VENTI',
}

const caffee = {
  hot: true,
  size: CaffeeSize.TALL,
};

// any型
// なんでも入る
let anything: any = true;
anything = 'hello';
anything = 33;
anything = ['hello', 33, true];
anything = {};
anything.hi = 'hi';
let banana = 'banana';
banana = anything; //bananaはstring型なのにanythingが入ってしまう
//Typescriptではany型が絡んだら型の安全性を無視してしまう
//なので使わないほうが良い

// union型
// |(バーティカルライン)を入れて複数の型を宣言できる
let unionType: number | string = 10;
unionType.toFixed(); //現在入ってる型を見て予測がでる
unionType = 'hello'; //string型も宣言してるから入る
unionType.toUpperCase(); //現在入ってる型を見て予測がでる
//配列にも使用できる
let unionArray: (number | boolean)[] = [false, 55];

// Literal型
// 特定の決まった型を宣言
const apple: 'apple' = 'apple'; //'apple'しか入らない
const number: 1 = 1;
const lion = 'lion'; //constは定数（変更不可）なので型推論はLiteral型になる
let bard = 'bard'; //letの型推論は値から型を予測する

//union型+Literal型でenum型のような挙動をつくれる
let clothSize: 'small' | 'medium' | 'large' = 'small';

const Cloth: {
  color: string;
  size: 'small' | 'medium' | 'large'; //このようにするとenumのようにできる
} = {
  color: 'white',
  size: clothSize, //上記の三つからは選べない、値は作ってないから
};

// typeエイリアス
//型に名前を付けて扱いやすくする
type Color = 'red' | 'bule' | 'yellow';//３つのLiteral・union型を１つに代入する
const shirt: {
  color: Color;//ここでのColor型は上記３つの型となる
  size: number;
} = {
  color: 'red',//''を打つと候補が出てくる
  size: 40,
};

