import React from 'react'

const AboutUs = () => {
  return (
    <div className="bg-zinc-700 text-white min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto bg-zinc-800 shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          About the Book Library
        </h1>
        <p className="text-lg mb-4">
          Welcome to the <span className="font-semibold">Book Library</span> project! This application is designed to help book lovers organize, manage, and explore their personal collection of books.
        </p>

        <h2 className="text-2xl font-semibold text-blue-500 mb-3">Purpose</h2>
        <p className="mb-4">
          The Book Library project provides an intuitive interface for users to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Store book details such as title, author, description and price.</li>
          <li>Add to favourites, add to cart and with mulitiple functionality.</li>
          <li>Edit or delete entries to keep the collection up-to-date.</li>
          <li>View detailed information about each book.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Add, edit, and delete books in your library.</li>
          <li>Tracking order status from admin's end.</li>
          <li>Responsive design for seamless use across devices.</li>
          <li>Modern UI built with React for a smooth user experience.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">Technologies Used</h2>
        <p className="mb-4">This project is built using the following technologies:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-semibold">React:</span> For building the user interface.
          </li>
          <li>
            <span className="font-semibold">Tailwind CSS:</span> For styling the application.
          </li>
          <li>
            <span className="font-semibold">JavaScript:</span> For implementing application logic.
          </li>
          <li>
            <span className="font-semibold">React Router:</span> For navigation (if applicable).
          </li>
          <li>
            <span className="font-semibold">Local Storage / Backend API:</span> To persist book data.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">Future Enhancements</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Integration with online book APIs for fetching book details.</li>
          <li>User authentication for personalized libraries.</li>
          <li>Recommendations based on user preferences.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">Contact</h2>
        <p>
          If you have any questions, suggestions, or feedback, feel free to reach out!
        </p>
        <p className="mt-2">
          Email: <a href="mailto:ashishkalbande60@gmail.com" className="text-blue-600 underline">ashishkalbande60@gmail.com</a>
        </p>
      </div>
    </div>
  );
};

export default AboutUs
