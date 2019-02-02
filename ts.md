### TS模块
+ TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。
### 模块和命名空间
+ 内部模块相当于命名空间，(也就是说 module X { 相当于现在推荐的写法 namespace X {)。
+ 命名空间本质是为了防止命名冲突，而模块在引用的时候用户自然会给他命名。确保你没有在对模块使用命名空间
```javascript
// 文件的顶层声明是export namespace Foo { ... } （删除Foo并把所有内容向上层移动一层）
// 文件只有一个export class或export function （考虑使用export default）
// 多个文件的顶层具有同样的export namespace Foo { （不要以为这些会合并到一个Foo中！）
```
### 基本类型
+ 默认情况下null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。 这能避免 很多常见的问题。 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型string | null | undefined。
### 接口
+ 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误
+ 对象字面量会被特殊对待而且会经过额外属性检查
+ 函数的参数名不需要与接口里定义的名字相匹配，可以不指定类型，TypeScript的类型系统会推断出参数类型
```javascript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```
+ TypeScript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
+ 类实现 interface `implements`
```javascript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```
+ 类是具有两个类型的：静态部分的类型和实例的类型
```javascript
// 静态部分的类型
interface ClockConstructor {
    new (hour: number, minute: number) : ClockInterface;
}
// 实例部分的类型
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}
```
+ interface 之间可以 extends
```javascript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}
```
+ 接口继承类（感觉出现了混乱，混乱才是本质，如果是为了实现拥有私有或受保护的成员，为啥不让interface支持`private protected`）当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。这个接口类型只能被这个类或其子类所实现(implement)
### 类class
+ 派生类包含了一个构造函数，它必须调用 `super()`
+ `private protected public` = `声明的基类 派生类 任何`
+ eadonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
+ 参数属性 `readonly private public protected`
```javascript
class Octopus {
    readonly name: string;
    constructor (theName: string) {
        this.name = theName;
    }
}
class Octopus {
    constructor(readonly name: string) {
    }
}
```
+ 只带有 get不带有 set的存取器自动被推断为 readonly
+ 抽象类（真的很像java了）不同于接口，抽象类可以包含成员的实现细节；抽象类中的抽象方法不包含具体实现并且必须在派生类中实现；抽象方法必须包含 abstract关键字并且可以包含访问修饰符。
```javascript
abstract class Animal {
    abstract private makeSound(): void; // 必须在派生类实现，可以携带访问修饰符
    move(): void {
        console.log('roaming the earch...');
    }
}
let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.generateReports(); // 错误: 方法在声明的抽象类中不存在 改成department: AccountingDepartment;
```
### 泛型
+ 泛型函数与泛型函数类型，泛型函数与泛型类，理解何时把参数放在调用签名里和何时放在接口上。
+ 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
```javascript
// 这是一个泛型函数
function identity<T>(arg: T): T {
    return arg;
}
// myIdentity 的类型是一个泛型函数，并用identity初始化
let myIdentity: <T>(arg: T) => T = identity;
// 使用带有调用签名的对象字面量来定义泛型函数：
let myIdentity: {<T>(arg: T): T} = identity;
// 也可以定义泛型接口
interface GenericIdentityFn {
    <T>(arg: T): T;
}
let myIdentity: GenericIdentityFn = identity;
// 升级
interface GenericIdentityFn<T> {
    (arg: T): T;
}
let myIdentity: GenericIdentityFn<number> = identity;
```
```javascript
interface Lengthwise {
    length: number;
}
// 泛型约束
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```
