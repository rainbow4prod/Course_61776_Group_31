// src/components/AboutAndContact.js
import React from 'react';
import NavBar from './NavBar';
import ThemeToggle from './ThemeToggle';
import '../App.css'; // Ensure this import is present

const AboutAndContact = () => (
  <>
    <NavBar />
    <ThemeToggle />
    <main className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p>Welcome to Braudana. It's like Grafana, but better. Our mission is to provide insightful data visualizations to help you make informed decisions.</p>
      <h3 className="text-xl font-bold mt-8 mb-2">Team Details</h3>
      <table className="min-w-full divide-y divide-gray-200 transparent-table">
        <thead className="dark-table-header">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark-table-cell uppercase tracking-wider">Team Member</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark-table-cell uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark-table-cell uppercase tracking-wider">Group Number</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark-table-cell">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">Bar Leibovich</td>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">Bar.Leibovich@e.braude.ac.il</td>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">31</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">Avner Shimon</td>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">Avner.Shimon@e.braude.ac.il</td>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">31</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">Nick Lerman</td>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">Nick.Lerman@e.braude.ac.il</td>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">31</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">Noah Soskha</td>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">Noah.soskha@e.braude.ac.il</td>
            <td className="px-6 py-4 whitespace-nowrap dark-table-cell">31</td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
      <p>If you have any questions or need further information, please feel free to contact us.</p>
    </main>
    <footer className="bg-gray-800 p-4 text-white mt-8">
      <div className="container mx-auto text-center">
        &copy; 2024 Braudana. All rights reserved.
      </div>
    </footer>
  </>
);

export default AboutAndContact;
