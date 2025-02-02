export const interFace = () => {
  // interfaceはオブジェクトにのみ使える型を集約する機能
  // typeエイリアスのオブジェクトだけver.
  interface Human {
    name: string;
    age: number;
    greeting(message: string): void; //メソッド型注釈の省略記法
  }
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
  // 指定したinterfaceの型を少なくとも満たさないといけない
  class Developer implements Human {
    constructor(public name: string, public age: number) {}
    greeting(message: string) {
      console.log('Hello!');
    }
  }
};
