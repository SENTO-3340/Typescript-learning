export const type = () => {
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
  type Color = 'red' | 'bule' | 'yellow'; //３つのLiteral・union型を１つに代入する
  const shirt: {
    color: Color; //ここでのColor型は上記３つの型となる
    size: number;
  } = {
    color: 'red', //''を打つと候補が出てくる
    size: 40,
  };

  // 関数の型
  // パラメーター、戻り値に型定義
  // パラメーターには必ず型定義！　※型推論だとanyとなり破綻するから
  // 戻り値の型は型推論に任せても良い
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }
  add(3, 2);

  // 関数の戻り値に何も返さない場合は型推論はvoidとなる
  // 返り値はundefinedとなるが、voidを使うこと！
  function sayHello(): void {
    console.log('hello');
    return;
  }

  //undefined型　※ほとんど使わない
  let tmp: undefined;
  // null型
  let tmpnull: null;

  // 関数を代入する定数・変数に型を宣言するやり方
  // 定数か関数宣言のどちらかに型注釈をすればどちらかは型推論でカバーできる
  const anotherAdd: (n1: number, n2: number) => number = add;

  // アロー関数の型宣言
  const doubleNum = (num: number): number => num * 2;
  const doublenum: (num: number) => number = (num) => num * 2;

  // コールバック関数の型定義
  // コールバック関数の返り値の型はvoidにしない　※関数が使用出来なくなる
  function doubleAndHandle(num: number, cb: (num: number) => number): void {
    const doubleNum = cb(num * 2);
    console.log(doubleNum);
  }
  doubleAndHandle(21, (doubleNum) => {
    return doubleNum;
  });

  // unknown型
  // any型と似てなんでも代入できるが…
  let unknownInput: unknown;
  let anyInput: any;
  let text: string;
  unknownInput = 'hello';
  unknownInput = 21;
  unknownInput = true;
  // 以下のtext(string型)に代入しようとすると、現在boolian型なのでエラーが出る
  text = anyInput;
  // 以下のようにコードで型を保証すると、代入できる
  if (typeof unknownInput === 'string') {
    text = unknownInput;
  }

  // satisfies演算子
  // 値の型をチェックするためだけの演算子
  // 左に値、右に型を入れると使用できない場合エラーを出してくれる
  28 satisfies number;

  // never型
  // 返り値にundefindすらも帰ってこない、処理が終わらない関数の引数に使う
  function error(message: string): never {
    throw new Error(message);
    while (true) {}
  }

  // never型の応用
  // 以下のコードで関数のパラメーター内の型が、全て関数内で網羅されているかを判別できる
  // もしパラメーター内literal・union型にXLがあったら…↓
  function getSizeName(size: 'S' | 'M' | 'L') {
    switch (size) {
      case 'S':
        return 'small';
      case 'M':
        return 'medium';
      case 'L':
        return 'Large';
      default: //ここの処理で帰ってくる値はXLとなり
        return size satisfies never; //satisfies neverは成立しなくなりエラーとなる
    }
  }
};
