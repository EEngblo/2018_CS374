file = open("./Cases.csv",'r', newline='', encoding='utf-8')
file.readline()

for l in file:



    s = l.strip().split(',')
    temp = '''{name:"%s", price:%s, link:"%s", popular:%s, fullname:"%s", color:%s, side:"%s", index:%s},'''
    temp = temp % (s[2], s[4], s[6], s[0], s[1] + " " + s[2], s[3].lower(), s[5], s[7])
    print(temp)
