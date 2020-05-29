// 可能出现一个页面多个document.body.onload的情况，因此将document.body.onload封装，集中调用
document.body.onload = function() {
    commonBodyOnload();

    setupRandomPosition();
    drawAllImage();
};

let puzzle = document.getElementById("puzzleEntity");
let context = puzzle.getContext('2d');

let puzzleWidth = 400; // 背景宽度
let padding = 10; // 图片边距
let column = 3; // 列数
let imageWidth = (puzzleWidth - (padding * (column + 1))) / column; // 图片宽度

let imageIndexForPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // 每个位置对应的图片
let isFinish = false; // 游戏是否结束

// 鼠标点击
puzzle.onclick = function(e) {
    if (isFinish) {
        return;
    }

    let x = parseInt(e.offsetX / (padding + imageWidth));
    let y = parseInt(e.offsetY / (padding + imageWidth));

    let position = y * column + x;
    let target = moveImageIfCanAtPosition(position);
    if (target >= 0) {
        refreshImagePositions(position, target);
    }
    if (checkIfFinish()) {
        drawImageItem(imageIndexForPosition[lastIndex()], lastIndex());
        isFinish = true;
    }
};

// 绘制一个图片，index图片索引，position图片位置（0 ～ column^2-1）
let drawImageItem = function(index, position) {
    let img = new Image();
    img.src = './images/main_' + String(index+1) + '.png';
    img.onload = () => {
        let rect = rectForPosition(position);
        context.drawImage(img, rect[0], rect[1], rect[2], rect[3]);
    }
};

// 刷新图片位置，origin起始位置，target目标位置
let refreshImagePositions = function(origin, target) {
    let originRect = rectForPosition(origin);

    context.clearRect(originRect[0], originRect[1], originRect[2], originRect[3]);
    drawImageItem(imageIndexForPosition[target], target);
};

// 绘制所有图片
let drawAllImage = function() {
    for (let position = 0; position < column * column; position++) {
        let index = imageIndexForPosition[position];
        if (index === lastIndex()) { // 最后一张图片不绘制
            continue;
        }
        drawImageItem(index, position);
    }
};

// 某个位置上的图片，如果能移动的话，就移动，并返回目标的位置，否则返回-1
let moveImageIfCanAtPosition = function(position) {
    let top = topOfPosition(position);
    let left = leftOfPosition(position);
    let bottom = bottomOfPosition(position);
    let right = rightOfPosition(position);

    let targetPosition = -1; // 目标位置
    if (isPositionEmpty(top)) {
        targetPosition = top;
    } else if (isPositionEmpty(left)) {
        targetPosition = left;
    } else if (isPositionEmpty(bottom)) {
        targetPosition = bottom;
    } else if (isPositionEmpty(right)) {
        targetPosition = right;
    }

    // 如果周围有空位置，进行交换
    if (targetPosition >= 0) {
        imageIndexForPosition[targetPosition] = imageIndexForPosition[position];
        imageIndexForPosition[position] = lastIndex();
        puzzle.emptyPosition = position; // 更新空位的位置
        return targetPosition;
    }
    return -1;
};

// 某个位置是否是空的，即最后一张图片所在的位置
let isPositionEmpty = function(position) {
    if (position < 0 || position > lastIndex()) {
        return false;
    }
    return imageIndexForPosition[position] === lastIndex();
};

// 最后一个索引
let lastIndex = function() {
    return column * column - 1;
};

// 返回某个位置的区域范围
let rectForPosition = function(position) {
    if (position < 0 || position > lastIndex()) {
        return [0, 0, 0, 0];
    }
    let x = (position % column) * (padding + imageWidth) + padding;
    let y = parseInt(position / column) * (padding + imageWidth) + padding;
    return [x, y, imageWidth, imageWidth];
};

// 检查是否完成
let checkIfFinish = function() {
    for (let index = 0; index < imageIndexForPosition.length; index++) {
        if (index !== imageIndexForPosition[index]) {
            return false;
        }
    }
    return true;
};

// 获取左方位置，没有则返回-1
let leftOfPosition = function(position) {
    return (position % column) === 0 ? -1 : position - 1;
};

// 获取右方位置，没有则返回-1
let rightOfPosition = function(position) {
    return (position % column) === (column - 1) ? -1 : position + 1;
};

// 获取上方位置
let topOfPosition = function(position) {
    return position - column;
};

// 获取下方位置
let bottomOfPosition = function(position) {
    return position + column;
};

// 初始化随机顺序
let setupRandomPosition = function() {
    let list1 = [4, 3, 2, 8, 0, 7, 5, 6, 1];
    let list2 = [2, 0, 5, 6, 8, 7, 3, 1, 4];
    let list3 = [3, 7, 2, 4, 1, 6, 8, 0, 5];
    let list4 = [3, 2, 4, 1, 7, 6, 5, 0, 8];
    let lists = [list1, list2, list3, list4];

    imageIndexForPosition = lists[parseInt(Math.random() * 4)];

    // 获取空位位置
    let emptyPosition = 0;
    for (let i = imageIndexForPosition.length - 1; i >= 0; i--) {
        if (imageIndexForPosition[i] === lastIndex()) {
            emptyPosition = i;
            break;
        }
    }
    puzzle.emptyPosition = emptyPosition;

    // 随机移动次数
    let times = 10;
    while (times--) {
        // 获取随机数，决定空位哪个位置进行移动
        let direction = Math.random() * 4;

        let target = -1;
        if (direction === 0) {
            target = topOfPosition(emptyPosition);  // 上
        } else if (direction === 1) {
            target = leftOfPosition(emptyPosition);  // 左
        } else if (direction === 2) {
            target = rightOfPosition(emptyPosition);  // 右
        } else if (direction === 3) {
            target = bottomOfPosition(emptyPosition);  // 下
        }
        if (target < 0 || target > lastIndex()) {  // 位置不合法，继续下一次循环
            continue;
        }
        let result = moveImageIfCanAtPosition(target);
        if (result >= 0) { // 如果移动成功，更新空位的位置
            emptyPosition = target;
        }
    }
};
