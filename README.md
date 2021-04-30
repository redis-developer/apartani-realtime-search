# Apartani realtime-search


## Steps to run 


### 1. Install and run Redis JSON
```
docker run -p 6379:6379 --name redis-redisjson redislabs/rejson:latest
```

### 2. Clone this repository
```
git clone https://github.com/julian4u0/apartani-realtime-search.git
```

```
cd apartani-realtime-search
```

### 3. Create virutalenv

```
virtualenv venv
```

### 4. Activate the enviroment
```
#Linux
source venv/bin/activate

#Windows
source venv/Scripts/activate
```
### 5. Install requirements
```
pip install -r requirements.txt
```
### 6. Run the app!
```
py app.py
```
### 7. View the app
Go to localhost:5000
![Animation](Animation.gif)
