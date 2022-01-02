from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request
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

# 추천박스
@app.route('/api/recommend', methods=['GET'])
def recommend_wines():
    wine_list = list(db.wines.find({}, {'_id': False}).sort('click_cnt', -1).limit(4))
    # for a in wine_list:
    #     print(a['click_cnt'])
    return jsonify({'wine_lists': wine_list})

# 인포박스
@app.route('/api/info', methods=['POST'])
def wine_info():
    num_receive = request.form['num_give']
    info_list = db.wines.find_one({'\ufeffwine_num': num_receive})
    # info_list = db.wines.find_one({})

    # print(info_list)
    # test = jsonify({'info_lists': str(info_list)})#list(info_list)
    # print(type(info_list))
    # test = json.dumps(info_list)
    # print(type(test))
    # info_list = list(info_list)
    
    #ensure_ascii=False 이걸로 한글 표현 할때 사용
    return jsonify({'info_lists': dumps(info_list, ensure_ascii=False)})


# 클릭횟수 추가
@app.route('/api/click', methods=['POST'])
def click_count():
    num_receive = request.form['num_give']
    target_wine = db.wines.find_one({'\ufeffwine_num': num_receive})
    # print(list(target_wine))
    # print(target_wine['click_cnt'])
    current_click = target_wine['click_cnt']

    new_click = current_click + 1

    db.wines.update_one({'\ufeffwine_num': num_receive}, {'$set': {'click_cnt': new_click}})

    return jsonify({'msg': '좋아요 완료!'})
    # print (num_receive)
    # print(sample_receive)






if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)