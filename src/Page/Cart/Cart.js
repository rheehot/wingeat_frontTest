import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeCount } from 'Redux/Actions';
import { beforeUrl } from 'config';

import Header from 'Components/Header';

import {
  faTimes, faPlus, faMinus, faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Cart.scss';

const Cart = (props) => {
  const [cardItem, setCardItem] = useState([]);
  const [totalResult, setTotalResult] = useState(0);
  const [check, setCheck] = useState({});

  useEffect(() => {
    if (localStorage.getItem('items')) {
      const data = JSON.parse(localStorage.getItem('items'));
      setCardItem(data);

      for (let i = 0; i < data.length; i++) {
        check[`check${i}`] = true;
      }
      setCheck(check);
    }
  }, []);

  const amountDown = (id) => {
    if (cardItem[id].amount > 0) {
      cardItem[id].amount--;
      setCardItem([...cardItem]);
    }
  };
  const amountUp = (id) => {
    cardItem[id].amount++;
    setCardItem([...cardItem]);
  };

  const itemRemove = (itemId) => {
    setCardItem(cardItem.filter((item) => item.id !== itemId));
  };
  // 아이템 삭제에 따른 헤더 장바구니 숫자 변경
  useEffect(() => {
    if (localStorage.getItem('items')) {
      localStorage.setItem('items', JSON.stringify(cardItem));
      props.changeCount(JSON.parse(localStorage.getItem('items')).length);
    }
  }, [cardItem]);

  // 총 결제 금액 계산
  useEffect(() => {
    let totalPrice = 0;
    for (let i = 0; i < cardItem.length; i++) {
      // checked 각 해당항목이 체크이면 포함 아니면 포함 X
      if (check[`check${i}`]) {
        totalPrice += cardItem[i].price * cardItem[i].amount;
      }
    }
    setTotalResult(totalPrice);
  }, [cardItem, check]);

  // 각 항목에 대한 체크 핸들러
  const handleSelect = (idx) => {
    if (check[`check${idx}`] === true) {
      check[`check${idx}`] = false;
    } else {
      check[`check${idx}`] = true;
    }
    setCheck({ ...check });
  };

  return (
    <div className="cart_wrapper">
      <Header cart />
      <div className="cart_body">
        <div className="cart_list">
          {cardItem.length === 0 ? (
            <div className="no_item_wrapper">
              <div className="no_item">
                <img src="https://www.wingeat.com/images/img-empty-cart.png" alt="img" />
                <div className="no_item_text">장바구니에 담긴 상품이 없음</div>
              </div>
              <div
                className="goto_shop"
                onClick={() => {
                  props.history.push('/');
                }}
              >
                쇼핑하러 가기
              </div>
            </div>
          ) : (
            cardItem
            && cardItem.map((ele, idx) => (
              <div className="card_item" key={idx}>
                <div className="card_top_div">
                  <label className="item_label">
                    <input
                      className="item_check"
                      type="checkbox"
                      checked={check[`check${idx}`]}
                      onClick={() => {
                        handleSelect(idx);
                      }}
                      readOnly
                    />
                    <div className="check_icon">
                      {check[`check${idx}`] && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ position: 'absolute', cursor: 'pointer' }}
                        />
                      )}
                    </div>
                    {ele.name}
                  </label>

                  <div>
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ marginRight: '5px', cursor: 'pointer' }}
                      onClick={() => {
                        itemRemove(ele.id);
                      }}
                    />
                  </div>
                </div>
                <div className="card_main">
                  <img src={`${beforeUrl}${ele.image}`} alt="item_img" />
                  <div className="item_info">
                    <div className="one_price">
                      {`${Number(String(ele.price)).toLocaleString()}원`}
                    </div>
                    <div className="amount_control">
                      <FontAwesomeIcon
                        icon={faMinus}
                        color="gray"
                        style={{ marginRight: '5px', cursor: 'pointer' }}
                        size="xs"
                        onClick={() => {
                          amountDown(idx);
                        }}
                      />
                      <input type="text" value={ele.amount} id={`item_count ${ele.id}`} readOnly />
                      <FontAwesomeIcon
                        icon={faPlus}
                        color="gray"
                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                        size="xs"
                        onClick={() => {
                          amountUp(idx);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="item_totla_price">
                  {`합계:${Number(String(ele.price * ele.amount)).toLocaleString()}원`}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="pay_info">
          <div className="price_wrapper">
            <div className="pay_predict">결제 예정 금액</div>
            <div className="total_price">{`${totalResult.toLocaleString()}원`}</div>
          </div>
          <div className="order_btn">주문하기</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(connect(null, { changeCount })(Cart));
