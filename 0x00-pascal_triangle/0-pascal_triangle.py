#!/usr/bin/python3
"""Pascal Triangle"""


def pascal_triangle(n):
    """
        Pascal's triangle
        n - pascal traingle number
    """
    array = []

    for i in range(n):
        tmp = []
        for j in range(1, i):
            a = array[i - 1][j-1]
            b = 0
            try:
                b = array[i - 1][j]
            except IndexError:
                b = 0
            tmp.append(a + b)
        if i != 0:
            tmp.insert(0, 1)
        tmp.append(1)
        array.append(tmp)

    return array
