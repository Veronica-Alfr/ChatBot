import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useContacts } from '../api/requests';
import { IContact } from '../interface/IContact';


const ContactList: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const apiKey = queryClient.getQueryData<string>(['apiKey']);
  
  const query = new URLSearchParams(location.search);
  const page = Number(query.get('page')) || 0;
  const take = 10;
  const skip = page * take;

  if (!apiKey) {
    return <div>Error: API key is missing. Please log in again.</div>;
  }

  const { data: contacts, error, isLoading } = useContacts(apiKey, skip, take);

  console.log('dados em Contacts =>', contacts?.data.resource);

  const handlePageChange = (newPage: number) => {
    navigate(`/?page=${newPage}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {(error as Error).message}</div>;

  const totalContacts = contacts?.data.resource.total || 0;
  const allContacts = contacts?.data.resource.items || [];

  const totalPages = Math.ceil(totalContacts / take);
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  const displayPages = pages.filter((pageIndex) => {
    if (pageIndex === 0 || pageIndex === totalPages - 1 || (pageIndex >= page - 2 && pageIndex <= page + 2)) {
      return true;
    }
    return false;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl text-center font-bold font-mulish mb-6 text-gray-700">
        Contact List
      </h1>
      <ul className="space-y-2 bg-white shadow-md p-4 rounded-lg">
        {allContacts.map((contact: IContact, index: number) => (
          <li key={index} className="bg-white p-4 rounded hover:bg-gray-100 transition-colors duration-200">
            <Link to={`/contact/${contact.identity}`} className="text-purple-600 text-lg font-semibold hover:text-purple-800">
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


// import React, { useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { getContacts } from '../api/requests';
// import { IContact } from '../interface/IContact';

// const ContactList: React.FC = () => {
//   const queryClient = useQueryClient();
//   const [contacts, setContacts] = useState<IContact[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [totalContacts, setTotalContacts] = useState<number>(0);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const query = new URLSearchParams(location.search);
//   const page = Number(query.get('page')) || 0;
//   const take = 10;
//   const skip = page * take;

//   const fetchContacts = async (skipValue: number) => {
//     try {
//       const response = await getContacts(skipValue, take);

//       setContacts(response.data.resource.items);
//       setTotalContacts(response.data.resource.total);
//     } catch (error) {
//       setError('Failed to fetch contacts');
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchContacts(skip);
//   }, [skip]);

//   const handlePageChange = (newPage: number) => {
//     navigate(`/?page=${newPage}`);
//   };

//   const totalPages = Math.ceil(totalContacts / take);
//   const pages = Array.from({ length: totalPages }, (_, i) => i);

//   const displayPages = pages.filter((pageIndex) => {
//     if (pageIndex === 0 || pageIndex === totalPages - 1 || (pageIndex >= page - 2 && pageIndex <= page + 2)) {
//       return true;
//     }
//     return false;
//   });

//   if (error) {
//     return <div className="text-red-500">Error: {error}</div>;
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl text-center font-bold font-mulish mb-6 text-gray-700">
//         Contact List
//       </h1>
//       <ul className="space-y-2 bg-white shadow-md p-4 rounded-lg">
//         {contacts.map((contact, index) => (
//           <li key={index} className="bg-white p-4 rounded hover:bg-gray-100 transition-colors duration-200">
//             <Link to={`/contact/${contact.identity}`} className="text-purple-600 text-lg font-semibold hover:text-purple-800">
//               {contact.name || contact.identity}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <div className="flex justify-center items-center mt-6 space-x-2">
//         <button 
//           onClick={() => handlePageChange(page - 1)} 
//           disabled={page === 0} 
//           className={`px-4 py-2 rounded ${page === 0 ? 'bg-gray-300' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
//         >
//           Previous
//         </button>
//         {displayPages.map((pageIndex, index) => (
//           <React.Fragment key={pageIndex}>
//             {index > 0 && displayPages[index - 1] !== pageIndex - 1 && <span>...</span>}
//             <button 
//               onClick={() => handlePageChange(pageIndex)} 
//               className={`px-4 py-2 rounded ${page === pageIndex ? 'bg-purple-500 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
//             >
//               {pageIndex + 1}
//             </button>
//           </React.Fragment>
//         ))}
//         <button 
//           onClick={() => handlePageChange(page + 1)} 
//           disabled={page + 1 >= totalPages} 
//           className={`px-4 py-2 rounded ${page + 1 >= totalPages ? 'bg-gray-300' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ContactList;
