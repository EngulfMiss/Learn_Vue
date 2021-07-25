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
- v-model 数据双向绑定

```html
<div id="app">
    输入的内容:<input type="text" v-model="msg">{{msg}}
    输入的其他内容:<textarea v-model="message"></textarea>{{message}}
    单选：<input type="radio" name="sex" value="男" v-model="sex">男的
    <input type="radio" name="sex" value="女" v-model="sex">女的
    选的是：{{sex}}
</div>
<div id="app2" >
    下拉框：
    <select v-model="selected">
        <option value="" disabled>--请选择--</option>
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
    </select>
    value:{{selected}}
</div>

<script>
    var vm = new Vue({
        el: "#app",
        data: {
            msg: "123",
            message: "kindred",
            sex: ""
        }
    });
    var vm2 = new Vue({
        el: "#app2",
        data: {
            selected: ""
        }
    });
</script>
```
注意:v-model指令在表单input,textarea以及select元素上创建数据双向绑定 v-model  会忽略所有表单元素的value，checked,selected特性的初始值而总是将Vue实例的数据作为数据来源。  
你应该通过JavaScript在组件的data选项中声明初始值!  
- 组件
```html
<body>
    <!-- view层 模板 -->
    <div id="app">
        <!-- 组件 -->
        <kindred v-for="item in items" v-bind:array="item"></kindred>
    </div>
</body>
<script>
    //定义一个Vue组件
    Vue.component("kindred",{
        props: ["array"],
        template: "<li>{{array}}</li>"
    });
    var vm = new Vue({
        el: "#app",
        data: {
            items: ["Gnar","Kindred","Neeko"]
        }
    });
</script>
```

- Axios实现Ajax
```json
{
  "name": "Kindred",
  "url": "http://gnardada.com/",
  "page": 1,
  "isNonProfit": true,
  "address": {
    "street": "大街",
    "city": "郴州",
    "country": "中国"
  },
  "links": [
    {
      "name": "bilibili",
      "url": "www.bilibili.com"
    },
    {
      "name": "baidu",
      "url": "www.baidu.com"
    }
  ]
}
```
```html
<body>
    <!-- view层 模板 -->
    <div id="vue" v-clock>
        <div>{{info.name}}</div>
        <div>{{info.address.city}}</div>
        <a v-bind:href="info.url">我的网页</a>
        <div>{{info.links[0].name}}</div>
    </div>
</body>
<!-- 导入Vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    var vm = new Vue({
        el: "#vue",
        data(){
            return{
                //请求的返回参数，必须和json字符串一样
                info: {
                    name: null,
                    url: null,
                    address: {
                        street: null,
                        city: null,
                        country: null
                    },
                    links: [{
                        name: null,
                        url: null
                    }]
                }
            }
        },
        mounted(){ //钩子函数 链式编程
            axios.get('../data.json').then(response=>(this.info=response.data))
        }
    });
</script>
```
- 计算属性:计算出来的结果，保存在属性中，内存中运行：虚拟DOM，想象为缓存。
计算属性的主要特性就是为了将不经常变化的计算结果进行缓存，以节约我们的系统开销;
```html
<body>
    <!-- view层 模板 -->
    <div id="app">
        <p>now : {{currentTime1()}}</p> <!-- 方法 -->
        <p>now : {{currentTime2}}</p>   <!-- 属性 -->
    </div>
</body>
<!-- 导入Vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            msg: "Kindred"
        },
        methods: {
            currentTime1: function () {
                return Date.now();  //返回一个时间戳
            }
        },
        computed: {  //计算属性 methods和computed 方法名不能重名，一个通过方法，一个使用属性调用
            currentTime2: function () {
                this.msg;
                return Date.now();  //返回一个时间戳
            }
        }
    });
</script>
```
- 插槽 slot 和 自定义事件$emit
```html
<body>
    <!-- view层 模板 -->
    <div id="app">
        <todo>
            <todo-title slot="todo-title" :tit="text"></todo-title>
            <todo-items slot="todo-items" v-for="(item,index) in todoItems" :arrays="item" :index="index" v-on:del="removeItem(index)"></todo-items>  <!-- 前面index是组件中的属性名，后面是v-for中的下标名 -->
        </todo>
    </div>
</body>
<!-- 导入Vue.js -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    //slot定义插槽
    Vue.component("todo",{
       template:
           "<div>\
               <slot name='todo-title'></slot>\
               <ul>\
                    <slot name='todo-items'></slot>\
               </ul>\
           </div>"
    });

    Vue.component("todo-title",{
        props: ["tit"],
        template: "<div>{{tit}}</div>"
    });

    Vue.component("todo-items",{
        props: ["arrays","index"],
        //只能绑定当前组件的方法
       template: "<li>{{index+1}} ---- {{arrays}}<button @click='remove'>删除</button></li>",
        methods: {
            remove: function (dex) {
                this.$emit('del',dex);   //参数 ： 自定义事件名,方法参数
            }
        }
    });

    var vm = new Vue({
        el: "#app",
        data: {
            text: "我真的无语了",
            todoItems: ["Kindred","Gnar","Neeko"]
        },
        methods: {
            removeItem: function (index) {
                alert("删除了元素:"+this.todoItems[index]);
                this.todoItems.splice(index,1);
            }
        }
    });
</script>
```

## Vue:第一个vue-cli项目
[node.js下载](http://nodejs.cn/download/)  
- 安装Node.js 淘宝镜像加速 npm install cnpm -g  
- 修改npm安装路径  
npm config set cache "D:\Program Files\npm-cache"  
npm config set prefix "D:\Program Files\npm_global"  

- 安装vue-cli cnmp vue-cli cnpm install vue-cli -g
- 初始化vue项目 vue init webpack myvue   一路no
- 安装好之后，进入刚刚的vue项目，安装依赖环境 npm install
- 运行项目 npm run dev