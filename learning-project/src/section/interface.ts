export const interFace = () => {
  // interfaceはオブジェクトにのみ使える型を集約する機能
  // typeエイリアスのオブジェクトだけver.
  interface Nameable {
    name: string;
    // ?でオプショナルプロパティ、パラメーターを作れる
    // あってもなくても良い
    nicName?: string;
  }

  const nameable: Nameable = {
    name: 'Quill',
  };

  // interfaceはextendsを使用でき、継承ができる
  // 継承元はtypeエイリアスでもOK
  // ただしプロパティ被りは継承元の型を満たしていないとエラー
  interface Human extends Nameable {
    age: number;
    greeting(message: string): void; //メソッド型注釈の省略記法
  }

  // typeエイリアスで継承したいときは&で指定する
  // プロパティ被りは違う型を指定したらnever型となる
  type Human2 = {
    age: number;
    greeting(message: string): void;
  } & Nameable;

  // interfaceで関数の型注釈をする方法
  // 本来ならtypeエイリアス↓
  type addFunc = (num1: number, num2: number) => void;
  // interfaceを使用する場合は、空関数のような記述で書く
  interface addFunc2 {
    (num1: number, num2: number): void;
  }
  // 基本的にはtypeエイリアスで良いが理解していると◎

  const human: Human = {
    name: 'Quill',
    age: 38,
    greeting(message) {
      console.log(
        `${message}. My name is ${this.name} and Iam ${this.age} years old.`
      );
    },
  };

  human.greeting('hello');

  // implements interface型でinterfaceで
  // このクラスで生成するインスタンスのオブジェクトは
  // 指定したinterfaceの型を少なくとも満たせば良い　※型の追加が可能
  class Developer implements Human {
    constructor(public name: string, public age: number) {}
    // デフォルト引数で引数がないときの値を指定↓
    greeting(message: string = 'Not a message') {
      console.log('Hello!');
    }
  }
};
