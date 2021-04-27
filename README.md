# Apartani realtime-search


## Steps to run 
```
docker run -p 6379:6379 --name redis-redisjson redislabs/rejson:latest
```

```
redis-cli -p 6379
```
```
git clone https://github.com/julian4u0/apartani-realtime-search.git
```
```
cd apartani-realtime-search
```
```
virtualenv venv
```
```
source venv/bin/activate
```
```
source venv/Scripts/activate
```
```
pip install -r requirements.txt
```

```
py app.py
```
