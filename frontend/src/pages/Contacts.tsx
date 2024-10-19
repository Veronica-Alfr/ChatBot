import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getContacts } from '../api/requests';

interface Contact {
  identity: string;
  name: string;
}

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalContacts, setTotalContacts] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  
  const query = new URLSearchParams(location.search);
  const page = Number(query.get('page')) || 0;
  const take = 10; // Number of contacts to load per page
  const skip = page * take;

  const fetchContacts = async (skipValue: number) => {
    try {
      const apiKey = localStorage.getItem('token') || '';
      const response = await getContacts(apiKey, skipValue, take);
      setContacts(response.data.resource.items);
      setTotalContacts(response.data.resource.total); // Assuming 'total' is returned for all contacts
    } catch (error) {
      setError('Failed to fetch contacts');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContacts(skip);
  }, [skip]);

  const handlePageChange = (newPage: number) => {
    navigate(`/?page=${newPage}`);
  };

  const totalPages = Math.ceil(totalContacts / take);
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  const displayPages = pages.filter((pageIndex) => {
    if (pageIndex === 0 || pageIndex === totalPages - 1 || (pageIndex >= page - 2 && pageIndex <= page + 2)) {
      return true;
    }
    return false;
  });

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Contact List</h2>
      <ul className="space-y-4">
        {contacts.map((contact, index) => (
          <li key={index} className="bg-white p-4 rounded shadow hover:bg-gray-100">
            <Link to={`/messages/${contact.identity}`} className="text-blue-500 hover:underline">
              {contact.name || contact.identity}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={page === 0} 
          className={`px-4 py-2 rounded ${page === 0 ? 'bg-gray-300' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
        >
          Previous
        </button>
        {displayPages.map((pageIndex, index) => (
          <React.Fragment key={pageIndex}>
            {index > 0 && displayPages[index - 1] !== pageIndex - 1 && <span>...</span>}
            <button 
              onClick={() => handlePageChange(pageIndex)} 
              className={`px-4 py-2 rounded ${page === pageIndex ? 'bg-purple-500 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
            >
              {pageIndex + 1}
            </button>
          </React.Fragment>
        ))}
        <button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={page + 1 >= totalPages} 
          className={`px-4 py-2 rounded ${page + 1 >= totalPages ? 'bg-gray-300' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContactList;
