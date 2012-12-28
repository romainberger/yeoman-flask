from flask import Flask
import os

<%= appName %> = Flask(__name__)

# Determines the destination of the build. Only usefull if you're using Frozen-Flask
<%= appName %>.config['FREEZER_DESTINATION'] = os.path.dirname(os.path.abspath(__file__))+'/../build'

from <%= appName %> import views
