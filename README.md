## MVVM
- Model:模型层，在这里表示JavaScript 对象  
- View:视图层，在这里表示 DOM (HTML操作的元素)  
- ViewModel:连接视图和数据的中间件，Vue.js就是 MVVM中的ViewModel层的实现者  
在MVVM架构中，是不允许数据和视图直接通信的，只能通过ViewModel来通信，孟ViewModel就是定义了一个 Observer观察者
- ViewModel 能够观察到数据的变化，并对视图对应的内容进行更新
- ViewModel 能够监听到视图的变化，并能够通知数据发生改变

## Vue指令
1. el属性  
    - 用来指示vue编译器从什么地方开始解析 vue的语法，可以说是一个占位符
2. data属性
    - 用来组织从view中抽象出来的属性，可以说将视图的数据抽象出来存放在data中
3. template属性
    - 用来设置模板，会替换页面元素，包括占位符
4. methods属性
    - 放置页面中的业务逻辑，js方法一般都放置在methods中
5. render属性
    - 创建真正的Virtual Dom
6. computed属性
    - 用来计算
7. watch属性
    - watch:function(new,old){}
    - 监听data中数据的变化
    - 两个参数，一个返回新值，一个返回旧值
___
- v-bind
```html
<span id="app2" v-bind:title="msg">鼠标悬停的提示信息</span>
```
- v-if,v-else,v-else-if
```html
<div id="app">
    <h1 v-if="type==='A'">A</h1>
    <h1 v-else-if="type==='B'">B</h1>
    <h1 v-else-if="type==='C'">C</h1>
    <h1 v-else>D</h1>
</div>
```
- v-for
```html
<div id="app">
    <li v-for="(item, index) in items">
        {{item.msg}} -- {{index}}
    </li>
</div>

<script>
    var vm = new Vue({
        el: "#app",
        data: {
            items: [
                {msg: "Gnar"},
                {msg: "Kindred"},
                {msg: "Neeko"}
            ]
        }
    });
</script>
```
- v-on 监听DOM事件
```html
<div id="app">
    <button v-on:click="sayHello">Click Me</button>
</div>

<script>
    var vm = new Vue({
        el: "#app",
        data: {
            msg: "Hello,World!"
        },
        methods: {  //方法必须定义在vue的Methods对象中
            sayHello: function () {
                alert(this.msg);
            }
        }
    });
</script>
```