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
    // readonly修飾子、初期化後は読み込むだけで、class内外書き換え不可
    // protected装飾子、class外アクセス不可ただし継承先ではアクセス可能に！
    constructor(public readonly name: string, protected age: number) {}
    incrementAge(this: Person2) {
      this.age += 1;
    }
    greeting(this: Person2) {
      console.log(`Hello! my name is ${this.name}.I am ${this.age} years old.`);
    }
  }
  const jhon = new Person2('Jhon', 25);
  jhon.incrementAge();
  jhon.greeting();

  // abstract(抽象クラス):継承に使用するためのクラス
  // インスタンスを生成出来ない
  abstract class Person3 {
    constructor(public readonly name: string, protected age: number) {}
    greeting(this: Person3) {
      console.log(`Hello! my name is ${this.name}.I am ${this.age} years old.`);
      // 抽象メソッドの配置
      this.explainjob();
    }
    // abstractメソッド宣言：継承先用のメソッド、実行内容は書けない（継承先で書く）
    // abstractメソッドは継承先で必ず実行する必要がある
    abstract explainjob(): void;
  }

  //extends
  //元々あるclassを継承したclassを作る
  class Teacher extends Person3 {
    // abstractメソッドの実行
    explainjob() {
      console.log(`I am teacher and I teach ${this.subject}`);
    }
    // ゲッター・セッター
    // get,オブジェクトを取得するときに実行する
    // 値を返す必要あり（取得されるオブジェクト）
    // 以下では取得時に、_subjectが空のオブジェクトだったら手動でエラーを出す
    get subject(): string {
      if (!this._subject) {
        throw new Error('There is no subject.');
      }
      return this._subject;
    }
    // set,オブジェクトの値を上書きする時に実行する
    // 以下では_subjectの値が更新されなかったら手動でエラーを出す
    set subject(value) {
      if (!value) {
        throw new Error('There is no subject.');
      }
      this._subject = value;
    }
    // 継承したclass内でオブジェクトの拡張をするとき
    // constructor関数に引数を複写（装飾子は不要）、続きで引数を追加する
    constructor(name: string, age: number, private _subject: string) {
      super(name, age); //再宣言したconstructor関数内にはsuper関数(引数)を入れる
    }
    // メソッドを更新したい時は、再宣言して上書き（this:型）を継承したclassに変更
    greeting(this: Teacher) {
      console.log(
        `Hello! my name is ${this.name}.I am ${this.age} years old.I teach ${this.subject}`
      );
    }
  }
  const teacher = new Teacher('Quill', 38, 'Math');
  teacher.greeting();
  teacher.subject;
  teacher.subject = 'Music';

  // staticを使用してインスタンスを作らずにクラスを使用する方法
  class STA {
    static species = 'Homo sapiens';
    static isAdult(age: number) {
      if (age > 17) return true;
      return false;
    }
  }
  STA.species;
  STA.isAdult;

  // private constructorでシングルトンパターンを作る方法
  // constuructorにprivate修飾子を付けて、外部からインスタンス生成不可に
  // private static instanceプロパティ（class型）を作成し、getInstance関数
  // 呼び出し時に、値が空の場合のみインスタンスを生成し値とする。
  // これにより外部から一度しかインスタンスを生成出来ないシングルトンパターン完成。
  class Teacher2 {
    private static instance: Teacher2;
    private constructor(public name: string, public age: number) {}
    static getInstance() {
      if (Teacher2.instance) {
        return Teacher2.instance;
      } else {
        Teacher2.instance = new Teacher2('Seito', 34);
        return Teacher2.instance;
      }
    }
    greeting() {
      console.log(`Hello! my name is ${this.name}.I am ${this.age} years old.`);
    }
  }
  const teacher2 = Teacher2.getInstance();
  teacher2.greeting();
};
