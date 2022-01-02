from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request
from bson.son import SON
from bson.json_util import dumps
import json

app = Flask(__name__)

client = MongoClient('mongodb://test:test@13.124.160.184', 27017)
db = client.dbdionysos


# HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')
    
# API 역할을 하는 부분

# 검색을 위한 조건 제공
@app.route('/api/search_list', methods=['POST'])
def search_list():
    search_receive = request.form['name_give']

    # SELECT kind AS _id FROM wines GROUP BY kind
    result = db.wines.aggregate([
        {
            "$group": {
                "_id": search_receive 
            }
        },
        {"$sort": SON([("_id", -1)])}
    ])
    result = list(result)

    return jsonify({'search_list':result})

# DB 검색 및 결과 출력
@app.route('/api/set_searchList', methods=['POST'])
def set_searchList():
    searchList_receive = request.get_json(force=True)
    kinds = searchList_receive['type']
    countrys = searchList_receive['country']
    prices = searchList_receive['price']
    alcohols = searchList_receive['concentration']
    taste = searchList_receive['taste']

    # query문 생성
    query = '{"$and": ['
    dummy = '{"$or": ['
    # 와인 종류
    for idx, k in enumerate(kinds):
        # ALL 선택시 해당 반복문 skip
        if k == '와인 종류 모두':
            kinds.clear()
            break;
        dummy += '{"kind": "' + k + '"}' #query
        # 추가 내용이 있다면 ','추가
        if idx + 1 != len(kinds):
            dummy += ','
        else:   # 추가 내용이 없다면 마무리
            dummy += ']}'
            query += dummy
    # 생산 국가
    dummy = '{"$or": ['
    for idx, c in enumerate(countrys):
        # ALL 선택시 해당 반복문 skip
        if c == '국가 모두':
            countrys.clear()
            break;
        # 다른 종류의 검색 여부에 따른 ',' 추가 확인
        if idx == 0 and len(kinds) != 0:
            dummy = ',' + dummy

        dummy += '{"make_country": "' + c + '"}' #query
        # 추가 내용이 있다면 ','추가
        if idx + 1 != len(countrys):
            dummy += ','
        else:# 추가 내용이 없다면 마무리
            dummy += ']}'
            query += dummy
    # 가격
    dummy = '{"$or": ['
    for idx, p in enumerate(prices):
        # ALL 선택시 해당 반복문 skip
        if p == '가격 상관없음':
            prices.clear()
            break;
        # 다른 종류의 검색 여부에 따른 ',' 추가 확인
        if idx == 0:
            if len(kinds) != 0 or len(countrys) != 0:
                dummy = ',' + dummy

        if p == '1만원 이하':
            dummy += '{"price": { "$lte" : 10000 }}'
        elif p == '100만원 이상':
            dummy += '{"price": { "$gte" : 1000000 }}'
        else:
            start = int(p[ : p.find('만원')]) * 10000
            end = int(p[p.find('~') + 2 : p.find('만원', p.find('~'))]) * 10000
            dummy += '{"price": { "$gt" : ' + str(start) + ', "$lte" : ' + str(end) + '}}'
        # 추가 내용이 있다면 ','추가
        if idx + 1 != len(prices):
            dummy += ','
        else:# 추가 내용이 없다면 마무리
            dummy += ']}'
            query += dummy
    # 알콜 도수
    dummy = '{"$or": ['
    for idx, a in enumerate(alcohols):
        # ALL 선택시 해당 반복문 skip
        if a == '알콜농도 상관없음':
            alcohols.clear()
            break;
        # 다른 종류의 검색 여부에 따른 ',' 추가 확인
        if idx == 0:
            if len(kinds) != 0 or len(countrys) != 0 or len(prices) != 0 :
                dummy = ',' + dummy

        dummy += '{"alcohol": "' + str(a) + '"}'
        # 추가 내용이 있다면 ','추가
        if idx + 1 != len(alcohols):
            dummy += ','
        else:# 추가 내용이 없다면 마무리
            dummy += ']}'
            query += dummy
    # 맛
    for idx, t in enumerate(taste):
        if 'sweet' in t:
            if idx == 0:
                if len(kinds) != 0 or len(countrys) != 0 or len(prices) != 0 or len(alcohols):
                    query += ','

            query += '{"Sweetness" :' + t[-1:] + '}'# 맨 뒤에 숫자만 확인
        elif 'Tannin' in t:
            if idx == 0:
                if len(kinds) != 0 or len(countrys) != 0 or len(prices) != 0 or len(alcohols):
                    query += ','
            else:
                query += ','
            query += '{"Tannin" :' + t[-1:] + '}'   # 맨 뒤에 숫자만 확인
        elif 'Acid' in t:
            if idx == 0:
                if len(kinds) != 0 or len(countrys) != 0 or len(prices) != 0 or len(alcohols):
                    query += ','
            else:
                query += ','
            query += '{"acidity" :' + t[-1:] + '}'  # 맨 뒤에 숫자만 확인
        elif 'bodied' in t:
            if idx == 0:
                if len(kinds) != 0 or len(countrys) != 0 or len(prices) != 0 or len(alcohols):
                    query += ','
            else:
                query += ','
            query += '{"body" :' + t[-1:] + '}'     # 맨 뒤에 숫자만 확인

    query += ']}'
    print(query)

    if query == '{"$and": []}': # 전체 선택시
        query = '{}'

    result = db.wines.find( json.loads(query) , {'_id': False}).sort("make_country")

    result = list(result)
    return jsonify({'list_data': result})

# 추천박스
@app.route('/api/recommend', methods=['GET'])
def recommend_wines():
    wine_list = list(db.wines.find({}, {'_id': False}).sort('click_cnt', -1).limit(8))
    
    return jsonify({'wine_lists': wine_list})

# 인포박스
@app.route('/api/info', methods=['POST'])
def wine_info():
    num_receive = request.form['num_give']
    info_list = db.wines.find_one({'\ufeffwine_num': num_receive})
    
    #ensure_ascii=False 이걸로 한글 표현 할때 사용
    return jsonify({'info_lists': dumps(info_list, ensure_ascii=False)})


# 클릭횟수 추가
@app.route('/api/click', methods=['POST'])
def click_count():
    num_receive = request.form['num_give']
    target_wine = db.wines.find_one({'\ufeffwine_num': num_receive})\
    
    current_click = target_wine['click_cnt']

    new_click = current_click + 1

    db.wines.update_one({'\ufeffwine_num': num_receive}, {'$set': {'click_cnt': new_click}})

    return jsonify({'msg': '좋아요 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)