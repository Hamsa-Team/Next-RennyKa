import React, { useState } from 'react';
import axios from 'axios';

class Employees extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: this.props.employees ? this.props.employees : []
        }
    }

    crawlData = async (event) => {
        event.preventDefault();
        const { employees } = this.state;
        const res = await axios.post('employees/crawl');
        const newEmployees = employees.concat(res.data);
        this.setState({
            employees: newEmployees
        })
    }

    render() {
        return (
            <>
                <button onClick={this.crawlData}>Crawl</button>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Salary</th>
                    </tr>
                    {this.state.employees ? this.state.employees.map((e, i) => {
                        return (
                            <tr key={i}>
                                <td>{e.employee_name}</td>
                                <td>{e.employee_age}</td>
                                <td>{e.employee_salary}</td>
                            </tr>
                        )
                    }) : null}
                </table>
            </>
        )
    }
}

export async function getServerSideProps(ctx) {
    if (ctx.req.session) {
        const res = await axios.get('http://localhost:3000/api/employees');
        return {
            props: {
                employees: res.data
            },
        }
    }
    else {
        ctx.res.writeHead(301, {
            Location: "/login",
        });
        ctx.res.end();
    }
}
export default Employees