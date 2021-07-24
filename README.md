## MVVM
- Model:模型层，在这里表示JavaScript 对象  
- View:视图层，在这里表示 DOM (HTML操作的元素)  
- ViewModel:连接视图和数据的中间件，Vue.js就是 MVVM中的ViewModel层的实现者  
在MVVM架构中，是不允许数据和视图直接通信的，只能通过ViewModel来通信，孟ViewModel就是定义了一个 Observer观察者
- ViewModel 能够观察到数据的变化，并对视图对应的内容进行更新
- ViewModel 能够监听到视图的变化，并能够通知数据发生改变