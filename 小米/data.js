// 参数一：selector1  父级元素选择器
// 参数二：selector2  需要出现的子元素选择器
// 参数三：selector3  需要改变背景颜色的子元素选择器
// 参数四：selector4  子元素选中效果的背景颜色
// selecTab(".list li","list.list-son","list a","#fffff");
// 参数一：选择器，选中页面中所有主要轮播的图片
// 参数二：选择器，选中页面中所以的轮播点
// 参数三：选择器，选中左箭头
// 参数四：选择器，选中右箭头
// 参数五：选择器,选中整个大盒子
// 参数六：字符串,轮播点选中效果的类名，默认时active
// 参数七：数值，自动轮播的时间，默认值是2000
function mlxg(img, dot, leftbtn, rightbtn, header, active = "active", times = 1000) {
    let imgs = document.querySelectorAll(img);
    let dots = document.querySelectorAll(dot);
    let lbn = document.querySelector(leftbtn);
    let rbn = document.querySelector(rightbtn);
    let pic = document.querySelector(header);
    let t = setInterval(fn, times);
    // 下标：0 1 2 3 4  0 1 2 3 4 0 1 2 3
    let num = 0;
    // 初始值
    imgs[0].style.opacity = 1;
    dots[0].classList.add(active);
    function fn() {
        num++;
        // 循环
        if (num === imgs.length) {
            num = 0;
        }
        // console.log(num);
        // 所有图片的opacity都变为0
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.opacity = 0;
            dots[i].classList.remove(active);
        }
        imgs[num].style.opacity = 1;
        dots[num].classList.add(active);
    }

    for (let i = 0; i < dots.length; i++) {//
        dots[i].onclick = function () {
            for (let j = 0; j < dots.length; j++) {
                dots[j].classList.remove(active);
                imgs[j].style.opacity = 0;
            }
            dots[i].classList.add(active);
            imgs[i].style.opacity = 1;
            num = j
        }
    }

    //鼠标移入时轮播结束   停止自动轮播用clearinterval
    //鼠标移出时。轮播图继续轮播   seteinterval
    pic.onmouseover = function () {
        clearInterval(t);
    };
    pic.onmouseout = function () {
        t = setInterval(fn, times);
    }


    lbn.onclick = function () {
        num--;
        if (num == -1) {
            num = imgs.length;
        }
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.opacity = 0;
            dots[i].classList.remove(active);
        }
        imgs[num].style.opacity = 1;
        dots[num].classList.add(active);
    }
    rbn.onclick = function () {
        num++;
        if (num == imgs.length) {
            num = 0;
        }
        for (let i = 0; i < imgs.length; i++) {//遍历，让其余值的透明度都为0
            imgs[i].style.opacity = 0;
            dots[i].classList.remove(active);
        }
        imgs[num].style.opacity = 1;
        dots[num].classList.add(active);
    }
    // 窗口失去焦点 停止时间间隔函数
    window.onblur = function () {
        clearInterval(t);
    }
    // 窗口获取焦点。继续时间间隔函数
    window.onfocus = function () {
        t = setInterval(fn, times);
    }
}
// 选项卡函数
// 参数一：selector1    父级元素选择器
// 参数二：selector2    需要出现的子元素选择器
// 参数三：selector3    需要改变背景颜色的子元素选择器
// 参数四：colors       子元素选中效果的背景颜色
function selector(selector1, selector3) {
    let lis = document.querySelectorAll(selector1);
    // let aa = document.querySelectorAll(selector2);
    let son = document.querySelectorAll(selector3);
    // let color=document.querySelectorAll(colors);
    for (let i = 0; i < lis.length; i++) {
        // 鼠标移入时
        lis[i].onmouseover = function () {
            son[i].style.display = "block";
            lis[i].style.background = "#ff6700";
        }
        // 鼠标移出时
        lis[i].onmouseout = function () {
            son[i].style.display = "none";
            lis[i].style.background = "";
        }
    }
}
// num = 2;
// rbtn.classList.add(active);

//平移轮播的数据库
function translate(leftbtn, rightbtn, translatebox, active = "active") {
    let lbtn = document.querySelector(leftbtn);
    let rbtn = document.querySelector(rightbtn);
    let ull = document.querySelector(translatebox);
    let widths = parseInt(getComputedStyle(ull, null).width) / 3;
    // console.log(lbtn, rbtn, ull);
    let num = 0;
    rbtn.onclick = function () {
        rbtn.classList.remove(active);
        num++;
        if (num === 3) {
        }
        let ggg = -widths * num;
        ull.style.transform = "translateX(" + ggg + "px)";
    }
    lbtn.onclick = function () {
        lbtn.classList.remove(active);
        num--;
        if (num === -1) {
            lbtn.classList.add(active);
            num = 0;
        }
        let ggg = -widths * num;
        ull.style.transform = "translateX(" + ggg + "px)";
    }
}

// //浮动效果添加
// .box{     //盒子
//     transition: all 0.5s;  //过渡
// }
// .box:hover{  //给这个盒子移入效果
//     transform: translateY(-5px);  //变换：  变换的方向x水平y竖直   -5是向上
//     box-shadow: 0 5px 5px 5px #ececec;//阴影：分别表示上右下左四个值 最后一个颜色（基本都用这个）
// }
// 窗口拖动移动的函数
function move(box) {  //封装函数
    let oldx;  //声明
    let oldy;
    let newx;
    let newy;
    let mx;
    let my;
    let boxx = document.querySelector(box);//获取

    let maxx = window.innerWidth - boxx.offsetWidth;//窗口宽度减去盒子现在离窗口左边的宽度
    let maxy = window.innerHeight - boxx.offsetHeight;//窗口高度减去盒子现在离窗口顶部的距离
    boxx.onmousedown = function (e) {  //按下事件函数
        oldx = e.clientX;//移动前鼠标距离窗口左边的距离
        oldy = e.clientY;//移动前鼠标距离窗口顶部的距离
        boxt = boxx.offsetTop;//移动后盒子距离窗口顶部的距离
        boxl = boxx.offsetLeft;//移动后盒子距离窗口左边的距离
        window.addEventListener("mousemove", move, false);//给窗口添加一个鼠标移动事件
        boxx.addEventListener("mouseup", up, false);//给盒子添加一个鼠标离开事件
    }

    function move(e) {//
        newx = e.clientX;//移动后鼠标离窗口左边的距离
        newy = e.clientY;//移动后鼠标离窗口顶部的距离
        mx = newx - oldx + boxl;//移动前后鼠标到窗口左边距离的差再加上盒子到窗口左边的距离
        my = newy - oldy + boxt;//移动前后鼠标到窗口顶部距离的差再加上盒子到窗口顶部的距离
        if (mx > maxx) {   //判断盒子到窗口最右边的时候
            mx = maxx;
        }
        if (my > maxy) {//判断盒子到窗口最下面的时候
            my = maxy;
        }
        if (mx < 0) {//判断盒子到窗口最左边的时候
            mx = 0;
        }
        if (my < 0) {//判断盒子到窗口最上面的时候
            my = 0;
        }
        boxx.style.left = mx + "px";//添加字符串单位
        boxx.style.top = my + "px";
    }

    function up() {
        window.removeEventListener("mousemove", move, false);//移除窗口移动函数
        boxx.removeEventListener("mouseup", up, false);//移除鼠标离开事件
    };
}

move(".box");//函数自调用

