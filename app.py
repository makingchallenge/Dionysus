from flask import Flask, render_template, jsonify, request
from bson.son import SON
app = Flask(__name__)

from pymongo import MongoClient
# client = MongoClient('localhost', 27017)
client = MongoClient('mongodb://test:test@13.124.160.184', 27017)
db = client.dbdionysos

## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')

# 검색을 위한 조건 제공
@app.route('/api/search_list', methods=['POST'])
def search_list():
    search_receive = request.form['name_give']

    # SELECT kind AS _id FROM wines GROUP BY kind
    result = db.wines.aggregate([
        {
            "$group": {
                "_id": search_receive #"$kind" #"$alcohol",  #"$make_country",  #"$kind",
                # "count":{"$sum":1}
            }
        },
        {"$sort": SON([("_id", -1)])}
    ])
    result = list(result)
    # print(result)

    return jsonify({'search_list':result})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)