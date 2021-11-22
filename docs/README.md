
Required 
- Python 3.8

```bash
## prepare a python environment
pip install virtualenv
virtualenv venv
source ./venv/bin/activate
pip install -r requirements.txt

sphinx-autobuild --watch . src build
```

Open: http://127.0.0.1:8000