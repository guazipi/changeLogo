/**
 * Created by Administrator on 2016/4/15.
 */
/**
 * 封装utils 工具类
 *
 * @description 用于控制对象数组。如：图层对象和操作历史对象
 * @author shuzheng
 * @version 2015/11/04
 */
/**************************************************************
 *	List
 **************************************************************/

function List(){

    this.length = 0;
    this.array = new Array();
    //this.position = 0;

    //添加一个元素
    this.add = function(obj) {
        this.array[this.length] = obj;
        this.length ++;
    };
    //删除一个元素
    this.remove = function(position) {
        if (position < this.length && position >= 0 && this.length > 0) {
            /*for (var i = position; i < this.length - 1; i ++) {
             this.array[i] = this.array[i + 1];
             }*/
            this.array.splice(position, 1);
            this.length --;
        }
    };
    //获取一个元素
    this.get = function(position) {
        if (position < this.length && position >= 0 && this.length > 0) {
            return this.array[position];
        }
    };
    //删除所有元素
    this.removeAll = function() {
        this.array.splice(0, this.array.length);
        this.length = 0;
    };
    //获取元素数组
    this.toArray = function() {
        var arr = new Array();
        for (var i = 0; i < this.length; i ++) {
            arr[i] = this.array[i];
        }
        return arr;
    };
    //获取元素个数
    this.size = function() {
        return this.length;
    };
    // 截取list(不支持克隆对象)
    this.sub = function(position, count) {
        if (position < this.length && position >= 0 && this.length > 0) {
            this.array.splice(position, count);
            this.length = this.array.length;
        }
    };
}

/**************************************************************
 *	Map
 **************************************************************/

function MapElement() {
    this.key = '';
    this.value = '';
}

function Map() {

    this.list = new List();

    //放置元素
    this.put = function(key, value) {
        for (var i = 0; i < this.list.size(); i ++) {
            if (this.list.get(i).key == key) {
                this.list.get(i).value = value;
                return;
            }
        }
        var element = new MapElement();
        element.key = key;
        element.value = value;
        this.list.add(element);
    };
    //获取元素
    this.get = function(key) {
        for (var i = 0; i < this.list.size(); i ++) {
            if (this.list.get(i).key == key) {
                return this.list.get(i).value;
            }
        }
        return null;
    };
    //获取元素个数
    this.size = function() {
        return this.list.size();
    };
    //获取所有的KEY
    this.getKeys = function() {
        var arr = new Array();
        for (var i = 0; i < this.list.size(); i ++) {
            arr[i] = this.list.get(i).key;
        }
        return arr;
    }
}