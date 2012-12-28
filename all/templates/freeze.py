from flask_frozen import Freezer
from <%= appName %> import <%= appName %>

freezer = Freezer(<%= appName %>)

if __name__ == '__main__':
    freezer.freeze()
