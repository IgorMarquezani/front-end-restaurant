import os.path
from flask import Flask, Response

app = Flask(__name__)

def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))

def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src).read()
    except IOError as exc:
        return str(exc)

@app.route("/products", methods=['GET'])
def products():
    content = get_file("templates/product.html")
    return Response(content, mimetype="text/html")

def main():
    app.run(host="localhost", port=8083)

if __name__ == "__main__":
    main()
