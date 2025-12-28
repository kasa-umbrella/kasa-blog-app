# set up the container.
FROM python:3.12-slim

# set the working dir.
WORKDIR /app

# copy requirements first to take advantage of layer caching
COPY requirements.txt ./

# install libraries from requirements
RUN pip install --no-cache-dir -r requirements.txt

# copy the app dir.
COPY app app

# expose the port.
EXPOSE 8000

# command to run the app using uvicorn.
CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","8000"]
