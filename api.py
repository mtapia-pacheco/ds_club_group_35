<<<<<<< HEAD
<<<<<<< HEAD
from flask import Flask, jsonify, request
from rec import rec_api

app = Flask(__name__)

@app.route('/', methods=["GET"])
def hello():
    # This is the homepage of our API.
    # It can be accessed by http://127.0.0.1:5000/
    return HELLO_HTML
HELLO_HTML = """
     <html><body>
         <h1>Welcome to my api: Whatscooking!</h1>
         <p>Please add some ingredients to the url to receive recipe recommendations.
            You can do this by appending "/recipe?ingredients= Pasta Tomato ..." to the current url.
         <br>Click <a href="/recipe?ingredients= pasta tomato onion">here</a> for an example when using the ingredients: pasta, tomato and onion.
     </body></html>
     """
@app.route('/recipe', methods=["GET"])
def recommend_recipe():
    # This is our endpoint. It can be accessed by http://127.0.0.1:5000/recipe
    ingredients = request.args.get('ingredients')
    recipe = rec_api(ingredients)
    
    # We need to turn output into JSON. 
    response = {}
    count = 0    
    for index, row in recipe.iterrows():
        response[count] = {
                            'recipe': str(row['Title']),
                            'ingredients': str(row['Ingredients']),
                          }
        count += 1
    return jsonify(response)

if __name__ == "__main__":
   app.run(host="0.0.0.0", debug=True)
=======
>>>>>>> parent of dd0d47c (api)
=======
>>>>>>> parent of dd0d47c (api)
