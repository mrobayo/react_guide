import React, { Component } from 'react';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
        
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code',
                    minLength: 5,
                    maxLength: 5
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },            
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true
            },
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients);
        this.setState({ loading: true });
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            console.log('Form: '+ formElementIdentifier, this.state.orderForm[formElementIdentifier].value);
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
            
        };
        axios.post('/orders.json', order).then(response => {            
            this.setState({ loading: false, purchasing: false });
            this.props.history.push('/');
        }).catch( error => {
            
            this.setState({ loading: false, purchasing: false });
        });
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;        
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const upddateOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...upddateOrderForm[inputIdentifier]
        };

        // console.log(inputIdentifier + "----" + event.target.value);

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        upddateOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in upddateOrderForm) {
            formIsValid = formIsValid && upddateOrderForm[inputIdentifier].valid;
        }


        this.setState({orderForm: upddateOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementArray = [];

        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key, 
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    changed={event => this.inputChangedHandler(event, formElement.id)}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    invalid={!formElement.config.valid}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                    ORDER
                </Button>
            </form>
        );

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

export default ContactData;