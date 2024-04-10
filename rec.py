import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from recipe import ingredient_parser
import pickle

def get_recommendations(N, scores):
    # load in recipe dataset
    df_recipes = pd.read_csv("parsed_recipes.csv")

    # order the scores with and filter to get the highest N scores
    top = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:N]

    # create dataframe to load in recommendations
    recommendations = pd.DataFrame(columns = ['Title', 'Ingredients', 'Images'])

    count = 0
    for i in top:
        recommendations.at[count, 'Title'] = df_recipes['Title'][i]
        recommendations.at[count, 'Ingredients'] = df_recipes['Cleaned_Ingredients'][i]
        #recommendations.at[count, 'Score'] = "{:.3f}".format(float(scores[i]))
        count += 1

    return recommendations

def RecSys(ingredients, N=5):
    """
    The reccomendation system takes in a list of ingredients and returns a list of top 5 
    recipes based of of cosine similarity. 
    :param ingredients: a list of ingredients
    :param N: the number of reccomendations returned 
    :return: top 5 reccomendations for cooking recipes
    """

    # load in tdidf model and encodings
    with open("encoding.pk", 'rb') as f:
        tfidf_encodings = pickle.load(f)
    with open("model.pk", "rb") as f:
        tfidf = pickle.load(f)
        
    # parse the ingredients using my ingredient_parser
    try:
        ingredients_parsed = ingredient_parser(ingredients)
    except:
        ingredients_parsed = ingredient_parser([ingredients])

    # use our pretrained tfidf model to encode our input ingredients
    ingredients_tfidf = tfidf.transform(ingredients_parsed)

    # calculate cosine similarity between actual recipe ingreds and test ingreds
    cos_sim = map(lambda x: cosine_similarity(ingredients_tfidf, x), tfidf_encodings)
    scores = list(cos_sim)

    # Filter top N recommendations
    recommendations = get_recommendations(N, scores)
    return recommendations


if __name__ == "__main__":
    # test ingredients
    test_ingredients = "ground beef, pasta, spaghetti, tomato pasta sauce, bacon, onion, zucchini, cheese"
    recs = RecSys(test_ingredients)
    print(recs)

