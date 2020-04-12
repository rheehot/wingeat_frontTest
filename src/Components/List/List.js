import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { changeCount } from 'Redux/Actions';
import { beforeUrl, listUrl } from 'config';

import './List.scss';

const List = ({ changeCount }) => {
  const [list, setList] = useState([]);
  const [scroll, setScroll] = useState(false);
  const page = useRef(1);

  const getList = () => {
    axios.get(`${listUrl}?page=${page.current}`).then(({ data }) => setList((p) => p.concat(data)));
  };
  useEffect(() => {
    getList();
    return () => {
      setScroll(false);
    };
  }, [page]);

  // 무한스크롤 구현
  const infiniteScroll = () => {
    const scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
    );
    const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    const { clientHeight } = document.documentElement;

    if (scrollTop + clientHeight + 1 > scrollHeight) {
      if (page.current < 6) {
        page.current += 1;
        getList();
        setScroll(!scroll);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, []);

  // 장바구니 localStorage에 추가
  const cartAdd = (itemName, itemId, itemPrice, imgurl) => {
    if (JSON.parse(localStorage.getItem('items')).length === 0) {
      localStorage.removeItem('items');
    }

    alert('상품이 장바구니에 추가 됐습니다');
    let beforeItems = localStorage.getItem('items');
    let UpdateItems = [];

    // 장바구니에 상품이 있는 경우
    if (beforeItems) {
      UpdateItems = JSON.parse(beforeItems);

      for (let i = 0; i < UpdateItems.length; i++) {
        if (UpdateItems[i].id === itemId) {
          UpdateItems.push({
            id: itemId,
            name: itemName,
            amount: ++UpdateItems[i].amount,
            price: itemPrice,
            image: imgurl,
          });
          UpdateItems.splice(i, 1);
          localStorage.setItem('items', JSON.stringify(UpdateItems));
        } else {
          localStorage.setItem(
            'items',
            JSON.stringify(
              UpdateItems.concat({
                id: itemId,
                name: itemName,
                amount: 1,
                price: itemPrice,
                image: imgurl,
              }),
            ),
          );
        }
      }
      // 헤더의 장바구니 갯수 파악
      changeCount(JSON.parse(localStorage.getItem('items')).length);
    }

    // 장바구니에 상품이 없는 경우
    else {
      localStorage.setItem(
        'items',
        JSON.stringify([
          {
            id: itemId,
            name: itemName,
            amount: 1,
            price: itemPrice,
            image: imgurl,
          },
        ]),
      );
      changeCount(JSON.parse(localStorage.getItem('items')).length);
    }
  };


  return (
    <div className="list_wrapper">
      <div className="made_text">윙잇 MADE</div>
      <div className="list">
        <div className="list_inner">
          {list.map((ele, idx) => (
            <div className="item" key={idx}>
              <img
                src={`${beforeUrl}${ele.image}`}
                alt="item_img"
                onClick={() => {
                  cartAdd(ele.itemName, ele.id, ele.price, ele.image);
                }}
              />
              <div className="item_name">{ele.itemName}</div>
              <div className="price">{`${Number(String(ele.price)).toLocaleString()}원`}</div>
            </div>
          ))}
        </div>
      </div>
      {scroll
        && (
        <div className="loading_more">
          <img
            alt="loading"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///4CAgODg4KCgoICAgLCwsMDAwMjIyCH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          />
        </div>
        )}
    </div>
  );
};

export default connect(null, { changeCount })(List);
