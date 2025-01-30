export const cls = () => {
  // class
  // オブジェクトの設計図
  // 似たようなオブジェクトを複数作成するのに便利
  // オブジェクト指向プログラミング（OOP）によく使用される

  //まずclass名を定義(ここで同時に同じ名前の型も作られる)
  class Person {
    //constructor内で使用するプロパティの型注釈（フィールド）
    //public装飾子（省略可）、これはデフォルト。どこでもアクセス可。
    public name: string;
    //private装飾子、classの外からアクセスできなくなる
    //class内でしか使用せず、呼び出し時に変更したくない時などに使用
    private age: number;

    // constructor関数（オブジェクトの初期化処理をする）
    // パラメーターの型注釈
    constructor(initName: string, initAge: number) {
      this.name = initName; //constructor内ではプロパティ名の前にthis.をつける
      this.age = initAge;
      //thisの中身は呼び出し方によって変わる
      //constructor内のthisは呼び出しもとで生成されたインスタンスに置き換わる
    }

    // メソッド＝class内の関数
    // class内で作成するメソッドの第一引数にはthisの型を定義できる
    // thisの型をclass名にすることによって、間違った呼び出しを防止できる
    incrementAge(this: Person) {
      this.age += 1;
    }
    greeting(this: Person) {
      console.log(`Hello! my name is ${this.name}.I am ${this.age} years old.`);
    }
    //thisの中身は呼び出し方によって変わる
    //メソッドの場合は呼び出し元の.メソッドの左側がthisに置き換わる
    //インスタンス.メソッドでしかこのメソッドは呼べない仕組み（カプセル化）
  }
  //インスタンス＝classをもとに生成されるオブジェクト
  //new クラス名(constructor引数)でインスタンス生成
  //それを定数quillに代入
  const quill = new Person('Quill', 38);
  // インスタンスを用いてメソッドにアクセス
  quill.incrementAge();
  quill.greeting();

  // constructorの初期化処理を省略する方法
  class Person2 {
    // 以下のように引数に装飾子 プロパティ名:型注釈　とすることによって
    // フィールド内と、constructor内を省略できる
    constructor(public name: string, private age: number) {}
    incrementAge(this: Person2) {
      this.age += 1;
    }
    greeting(this: Person2) {
      console.log(`Hello! my name is ${this.name}.I am ${this.age} years old.`);
    }
  }
  const Jhon = new Person2('Jhon', 25);
  quill.incrementAge();
  quill.greeting();
};
