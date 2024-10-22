import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessages } from "../api/requests";
import { IMessage } from "../interface/IMessage";

const Messages: React.FC = () => {
  const { contactId } = useParams<{ contactId: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      const apiKey = localStorage.getItem("token") || "";
      if (!contactId) {
        setError("Contact ID is missing");
        navigate("/");
        return;
      }

      const response = await getMessages(apiKey, contactId);

      setMessages(response.data.resource.items);
    } catch (error) {
      setError("Failed to fetch messages");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [contactId]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 p-4 rounded shadow py-6 bg-gray-150">
        <h1 className="text-3xl font-bold font-mulish text-gray-800 text-shadow">
          History Messages
        </h1>
      </div>
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message.id} className="bg-purple-100 p-3 rounded-lg shadow relative max-w-md mx-auto">
            <div className="text-lg font-semibold mb-1">{message.content}</div>
            <div className="absolute bottom-1 right-2 text-xs text-gray-500">{message.from}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
