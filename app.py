from flask import Flask, render_template, jsonify, request
from bson.son import SON
import json
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

@app.route('/api/set_searchList', methods=['POST'])
def set_searchList():
    searchList_receive = request.get_json(force=True)
    kinds = searchList_receive['type']
    countrys = searchList_receive['country']
    prices = searchList_receive['price']
    alcohols = searchList_receive['concentration']

    # print(kinds)
    # print(countrys)
    # print(prices)
    # print(alcohols, len(alcohols))

    query = '{"$and": ['
    dummy = '{"$or": ['

    for idx, k in enumerate(kinds):
        if k == '와인 종류 모두':
            kinds.clear()
            break;
        dummy += '{"kind": "' + k + '"}'
        if idx + 1 != len(kinds):
            dummy += ','
        else:
            dummy += ']}'
            query += dummy

    dummy = '{"$or": ['
    for idx, c in enumerate(countrys):
        if c == '국가 모두':
            countrys.clear()
            break;
        if idx == 0 and len(kinds) != 0:
            dummy = ',' + dummy
        dummy += '{"make_country": "' + c + '"}'
        if idx + 1 != len(countrys):
            dummy += ','
        else:
            dummy += ']}'
            query += dummy

    dummy = '{"$or": ['
    for idx, p in enumerate(prices):
        if idx == 0:
            if len(kinds) != 0 or len(countrys) != 0:
                dummy = ',' + dummy
        dummy += '{"price": "' + p + '"}'
        if idx + 1 != len(prices):
            dummy += ','
        else:
            dummy += ']}'
            query += dummy

    dummy = '{"$or": ['
    for idx, a in enumerate(alcohols):
        if a == '알콜농도 상관없음':
            alcohols.clear()
            break;
        if idx == 0:
            if len(kinds) != 0 or len(countrys) != 0 or len(prices) != 0 :
                dummy = ',' + dummy

        dummy += '{"alcohol": "' + str(a) + '"}'

        if idx + 1 != len(alcohols):
            dummy += ','
        else:
            dummy += ']}'
            query += dummy

    query += ']}'
    # print(query)

    if query == '{"$and": []}': # 전체 선택시
        query = '{}'
    result = db.wines.find( json.loads(query) , {'_id': False}).sort("make_country")

    # 테스트 용
    # test = db.wines.find({
    #     "$and": [
    #         {"$or": [{"make_country": "덴마크(Denmark)"}, {"make_country": "레바논(Lebanon)"}]},
    #         {"$or": [{"kind": "레드"}, {"kind": "기타"}]}
    #     ]
    # }).sort("make_country")

    # return jsonify({'msg': '완료!'})

    result = list(result)

    return jsonify({'list_data': result})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)