import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients);
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.imgs,
            price: this.props.price,
            customer: {
                name: 'Max Udemy',
                address: {
                    street: 'Udemy street',
                    zipCode: '1234',
                    country: 'Ecuador'
                },
                email: 'test@udemy.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order).then(response => {            
            this.setState({ loading: false, purchasing: false });
            this.props.history.push('/');
        }).catch( error => {
            
            this.setState({ loading: false, purchasing: false });
        });
    }


    render() {
        let form= (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal code"/>
            <Button btnType="Success" 
                    clicked={this.orderHandler}>ORDER
            </Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateTopProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect( mapStateTopProps )( ContactData );