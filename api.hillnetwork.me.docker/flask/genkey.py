import string, random

value_pool = list(string.uppercase + string.lowercase) + list( str(i) for i in range(9) )

key = "".join( list( value_pool[random.randint( 0, len(value_pool) - 1) ] for i in range(40) ) ) 

print key
