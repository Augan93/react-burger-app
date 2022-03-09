import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
    const dispatch = useDispatch();

    let orderList = useSelector(state => state.order.orders);
    let loading = useSelector(state => state.order.loading);
    let token = useSelector(state => state.auth.token);
    let userId = useSelector(state => state.auth.userId);

    useEffect(()=> {
        dispatch(actions.fetchOrders(token, userId))
    }, [])

    /*
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }*/

    let orders = <Spinner />;
    if (!loading) {
        orders = orderList.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ))
    }
    return (
        <div>
            {orders}
        </div>
    );

}

/*const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};*/

/*const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
};*/

export default withErrorHandler(Orders, axios);