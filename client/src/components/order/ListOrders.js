import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import axios from "axios"
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myOrders, clearErrors } from '../../actions/orderActions'

const ListOrders = ({ history}) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders = []} = useSelector(state => state.myOrders);


    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
            history.push('/login')
        }
    }, [dispatch, alert, error])


    const orderHandler =async(id)=>{
        if (window.confirm(`Cancel Order ?`)){
            try {

                const  {data} = await axios.put(`/api/v1/order/cancel/${id}`)
                console.log(data);
                alert.success("Order Cancelled")
                
            } catch (error) {
                alert.error(error.response.data.message)
            }
     
     
    }
    }
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

    orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `₹${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:<div>
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
                   {  order.orderStatus && String(order.orderStatus).includes('Delivered') ||  order.orderStatus && String(order.orderStatus).includes('Cancelled') ? <div>              </div>:<button onClick={() => orderHandler(order._id)} className="btn btn-danger ml-2">
                     <i className="fa fa-times"></i>
                 </button>
            }
                 </div>
            })
        })

        return data;
    }

    return (
        <Fragment>

            <MetaData title={'My Orders'} />

            <h1 className="my-5">My Orders</h1>

            {loading ? <Loader /> : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                   
                />
            )}

        </Fragment>
    )
}

export default ListOrders