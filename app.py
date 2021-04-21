import redis

from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, emit
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, message_queue='redis://')



# mgr = socketio.RedisManager('redis://')
# sio = socketio.Server(client_manager=mgr, async_mode='threading', logger=True, engineio_logger=True)

# app.wsgi_app = socketio.WSGIApp(sio, app.wsgi_app)


@socketio.on('position', namespace='/rt-search')
def position(data):
    """ Called when user sends new position """
    

    emit('update_prop', request.sid, room=request.sid)
    
    

@app.route('/')
def index():
    return render_template('demo/index.html')

if __name__ == '__main__':
    app.run(threaded=True, debug=True)

