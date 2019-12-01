import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/actions';

class Persons extends Component {
    state = {
        persons: []
    }

    personAddedHandler = () => {
        const newPerson = {
            id: (Math.random() * 1000).toFixed(0), // not really unique but good enough here!
            name: 'Max',
            age: Math.floor( Math.random() * 40 )
        }
        //this.setState( ( prevState ) => {
        //    return { persons: prevState.persons.concat(newPerson)}
        //} );
        console.log('Adding... ', newPerson);
        this.props.onAddPerson(newPerson);
    }

    personDeletedHandler = (personId) => {
        console.log('Deleting... ', personId);
        this.props.onDeletePerson(personId);
        //this.setState( ( prevState ) => {
        //    return { persons: prevState.persons.filter(person => person.id !== personId)}
        //} );
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.personList.map(person => (
                    <Person 
                        pid={person.id}
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.personDeletedHandler(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        personList: state.personList
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPerson: (newPerson) => dispatch({ type: actionTypes.ADD_PERSON, person: newPerson }),
        onDeletePerson: (personId) => dispatch({type: actionTypes.DELETE_PERSON, personId: personId})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);