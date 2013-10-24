from flask import render_template
from <%= appName %> import <%= appName %>

@<%= appName %>.route('/')
def index():
    return render_template('index.html')
