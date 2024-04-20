import pandas as pd
data = pd.read_csv("parsed_recipes.csv")
name = data.iloc[9999]['Image_Name']
print(data.iloc[9999])

from PIL import Image 
im = Image.open(f'recipe_data/Food Images/Food Images/{name}.jpg') 
im.show()