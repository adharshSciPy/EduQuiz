import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import "../assets/css/table.css";
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import { DeleteOutlined } from '@ant-design/icons';


function AdminTable() {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/question/getquestions')
            console.log("admintable", response.data.data);
            setQuestions(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getQuestions();
    }, [])

    const deleteQuestions = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/question/deletequestions/${id}`);
            console.log("deleted", response)
            getQuestions();
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />

            <Table striped>
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Question</th>
                        <th>Option1</th>
                        <th>Option2</th>
                        <th>Option3</th>
                        <th>Option4</th>
                        <th>Answer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.length > 0 ? (
                        questions.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.question}</td>
                                <td>{item.option1}</td>
                                <td>{item.option2}</td>
                                <td>{item.option3}</td>
                                <td>{item.option4}</td>
                                <td>{item.correctAns}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteQuestions(item._id)}><DeleteOutlined /></button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No data available</td>
                        </tr>
                    )}
                </tbody>
            </Table>

        </div>
    )
}

export default AdminTable