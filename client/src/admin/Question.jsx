import { React, useState,  } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';


const Question = () => {
  const notifySuccess = () => toast.success("Submitted Successfully!");
  const notifyError = () => toast.error("Something Went Wrong!");


  const fields = {
    category: '',
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAns: ''
  }

  const [form, setForm] = useState(fields)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const { category, question, option1, option2, option3, option4, correctAns } = form;
    if (!category || !question || !option1 || !option2 || !option3 || !option4 || !correctAns) {
      notifyError("Please fill required fields")
      return;
    }

    try {
      const payload = {
        category: form.category,
        question: form.question,
        option1: form.option1,
        option2: form.option2,
        option3: form.option3,
        option4: form.option4,
        correctAns: form.correctAns
      }
      const response = axios.post('http://localhost:8000/api/v1/question/createquestions', payload)
      if (response) {
        console.log("payload", payload)
        notifySuccess()
        setForm(fields);
      }
      else {
        notifyError()
      }
    } catch (error) {
      console.log(error)
      notifyError(error.message)
    }

  }



  return (
  
<div>

  {/* <Navbar/> */}
    <div className="container mt-5 pb-5 " >
      <ToastContainer position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover />
      <form onSubmit={submitHandler}>
        {/* Question Type */}
        <div className="mb-4">
          <label htmlFor="type" className="form-label">Type</label>
          <select name="category" id="type" className="form-select" value={form.category} onChange={handleInputChange}>
            <option value="">Select Type</option>
            <option value="Technical">Technical</option>
            <option value="NonTechnical">Non Technical</option>
          </select>
        </div>

        {/* Question Text */}
        <div className="mb-4">
          <label htmlFor="question" className="form-label">Question</label>
          <textarea
            name="question"
            id="question"
            className="form-control"
            rows="3"
            placeholder="Enter the question here"
            value={form.question}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="form-label">Options</label>
          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                name='option1'
                type="text"
                className="form-control"
                placeholder="Option A"
                value={form.option1}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                name='option2'
                type="text"
                className="form-control"
                placeholder="Option B"
                value={form.option2}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-2">
              <input
                name='option3'
                type="text"
                className="form-control"
                placeholder="Option C"
                value={form.option3}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6 mb-2">
              <input
                name='option4'
                type="text"
                className="form-control"
                placeholder="Option D"
                value={form.option4}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Correct Answer */}
        <div className="mb-4">
          <label htmlFor="correctAnswer" className="form-label">Correct Answer</label>
          <select name="correctAns" id="correctAnswer" className="form-select" value={form.correctAns} onChange={handleInputChange}>
            <option value="">Select Correct Answer</option>
            <option value="option1">A</option>
            <option value="option2">B</option>
            <option value="option3">C</option>
            <option value="option4">D</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    <Footer/>
    </div>

  );
};

export default Question;
