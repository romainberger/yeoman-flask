
# Run the flask and yeoman servers
# use $ make -j server
server: yeoman flask open

yeoman:
	@yeoman server

flask:
	@./server.py

open:
	@open http://127.0.0.1:5000

build:
	@python freeze.py
