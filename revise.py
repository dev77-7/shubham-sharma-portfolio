#   Let us say your expense for every month are listed below,
# January - 2200
# February - 2350
# March - 2600
# April - 2130
# May - 2190
# Create a list to store these monthly expenses and using that find out,

# 1. In Feb, how many dollars you spent extra compare to January?
# 2. Find out your total expense in first quarter (first three months) of the year.
# 3. Find out if you spent exactly 2000 dollars in any month
# 4. June month just finished and your expense is 1980 dollar. Add this item to our monthly expense list
# 5. You returned an item that you bought in a month of April and
# got a refund of 200$. Make a correction to your monthly expense list
# based on this


exp=["2200","2350","2600","2130","2190"]
#exp=[2200,2350,2600,2130,2190]
# 1. 
exp= [int(i) for i in exp]
print(exp[1]-exp[0])

#2. 
sum=0
for i in range(3):
    sum+=exp[i]
print(sum)

#3. 

d=int(exp.index(2200)+1)
if d== 1:
    print("January")
elif d==2:
    print("feb")

#4.
exp.append(1980)

6. 
for i in range(2):
    exp[3]=exp[3]+200
print(*exp)


print(2200 in exp)