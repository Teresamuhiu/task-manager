# Building the app's environment (Python, dependencies, code)
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source
COPY . .

# Expose Render's dynamic port (not strictly required, but good practice)
EXPOSE 10000

# Run server — use Render's $PORT
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]


