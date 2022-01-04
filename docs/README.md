
Required 
- Python 3.8

```bash
## prepare a python environment
pip install virtualenv
virtualenv venv
source ./venv/bin/activate
pip install -r requirements.txt

## start the server and watch changes
sphinx-autobuild --watch . src build


## generate html files
make clean html
```

Open: http://127.0.0.1:8000