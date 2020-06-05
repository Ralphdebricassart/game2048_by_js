//https://www.cnblogs.com/huzi007/p/3866272.html键盘事件
//获取html内容
var row_content1 = document.getElementById("row1")
var row_content2 = document.getElementById("row2")
var row_content3 = document.getElementById("row3")
var row_content4 = document.getElementById("row4")

var reg_num = new RegExp("[0123456789]+", "g");
var reg_symbol = new RegExp("<.+", "g");

//组成函数

function gen_new_object(arr_op, object_op) {
    var res_0 = "<td>" + arr_op[0] + "</td>"
    var res_1 = "<td>" + arr_op[1] + "</td>"
    var res_2 = "<td>" + arr_op[2] + "</td>"
    var res_3 = "<td>" + arr_op[3] + "</td>"
    object_op.innerHTML = res_0 + res_1 + res_2 + res_3
    return object_op
}

function zero_move(zm_object) {
    //获取数组
    var res = zm_object.innerHTML.match(reg_num)
    var zm_array = new Array(res[0], res[1], res[2], res[3])
        //zero move back
    for (let k = 0; k < 3; k++) {
        for (let l = k + 1; l < 4; l++) {
            if (zm_array[k] == "0") {
                //交换位置
                var tem = zm_array[k]
                zm_array[k] = zm_array[l];
                zm_array[l] = tem;
            }
        }
    }
    //生成新的html内容
    zm_object = gen_new_object(zm_array, zm_object);
    return zm_object
} //输入行对象,进行0后移处理


function similar_combine(sc_object) {
    for (let k = 0; k < 3; k++) {
        //zero_move
        sc_object = zero_move(sc_object);
        //获取数组
        var res = sc_object.innerHTML.match(reg_num)
        var sc_array = new Array(res[0], res[1], res[2], res[3])
            //similar_combine
        if (sc_array[k] == sc_array[k + 1]) {
            //可以合并内容
            sc_array[k] = sc_array[k] * 2;
            sc_array[k] = sc_array[k] + ""
            sc_array[k + 1] = "0";
            //生成新的html内容
            sc_object = gen_new_object(sc_array, sc_object);
        }
    }
    return sc_object

} //输入行对象,先进行zero_move再进行同类合并


function row_right(rr_object) {
    //zero_move
    rr_object = zero_move(rr_object);
    //获取数组
    var res = rr_object.innerHTML.match(reg_num);
    var rr_array = new Array(res[0], res[1], res[2], res[3]);
    //反转数组
    rr_array = rr_array.reverse()
        //生成新的html对象
    rr_object = gen_new_object(rr_array, rr_object);
    //同类合并
    rr_object = similar_combine(rr_object);
    //获取数组
    var res = rr_object.innerHTML.match(reg_num);
    var rr_array = new Array(res[0], res[1], res[2], res[3]);
    //反转数组
    rr_array = rr_array.reverse()
        //生成新的html对象
    rr_object = gen_new_object(rr_array, rr_object);
} //输入行对象,zero_move,反转,同类合并,反转


function gen_array_res() {
    //获取数组
    var res_1 = row_content1.innerHTML.match(reg_num);
    var res_2 = row_content2.innerHTML.match(reg_num);
    var res_3 = row_content3.innerHTML.match(reg_num);
    var res_4 = row_content4.innerHTML.match(reg_num);
    var array_1 = new Array(res_1[0], res_1[1], res_1[2], res_1[3]);
    var array_2 = new Array(res_2[0], res_2[1], res_2[2], res_2[3]);
    var array_3 = new Array(res_3[0], res_3[1], res_3[2], res_3[3]);
    var array_4 = new Array(res_4[0], res_4[1], res_4[2], res_4[3]);
    //获取数组
    var array_res = new Array(array_1, array_2, array_3, array_4)

    return array_res
} //提取四个对象,返回一个总的数组


function matrix_transpose() {
    var array_res = gen_array_res()
        //进行转置
    for (let j = 0; j < 4; j++) { //line
        for (let k = j; k < 4; k++) { //row
            var tem = array_res[j][k]
            array_res[j][k] = array_res[k][j]
            array_res[k][j] = tem
        }
    }
    //反馈给对象
    row_content1 = gen_new_object(array_res[0], row_content1);
    row_content2 = gen_new_object(array_res[1], row_content2);
    row_content3 = gen_new_object(array_res[2], row_content3);
    row_content4 = gen_new_object(array_res[3], row_content4);

} //矩阵转置


function get_0_count() {
    var array_res = gen_array_res()
    var count_0 = 0
    for (let j = 0; j < 4; j++) { //line
        for (let k = 0; k < 4; k++) { //row
            if (array_res[j][k] == "0") {
                count_0 += 1
            }
        }
    }
    return count_0
} //获得array中0的数量


function gen_random_2_4() {
    var array_res = gen_array_res()
    var count_0 = get_0_count()
        // 生成1~count_0之间的随机数
    var count_number = parseInt(Math.random() * count_0) + 1
        // 生成1~2之间的随机数
    var random_num = parseInt(Math.random() * 2) + 1
    for (let j = 0; j < 4; j++) { //line
        for (let k = 0; k < 4; k++) { //row
            if (array_res[j][k] == "0") {
                count_number = count_number - 1
                if (count_number == 0) {
                    array_res[j][k] = 2 * random_num
                    array_res[j][k] = array_res[j][k] + ""
                        //反馈给对象
                    row_content1 = gen_new_object(array_res[0], row_content1);
                    row_content2 = gen_new_object(array_res[1], row_content2);
                    row_content3 = gen_new_object(array_res[2], row_content3);
                    row_content4 = gen_new_object(array_res[3], row_content4);
                    return
                }
            }
        }
    }


} //遍历array在0的地方随机生成2或4

//染色用
function gen_new_style(arr_op, object_op) {
    object_op.innerHTML = arr_op[0] + arr_op[1] + arr_op[2] + arr_op[3]
    return object_op
}

function get_html_res() {
    //获取数组
    var res_1 = row_content1.innerHTML.match(reg_symbol);
    var res_2 = row_content2.innerHTML.match(reg_symbol);
    var res_3 = row_content3.innerHTML.match(reg_symbol);
    var res_4 = row_content4.innerHTML.match(reg_symbol);
    var array_1 = new Array(res_1[0], res_1[1], res_1[2], res_1[3]);
    var array_2 = new Array(res_2[0], res_2[1], res_2[2], res_2[3]);
    var array_3 = new Array(res_3[0], res_3[1], res_3[2], res_3[3]);
    var array_4 = new Array(res_4[0], res_4[1], res_4[2], res_4[3]);
    //获取数组
    var array_res = new Array(array_1, array_2, array_3, array_4)

    return array_res
}


function dye() {
    var array_res = gen_array_res()
    console.log(array_res)
    var array_html_res = get_html_res()
    console.log(array_html_res)
    for (let j = 0; j < 4; j++) { //line
        for (let k = 0; k < 4; k++) { //row
            switch (array_res[j][k]) {
                case "0":
                    {
                        array_html_res[j][k] = "<td id='tdz'>" + "0" + "</td>"
                        break;
                    }
                case "2":
                    {
                        array_html_res[j][k] = "<td id='tdx'>" + "2" + "</td>"
                        break;
                    }
                case "4":
                    {
                        array_html_res[j][k] = "<td id='tdc'>" + "4" + "</td>"
                        break;
                    }
                case "8":
                    {
                        array_html_res[j][k] = "<td id='tdv'>" + "8" + "</td>"
                        break;
                    }
                case "16":
                    {
                        array_html_res[j][k] = "<td id='tdb'>" + "16" + "</td>"
                        break;
                    }
                case "32":
                    {
                        array_html_res[j][k] = "<td id='tdn'>" + "32" + "</td>"
                        break;
                    }
                case "64":
                    {
                        array_html_res[j][k] = "<td id='tdm'>" + "64" + "</td>"
                        break;
                    }
                case "128":
                    {
                        array_html_res[j][k] = "<td id='tda'>" + "128" + "</td>"
                        break;
                    }
                case "256":
                    {
                        array_html_res[j][k] = "<td id='tds'>" + "256" + "</td>"
                        break;
                    }
                case "512":
                    {
                        array_html_res[j][k] = "<td id='tdd'>" + "512" + "</td>"
                        break;
                    }
                case "1024":
                    {
                        array_html_res[j][k] = "<td id='tdf'>" + "1024" + "</td>"
                        break;
                    }
                case "2048":
                    {
                        array_html_res[j][k] = "<td id='tdg'>" + "2048" + "</td>"
                        break;
                    }
                default:
                    {
                        array_html_res[j][k] = "<td id='tdz'>" + "0" + "</td>"
                        break;
                    }
            }
        }
    }
    //反馈给对象
    row_content1 = gen_new_style(array_html_res[0], row_content1);
    row_content2 = gen_new_style(array_html_res[1], row_content2);
    row_content3 = gen_new_style(array_html_res[2], row_content3);
    row_content4 = gen_new_style(array_html_res[3], row_content4);
    return

}
dye();
//封装函数

function move_right_result() {
    row_right(row_content1);
    row_right(row_content2);
    row_right(row_content3);
    row_right(row_content4);
    gen_random_2_4()
}

function move_left_result() {
    similar_combine(row_content1);
    similar_combine(row_content2);
    similar_combine(row_content3);
    similar_combine(row_content4);
    gen_random_2_4()
}

function move_up_result() {
    matrix_transpose();
    move_left_result();
    matrix_transpose();
}

function move_down_result() {
    matrix_transpose();
    move_right_result();
    matrix_transpose();

}


document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 27) {
        //按Esc要做的事情
        confirm("退出")
    }
    if (e && e.keyCode == 38) {
        //按上要做的事情
        move_up_result()
        dye()
    }
    if (e && e.keyCode == 40) {
        //按下要做的事情
        move_down_result()
        dye()
    }

    if (e && e.keyCode == 37) {
        //按左要做的事情
        move_left_result();
        dye()
    }

    if (e && e.keyCode == 39) {
        //按右要做的事情
        move_right_result();
        dye()
    }
}