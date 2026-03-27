import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
import joblib

# LOAD DATA
df=pd.read_csv("used_cars.csv")

# DROP NULLS
df=df.dropna()

# -------------------------
# CLEAN PRICE
# "$26,500" → 26500
# -------------------------
df["price"]=df["price"].astype(str)
df["price"]=df["price"].str.replace("$","",regex=False)
df["price"]=df["price"].str.replace(",","",regex=False)
df["price"]=df["price"].astype(float)

# REMOVE OUTLIERS
df=df[(df["price"]>1000) & (df["price"]<200000)]

# -------------------------
# CLEAN ENGINE
# "2.0L" → 2.0
# -------------------------
df["engine"]=df["engine"].astype(str).str.extract('(\d+\.?\d*)').astype(float)

# -------------------------
# CLEAN MILAGE
# "18 kmpl" → 18
# -------------------------
df["milage"]=df["milage"].astype(str).str.extract('(\d+\.?\d*)').astype(float)

# -------------------------
# FEATURE ENGINEERING
# -------------------------
df["car_age"]=2026-df["model_year"]
df["km_per_year"]=df["milage"]/(df["car_age"]+1)

# KEEP TOP BRANDS ONLY
top_brands=df["brand"].value_counts().nlargest(15).index
df=df[df["brand"].isin(top_brands)]

# -------------------------
# FEATURES
# -------------------------
X=df[
[
"model_year",
"milage",
"engine",
"fuel_type",
"transmission",
"brand",
"model",
"car_age",
"km_per_year"
]
]

# ONE HOT ENCODING
X=pd.get_dummies(X)

# TARGET
y=df["price"]

# SPLIT
X_train,X_test,y_train,y_test=train_test_split(
X,y,test_size=0.2,random_state=42
)

# -------------------------
# MODEL
# -------------------------
model=RandomForestRegressor(
n_estimators=600,
max_depth=20,
random_state=42,
n_jobs=-1
)

model.fit(X_train,y_train)

# SAVE MODEL
joblib.dump(model,"model.pkl")
joblib.dump(X.columns,"cols.pkl")

# -------------------------
# ACCURACY
# -------------------------
pred=model.predict(X_test)
print("R2 Accuracy:",r2_score(y_test,pred))

print("MODEL TRAINED ✅")