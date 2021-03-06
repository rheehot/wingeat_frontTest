import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeCount } from 'Redux/Actions';

import './Header.scss';

const Header = (props) => {
  useEffect(() => {
    if (localStorage.getItem('items') === null) {
      props.changeCount(0);
    } else {
      props.changeCount(JSON.parse(localStorage.getItem('items')).length);
    } }, []);
  const goCart = () => {
    props.history.push('/cart');
  };

  return (
    <div className="header">
      <div className="header_top_wrapper">
        <div className="header_top">
          <div className="alert_circle" onClick={goCart}>
            {props.count}
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
export default withRouter(connect(mapStateToProps, { changeCount })(Header));
