// src/components/FAQ.js
import React, { useState } from 'react';
import NavBar from './NavBar';

const FAQ = () => {
  const [openQuestions, setOpenQuestions] = useState([]);

  const toggleAnswer = (index) => {
    if (openQuestions.includes(index)) {
      setOpenQuestions(openQuestions.filter((i) => i !== index));
    } else {
      setOpenQuestions([...openQuestions, index]);
    }
  };

  const faqItems = [
    {
      question: "What is a data dashboard?",
      answer: "A data dashboard is a tool that consolidates and visualizes key performance indicators, metrics, and data points to provide a comprehensive view of an organization’s performance."
    },
    {
      question: "How can I use the data dashboard?",
      answer: "You can use the data dashboard to track and analyze key metrics, identify trends, and make data-driven decisions to improve performance."
    },
    {
      question: "What types of data can be visualized?",
      answer: "The data dashboard can visualize various types of data, including sales data, customer data, financial data, and more."
    },
    {
      question: "Is the data dashboard customizable?",
      answer: "Yes, the data dashboard is customizable. You can adjust the charts, graphs, and other visualizations to fit your specific needs."
    },
    {
      question: "How often is the data updated?",
      answer: "The frequency of data updates depends on your data sources. It can range from real-time updates to daily or weekly updates."
    },
    {
      question: "Can I share the data dashboard with my team?",
      answer: "Yes, you can share the data dashboard with your team. You can set up user access and permissions to control who can view and edit the dashboard."
    },
    {
      question: "What are the system requirements for using the data dashboard?",
      answer: "The data dashboard is web-based and can be accessed from any modern web browser. There are no specific system requirements."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="faq-section">
          {faqItems.map((item, index) => (
            <div className="faq-item" key={index}>
              <h3
                className="faq-question text-xl font-bold cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                {item.question}
              </h3>
              <p className="faq-answer" style={{ display: openQuestions.includes(index) ? 'block' : 'none' }}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-700 p-4 text-white mt-8">
        <div className="container mx-auto text-center">
          &copy; 2024 Braudana. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default FAQ;
