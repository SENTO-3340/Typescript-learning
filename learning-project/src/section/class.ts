export const cls = () => {
  // class
  // オブジェクトの設計図
  // 似たようなオブジェクトを複数作成するのに便利
  // オブジェクト指向プログラミング（OOP）によく使用される

  //まずclass名を定義(ここで同時に同じ名前の型も作られる)
  class Person {
    name: string; //constructor内で使用するプロパティの型注釈

    // constructor関数（オブジェクトの初期化処理をする）
    // パラメーターの型注釈
    constructor(initName: string) {
      this.name = initName; //constructor内ではプロパティ名の前にthis.をつける
    }

    // class内で作成するメソッドの第一引数にはthisの型を定義できる
    // thisの型をclass名にすることによって、間違った呼び出しを防止できる
    greeting(this: Person) {
      console.log(`Hello! my name is ${this.name}`);
    }
  }
  //new クラス名(constructor引数)でオブジェクト生成
  //それを定数quillに代入
  const quill = new Person('Quill');

  //thisの中身は呼び出し方によって変わる
  //constructor内のインスタンスがthisに置き換わる
  //メソッドの場合は.の左側がメソッド内のthisに置き換わる
  //つまりインスタンス.中身のメソッドでしかこのメソッドは呼べない
  quill.greeting();
};
