 RN-ListViewLoadMore
react-native中处理ListView的下拉刷新和上拉加载更多  

* 目录结构如图：  
![tree](//github.com/yongqianvip/RN-ListViewLoadMore/blob/master/localSource/images/tree.png?raw=true)

1.  ReactNative(RN)中的ListView是一个非常常用的组件，RN中已经有了现成的RefreshControl，具体用法参见官方文档，这里主要记录一下我是如何做“上拉加载更多”的，我假设你已经搭建好RN开发环境，有一定RN基础，并了解Redux  

[工程源码在这里](https://github.com/yongqianvip/RN-ListViewLoadMore)  

#### 一. 创建工程

	$ react-native init ListViewLoadMore

用编辑器打开