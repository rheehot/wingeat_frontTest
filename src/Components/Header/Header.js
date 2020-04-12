import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import './Header.scss';

const Header = (props) => {
  const [initcount, setInitcount] = useState(0);

  useEffect(() => {
    setInitcount(
      localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')).length : 0,
    );
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('items')).length === 0) {
      setInitcount(0);
    }
  }, [initcount]);

  const goCart = () => {
    props.history.push('/cart');
  };
  return (
    <div className="header">
      <div className="header_top_wrapper">
        <div className="header_top">
          <div className="alert_circle" onClick={goCart}>
            {props.count || initcount}
          </div>
          <span onClick={goCart}>장바구니</span>
        </div>
      </div>
      <div className="header_main">
        <img
          src="https://image.wingeat.com/logo/images/we_logo_center.png"
          alt="main_logo"
          onClick={() => {
            props.history.push('/');
          }}
        />
      </div>
      {props.cart && <div className="cart_title">장바구니</div>}
    </div>
  );
};
const mapStateToProps = (state) => ({
  count: state.cartCount.count,
});
export default withRouter(connect(mapStateToProps, {})(Header));
