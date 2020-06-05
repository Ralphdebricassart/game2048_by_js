import random

"""
    游戏2048
"""
# 需求一移动十六格子（二维列表）
# 需求二求和
# 需求三
# 数据：全局变量
list_merge = [2, 2, 2, 2]
list_map = [
    [2, 0, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]


# 函数：处理数据
def zero_moves_back():
    for a in range(0, len(list_merge) - 1, 1):
        for b in range(a + 1, len(list_merge), 1):
            if list_merge[a] == 0:  # 改的是全局变量指向地址里的东西，指向的地址不变
                list_merge[a], list_merge[b] = list_merge[b], list_merge[a]


# (单行)零元素后移动
def similar_combine():
    for a in range(0, len(list_merge) - 1, 1):
        zero_moves_back()
        if list_merge[a] == list_merge[a + 1]:
            list_merge[a] += list_merge[a]
            list_merge[a + 1] = 0


# 同类合并（左向）(单行)(已进行zero_moves_back)
# 练习三 listmap所有元素向左移动
def all_rows_left():
    global list_merge
    for line in range(0, len(list_map)):
        list_merge = list_map[line]  # ???
        similar_combine()


# 练习四 listmap 所有元素向右移动
def all_rows_right():
    global list_merge
    for line in range(0, len(list_map)):
        list_merge = list_map[line][::-1]  # ???
        similar_combine()  # 注意调用的什么函数
        list_map[line] = list_merge[::-1]  # 从哪里获取数据


# 练习5：将list_map元素向上、下移动
# 思路：将list_map进行矩阵转置# 调用向左移动函数# 将list_map进行矩阵转置
def matrix_transpose():  # 注意交换的是哪一部分
    for line in range(0, len(list_map)):
        for row in range(line, len(list_map)):
            list_map[line][row], list_map[row][line] = list_map[row][line], list_map[line][row]


def all_line_up():
    matrix_transpose()
    all_rows_left()  # 注意调用函数
    matrix_transpose()


# 思路：将list_map进行矩阵转置# 调用向右移动函数#将list_map进行矩阵转置
def all_line_down():
    matrix_transpose()
    all_rows_right()  # 注意调用函数
    matrix_transpose()


# 遍历map根据0的数量随机一个位置出现二或四
def count_0():
    count = 0
    for line in range(0, len(list_map)):  # 计算0的数量
        for row in range(0, len(list_map)):
            if list_map[line][row] == 0:
                count += 1
    if count == 0:
        return "失败"
    return count


# 计算0的数量,有返回值
def gen_loca(maxline):
    if maxline == "失败":
        return "失败"
    loca = random.randint(1, maxline)  # 定位数范围修正, 随机边界可取 #随机为何不可取0
    return loca


def gen_2_4():
    decide = random.randint(1, 998)
    if decide > 499:
        return 2
    else:
        return 4


# 根据0的数量随机生成一个定位数,有返回值
def random_number():
    loca = gen_loca(count_0())  # 定位数修正
    if loca == "失败":
        print("失败")
        return "失败"
    for line in range(0, len(list_map), 1):
        for row in range(0, len(list_map), 1):
            if list_map[line][row] == 0:
                loca -= 1
                if loca == 0:
                    list_map[line][row] = gen_2_4()
                    return  # 终止


def play():
    for item in range(0, 4, 1):
        for itea in range(0, 4, 1):
            print(list_map[item][itea], end="\t")
        print()


while True:
    play()
    option = int(input("8上移2下移4左移6右移5退出"))
    if option == 8:
        all_line_up()
        random_number()
    if option == 2:
        all_line_down()
        random_number()
    if option == 4:
        all_rows_left()
        random_number()
    if option == 6:
        all_rows_right()
        random_number()
    if option == 5:
        break
    while True:
        map_op.play()
        if get_option() == 8:
            map_op.all_line_up()
            map_op.random_number()
        elif get_option() == 2:
            map_op.all_line_down()
            map_op.random_number()
        elif get_option() == 4:
            map_op.all_rows_left()
            map_op.random_number()
        elif get_option() == 6:
            map_op.all_rows_right()
            map_op.random_number()
        elif get_option() == 5:
            break