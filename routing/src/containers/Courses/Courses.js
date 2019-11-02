import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Course from '../Course/Course';
import './Courses.css';

class Courses extends Component {
    state = {
        courses: [
            { id: 1, title: 'Angular - The Complete Guide' },
            { id: 2, title: 'Vue - The Complete Guide' },
            { id: 3, title: 'PWA - The Complete Guide' }
        ]
    }

    articleClickHandler = (course) => {
        alert(course.title);
        this.props.history.push({ pathname: '/courses/'+ course.id });
    }

    render () {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map( course => {
                            return (
                            <article 
                                className="Course" 
                                key={course.id}
                                >
                                {/*<Link to={this.props.match.url+'/'+course.id}> {course.title} </Link>*/}
                                {course.title}
                                <Link 
                                params={{                                        
                                        id: course.id, 
                                        title: course.title }}
                                to={{
                                    pathname: '/courses/'+ course.id+'/'+ course.title,                                    
                                    hash: '#',

                                }}> Link </Link>
                            </article>);
                        } )
                    }
                </section>
                <Route path={this.props.match.url + "/:id/:title"} exact component={Course} />
            </div>
        );
    }
}

export default Courses;